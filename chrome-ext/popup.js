  btnReset.addEventListener("click", () => {
    if (confirm("Are you sure you want to reset all session statistics and tracked token costs?")) {
      chrome.storage.local.set({
        sessionCost: 0.0,
        tokenCount: 0,
        activeModel: "None",
        historyLog: [] // Crucial: Wipes historical log database array
      }, () => {
        loadState();
      });
    }
  });
