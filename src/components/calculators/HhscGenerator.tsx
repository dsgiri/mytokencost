"use client";

import React, { useState } from "react";
import { 
  HelpCircle, 
  ChevronDown, 
  ChevronUp, 
  AlertTriangle 
} from "lucide-react";

interface HhscGeneratorProps {
  initialData?: {
    title?: string;
    regulatoryBody?: string;
    penaltyRisk?: string;
    steps?: any[];
  };
}

export default function HhscGenerator({ initialData }: HhscGeneratorProps) {
  const [beds, setBeds] = useState(100);
  const [genKw, setGenKw] = useState(250);
  const [fuelGallons, setFuelGallons] = useState(1000);
  const [isMethodologyOpen, setIsMethodologyOpen] = useState(false);

  const fallbackBody = "Texas HHSC (Health and Human Services Commission)";
  const fallbackPenalty = "Immediate Class A Administrative Penalties & Emergency Evacuation Directives (Ambient 88°F Rule)";

  const getHhscMath = () => {
    // Standard rule: Ambient 88°F Rule nursing homes.
    // Minimum 1.5 kW safety load capacity per resident bed to run localized portable AC units & safety devices.
    const requiredCapacityKw = beds * 1.5;
    const isKwCompliant = genKw >= requiredCapacityKw;

    // Fuel duration calculations:
    // Propane/Diesel generator consumes ~0.07 gallons of fuel per kW capacity per hour at full load.
    const fuelConsumptionPerHour = genKw * 0.07;
    const totalSustainedHours = fuelGallons / fuelConsumptionPerHour;
    const isDurationCompliant = totalSustainedHours >= 96.0; // HHSC 96-hour fuel emergency mandate

    return {
      requiredKw: requiredCapacityKw.toFixed(0),
      isKwCompliant,
      burnRate: fuelConsumptionPerHour.toFixed(1),
      hours: totalSustainedHours.toFixed(1),
      isDurationCompliant,
      totalDays: (totalSustainedHours / 24).toFixed(1),
      isFullyCompliant: isKwCompliant && isDurationCompliant
    };
  };

  const results = getHhscMath();
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
        
        {/* Bed Capacity */}
        <div className="space-y-2.5">
          <div className="flex justify-between text-[10px] uppercase font-bold tracking-wider">
            <span className="text-slate-455">1. Licensed Bed Capacity</span>
            <span className="text-emerald-400 font-bold">{beds} Beds</span>
          </div>
          <input 
            type="range"
            min="20"
            max="300"
            step="10"
            value={beds}
            onChange={(e) => setBeds(Number(e.target.value))}
            className="w-full accent-emerald-500 bg-slate-900 h-1 rounded"
          />
        </div>

        {/* Generator kW Output */}
        <div className="space-y-2.5">
          <div className="flex justify-between text-[10px] uppercase font-bold tracking-wider">
            <span className="text-slate-455">2. Emergency Generator output capacity</span>
            <span className="text-emerald-400 font-bold">{genKw} kW</span>
          </div>
          <input 
            type="range"
            min="50"
            max="1000"
            step="50"
            value={genKw}
            onChange={(e) => setGenKw(Number(e.target.value))}
            className="w-full accent-emerald-500 bg-slate-900 h-1 rounded"
          />
        </div>

        {/* Fuel Tank size */}
        <div className="space-y-2.5">
          <div className="flex justify-between text-[10px] uppercase font-bold tracking-wider">
            <span className="text-slate-455">3. Emergency Fuel Reserve Capacity</span>
            <span className="text-emerald-400 font-bold">{fuelGallons} Gallons</span>
          </div>
          <input 
            type="range"
            min="200"
            max="5000"
            step="100"
            value={fuelGallons}
            onChange={(e) => setFuelGallons(Number(e.target.value))}
            className="w-full accent-emerald-500 bg-slate-900 h-1 rounded"
          />
        </div>

      </div>

      {/* Outputs Panel */}
      <div className="bg-slate-950 border border-slate-900 p-6 rounded-2xl space-y-4 font-mono text-left">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-slate-900 pb-4">
          <div className="space-y-1">
            <span className="text-[9px] text-slate-500 uppercase tracking-widest block font-bold">Estimated Sustained Fuel Duration</span>
            <span className="text-2xl font-black text-white block font-space-grotesk">
              {results.hours} Hours <span className="text-xs text-slate-500 font-normal font-mono">({results.totalDays} Days)</span>
            </span>
          </div>

          <span className={`px-3 py-1.5 rounded-xl text-xs font-bold border uppercase tracking-wider ${
            results.isFullyCompliant 
              ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-400" 
              : "bg-amber-500/10 border-amber-500/20 text-amber-400"
          }`}>
            {results.isFullyCompliant ? "🟢 Fully HHSC Compliant" : "🔴 Compliance Deficit"}
          </span>
        </div>

        <div className="space-y-2.5 text-xs font-mono">
          
          {/* capacity check */}
          <div className="flex items-center gap-2">
            <span className={results.isKwCompliant ? "text-emerald-500" : "text-amber-500 font-bold"}>
              {results.isKwCompliant ? "✓" : "✗"}
            </span>
            <p className="text-[11px] text-slate-400">
              <strong>Generator Output kW Capacity</strong>: {genKw} kW supplied vs. {results.requiredKw} kW minimum safety load required ({results.isKwCompliant ? "Sufficient" : "Insufficient Load Capacity"}).
            </p>
          </div>

          {/* fuel duration check */}
          <div className="flex items-center gap-2">
            <span className={results.isDurationCompliant ? "text-emerald-500" : "text-amber-500 font-bold"}>
              {results.isDurationCompliant ? "✓" : "✗"}
            </span>
            <p className="text-[11px] text-slate-400">
              <strong>Fuel Reserve Duration</strong>: Fuel tank provides {results.hours} hours at estimated full generator burn-rate ({results.burnRate} gal/hr) vs. mandatory <strong>96.0 Hours</strong> requirement.
            </p>
          </div>

        </div>

        {!results.isFullyCompliant && (
          <div className="bg-slate-900 p-4 rounded-xl border border-slate-805 flex flex-col sm:flex-row justify-between items-center gap-4 mt-2">
            <div className="space-y-0.5 text-left">
              <span className="text-[10px] font-bold text-white">Require HHSC Engineering Certification?</span>
              <p className="text-[9px] text-slate-500 font-mono">Connect with Texas PE compliance engineers to draft fuel storage upgrades.</p>
            </div>
            <button
              onClick={() => alert("Simulating scheduling for an HHSC compliance engineering audit consultation.")}
              className="bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold font-mono text-xs px-4 py-2.5 rounded-lg transition"
            >
              Schedule Engineering Audit
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
              <h4 className="text-white font-bold text-xs uppercase">Texas Care Facility generator rules (Ambient 88°F Rule)</h4>
              <p>
                The Texas Health and Human Services Commission (HHSC) enforces emergency power compliance rules for long-term care:
              </p>
              <pre className="bg-slate-900 p-3 rounded border border-slate-805 text-[10px] text-emerald-400 leading-relaxed">
                Minimum Generator Load = Beds * 1.5 kW
                Burn Consumption = Generator kW * 0.07 gal/hr
                Fuel Duration = Fuel Reserve Gallons / Burn Consumption
              </pre>
              <p>
                Facilities must hold sufficient on-site fuel capacity to run generator sets continuously under full cooling load for a minimum of <strong>96 Hours</strong> during a major blackout event.
              </p>
            </div>
          </div>
        )}
      </div>

    </div>
  );
}
