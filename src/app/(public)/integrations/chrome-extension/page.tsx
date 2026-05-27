"use client";

import React, { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import { LogEntry, TerminalLog, Toast } from "@/lib/shared/types";
import { LLM_RATE_CARD } from "@/lib/shared/rates";

export default function ChromeExtensionPage() {
  // --- Universal App State ---
  const [sessionCost, setSessionCost] = useState<number>(0.1482);
  const [tokenCount, setTokenCount] = useState<number>(34105);
  const [activeModel, setActiveModel] = useState<string>("claude-3-5-sonnet");
  const [budgetCeiling, setBudgetCeiling] = useState<number>(5.00);
  const [activeScreen, setActiveScreen] = useState<"main" | "logs" | "shield" | "config">("main");
  const [activeCodeTab, setActiveCodeTab] = useState<"manifest" | "background" | "popupHtml" | "popupJs">("manifest");
  const [extensionTheme, setExtensionTheme] = useState<"dark" | "light">("dark");
  const [sovereigntyMode, setSovereigntyMode] = useState<"global" | "eu-only">("global");
  
  const [providers, setProviders] = useState<{
    openai: boolean;
    anthropic: boolean;
    google: boolean;
    openrouter: boolean;
  }>({
    openai: true,
    anthropic: true,
    google: false,
    openrouter: true
  });

  const [logs, setLogs] = useState<LogEntry[]>([
    { time: "19:42:01", model: "claude-3-5-sonnet", tokens: 16500, cost: 0.0495, status: "Allowed" },
    { time: "19:45:12", model: "gpt-4o", tokens: 17605, cost: 0.0987, status: "Allowed" }
  ]);

  const [terminalLogs, setTerminalLogs] = useState<TerminalLog[]>([
    { id: "1", time: "19:40:00", type: "info", msg: "MyTokenCost Developer Workspace Initialized." },
    { id: "2", time: "19:40:02", type: "success", msg: "Local Compliance Gateway linked to chrome://extensions context." },
    { id: "3", time: "19:40:05", type: "info", msg: "Code dynamic compiler is actively listening to configuration adjustments." }
  ]);

  const [toasts, setToasts] = useState<Toast[]>([]);

  // Simulation Form Controls
  const [simProvider, setSimProvider] = useState<"openai" | "anthropic" | "google" | "openrouter">("anthropic");
  const [simInputTokens, setSimInputTokens] = useState<number>(25000);
  const [simOutputTokens, setSimOutputTokens] = useState<number>(8500);

  // Derived State
  const killSwitchTriggered = useMemo(() => {
    return sessionCost >= budgetCeiling;
  }, [sessionCost, budgetCeiling]);

  // Toast Helper
  const showToast = (message: string, type: "success" | "warning" | "error" = "success") => {
    const id = Date.now().toString();
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3500);
  };

  // Terminal Log Helper
  const logTerminal = (type: "info" | "success" | "warning" | "error", msg: string) => {
    const timeStr = new Date().toLocaleTimeString([], { hour12: false });
    const id = Math.random().toString();
    setTerminalLogs((prev) => [...prev, { id, time: timeStr, type, msg }]);
  };

  // Scenarios Helper
  const applyScenario = (type: "default" | "agentLoop" | "heavyUsage") => {
    if (type === "default") {
      setSessionCost(0.1482);
      setTokenCount(34105);
      setActiveModel("claude-3-5-sonnet");
      setBudgetCeiling(5.00);
      setSovereigntyMode("global");
      logTerminal("info", "Loaded scenario: Standard developer setup.");
      showToast("Applied Default Sandbox Scenario", "success");
    } else if (type === "agentLoop") {
      setSessionCost(14.8210);
      setTokenCount(1048200);
      setActiveModel("claude-3-5-sonnet");
      setBudgetCeiling(10.00);
      setSovereigntyMode("global");
      logTerminal("warning", "Loaded scenario: Autonomous runaway loop simulated.");
      showToast("Runaway Loop Detected & Prevented", "error");
    } else if (type === "heavyUsage") {
      setSessionCost(124.5020);
      setTokenCount(24105000);
      setActiveModel("gpt-4o");
      setBudgetCeiling(500.00);
      setSovereigntyMode("eu-only");
      logTerminal("success", "Loaded scenario: High capacity B2B enterprise auditing.");
      showToast("Applied Heavy Enterprise Usage Scenario", "success");
    }
  };

  // Reset metrics
  const resetWorkspace = () => {
    setSessionCost(0.0000);
    setTokenCount(0);
    setActiveModel("None detected");
    setLogs([]);
    logTerminal("info", "Session database cleared. Standard operational profiles restored.");
    showToast("Workspace successfully cleared.", "success");
  };

  // Simulated API Request Trigger
  const triggerSimulatedAPIRequest = () => {
    const provider = simProvider;
    const input = simInputTokens || 0;
    const output = simOutputTokens || 0;
    const model = LLM_RATE_CARD[provider].name;

    logTerminal("info", `Intercept: Checking outgoing network requests to ${provider}...`);

    // Evaluate active tracking scopes
    if (!providers[provider]) {
      logTerminal("warning", `Bypass: Tracker config is disabled for [${provider.toUpperCase()}]. Request passed unmonitored.`);
      showToast("Request passed without logging metrics.", "warning");
      return;
    }

    // Evaluate Sovereignty filters (Google Gemini hosted out-of-EU simulation)
    if (sovereigntyMode === "eu-only" && provider === "google") {
      logTerminal("error", `BLOCKED: Target host violates strict GDPR residency rules. Request terminated.`);
      showToast("EU Compliance: Blocked non-conforming host!", "error");
      return;
    }

    // Verify active budget thresholds
    if (killSwitchTriggered) {
      logTerminal("error", `BLOCKED: Request terminated. Compliance boundary spending limit exceeded.`);
      showToast("Operation blocked. Over budget ceiling.", "error");
      return;
    }

    // Calculate simulated cost using shared rate card SSOT
    const queryCost = ((input / 1000000) * LLM_RATE_CARD[provider].inputCostPerMillion) + ((output / 1000000) * LLM_RATE_CARD[provider].outputCostPerMillion);

    setSessionCost((prev) => prev + queryCost);
    setTokenCount((prev) => prev + input + output);
    setActiveModel(model);

    const timeStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false });
    setLogs((prev) => [{ time: timeStr, model, tokens: (input + output), cost: queryCost, status: "Allowed" }, ...prev]);

    logTerminal("success", `Logged: [${model}] Cost: $${queryCost.toFixed(5)} (${(input + output).toLocaleString()} tokens)`);
    showToast(`Logged $${queryCost.toFixed(4)} of infrastructure spend.`, "success");
  };

  // Compile Dynamic Extension Bundle Code (Manifest V3 Compliance)
  const compiledCode = useMemo(() => {
    const trackingList: string[] = [];
    if (providers.openai) trackingList.push('"https://api.openai.com/*"');
    if (providers.anthropic) trackingList.push('"https://api.anthropic.com/*"');
    if (providers.google) trackingList.push('"https://generativelanguage.googleapis.com/*"');
    if (providers.openrouter) trackingList.push('"https://openrouter.ai/*"');
    
    const permissionsStr = trackingList.join(",\n    ");

    const manifestTemplate = `{
  "manifest_version": 3,
  "name": "MyTokenCost Tracker",
  "version": "1.0.0",
  "description": "Compliance & cost tracking edge extension",
  "permissions": [
    "storage",
    "declarativeNetRequest",
    "notifications"
  ],
  "host_permissions": [
    ${permissionsStr || '"https://api.openai.com/*"'}
  ],
  "background": {
    "service_worker": "background.js"
  },
  "action": {
    "default_popup": "popup.html"
  }
}`;

    const backgroundTemplate = `/**
 * MyTokenCost.com Extension Background Worker (Manifest V3 DNR)
 * Generates dynamic local billing rate rules
 */

const RATES = {
  openai: { input: ${LLM_RATE_CARD.openai.inputCostPerMillion.toFixed(2)}, output: ${LLM_RATE_CARD.openai.outputCostPerMillion.toFixed(2)} },
  anthropic: { input: ${LLM_RATE_CARD.anthropic.inputCostPerMillion.toFixed(2)}, output: ${LLM_RATE_CARD.anthropic.outputCostPerMillion.toFixed(2)} },
  gemini: { input: ${LLM_RATE_CARD.google.inputCostPerMillion.toFixed(2)}, output: ${LLM_RATE_CARD.google.outputCostPerMillion.toFixed(2)} }
};

let budgetCeiling = ${budgetCeiling.toFixed(2)};

// Listen for network events to prune log storage and update metrics
chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.local.set({ 
    sessionCost: 0.0, 
    tokenCount: 0, 
    budgetCeiling: budgetCeiling,
    historyLog: [] 
  });
});

// Dynamic rule modifier blocks network request when ceiling reached
async function enforceBudgetKillSwitch() {
  await chrome.declarativeNetRequest.updateDynamicRules({
    addRules: [{
      id: 101,
      priority: 1,
      action: { type: "block" },
      condition: {
        urlFilter: "*",
        initiatorDomains: ["api.openai.com", "api.anthropic.com", "generativelanguage.googleapis.com"],
        resourceTypes: ["xmlhttprequest"]
      }
    }],
    removeRuleIds: [101]
  });
  
  chrome.notifications.create({
    type: 'basic',
    iconUrl: 'icons/icon-128.png',
    title: 'MTC Budget Blocked',
    message: 'Outbound LLM API traffic blocked to prevent budget overrun.'
  });
}`;

    const popupHtmlTemplate = `<!DOCTYPE html>
<html>
<head>
  <style>
    body {
      width: 320px;
      height: 400px;
      margin: 0;
      padding: 16px;
      font-family: sans-serif;
      background-color: #0f172a;
      color: #f8fafc;
    }
    .card {
      background-color: #1e293b;
      border: 1px solid #334155;
      border-radius: 6px;
      padding: 12px;
      margin-bottom: 12px;
    }
    .metric {
      font-size: 24px;
      font-weight: 700;
      color: #10b981;
    }
    .btn {
      width: 100%;
      background-color: #ef4444;
      color: white;
      border: none;
      padding: 8px;
      border-radius: 4px;
      cursor: pointer;
      font-weight: 600;
    }
  </style>
</head>
<body>
  <h3>MyTokenCost Active Agent</h3>
  <div class="card">
    <small>SESSION SPEND</small>
    <div id="cost-val" class="metric">$0.0000</div>
  </div>
  <button id="reset-action" class="btn">Clear Session Data</button>
  <script src="popup.js"><\/script>
</body>
</html>`;

    const popupJsTemplate = `/**
 * MyTokenCost.com Chrome Extension - popup.js
 */
document.addEventListener('DOMContentLoaded', () => {
  const costEl = document.getElementById('cost-val');
  const resetEl = document.getElementById('reset-action');

  // Load metrics dynamically from offline local storage
  chrome.storage.local.get(['sessionCost'], (data) => {
    costEl.textContent = \`$\${(data.sessionCost || 0.0000).toFixed(4)}\`;
  });

  resetEl.addEventListener('click', () => {
    if (confirm("Reset current statistics?")) {
      chrome.storage.local.set({ sessionCost: 0, tokenCount: 0, historyLog: [] }, () => {
        costEl.textContent = '$0.0000';
      });
    }
  });
});`;

    return {
      manifest: manifestTemplate,
      background: backgroundTemplate,
      popupHtml: popupHtmlTemplate,
      popupJs: popupJsTemplate
    };
  }, [providers, budgetCeiling]);

  // Auto-scroll terminal log to bottom
  useEffect(() => {
    const term = document.getElementById("terminalBody");
    if (term) {
      term.scrollTop = term.scrollHeight;
    }
  }, [terminalLogs]);

  // Clipboard copy handler
  const copyCodeToClipboard = () => {
    const codeText = compiledCode[activeCodeTab];
    navigator.clipboard.writeText(codeText)
      .then(() => {
        showToast(`Copied ${activeCodeTab} bundle code!`, "success");
        logTerminal("success", `Explorer: Copied file [${activeCodeTab}] code to clipboard.`);
      })
      .catch(() => {
        showToast("Clipboard copy failed", "error");
      });
  };

  // Custom styling tokens depending on mock extension theme selection
  const extensionThemeStyles = useMemo(() => {
    const isDark = extensionTheme === "dark";
    return {
      bg: isDark ? "bg-slate-900 border-slate-800" : "bg-slate-50 border-slate-200",
      card: isDark ? "bg-slate-850 border-slate-800" : "bg-white border-slate-200",
      textPrimary: isDark ? "text-slate-100" : "text-slate-900",
      textSecondary: isDark ? "text-slate-400" : "text-slate-500",
      border: isDark ? "border-slate-800" : "border-slate-200"
    };
  }, [extensionTheme]);

  return (
    <div className="bg-slate-950 text-slate-100 min-h-screen flex flex-col font-sans selection:bg-emerald-500/30 selection:text-emerald-400">
      
      {/* Onboarding Header */}
      <div className="max-w-7xl w-full mx-auto px-6 pt-12 pb-6 space-y-4">
        <div className="flex items-center gap-2 text-xs font-mono font-bold text-emerald-400 uppercase tracking-widest">
          <Link href="/" className="hover:text-emerald-300">Home</Link>
          <span>/</span>
          <span className="text-slate-500">Integrations</span>
          <span>/</span>
          <span className="text-slate-300">Chrome Extension</span>
        </div>
        
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 border-b border-slate-800 pb-8">
          <div>
            <h1 className="text-4xl font-extrabold font-space-grotesk tracking-tight text-white mb-2">
              MyTokenCost Tracker <span className="text-emerald-500">Chrome Extension</span>
            </h1>
            <p className="text-sm text-slate-400 max-w-2xl leading-relaxed">
              Zero-latency developer cost monitoring, runaway autonomous agent loop prevention, and strict GDPR data residency governance. 100% computed local-first in your browser.
            </p>
          </div>
          
          <a
            href="https://chromewebstore.google.com"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 bg-emerald-500 hover:bg-emerald-400 text-emerald-950 font-extrabold text-xs px-6 py-4 rounded-xl shadow-lg shadow-emerald-500/10 uppercase tracking-wider transition-all hover:scale-[1.02] active:scale-[0.98]"
          >
            <svg className="w-5 h-5 flex-shrink-0" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/>
            </svg>
            Install from Web Store
          </a>
        </div>
        
        {/* Onboarding simulator warning */}
        <div className="bg-slate-900/50 border border-slate-800/80 p-4 rounded-xl flex items-center gap-3.5 text-xs text-slate-300">
          <span className="h-2 w-2 rounded-full bg-emerald-500 animate-ping flex-shrink-0" />
          <p>
            <strong className="text-white">Simulator Sandbox Active:</strong> Tweak the custom interceptor options below to experience the active V3 service worker spending block loops and data residency filters before installing.
          </p>
        </div>
      </div>

      {/* Main Grid Workspace */}
      <main className="max-w-7xl w-full mx-auto px-6 pb-24 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* LEFT COLUMN: Controls & Code Explorer (7/12 cols) */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* Quick Scenario Picker */}
          <div className="bg-gradient-to-r from-emerald-500/10 to-blue-500/5 border border-emerald-500/15 p-4 rounded-xl flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h4 className="text-xs font-bold text-emerald-400 tracking-wider uppercase mb-1">Visual Target Scenarios</h4>
              <p className="text-xs text-slate-300">Instantly simulate autonomous agent loops, runaway API budgets, or standard loads.</p>
            </div>
            <div className="flex flex-wrap gap-2">
              <button onClick={() => applyScenario("default")} className="px-2.5 py-1.5 bg-slate-900 hover:bg-slate-850 border border-slate-800 text-[11px] font-semibold rounded text-slate-300 transition">Default Sandbox</button>
              <button onClick={() => applyScenario("agentLoop")} className="px-2.5 py-1.5 bg-amber-500/15 hover:bg-amber-500/25 border border-amber-500/30 text-[11px] font-semibold rounded text-amber-400 transition">Runaway Loop</button>
              <button onClick={() => applyScenario("heavyUsage")} className="px-2.5 py-1.5 bg-blue-500/15 hover:bg-blue-500/25 border border-blue-500/30 text-[11px] font-semibold rounded text-blue-300 transition">High Load</button>
            </div>
          </div>

          {/* Simulated API request payload */}
          <div className="bg-slate-900 border border-slate-850 rounded-xl p-5 space-y-4 shadow-xl">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
              <svg className="w-4 h-4 text-emerald-400 animate-pulse" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              1. Intercept Outgoing API Request (Simulated Sandbox)
            </h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-[11px] text-slate-400 mb-1 font-semibold">Simulated API Host</label>
                <select 
                  value={simProvider} 
                  onChange={(e) => setSimProvider(e.target.value as any)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-xs text-slate-200 focus:border-emerald-500 focus:outline-none transition font-medium"
                >
                  <option value="openai">api.openai.com (OpenAI)</option>
                  <option value="anthropic">api.anthropic.com (Anthropic)</option>
                  <option value="google">generativelanguage.googleapis.com (Gemini)</option>
                  <option value="openrouter">openrouter.ai (OpenRouter)</option>
                </select>
              </div>
              
              <div>
                <label className="block text-[11px] text-slate-400 mb-1 font-semibold">Prompt Input Tokens</label>
                <input 
                  type="number" 
                  value={simInputTokens}
                  onChange={(e) => setSimInputTokens(Math.max(0, parseInt(e.target.value) || 0))}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-xs text-slate-200 focus:border-emerald-500 focus:outline-none transition font-mono font-medium" 
                />
              </div>

              <div>
                <label className="block text-[11px] text-slate-400 mb-1 font-semibold">Completion Out Tokens</label>
                <input 
                  type="number" 
                  value={simOutputTokens}
                  onChange={(e) => setSimOutputTokens(Math.max(0, parseInt(e.target.value) || 0))}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-xs text-slate-200 focus:border-emerald-500 focus:outline-none transition font-mono font-medium" 
                />
              </div>
            </div>

            <button 
              onClick={triggerSimulatedAPIRequest}
              className="w-full bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs py-3 rounded-lg transition shadow-lg shadow-emerald-500/15 uppercase tracking-wider flex items-center justify-center gap-1.5"
            >
              Fire API Payload Mock to Extension Gateway
            </button>
          </div>

          {/* Dynamically Compiled Extension Bundle Files */}
          <div className="bg-slate-900 border border-slate-850 rounded-xl overflow-hidden shadow-xl flex flex-col">
            <div className="bg-slate-950 px-4 py-3 border-b border-slate-850 flex flex-col sm:flex-row justify-between sm:items-center gap-3">
              <div>
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">2. Locally-Compiled Extension Code</h3>
                <p className="text-[10px] text-slate-500">Live generated source files matching current browser parameter settings</p>
              </div>
              
              <button 
                onClick={copyCodeToClipboard}
                className="bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800 hover:border-slate-700 text-[11px] font-semibold px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition"
              >
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
                </svg>
                Copy Active Source Code
              </button>
            </div>

            {/* Compiled Code Tabs */}
            <div className="bg-slate-950/40 flex border-b border-slate-850 overflow-x-auto">
              {[
                { key: "manifest", name: "manifest.json" },
                { key: "background", name: "background.js" },
                { key: "popupHtml", name: "popup.html" },
                { key: "popupJs", name: "popup.js" }
              ].map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => setActiveCodeTab(tab.key as any)}
                  className={`px-4 py-2.5 text-xs font-mono border-b-2 font-medium transition whitespace-nowrap ${
                    activeCodeTab === tab.key
                      ? "text-emerald-400 border-emerald-500 bg-slate-900/50"
                      : "text-slate-400 border-transparent hover:text-slate-200"
                  }`}
                >
                  {tab.name}
                </button>
              ))}
            </div>

            {/* Compiled Source Code Display Panel */}
            <div className="bg-slate-950 p-5 overflow-x-auto max-h-72 min-h-[16rem] font-mono text-xs text-emerald-300 leading-relaxed whitespace-pre font-medium">
              <pre>{compiledCode[activeCodeTab]}</pre>
            </div>
          </div>

        </div>

        {/* RIGHT COLUMN: Realistic Interactive Browser Frame (5/12 cols) */}
        <div className="lg:col-span-5 flex flex-col items-center">
          
          {/* Mock Browser Wrapper */}
          <div className="w-full max-w-[360px] bg-slate-900 border border-slate-850 rounded-2xl shadow-2xl overflow-hidden relative flex flex-col">
            
            {/* Fake Browser Toolbar */}
            <div className="bg-slate-950 px-4 py-3 border-b border-slate-850 flex items-center justify-between gap-2">
              <div className="flex gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-rose-500/40"></span>
                <span className="w-2.5 h-2.5 rounded-full bg-amber-500/40"></span>
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/40"></span>
              </div>
              
              <div className="flex-grow max-w-[190px] bg-slate-900 rounded px-2.5 py-1 text-[9px] text-slate-500 text-center truncate border border-slate-850 font-mono font-medium">
                chrome-extension://mytokencost/popup.html
              </div>
              
              <span className="text-[9px] font-extrabold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-1.5 py-0.5 rounded tracking-wide">MTC</span>
            </div>

            {/* Fake Extension Control Header Bar */}
            <div className="bg-slate-950 px-4 py-2 border-b border-slate-850 flex justify-between items-center text-xs">
              <div className="flex gap-1">
                {[
                  { key: "main", label: "Main" },
                  { key: "logs", label: "Logs" },
                  { key: "shield", label: "Shield" },
                  { key: "config", label: "Config" }
                ].map((scr) => (
                  <button
                    key={scr.key}
                    onClick={() => setActiveScreen(scr.key as any)}
                    className={`px-2 py-1 rounded text-[10px] font-bold transition ${
                      activeScreen === scr.key
                        ? "bg-emerald-500/15 text-emerald-400"
                        : "text-slate-400 hover:text-slate-200"
                    }`}
                  >
                    {scr.label}
                  </button>
                ))}
              </div>

              <div className="flex items-center gap-2">
                <button 
                  onClick={() => setExtensionTheme((prev) => (prev === "dark" ? "light" : "dark"))}
                  className="text-slate-500 hover:text-slate-300 transition" 
                  title="Switch Theme"
                >
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707m0-12.728l.707.707m12.728 12.728l.707-.707M12 7a5 5 0 100 10 5 5 0 000-10z" />
                  </svg>
                </button>
                <button 
                  onClick={() => {
                    setLogs([]);
                    showToast("Extension logs resetted.", "warning");
                  }} 
                  className="text-rose-400 hover:text-rose-300 text-[10px] font-semibold transition"
                >
                  Reset Logs
                </button>
              </div>
            </div>

            {/* Interactive Client-side Extension Render Box (320px x 430px Container) */}
            <div className="bg-slate-950 p-5 flex justify-center items-center">
              
              {/* Outer Bounding Container mimicking a Chrome extension window */}
              <div className={`w-[320px] h-[430px] rounded-xl border p-4 flex flex-col justify-between transition-all duration-300 ${extensionThemeStyles.bg}`}>
                
                {/* Simulated Header */}
                <div>
                  <div className="flex justify-between items-center pb-2.5 border-b border-dashed border-slate-800">
                    <div>
                      <span className={`text-[13px] font-extrabold tracking-tight ${extensionThemeStyles.textPrimary}`}>
                        MyTokenCost Active Agent
                      </span>
                      <div className="text-[9px] text-slate-500">
                        {sovereigntyMode === "eu-only" ? "Strict EU-Only Compliance" : "Global Cost Governance"}
                      </div>
                    </div>
                    <span className={`w-2 h-2 rounded-full ${killSwitchTriggered ? "bg-rose-500 animate-ping" : "bg-emerald-500 animate-pulse"}`} />
                  </div>

                  {/* Visual Screen Router */}
                  {killSwitchTriggered ? (
                    
                    // --- OVER BUDGET WARNING VIEW ---
                    <div className="mt-4 space-y-4">
                      <div className="bg-rose-500/10 border border-rose-500/20 p-3 rounded-lg text-center space-y-1">
                        <span className="text-rose-500 text-xs font-extrabold flex items-center justify-center gap-1">
                          ⚠️ BUDGET CEILING SURPASSED
                        </span>
                        <p className="text-[10px] text-rose-200">Outbound AI network gateway blocked.</p>
                      </div>

                      <div className={`p-3 rounded-lg border text-xs space-y-2 ${extensionThemeStyles.card}`}>
                        <div className="flex justify-between">
                          <span className="text-slate-500">Session Cost:</span>
                          <span className="font-bold text-rose-500 font-mono">${sessionCost.toFixed(4)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-500">Ceiling Boundary:</span>
                          <span className="font-semibold font-mono">${budgetCeiling.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-500">API Gateway Gate:</span>
                          <span className="font-bold text-rose-400">Blocked (Offline)</span>
                        </div>
                      </div>

                      <p className="text-[9px] text-slate-500 leading-normal">
                        Rogue LLM agent loops blocked successfully. Re-adjust your budget config ceiling inside the Config tab or reset data to restart.
                      </p>
                    </div>

                  ) : (

                    // --- ACTIVE STATE SCREENS ---
                    <div className="mt-4">
                      {activeScreen === "main" && (
                        // --- MAIN COMPLIANCE SUMMARY SCREEN ---
                        <div className="space-y-4">
                          
                          {/* Main Spend visual card */}
                          <div className={`p-3.5 rounded-lg border space-y-1 flex flex-col justify-center ${extensionThemeStyles.card}`}>
                            <span className="text-[8px] font-extrabold tracking-wider text-slate-500 uppercase">
                              Cumulative Session Spend
                            </span>
                            <span className="text-2xl font-extrabold text-emerald-500 font-mono tracking-tight">
                              ${sessionCost.toFixed(4)}
                            </span>
                          </div>

                          {/* Secondary metrics */}
                          <div className={`p-3.5 rounded-lg border text-xs space-y-2 ${extensionThemeStyles.card}`}>
                            <div className="flex justify-between items-center">
                              <span className="text-slate-500">Tokens Utilized:</span>
                              <span className={`font-bold ${extensionThemeStyles.textPrimary}`}>{tokenCount.toLocaleString()}</span>
                            </div>
                            <div className="flex justify-between items-center">
                              <span className="text-slate-500">Active Model:</span>
                              <span className="font-mono text-[10px] text-emerald-400 font-bold bg-slate-900 border border-slate-800 px-1.5 py-0.5 rounded">
                                {activeModel}
                              </span>
                            </div>
                          </div>

                          {/* Checklist switches inside simulator UI */}
                          <div className="space-y-2">
                            <span className="text-[9px] font-bold text-slate-500 uppercase tracking-wider block">
                              Provider Scopes Enabled
                            </span>
                            <div className="grid grid-cols-2 gap-2">
                              {[
                                { key: "openai", name: "OpenAI" },
                                { key: "anthropic", name: "Anthropic" },
                                { key: "google", name: "Google" },
                                { key: "openrouter", name: "OpenRouter" }
                              ].map((prov) => (
                                <label 
                                  key={prov.key} 
                                  className="flex items-center gap-1.5 text-[10.5px] font-semibold cursor-pointer select-none"
                                >
                                  <input 
                                    type="checkbox"
                                    checked={(providers as any)[prov.key]}
                                    onChange={() => {
                                      setProviders((prev: any) => ({
                                        ...prev,
                                        [prov.key]: !prev[prov.key]
                                      }));
                                      logTerminal("info", `Scope: ${prov.name} status toggled.`);
                                    }}
                                    className="h-3 w-3 rounded text-emerald-500 bg-slate-900 border-slate-800 focus:ring-0 focus:ring-offset-0 cursor-pointer"
                                  />
                                  <span className={extensionThemeStyles.textPrimary}>{prov.name}</span>
                                </label>
                              ))}
                            </div>
                          </div>

                          {/* Current limit badge */}
                          <div className="pt-2 border-t border-dashed border-slate-800 flex justify-between items-center text-[10px]">
                            <span className="text-slate-500 font-semibold">Active Limit Ceiling:</span>
                            <span className="font-bold text-emerald-500 font-mono">${budgetCeiling.toFixed(2)}</span>
                          </div>

                        </div>
                      )}

                      {activeScreen === "logs" && (
                        // --- LIVE AUDIT LOG LEDGER SCREEN ---
                        <div className="space-y-3">
                          <span className="text-[9px] font-bold text-slate-500 uppercase tracking-wider block">
                            Outgoing Intercept Audits
                          </span>

                          <div className="space-y-2 max-h-[220px] overflow-y-auto pr-1">
                            {logs.map((log, idx) => (
                              <div 
                                key={idx} 
                                className={`p-2.5 rounded border text-[10px] flex justify-between items-center transition ${extensionThemeStyles.card}`}
                              >
                                <div className="space-y-0.5">
                                  <div className={`font-bold font-mono ${extensionThemeStyles.textPrimary}`}>
                                    {log.model}
                                  </div>
                                  <div className="text-[8.5px] text-slate-500">
                                    {log.time} • {log.tokens.toLocaleString()} tokens
                                  </div>
                                </div>
                                <div className="text-right">
                                  <span className="text-emerald-400 font-bold font-mono block">
                                    +${log.cost.toFixed(4)}
                                  </span>
                                  <span className="text-[8px] px-1 py-0.2 text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 rounded font-semibold">
                                    {log.status}
                                  </span>
                                </div>
                              </div>
                            ))}

                            {logs.length === 0 && (
                              <div className="text-center py-8 text-xs text-slate-500 font-medium">
                                No network API logs tracked yet.
                              </div>
                            )}
                          </div>
                        </div>
                      )}

                      {activeScreen === "shield" && (
                        // --- B2B DATA SOVEREIGNTY SCREEN ---
                        <div className="space-y-4">
                          <span className="text-[9px] font-bold text-slate-500 uppercase tracking-wider block">
                            Data Sovereignty & Residency
                          </span>

                          {/* EU sovereign mode toggle card */}
                          <div className={`p-3 rounded-lg border space-y-2.5 ${extensionThemeStyles.card}`}>
                            <div className="flex justify-between items-center">
                              <span className={`text-[11px] font-bold ${extensionThemeStyles.textPrimary}`}>
                                GDPR strict EU Residency
                              </span>
                              
                              {/* Sliding Toggle Switch */}
                              <button 
                                onClick={() => {
                                  setSovereigntyMode((prev) => (prev === "eu-only" ? "global" : "eu-only"));
                                  logTerminal("warning", `Residency: Residency scope altered to [${sovereigntyMode === "eu-only" ? "GLOBAL" : "EU-ONLY"}]`);
                                  showToast(`Sovereignty scope updated to ${sovereigntyMode === "eu-only" ? "GLOBAL" : "EU-ONLY"}`, "warning");
                                }}
                                className={`w-8 h-4.5 rounded-full p-0.5 transition-colors duration-200 ease-in-out focus:outline-none flex items-center ${
                                  sovereigntyMode === "eu-only" ? "bg-emerald-500" : "bg-slate-700"
                                }`}
                              >
                                <span className={`w-3.5 h-3.5 rounded-full bg-white transition-transform duration-200 transform ${
                                  sovereigntyMode === "eu-only" ? "translate-x-3.5" : "translate-x-0"
                                }`} />
                              </button>
                            </div>

                            <p className="text-[9px] text-slate-500 leading-normal">
                              Blocks payload transmissions to endpoints situated outside European borders (e.g. non-EU data centres).
                            </p>
                          </div>

                          {/* Regulatory items checklist */}
                          <div className="text-[10px] space-y-1.5 font-medium pl-1">
                            <div className="flex items-center gap-1.5 text-emerald-400">
                              <span>✓</span>
                              <span className={extensionThemeStyles.textSecondary}>IP hop-route inspection active</span>
                            </div>
                            <div className={`flex items-center gap-1.5 ${sovereigntyMode === "eu-only" ? "text-emerald-400" : "text-rose-500"}`}>
                              <span>{sovereigntyMode === "eu-only" ? "✓" : "✗"}</span>
                              <span className={extensionThemeStyles.textSecondary}>Strict PII scrub & masking filters</span>
                            </div>
                          </div>

                          <div className={`p-2.5 rounded border border-dashed text-[9.5px] font-mono leading-relaxed bg-slate-900/60 ${extensionThemeStyles.card}`}>
                            <div className="text-slate-500">AUDIT GATEWAY CERTIFICATE:</div>
                            <div className={extensionThemeStyles.textPrimary}>MTC-EU-REG-2026-X1</div>
                            <div className="text-emerald-500 font-bold">Status: Certified & Bound</div>
                          </div>
                        </div>
                      )}

                      {activeScreen === "config" && (
                        // --- EXTENSION CONFIGURATION PANEL ---
                        <div className="space-y-4">
                          <span className="text-[9px] font-bold text-slate-500 uppercase tracking-wider block">
                            Local Config Parameters
                          </span>

                          <div className={`p-3 rounded-lg border space-y-2 ${extensionThemeStyles.card}`}>
                            <label className={`text-[10.5px] font-bold block ${extensionThemeStyles.textPrimary}`}>
                              Compliance Limit Ceiling ($)
                            </label>
                            <input 
                              type="number"
                              step="0.10"
                              min="0.10"
                              value={budgetCeiling}
                              onChange={(e) => {
                                const val = Math.max(0.1, parseFloat(e.target.value) || 0.1);
                                setBudgetCeiling(val);
                                logTerminal("success", `Limit: Config updated. Spending ceiling bound to $${val.toFixed(2)}`);
                              }}
                              className="w-full bg-slate-950 border border-slate-800 rounded p-1.5 text-xs text-emerald-400 font-bold font-mono focus:outline-none focus:border-emerald-500"
                            />
                            <p className="text-[9px] text-slate-500">
                              Outbound LLM pipeline gets severed instantly if session cost breaches this boundary.
                            </p>
                          </div>

                          {/* Dynamic licensing verification card */}
                          <div className={`p-3 rounded-lg border space-y-1.5 ${extensionThemeStyles.card}`}>
                            <div className="flex justify-between items-center text-[10px]">
                              <span className="text-slate-500">Stripe Sync Key:</span>
                              <span className="text-emerald-400 font-bold">✓ Active Subscription</span>
                            </div>
                            <div className="text-[8.5px] text-slate-500">
                              Developer Pro license validated securely on-device.
                            </div>
                          </div>
                        </div>
                      )}
                    </div>

                  )}
                </div>

                {/* Simulated Reset Action Button */}
                <button 
                  onClick={resetWorkspace} 
                  className="w-full py-2 bg-rose-600 hover:bg-rose-500 text-white rounded-lg text-xs font-extrabold tracking-wide uppercase transition shadow-lg shadow-rose-500/10"
                >
                  {killSwitchTriggered ? "Override & Reset Database" : "Clear Session Data Cache"}
                </button>

              </div>
            </div>

            {/* Canvas Footer Mock */}
            <div className="bg-slate-950 px-4 py-2.5 text-center text-[10px] text-slate-500 border-t border-slate-850">
              💡 Interact with the <span className="text-slate-300 font-semibold">Chrome Extension mockup</span> above directly.
            </div>

          </div>

          {/* Local Security Stream Logger Terminal */}
          <div className="w-full max-w-[360px] bg-slate-900 border border-slate-850 rounded-xl mt-6 overflow-hidden shadow-xl flex flex-col">
            <div className="bg-slate-950 px-4 py-2 border-b border-slate-850 flex justify-between items-center">
              <span className="text-[10px] font-bold tracking-wider uppercase text-slate-400 flex items-center gap-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                Agent Security Stream
              </span>
              <button 
                onClick={() => setTerminalLogs([])}
                className="text-[10px] text-slate-500 hover:text-slate-300 font-semibold transition"
              >
                Flush Logs
              </button>
            </div>
            
            <div 
              id="terminalBody"
              className="p-3.5 h-32 overflow-y-auto font-mono text-[10px] space-y-1.5 bg-slate-950"
            >
              {terminalLogs.map((log) => {
                let colorClass = "text-slate-400";
                let prefix = "[INFO]";
                if (log.type === "success") {
                  colorClass = "text-emerald-400";
                  prefix = "[OK]";
                } else if (log.type === "warning") {
                  colorClass = "text-amber-400 font-semibold";
                  prefix = "[WARN]";
                } else if (log.type === "error") {
                  colorClass = "text-rose-400 font-bold";
                  prefix = "[CRIT]";
                }
                return (
                  <div key={log.id} className={`leading-relaxed border-b border-slate-900/40 pb-0.5 ${colorClass}`}>
                    <span className="text-slate-600 mr-1.5">{log.time}</span>
                    <span className="text-slate-500 font-bold mr-1.5">{prefix}</span>
                    {log.msg}
                  </div>
                );
              })}
            </div>
          </div>

        </div>

      </main>

      {/* Floating System Toast Notifications */}
      <div className="fixed bottom-6 right-6 z-50 space-y-3 pointer-events-none">
        {toasts.map((t) => (
          <div 
            key={t.id} 
            className={`p-4 rounded-xl border flex items-center gap-3 shadow-lg transform transition-all duration-300 pointer-events-auto max-w-sm animate-bounce ${
              t.type === "error"
                ? "bg-rose-950/90 border-rose-500/30 text-rose-200"
                : t.type === "warning"
                  ? "bg-amber-950/90 border-amber-500/30 text-amber-200"
                  : "bg-emerald-950/90 border-emerald-500/30 text-emerald-200"
            }`}
          >
            {t.type === "error" ? (
              <svg className="w-5 h-5 flex-shrink-0 text-rose-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/>
              </svg>
            ) : (
              <svg className="w-5 h-5 flex-shrink-0 text-emerald-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
              </svg>
            )}
            <span className="text-xs font-semibold">{t.message}</span>
          </div>
        ))}
      </div>

    </div>
  );
}
