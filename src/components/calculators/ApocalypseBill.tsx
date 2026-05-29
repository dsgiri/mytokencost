"use client";

import React, { useState, useEffect, useRef } from "react";
import { 
  HelpCircle, 
  ChevronDown, 
  ChevronUp, 
  Terminal, 
  ShieldAlert, 
  Zap 
} from "lucide-react";

export default function ApocalypseBill() {
  const [isRunning, setIsRunning] = useState(false);
  const [creditLimit, setCreditLimit] = useState(250);
  const [simulatedCost, setSimulatedCost] = useState(0);
  const [simulatedTokens, setSimulatedTokens] = useState(0);
  const [consoleLogs, setConsoleLogs] = useState<string[]>([]);
  const [isAlarmActive, setIsAlarmActive] = useState(false);
  const [isMethodologyOpen, setIsMethodologyOpen] = useState(false);
  const consoleBottomRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isRunning) {
      timer = setInterval(() => {
        setSimulatedTokens(prev => prev + Math.floor(Math.random() * 140000) + 50000);
        
        setSimulatedCost(prev => {
          const added = Math.random() * 9 + 3;
          const total = prev + added;
          if (total >= creditLimit) {
            // Defer execution outside React updater loop to prevent loop locks!
            setTimeout(() => {
              setIsRunning(false);
              setIsAlarmActive(true);
              setConsoleLogs(l => [...l, 
                `[SYSTEM WARNING] API LIMIT THRESHOLD EXCEEDED`,
                `[FATAL] BILL EXCEEDED $${creditLimit.toFixed(2)} - KEY SUSPENDED`,
                `[SHUTDOWN] RECURSIVE AGENT LOOP TERMINATED PREVENTATIVELY.`
              ]);
            }, 0);
            return creditLimit;
          }
          return total;
        });

        const logOptions = [
          `[AGENT] Processing agent thought: "Analyze code module task_id_${Math.floor(Math.random() * 5000)}"`,
          `[LLM] Response parsed (200 OK) - tokens: ${Math.floor(Math.random() * 3000) + 500}`,
          `[PARSER] Warning: Python script raised traceback error. Retrying...`,
          `[AGENT] Spawning sub-agent recursive process worker_node_${Math.floor(Math.random() * 100)}`,
          `[BILLING] Cost bleed active: +$${(Math.random() * 3).toFixed(2)}`
        ];
        const randomLog = logOptions[Math.floor(Math.random() * logOptions.length)];
        setConsoleLogs(l => [...l, randomLog]);
      }, 300);
    }
    return () => clearInterval(timer);
  }, [isRunning, creditLimit]);

  useEffect(() => {
    if (consoleBottomRef.current) {
      consoleBottomRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [consoleLogs]);

  const handleStartSimulation = () => {
    setSimulatedCost(0);
    setSimulatedTokens(0);
    setIsAlarmActive(false);
    setIsRunning(true);
    setConsoleLogs([
      `[INIT] Booting dynamic autonomous software developer agent...`,
      `[TASK] Objective: "Refactor core styling schemas recursively."`,
      `[WARN] Stack overflow threat: Recursive loop has no structural base case exit.`,
      `[EXEC] Thread activated. Model: claude-3-5-sonnet. Cost: $3.00 in / $15.00 out.`
    ]);
  };

  return (
    <div className="space-y-6 text-left">
      
      {/* Credit controls */}
      <div className="bg-slate-950/60 border border-slate-900 p-6 rounded-2xl space-y-5 font-mono text-xs text-left">
        
        <div className="space-y-2">
          <div className="flex justify-between text-[10px] uppercase font-bold tracking-wider">
            <span className="text-slate-450">Enforce Simulated Credit Ceiling</span>
            <span className="text-emerald-400 font-bold">${creditLimit} limit</span>
          </div>
          <input 
            type="range"
            min="50"
            max="2000"
            step="50"
            disabled={isRunning}
            value={creditLimit}
            onChange={(e) => setCreditLimit(Number(e.target.value))}
            className="w-full accent-emerald-500 bg-slate-900 h-1 rounded disabled:opacity-50"
          />
        </div>

        <div className="flex justify-center pt-2">
          <button
            onClick={handleStartSimulation}
            disabled={isRunning}
            className="bg-emerald-600 hover:bg-emerald-500 text-slate-950 font-black px-6 py-3 rounded-xl text-xs transition hover:scale-[1.01] active:scale-[0.99] disabled:opacity-50 flex items-center gap-2"
          >
            <Terminal className="w-4 h-4" />
            Launch Simulation Loop
          </button>
        </div>

      </div>

      {/* Terminal panel */}
      <div className={`bg-slate-950 border rounded-2xl overflow-hidden font-mono flex flex-col ${
        isAlarmActive ? "border-red-500 animate-pulse" : "border-slate-800"
      }`}>
        
        <div className="bg-slate-900 px-4 py-3 border-b border-slate-800 flex justify-between items-center text-[10px] text-slate-500 text-left select-none">
          <span>CONSOLE: bash // recursive_agent_run.sh</span>
          <span className={isAlarmActive ? "text-red-500 font-bold" : "text-emerald-500 font-bold animate-pulse"}>
            {isRunning ? "● SIMULATION ACTIVE" : (isAlarmActive ? "▲ LIMIT EXCEEDED" : "○ SHUTDOWN")}
          </span>
        </div>

        {/* Logs */}
        <div className="h-44 p-4 overflow-y-auto text-[10px] text-slate-450 space-y-1.5 text-left bg-slate-950 font-mono">
          {consoleLogs.length === 0 ? (
            <span className="text-slate-600 block">Configure credit balance and launch simulation to start console thread.</span>
          ) : (
            consoleLogs.map((log, idx) => (
              <div 
                key={idx}
                className={
                  log.includes("[SYSTEM WARNING]") || log.includes("[FATAL]") 
                    ? "text-red-400 font-bold" 
                    : (log.includes("[INIT]") || log.includes("[PLAN]") ? "text-emerald-400" : "text-slate-450")
                }
              >
                {log}
              </div>
            ))
          )}
          <div ref={consoleBottomRef} />
        </div>

        {/* Cost stats */}
        <div className="bg-slate-900/60 p-5 border-t border-slate-850 grid grid-cols-2 gap-4 text-center">
          <div>
            <span className="text-[8.5px] text-slate-500 uppercase tracking-widest block font-bold">Virtual Tokens Generated</span>
            <span className="text-xl font-bold text-white mt-1 block">{simulatedTokens.toLocaleString()}</span>
          </div>
          <div>
            <span className="text-[8.5px] text-slate-500 uppercase tracking-widest block font-bold">Virtual API Cost Bleeding</span>
            <span className={`text-xl font-black mt-1 block ${
              isAlarmActive ? "text-red-500" : "text-emerald-400 animate-pulse"
            }`}>
              ${simulatedCost.toFixed(2)}
            </span>
          </div>
        </div>

      </div>

      {/* Warning alert */}
      {isAlarmActive && (
        <div className="bg-red-950/20 border border-red-500/20 p-5 rounded-2xl text-left space-y-2 animate-bounce">
          <div className="text-xs text-red-450 font-bold flex items-center gap-1.5 font-mono">
            <ShieldAlert className="w-5 h-5 text-red-500" />
            CRITICAL CEILING: Autonomous Loop Aborted
          </div>
          <p className="text-[10px] font-mono text-slate-450 leading-relaxed">
            An infinite debugger loop can repeat requests endlessly. If this runs in production, it will exhaust your real-world credit limits. Swap on the **MyTokenCost Extension** to enforce custom dynamic budget controls at the browser level and automatically abort loops before they cost you!
          </p>
        </div>
      )}

      {/* Methodology Accordion */}
      <div className="bg-slate-950 border border-slate-900 rounded-xl overflow-hidden font-mono select-none">
        <button
          onClick={() => setIsMethodologyOpen(!isMethodologyOpen)}
          className="w-full px-6 py-4 flex justify-between items-center text-xs text-slate-400 hover:text-emerald-400 transition"
        >
          <span className="flex items-center gap-2 font-bold">
            <HelpCircle className="w-4 h-4 text-emerald-500" />
            Methodology & Declarative Security Blockings
          </span>
          {isMethodologyOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </button>

        {isMethodologyOpen && (
          <div className="px-6 pb-6 pt-2 text-[10.5px] text-slate-400 space-y-4 border-t border-slate-900/60 leading-relaxed select-text">
            <div className="space-y-2">
              <h4 className="text-white font-bold text-xs uppercase">Recursive Loop Cost Hazards</h4>
              <p>
                SaaS autonomous agents operate by loops: executing prompts, parsing results, identifying code tracebacks, and requesting corrective queries. If a regex parsing step fails continuously without a base-case exit check, it triggers high-frequency, cascading calls that exhaust keys.
              </p>
              <p>
                <strong>Declarative Blocking</strong>: Enforces security constraints at the local browser storage level using standard Chrome extension dynamic DNR schemas, safeguarding API balances from recursive exhaustion.
              </p>
            </div>
          </div>
        )}
      </div>

    </div>
  );
}
