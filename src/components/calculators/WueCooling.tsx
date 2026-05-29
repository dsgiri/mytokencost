"use client";

import React, { useState } from "react";
import { 
  HelpCircle, 
  ChevronDown, 
  ChevronUp, 
  Droplet, 
  AlertTriangle 
} from "lucide-react";

interface WueCoolingProps {
  initialData?: {
    title?: string;
    regulatoryBody?: string;
    penaltyRisk?: string;
    steps?: any[];
  };
}

export default function WueCooling({ initialData }: WueCoolingProps) {
  const [basin, setBasin] = useState("Trinity River Basin");
  const [wueRating, setWueRating] = useState(1.5);
  const [heatLoadMwh, setHeatLoadMwh] = useState(50000);
  const [isMethodologyOpen, setIsMethodologyOpen] = useState(false);

  const fallbackBody = "TCEQ / regional Water Districts";
  const fallbackPenalty = "Water Use Permit Restrictions & Depletion Audits (Compliance reporting applies to High Risk basins)";

  const getWueMath = () => {
    // Annual water in liters = annual MWh heat load * 1000 (to kWh) * WUE value (L/kWh)
    const annualKwhHeat = heatLoadMwh * 1000;
    const annualWaterLiters = annualKwhHeat * wueRating;
    const annualWaterGallons = annualWaterLiters * 0.264172;
    const millionGallons = annualWaterGallons / 1000000;

    // Basins threshold mapping risk
    let riskLevel: "LOW" | "MEDIUM" | "HIGH" = "LOW";
    if (basin.includes("Trinity")) {
      riskLevel = millionGallons > 15 ? "HIGH" : (millionGallons > 5 ? "MEDIUM" : "LOW");
    } else if (basin.includes("Brazos")) {
      riskLevel = millionGallons > 20 ? "HIGH" : (millionGallons > 8 ? "MEDIUM" : "LOW");
    } else {
      riskLevel = millionGallons > 30 ? "HIGH" : (millionGallons > 12 ? "MEDIUM" : "LOW");
    }

    return {
      gallons: millionGallons.toFixed(2),
      riskLevel,
      dailyGallons: (annualWaterGallons / 365).toFixed(0)
    };
  };

  const results = getWueMath();
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
        
        {/* Texas Water Basin selection */}
        <div className="space-y-2">
          <label className="text-slate-450 text-[10px] uppercase font-bold tracking-wider block">1. Select Texas Water Basin</label>
          <select
            value={basin}
            onChange={(e) => setBasin(e.target.value)}
            className="bg-slate-900 border border-slate-800 focus:border-emerald-500/40 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none w-full font-mono"
          >
            <option value="Trinity River Basin">Trinity River Basin (High baseline depletion risk)</option>
            <option value="Brazos River Basin">Brazos River Basin (Medium-High baseline risk)</option>
            <option value="Colorado River Basin (Texas)">Colorado River Basin - Texas (Medium risk)</option>
          </select>
        </div>

        {/* Water Use Effectiveness (WUE) */}
        <div className="space-y-2.5">
          <div className="flex justify-between text-[10px] uppercase font-bold tracking-wider">
            <span className="text-slate-455">2. Water Use Effectiveness (WUE)</span>
            <span className="text-emerald-400 font-bold">{wueRating.toFixed(1)} L/kWh</span>
          </div>
          <input 
            type="range"
            min="0.2"
            max="3.0"
            step="0.1"
            value={wueRating}
            onChange={(e) => setWueRating(Number(e.target.value))}
            className="w-full accent-emerald-500 bg-slate-900 h-1 rounded"
          />
        </div>

        {/* Annual Data Center Heat Load */}
        <div className="space-y-2.5">
          <div className="flex justify-between text-[10px] uppercase font-bold tracking-wider">
            <span className="text-slate-455">3. Annual Data Center Heat Load</span>
            <span className="text-emerald-400 font-bold">{heatLoadMwh.toLocaleString()} MWh</span>
          </div>
          <input 
            type="range"
            min="10000"
            max="100000"
            step="5000"
            value={heatLoadMwh}
            onChange={(e) => setHeatLoadMwh(Number(e.target.value))}
            className="w-full accent-emerald-500 bg-slate-900 h-1 rounded"
          />
        </div>

      </div>

      {/* Outputs Panel */}
      <div className="bg-slate-950 border border-slate-900 p-6 rounded-2xl space-y-4 font-mono text-left">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 border-b border-slate-900 pb-4">
          
          <div>
            <span className="text-[9px] text-slate-500 uppercase tracking-widest block font-bold">Annual Water Consumption</span>
            <span className="text-xl font-bold text-white mt-1 block font-space-grotesk">{results.gallons} MG</span>
            <span className="text-[8px] text-slate-500 font-bold">Millions of Gallons</span>
          </div>

          <div>
            <span className="text-[9px] text-slate-500 uppercase tracking-widest block font-bold">Daily Average Demand</span>
            <span className="text-xl font-bold text-emerald-400 mt-1 block font-space-grotesk">{Number(results.dailyGallons).toLocaleString()} gal</span>
            <span className="text-[8px] text-slate-500 font-bold">Gallons per Day</span>
          </div>

          <div>
            <span className="text-[9px] text-slate-500 uppercase tracking-widest block font-bold">TCEQ Basin Risk Tier</span>
            <span className={`text-xl font-bold mt-1 block font-space-grotesk ${
              results.riskLevel === "HIGH" 
                ? "text-red-500" 
                : (results.riskLevel === "MEDIUM" ? "text-amber-500" : "text-emerald-400")
            }`}>
              {results.riskLevel}
            </span>
            <span className="text-[8px] text-slate-500 font-bold">Water Depletion Risk</span>
          </div>

        </div>

        <div className="space-y-2">
          <h4 className="text-[10px] font-bold uppercase text-slate-500 tracking-wider">Compliance Analysis Summary:</h4>
          <p className="text-[11px] text-slate-400 leading-relaxed font-mono">
            {results.riskLevel === "HIGH" 
              ? `⚠️ ALERT: Your facility's projected water usage is ${results.gallons} MG annually inside the high-risk ${basin}. This exceeds baseline sustainable draw thresholds and is highly likely to trigger mandatory environmental audits, depletion mitigation proposals, or public TCEQ contested hearings.`
              : results.riskLevel === "MEDIUM"
              ? `✓ ATTENTION: Projected annual water usage of ${results.gallons} MG in the ${basin} indicates a Moderate risk level. We recommend closed-loop cooling upgrades or rainwater capture offset designs to preempt regional restriction directives.`
              : `✓ COMPLIANT: Annual usage of ${results.gallons} MG falls under baseline thresholds for low water stress regions. Regular reporting should continue to ensure local district allocations are maintained.`}
          </p>
        </div>

        {results.riskLevel === "HIGH" && (
          <div className="bg-slate-900 p-4 rounded-xl border border-slate-805 flex flex-col sm:flex-row justify-between items-center gap-4 mt-2">
            <div className="space-y-0.5 text-left">
              <span className="text-[10px] font-bold text-white">Need Texas Water Permitting Assistance?</span>
              <p className="text-[9px] text-slate-500 font-mono">Connect with local hydrological engineers to model TCEQ mitigation schedules.</p>
            </div>
            <button
              onClick={() => alert("Simulating scheduling for a 15-minute B2B water risk mitigation consultation call.")}
              className="bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold font-mono text-xs px-4 py-2.5 rounded-lg transition"
            >
              Schedule Water Risk Audit
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
              <h4 className="text-white font-bold text-xs uppercase">WUE Cooling Depletion Analysis</h4>
              <p>
                Water Use Effectiveness (WUE) evaluates direct server cooling footprints:
              </p>
              <pre className="bg-slate-900 p-3 rounded border border-slate-805 text-[10px] text-emerald-400 leading-relaxed">
                Annual Water (Liters) = Heat Load MWh * 1,000 * WUE Rating (L/kWh)
              </pre>
              <p>
                Regional depletion risk scales dynamically based on local aquifer stress. High WUE metrics signify significant environmental basin consumption.
              </p>
            </div>
          </div>
        )}
      </div>

    </div>
  );
}
