"use client";

import React from "react";
import Link from "next/link";
import { Calculator, ShieldAlert, Cpu, Droplet, ArrowRight, Activity, Calendar } from "lucide-react";

export default function PlaygroundHub() {
  return (
    <div className="bg-slate-950 text-slate-100 min-h-screen flex flex-col font-sans selection:bg-emerald-500/30 selection:text-emerald-400">
      
      {/* Header Hero Section */}
      <div className="max-w-7xl w-full mx-auto px-6 pt-16 pb-12 space-y-4">
        <div className="flex items-center gap-2 text-xs font-mono font-bold text-emerald-400 uppercase tracking-widest">
          <Link href="/" className="hover:text-emerald-300">Home</Link>
          <span>/</span>
          <span className="text-slate-300">Playground</span>
        </div>
        
        <div className="border-b border-slate-800 pb-10">
          <h1 className="text-4xl font-extrabold font-space-grotesk tracking-tight text-white mb-3">
            B2B Compliance & Cost <span className="text-emerald-500">Playground</span>
          </h1>
          <p className="text-sm text-slate-400 max-w-2xl leading-relaxed">
            Estimate your corporate shadow AI liabilities, dynamic power grid exposures, and carbon/water telemetry footprint using our B2B compliance auditor sandboxes.
          </p>
        </div>
      </div>

      {/* Directory Grid */}
      <main className="max-w-7xl w-full mx-auto px-6 pb-24 grid grid-cols-1 md:grid-cols-3 gap-8">
        
        {/* Card 1: Shadow AI Risk Calculator */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 flex flex-col justify-between hover:border-slate-700 transition shadow-xl relative overflow-hidden group">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-emerald-500 to-teal-500" />
          <div className="space-y-4">
            <div className="h-10 w-10 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 rounded-xl flex items-center justify-center">
              <ShieldAlert className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white font-space-grotesk group-hover:text-emerald-400 transition-colors">
                Shadow AI Risk Calculator
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed mt-1.5">
                Calculate estimated unmonitored employee prompt spending, runway recursive loop budgets, and shadow AI compliance footprint risk across your organization.
              </p>
            </div>
          </div>
          
          <div className="pt-6 mt-6 border-t border-slate-800 flex justify-between items-center">
            <span className="text-[10px] font-mono tracking-widest text-emerald-400 font-bold bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-0.5 rounded">
              Active Auditor
            </span>
            <Link 
              href="/playground/shadow-cost"
              className="flex items-center gap-1.5 text-xs font-bold text-white group-hover:text-emerald-400 transition"
            >
              Launch Calculator
              <ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>

        {/* Card 2: Power Grid Cost Simulator */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 flex flex-col justify-between hover:border-slate-700 transition shadow-xl relative overflow-hidden group">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-purple-500 to-indigo-500" />
          <div className="space-y-4">
            <div className="h-10 w-10 bg-purple-500/10 border border-purple-500/20 text-purple-400 rounded-xl flex items-center justify-center">
              <Cpu className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white font-space-grotesk">
                Power Grid Cost Simulator
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed mt-1.5">
                Simulate AI data center electricity overhead using dynamic hourly wholesale rates and ERCOT carbon indicators. Audit runaway data center loads during peak grid strains.
              </p>
            </div>
          </div>
          
          <div className="pt-6 mt-6 border-t border-slate-800 flex justify-between items-center">
            <span className="text-[10px] font-mono tracking-widest text-purple-400 font-bold bg-purple-500/10 border border-purple-500/20 px-2.5 py-0.5 rounded">
              Coming Q3 2026
            </span>
            <span className="text-xs font-bold text-slate-500 flex items-center gap-1">
              Locked
              <Activity className="w-3.5 h-3.5" />
            </span>
          </div>
        </div>

        {/* Card 3: Water Cooling & Carbon Impact */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 flex flex-col justify-between hover:border-slate-700 transition shadow-xl relative overflow-hidden group">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-cyan-500" />
          <div className="space-y-4">
            <div className="h-10 w-10 bg-blue-500/10 border border-blue-500/20 text-blue-400 rounded-xl flex items-center justify-center">
              <Droplet className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white font-space-grotesk">
                Water & Carbon Auditor
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed mt-1.5">
                Audit cooling water consumption, power usage effectiveness (PUE), and active scopes carbon footprint relative to physical LLM servers and geographical grids.
              </p>
            </div>
          </div>
          
          <div className="pt-6 mt-6 border-t border-slate-800 flex justify-between items-center">
            <span className="text-[10px] font-mono tracking-widest text-blue-400 font-bold bg-blue-500/10 border border-blue-500/20 px-2.5 py-0.5 rounded">
              Coming Q4 2026
            </span>
            <span className="text-xs font-bold text-slate-500 flex items-center gap-1">
              Locked
              <Droplet className="w-3.5 h-3.5" />
            </span>
          </div>
        </div>

      </main>

      {/* Corporate Lead Capture Scheduler Banner */}
      <div className="max-w-7xl w-full mx-auto px-6 pb-24">
        <div className="bg-gradient-to-r from-emerald-500/10 to-teal-500/5 border border-emerald-500/25 p-8 rounded-2xl flex flex-col md:flex-row justify-between items-center gap-8 shadow-xl">
          <div className="space-y-2">
            <span className="text-[10px] font-mono tracking-widest text-emerald-400 font-bold uppercase block">
              ENTERPRISE SERVICES
            </span>
            <h2 className="text-2xl font-extrabold font-space-grotesk text-white">
              Need a Custom Physical Compliance Audit?
            </h2>
            <p className="text-xs text-slate-400 max-w-xl leading-relaxed">
              Book a comprehensive physical auditing contract with our consulting engineers. We provide full scope reports across Texas water utility loops, ERCOT grid boundaries, and shadow AI data centers.
            </p>
          </div>
          
          <Link
            href="https://calendly.com"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2.5 bg-emerald-500 hover:bg-emerald-400 text-emerald-950 font-extrabold text-xs px-6 py-4 rounded-xl shadow-lg shadow-emerald-500/10 uppercase tracking-wider transition-all hover:scale-[1.02] active:scale-[0.98] whitespace-nowrap"
          >
            <Calendar className="w-4 h-4" />
            Book Custom Audit ($1,499)
          </Link>
        </div>
      </div>

    </div>
  );
}
