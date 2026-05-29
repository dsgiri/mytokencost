"use client";

import React, { useState } from "react";
import { 
  HelpCircle, 
  ChevronDown, 
  ChevronUp, 
  Droplet, 
  Zap 
} from "lucide-react";

export default function CarbonAnalogy() {
  const [prompts, setPrompts] = useState(25);
  const [gridZone, setGridZone] = useState<"coal" | "renewable">("coal");
  const [isMethodologyOpen, setIsMethodologyOpen] = useState(false);

  const calcCarbonWater = () => {
    const dailyWords = prompts * 300;
    const annualQueries = prompts * 365.25;

    const queryKwh = 0.003;
    const carbonCoeff = gridZone === "coal" ? 0.38 : 0.038;
    const waterLitersPerQuery = 0.5;

    const annualKwh = annualQueries * queryKwh;
    const annualCarbon = annualKwh * carbonCoeff;
    const annualWaterLiters = annualQueries * waterLitersPerQuery;

    const iphoneCharges = (annualKwh / 0.012);
    const plasticBottles = (annualWaterLiters / 0.5);

    return {
      kwh: annualKwh.toFixed(1),
      co2: annualCarbon.toFixed(1),
      water: annualWaterLiters.toFixed(1),
      iphone: Math.floor(iphoneCharges).toLocaleString(),
      bottles: Math.floor(plasticBottles).toLocaleString()
    };
  };

  const metrics = calcCarbonWater();

  return (
    <div className="space-y-6 text-left">
      
      {/* Sliders / Inputs */}
      <div className="bg-slate-950/60 border border-slate-900 p-6 rounded-2xl space-y-5 font-mono text-xs text-left">
        
        {/* Prompts Slider */}
        <div className="space-y-2">
          <div className="flex justify-between text-[10px] uppercase font-bold tracking-wider">
            <span className="text-slate-450">Estimated Prompts Submitted per Day</span>
            <span className="text-emerald-400 font-bold">{prompts} prompts</span>
          </div>
          <input 
            type="range"
            min="5"
            max="200"
            step="5"
            value={prompts}
            onChange={(e) => setPrompts(Number(e.target.value))}
            className="w-full accent-emerald-500 bg-slate-900 h-1 rounded"
          />
        </div>

        {/* Grid Toggle buttons */}
        <div className="space-y-2">
          <label className="text-slate-455 text-[10px] uppercase font-bold tracking-wider block">AI Server Grid Zone Carbon Intensity</label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[10.5px]">
            <button
              onClick={() => setGridZone("coal")}
              className={`py-2 rounded-xl border transition uppercase font-bold ${
                gridZone === "coal"
                  ? "bg-slate-900 border-amber-500/50 text-amber-400"
                  : "border-slate-850 text-slate-500 hover:text-slate-350"
              }`}
            >
              Coal-Heavy Grid (US Midwest)
            </button>
            <button
              onClick={() => setGridZone("renewable")}
              className={`py-2 rounded-xl border transition uppercase font-bold ${
                gridZone === "renewable"
                  ? "bg-slate-900 border-emerald-500/50 text-emerald-400"
                  : "border-slate-850 text-slate-550 hover:text-slate-350"
              }`}
            >
              Iceland Geothermal Grid (-90% Carbon)
            </button>
          </div>
        </div>

      </div>

      {/* Environmental Equivalents cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-left font-mono">
        
        {/* Water card */}
        <div className="bg-slate-950 border border-slate-900 p-5 rounded-2xl space-y-3">
          <div className="flex items-center gap-1.5">
            <div className="bg-cyan-500/10 p-2.5 rounded-xl border border-cyan-500/20">
              <Droplet className="w-4 h-4 text-cyan-400" />
            </div>
            <div>
              <span className="text-[8px] text-slate-500 uppercase tracking-widest block font-bold">Annual Water Footprint</span>
              <span className="text-lg font-bold text-white block">{metrics.water} Liters</span>
            </div>
          </div>
          
          <div className="border-t border-slate-900/80 pt-3">
            <p className="text-[10px] text-slate-400 leading-relaxed">
              💧 Equivalent to cooling data center servers with approximately <strong>{metrics.bottles}</strong> standard 500ml plastic water bottles annually.
            </p>
          </div>
        </div>

        {/* Carbon card */}
        <div className="bg-slate-950 border border-slate-900 p-5 rounded-2xl space-y-3">
          <div className="flex items-center gap-1.5">
            <div className="bg-emerald-500/10 p-2.5 rounded-xl border border-emerald-500/20">
              <Zap className="w-4 h-4 text-emerald-400" />
            </div>
            <div>
              <span className="text-[8px] text-slate-500 uppercase tracking-widest block font-bold">Annual Carbon Footprint</span>
              <span className="text-lg font-bold text-white block">{metrics.co2} kg CO2e</span>
            </div>
          </div>
          
          <div className="border-t border-slate-900/80 pt-3">
            <p className="text-[10px] text-slate-400 leading-relaxed">
              ⚡ Equal to driving a petrol car several miles or charging an iPhone continuously for <strong>{metrics.iphone}</strong> days (generating {metrics.kwh} kWh of active power).
            </p>
          </div>
        </div>

      </div>

      {/* Methodology Accordion */}
      <div className="bg-slate-950 border border-slate-900 rounded-xl overflow-hidden font-mono select-none">
        <button
          onClick={() => setIsMethodologyOpen(!isMethodologyOpen)}
          className="w-full px-6 py-4 flex justify-between items-center text-xs text-slate-400 hover:text-emerald-400 transition"
        >
          <span className="flex items-center gap-2 font-bold">
            <HelpCircle className="w-4 h-4 text-emerald-500" />
            Methodology & Grid Intensity Indexes
          </span>
          {isMethodologyOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </button>

        {isMethodologyOpen && (
          <div className="px-6 pb-6 pt-2 text-[10.5px] text-slate-400 space-y-4 border-t border-slate-900/60 leading-relaxed select-text">
            <div className="space-y-2">
              <h4 className="text-white font-bold text-xs uppercase">Environmental Carbon & Water Coefficients</h4>
              <p>
                Calculations convert prompt cycles into electrical load using verified environmental index values:
              </p>
              <ul className="list-disc pl-4 space-y-1 text-slate-500">
                <li>Average energy load: 0.003 kWh per prompt (covers server CPU cycle and switch infrastructure draw).</li>
                <li>US Midwest coal-heavy grid emissions index: 0.38 kg CO2e per kWh generated.</li>
                <li>Iceland clean renewable geothermal/hydro index: 0.038 kg CO2e per kWh generated (-90% drop).</li>
                <li>Evaporative water footprint: 0.5 Liters per query (standard thermoelectric tower cooling losses).</li>
              </ul>
            </div>
          </div>
        )}
      </div>

    </div>
  );
}
