"use client";

import { useState, useEffect } from "react";
import { TelemetryCanvas } from "./TelemetryCanvas";
import { getLatestTelemetry } from "@/app/actions/telemetry";

type Industry = "datacenter" | "water" | "care";

const INDUSTRIES = {
  datacenter: {
    id: "datacenter",
    emoji: "🖥️",
    label: "Data Center details",
    limit: 10,
    limitLabel: "10 MW",
    metricUnit: "MW",
    slider1Label: "Active Server Nodes",
    slider1Desc: "The total number of high-density nodes actively drawing grid power.",
    slider2Label: "Peak Compute Hours / Day",
    slider2Desc: "Estimated duration the infrastructure runs at full workload capacity daily.",
  },
  water: {
    id: "water",
    emoji: "🚰",
    label: "Water Utility details",
    limit: 1500,
    limitLabel: "1,500 HP",
    metricUnit: "HP",
    slider1Label: "Total Pump Motor Sizing",
    slider1Desc: "Combined horsepower rating of all physical facility distribution pumps.",
    slider2Label: "Required Backup Runtime",
    slider2Desc: "Minimum continuous operations required on-site during grid emergency events.",
  },
  care: {
    id: "care",
    emoji: "🏥",
    label: "Senior Care Facility details",
    limit: 120,
    limitLabel: "120 Beds",
    metricUnit: "Beds",
    slider1Label: "Licensed Beds Capacity",
    slider1Desc: "The total registered bed occupancy limit for your regional care facility.",
    slider2Label: "Existing Generator Power",
    slider2Desc: "The rated output power of your current backup generation equipment.",
  },
};

export function ComplianceCalculator() {
  const [industry, setIndustry] = useState<Industry>("datacenter");

  // Synthetic state for sliders
  const [slider1, setSlider1] = useState<number>(5000); // Nodes / HP / Beds
  const [slider2, setSlider2] = useState<number>(12); // Hours / Hours / kW

  // Live Grid State
  const [gridData, setGridData] = useState<{ load: number, capacity: number, isSynthetic: boolean } | null>(null);

  useEffect(() => {
    async function loadGrid() {
      const data = await getLatestTelemetry("ERCOT");
      setGridData({
        load: data.current_load_mw,
        capacity: data.capacity_mw,
        isSynthetic: data.isSynthetic
      });
    }
    loadGrid();
  }, []);

  // Derived state based on industry logic
  let activeCustomLoad = 0;
  let limitVal = INDUSTRIES[industry].limit;
  let isViolating = false;

  if (industry === "datacenter") {
    // Current draw in MW
    activeCustomLoad = slider1 * 0.0012 * (slider2 / 12);
    isViolating = activeCustomLoad > limitVal;
  } else if (industry === "water") {
    activeCustomLoad = slider1;
    isViolating = activeCustomLoad > limitVal;
  } else if (industry === "care") {
    limitVal = slider1 * 1.8; // required sizing
    activeCustomLoad = slider2;
    isViolating = activeCustomLoad < limitVal;
  }

  // Dynamic Scorecard Calculation
  const penaltyLiability = isViolating ? (industry === "datacenter" ? "$1,250,000" : industry === "water" ? "$450,000" : "$850,000") : "$0";

  const [activeTab, setActiveTab] = useState("Compliance");

  // Tab Overrides
  let displayActiveLoad = activeCustomLoad;
  let displayLimit = limitVal;

  if (activeTab === "US Grid") {
    displayActiveLoad = 450000; // Synthetic US Grid Load MW
    displayLimit = 950000;      // Synthetic US Grid Capacity MW
  } else if (activeTab === "Texas (ERCOT)") {
    displayActiveLoad = gridData?.load || 62000;
    displayLimit = gridData?.capacity || 82000;
  }

  const isSimulatedMacro = activeTab === "US Grid" || activeTab === "Texas (ERCOT)";

  return (
    <div className="w-full max-w-5xl mx-auto space-y-8 my-8 px-4 sm:px-6 lg:px-8">
      {/* 4-Stage Strategic Focus Control Tabs */}
      <div className="flex flex-wrap border-b border-slate-800">
        {["Compliance", "US Grid", "Texas (ERCOT)", "My Infra"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-3 text-sm font-bold uppercase tracking-wider transition-colors border-b-2 ${
              activeTab === tab 
                ? "text-[#00f0ff] border-[#00f0ff] bg-[#00f0ff]/5" 
                : "text-slate-500 border-transparent hover:text-slate-300"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        {/* Controls Panel */}
        <div className={`w-full md:w-1/3 space-y-6 bg-slate-900/60 dark:bg-slate-900/60 bg-white/5 p-6 rounded-xl border border-slate-800 transition-all duration-500 ${isSimulatedMacro ? "opacity-50 grayscale pointer-events-none" : ""}`}>
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white font-space-grotesk tracking-tight">
              {activeTab === "My Infra" ? "Facility Setup" : "Compliance Rules"}
            </h2>
            {gridData && (
              <span className={`text-[10px] uppercase font-bold tracking-widest px-2 py-1 rounded-full border ${gridData.isSynthetic ? 'text-amber-500 dark:text-amber-400 border-amber-400/50 bg-amber-400/10' : 'text-[#00f0ff] border-[#00f0ff]/50 bg-[#00f0ff]/10'}`}>
                {gridData.isSynthetic ? 'Fallback Data' : 'Live ERCOT'}
              </span>
            )}
          </div>
          
          <div className="flex space-x-3.5">
            {(["datacenter", "water", "care"] as Industry[]).map((key) => (
              <button
                key={key}
                onClick={() => {
                  setIndustry(key);
                  // Reset defaults
                  if (key === "datacenter") {
                    setSlider1(5000); setSlider2(12);
                  } else if (key === "water") {
                    setSlider1(800); setSlider2(48);
                  } else if (key === "care") {
                    setSlider1(80); setSlider2(150);
                  }
                }}
                className={`flex-1 py-3.5 rounded-xl text-2xl border transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] cursor-pointer ${
                  industry === key
                    ? "bg-slate-200 dark:bg-slate-800 text-blue-600 dark:text-[#00f0ff] border-blue-500 dark:border-[#00f0ff] shadow-md shadow-blue-500/5 dark:shadow-[#00f0ff]/5"
                    : "bg-slate-100 dark:bg-slate-950 text-slate-500 dark:text-slate-400 border-slate-300 dark:border-slate-800 hover:border-slate-400 dark:hover:border-slate-700"
                }`}
              >
                {INDUSTRIES[key].emoji}
              </button>
            ))}
          </div>

          <div className="space-y-4">
            <div>
              <label className="text-xs font-semibold text-blue-600 dark:text-[#00f0ff] uppercase tracking-wider block mb-1">
                {INDUSTRIES[industry].slider1Label}
              </label>
              <input
                type="range"
                min={industry === "datacenter" ? 1000 : industry === "water" ? 100 : 10}
                max={industry === "datacenter" ? 15000 : industry === "water" ? 4000 : 350}
                value={slider1}
                onChange={(e) => setSlider1(Number(e.target.value))}
                className="w-full accent-blue-600 dark:accent-[#00f0ff]"
              />
              <div className="flex justify-between items-start gap-4 mt-1">
                <span className="text-[9px] text-slate-500 leading-tight">
                  {INDUSTRIES[industry].slider1Desc}
                </span>
                <span className="text-xs font-mono font-bold text-slate-700 dark:text-white shrink-0">
                  {slider1.toLocaleString()} {industry === "datacenter" ? "Nodes" : industry === "water" ? "HP" : "Beds"}
                </span>
              </div>
            </div>

            <div>
              <label className="text-xs font-semibold text-blue-600 dark:text-[#00f0ff] uppercase tracking-wider block mb-1">
                {INDUSTRIES[industry].slider2Label}
              </label>
              <input
                type="range"
                min={industry === "datacenter" ? 1 : industry === "water" ? 24 : 20}
                max={industry === "datacenter" ? 24 : industry === "water" ? 168 : 800}
                value={slider2}
                onChange={(e) => setSlider2(Number(e.target.value))}
                className="w-full accent-blue-600 dark:accent-[#00f0ff]"
              />
              <div className="flex justify-between items-start gap-4 mt-1">
                <span className="text-[9px] text-slate-500 leading-tight">
                  {INDUSTRIES[industry].slider2Desc}
                </span>
                <span className="text-xs font-mono font-bold text-slate-700 dark:text-white shrink-0">
                  {slider2.toLocaleString()} {industry === "datacenter" ? "Hours" : industry === "water" ? "Hours" : "kW"}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Telemetry Canvas & Scorecard Panel */}
        <div className="w-full md:w-2/3 flex flex-col space-y-4">
          <div className={`relative transition-all duration-300 rounded-xl overflow-hidden ${(!isSimulatedMacro && isViolating) ? 'ring-2 ring-red-500 shadow-[0_0_30px_rgba(239,68,68,0.3)]' : 'ring-1 ring-slate-800'}`}>
            
            {/* View Overlay Label */}
            {isSimulatedMacro && (
              <div className="absolute top-0 left-0 w-full h-full bg-slate-950/40 backdrop-blur-[2px] z-10 pointer-events-none flex items-center justify-center">
                 <div className="bg-slate-900 border border-slate-700 px-6 py-3 rounded-lg text-center shadow-xl">
                    <p className="text-xs text-[#00f0ff] font-bold uppercase tracking-widest mb-1">Macro Telemetry Feed</p>
                    <p className="text-lg text-white font-space-grotesk">{activeTab} Live Monitoring</p>
                 </div>
              </div>
            )}

            <TelemetryCanvas 
              currentIndustry={industry} 
              activeCustomLoad={displayActiveLoad} 
              limitVal={displayLimit} 
            />
          </div>

          {/* Dynamic Penalty Liability Scorecard */}
          <div className={`p-6 rounded-xl border transition-colors duration-300 flex items-center justify-between ${
            (!isSimulatedMacro && isViolating)
              ? 'bg-red-500/10 border-red-500/50 text-red-600 dark:text-red-400' 
              : 'bg-emerald-500/10 border-emerald-500/30 text-emerald-600 dark:text-emerald-400'
          }`}>
            <div>
              <h3 className="font-bold text-sm uppercase tracking-widest opacity-80 mb-1">Estimated Annual Penalty Liability</h3>
              <p className="text-xs opacity-70">Based on active threshold limits & utilization factors</p>
            </div>
            <div className="text-right">
              <span className={`font-space-grotesk text-3xl font-extrabold tracking-tighter ${(!isSimulatedMacro && isViolating) ? 'animate-pulse' : ''}`}>
                {isSimulatedMacro ? "N/A" : penaltyLiability}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
