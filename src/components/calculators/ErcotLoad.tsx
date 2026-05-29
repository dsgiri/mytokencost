"use client";

import React, { useState } from "react";
import { 
  HelpCircle, 
  ChevronDown, 
  ChevronUp, 
  Zap, 
  AlertTriangle 
} from "lucide-react";

interface ErcotLoadProps {
  initialData?: {
    title?: string;
    regulatoryBody?: string;
    penaltyRisk?: string;
    steps?: any[];
  };
}

export default function ErcotLoad({ initialData }: ErcotLoadProps) {
  const [gpuType, setGpuType] = useState<"H100" | "H200" | "B200">("H200");
  const [gpuCount, setGpuCount] = useState(2048);
  const [pue, setPue] = useState(1.15);
  const [isMethodologyOpen, setIsMethodologyOpen] = useState(false);

  const fallbackBody = "ERCOT";
  const fallbackPenalty = "Mandatory Large Flexible Load Tracking (Registration rules apply to sites ≥ 10 MW)";

  const getErcotMath = () => {
    const gpuWattsMap = {
      H100: 700,
      H200: 850,
      B200: 1000
    };
    const gpuWatt = gpuWattsMap[gpuType];
    const totalGpuPower = gpuCount * gpuWatt;
    const totalItPower = totalGpuPower * 1.12;
    const totalFacilityPower = totalItPower * pue;

    const powerMw = totalFacilityPower / 1000000;
    const isExceeded = powerMw >= 10.0;

    return {
      totalMw: powerMw.toFixed(2),
      isExceeded,
      gpusMw: (totalGpuPower / 1000000).toFixed(2),
      pueOverheadMw: ((totalFacilityPower - totalItPower) / 1000000).toFixed(2)
    };
  };

  const results = getErcotMath();

  const activePenalty = initialData?.penaltyRisk || fallbackPenalty;

  return (
    <div className="space-y-6 text-left">
      
      {/* Regulatory Alert Banner */}
      <div className="bg-slate-950 border border-slate-900 p-5 rounded-2xl font-mono text-xs text-left space-y-2">
        <span className="text-[9px] text-slate-500 uppercase tracking-wider block font-bold">Penalty Risk & Liability Guideline</span>
        <div className="text-[11px] text-slate-350 leading-relaxed font-semibold flex items-start gap-1.5 text-amber-400">
          <AlertTriangle className="w-4 h-4 text-amber-500 flex-shrink-0 mt-0.5" />
          <span>{activePenalty}</span>
        </div>
      </div>

      {/* Form Inputs */}
      <div className="bg-slate-950/60 border border-slate-900 p-6 rounded-2xl space-y-6 font-mono text-xs text-left">
        
        {/* GPU selection */}
        <div className="space-y-2">
          <label className="text-slate-450 text-[10px] uppercase font-bold tracking-wider block">1. Select AI GPU Model</label>
          <div className="grid grid-cols-3 gap-2">
            {(["H100", "H200", "B200"] as const).map((gpu) => (
              <button
                key={gpu}
                onClick={() => setGpuType(gpu)}
                className={`py-2 rounded-xl border transition uppercase font-bold ${
                  gpuType === gpu
                    ? "bg-slate-900 border-emerald-500/50 text-emerald-400"
                    : "border-slate-855 text-slate-500 hover:text-slate-355"
                }`}
              >
                {gpu} ({gpu === "H100" ? "700W" : (gpu === "H200" ? "850W" : "1kW")})
              </button>
            ))}
          </div>
        </div>

        {/* GPU Count */}
        <div className="space-y-2.5">
          <div className="flex justify-between text-[10px] uppercase font-bold tracking-wider">
            <span className="text-slate-450">2. GPU Cluster Size</span>
            <span className="text-emerald-400 font-bold">{gpuCount} GPUs</span>
          </div>
          <input 
            type="range"
            min="256"
            max="16384"
            step="256"
            value={gpuCount}
            onChange={(e) => setGpuCount(Number(e.target.value))}
            className="w-full accent-emerald-500 bg-slate-900 h-1 rounded"
          />
        </div>

        {/* PUE */}
        <div className="space-y-2.5">
          <div className="flex justify-between text-[10px] uppercase font-bold tracking-wider">
            <span className="text-slate-450">3. Facility PUE Overhead</span>
            <span className="text-emerald-400 font-bold">{pue.toFixed(2)} PUE</span>
          </div>
          <input 
            type="range"
            min="1.05"
            max="1.50"
            step="0.01"
            value={pue}
            onChange={(e) => setPue(Number(e.target.value))}
            className="w-full accent-emerald-500 bg-slate-900 h-1 rounded"
          />
        </div>

      </div>

      {/* Outputs Panel */}
      <div className="bg-slate-950 border border-slate-900 p-6 rounded-2xl space-y-4 font-mono text-left">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-slate-900 pb-4">
          <div>
            <span className="text-[9px] text-slate-500 uppercase tracking-widest block font-bold">Total Projected Facility Load</span>
            <span className="text-2xl font-black text-white mt-1 block font-space-grotesk">{results.totalMw} MW</span>
          </div>
          
          <span className="px-3 py-1.5 rounded-xl text-xs font-bold border uppercase tracking-wider bg-slate-900 border-slate-800 text-emerald-400">
            {results.isExceeded ? "🔴 Large Flexible Load Active" : "🟢 Under 10 MW Limit"}
          </span>
        </div>

        <div className="space-y-2">
          <h4 className="text-[10px] font-bold uppercase text-slate-500 tracking-wider">Compliance Analysis Summary:</h4>
          <p className="text-[11px] text-slate-400 leading-relaxed font-mono">
            {results.isExceeded 
              ? `⚠️ ERCOT REGISTRY ACTIVE: Your cluster requires ${results.totalMw} MW. Crossing the 10 MW ERCOT threshold triggers mandatory Flexible Load registration, requiring automatic telemetry reporting, grid curtailment response schedules, and specialized metering systems.`
              : `✓ COMPLIANT: Cluster load estimated at ${results.totalMw} MW. You remain below the 10 MW compliance threshold. No mandatory ERCOT scheduling registries are triggered at this size.`}
          </p>
        </div>

        {results.isExceeded && (
          <div className="bg-slate-900 p-4 rounded-xl border border-slate-800 flex flex-col sm:flex-row justify-between items-center gap-4 mt-2">
            <div className="space-y-0.5 text-left">
              <span className="text-[10px] font-bold text-white">Need Texas Interconnection Assistance?</span>
              <p className="text-[9px] text-slate-500 font-mono">Connect with local utility consultants to register cluster schedules.</p>
            </div>
            <button
              onClick={() => alert("Simulating scheduling for a 15-minute B2B ERCOT compliance consultation call.")}
              className="bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold font-mono text-xs px-4 py-2.5 rounded-lg transition"
            >
              Schedule Free Interconnection Call
            </button>
          </div>
        )}

      </div>

      {/* Accordion */}
      <div className="bg-slate-950 border border-slate-900 rounded-xl overflow-hidden font-mono select-none">
        <button
          onClick={() => setIsMethodologyOpen(!isMethodologyOpen)}
          className="w-full px-6 py-4 flex justify-between items-center text-xs text-slate-400 hover:text-emerald-400 transition"
        >
          <span className="flex items-center gap-2 font-bold">
            <HelpCircle className="w-4 h-4 text-emerald-500" />
            Methodology & Statutory Equations
          </span>
          {isMethodologyOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </button>

        {isMethodologyOpen && (
          <div className="px-6 pb-6 pt-2 text-[10.5px] text-slate-400 space-y-4 border-t border-slate-900/60 leading-relaxed select-text">
            <div className="space-y-2">
              <h4 className="text-white font-bold text-xs uppercase">ERCOT Peak load calculations</h4>
              <p>
                To convert active GPU clusters into peak electricity loads, the formula integrates PUE overhead and auxiliary load factors:
              </p>
              <pre className="bg-slate-900 p-3 rounded border border-slate-805 text-[10px] text-emerald-400 leading-relaxed">
                Peak MW = (Count * Model Wattage * Auxiliary switches + cooling) * PUE / 1,000,000
              </pre>
              <p>
                Auxiliary switch overhead is calculated at 1.12x. Non-compliance details are synced from the core compliance registry schemas in Sanity.
              </p>
            </div>
          </div>
        )}
      </div>

    </div>
  );
}
