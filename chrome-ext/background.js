// Pricing per 1,000,000 tokens
const PRICING = {
  "openai": {
    "gpt-4o": { input: 5.00, output: 15.00 }
  },
  "anthropic": {
    "claude-3-5-sonnet": { input: 3.00, output: 15.00 }
  },
  "google": {
    "gemini-1.5-pro": { input: 1.25, output: 5.00 }
  }
};

const SEVEN_DAYS_MS = 7 * 24 * 60 * 60 * 1000; // 168 hours in milliseconds

// Initialize default state on installation
chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.local.get(["sessionCost", "tokenCount", "activeModel", "budgetCeiling", "enabledProviders", "historyLog"], (result) => {
    if (result.sessionCost === undefined) chrome.storage.local.set({ sessionCost: 0.0 });
    if (result.tokenCount === undefined) chrome.storage.local.set({ tokenCount: 0 });
    if (result.activeModel === undefined) chrome.storage.local.set({ activeModel: "None" });
    if (result.budgetCeiling === undefined) chrome.storage.local.set({ budgetCeiling: 10.00 });
    if (result.historyLog === undefined) chrome.storage.local.set({ historyLog: [] });
    if (result.enabledProviders === undefined) {
      chrome.storage.local.set({
        enabledProviders: { openai: true, anthropic: true, google: true }
      });
    }
  });
});

// Helper to calculate cost
function calculateCost(provider, model, promptTokens, completionTokens) {
  const providerPricing = PRICING[provider];
  if (!providerPricing) return 0;
  
  let modelPricing = providerPricing[model];
  if (!modelPricing) {
    const keys = Object.keys(providerPricing);
    const matchedKey = keys.find(k => model.includes(k));
    if (matchedKey) {
      modelPricing = providerPricing[matchedKey];
    } else {
      modelPricing = providerPricing[keys[0]]; // Fallback model
    }
  }
  
  const inputCost = (promptTokens / 1000000) * modelPricing.input;
  const outputCost = (completionTokens / 1000000) * modelPricing.output;
  return inputCost + outputCost;
}

// Cleans the transaction log by removing items older than 7 days
function pruneOldLogs(historyLog) {
  const cutoffTime = Date.now() - SEVEN_DAYS_MS;
  return historyLog.filter(item => item.timestamp >= cutoffTime);
}

// Record compliance logic, prune old data, and check budget limits
function recordUsage(provider, model, promptTokens, completionTokens) {
  chrome.storage.local.get(["budgetCeiling", "enabledProviders", "historyLog"], (data) => {
    const enabledProviders = data.enabledProviders || { openai: true, anthropic: true, google: true };
    
    // Check if provider monitoring is bypassed
    if (!enabledProviders[provider]) {
      console.log(`Tracking bypassed for disabled provider: ${provider}`);
      return;
    }

    const currentCost = calculateCost(provider, model, promptTokens, completionTokens);
    const rawLog = data.historyLog || [];
    
    // Create new transaction object
    const newTransaction = {
      timestamp: Date.now(),
      cost: currentCost,
      tokenCount: promptTokens + completionTokens,
      model: `${provider}/${model}`
    };

    // Append and roll the logs (Removing logs older than 7 days)
    const updatedLog = pruneOldLogs([...rawLog, newTransaction]);

    // Aggregate statistics across the rolling 7-day window
    let totalRollingCost = 0;
    let totalRollingTokens = 0;
    updatedLog.forEach(item => {
      totalRollingCost += item.cost;
      totalRollingTokens += item.tokenCount;
    });

    const ceiling = data.budgetCeiling || 10.00;

    // Check budget limit alert
    if (totalRollingCost >= ceiling) {
      chrome.notifications.create({
        type: "basic",
        iconUrl: "icons/icon-128.png",
        title: "Budget Breach Warning",
        message: `Your active 7-day spend of $${totalRollingCost.toFixed(4)} has reached or exceeded your budget ceiling of $${ceiling.toFixed(2)}!`,
        priority: 2
      });
    }

    // Persist rolled log ledger and aggregated statistics
    chrome.storage.local.set({
      sessionCost: totalRollingCost,
      tokenCount: totalRollingTokens,
      activeModel: `${provider}/${model}`,
      historyLog: updatedLog
    });
  });
}

// Listen for incoming API payload events
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === "LOG_LLM_REQUEST") {
    const { provider, model, promptTokens, completionTokens } = message.payload;
    recordUsage(provider, model, promptTokens, completionTokens);
    sendResponse({ status: "success" });
  }
  return true;
});

// Periodic background check: Prune logs idle-time (every 1 hour)
chrome.alarms?.create("pruneAlarm", { periodInMinutes: 60 });
chrome.alarms?.onAlarm.addListener((alarm) => {
  if (alarm.name === "pruneAlarm") {
    chrome.storage.local.get(["historyLog"], (data) => {
      const rawLog = data.historyLog || [];
      const pruned = pruneOldLogs(rawLog);
      
      let totalRollingCost = 0;
      let totalRollingTokens = 0;
      pruned.forEach(item => {
        totalRollingCost += item.cost;
        totalRollingTokens += item.tokenCount;
      });

      chrome.storage.local.set({
        sessionCost: totalRollingCost,
        tokenCount: totalRollingTokens,
        historyLog: pruned
      });
    });
  }
});
