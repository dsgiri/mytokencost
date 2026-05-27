"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { 
  Layers, 
  ArrowRight, 
  Cpu, 
  ShieldCheck, 
  Server, 
  Activity, 
  Terminal, 
  ExternalLink, 
  Database, 
  CheckCircle,
  Clock,
  Lock
} from "lucide-react";

interface SandboxRoute {
  title: string;
  path: string;
  description: string;
  status: "active" | "experimental" | "new";
  features: string[];
  specs: {
    language: string;
    engine: string;
    auth: string;
  };
  badgeColor: string;
}

const SANDBOX_ROUTES: SandboxRoute[] = [
  {
    title: "Homepage B2B Compliance Sandbox",
    path: "/sandbox/ui-ux/homepage",
    description: "Proposed B2B landing page evaluating real-time utility grid telemetry, compliance checklists, and corporate cost auditing workflows.",
    status: "active",
    features: [
      "Dynamic Context-Aware Compliance Labels",
      "US Grid (ERCOT) Energy Price Telemetry Ticker",
      "Dynamic B2B Compliance Audit Calculator",
      "Multi-Mode Corporate Onboarding Intake Form"
    ],
    specs: {
      language: "TypeScript / React",
      engine: "Next.js App Router",
      auth: "Clerk Auth Connected"
    },
    badgeColor: "bg-cyan-500/10 border-cyan-500/20 text-cyan-400"
  },
  {
    title: "hw.mytokencost.com Storefront & ROI Sandbox",
    path: "/sandbox/ui-ux/hardware",
    description: "Premium technical B2B storefront selling pre-configured local hardware inference nodes (Lite Node, Pro Node, Cluster-4U) to fund open-source development.",
    status: "new",
    features: [
      "Live Mock Terminal Simulator (node01_status.log)",
      "Dynamic ROI Engine with Active/Standby Power Duty Cycles",
      "Interactive Product Configurator (upgrades sync to pricing & specs)",
      "Trojan Horse software dashboard mockup (with SSOT Rates comparisons)",
      "Frictionless Pre-order Reservation & Checkout Modal"
    ],
    specs: {
      language: "TypeScript / React",
      engine: "Next.js App Router (Self-Contained)",
      auth: "Secure Sandbox Logging"
    },
    badgeColor: "bg-emerald-500/10 border-emerald-500/20 text-emerald-400"
  }
];

export default function SandboxIndex() {
  const [browserTime, setBrowserTime] = useState("");
  const [simulatedLoad, setSimulatedLoad] = useState(100);

  useEffect(() => {
    const timer = setTimeout(() => {
      setBrowserTime(new Date().toLocaleTimeString());
    }, 0);
    const interval = setInterval(() => {
      setBrowserTime(new Date().toLocaleTimeString());
      setSimulatedLoad(Math.floor(Math.random() * 20) + 5);
    }, 1000);
    return () => {
      clearTimeout(timer);
      clearInterval(interval);
    };
  }, []);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 selection:bg-cyan-500/30 selection:text-cyan-200">
      
      {/* Cyberpunk Decorative Header Grid */}
      <div className="relative overflow-hidden pt-20 pb-12 border-b border-slate-900 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(0,240,255,0.06),rgba(255,255,255,0))]">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#0f172a_1px,transparent_1px),linear-gradient(to_bottom,#0f172a_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-25" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-6">
          
          <div className="flex items-center gap-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md text-[10px] font-mono font-bold bg-[#00f0ff]/10 text-[#00f0ff] border border-[#00f0ff]/20 uppercase tracking-widest animate-pulse">
              <Activity className="w-3.5 h-3.5" />
              Staging Registry & System Telemetry
            </div>
          </div>

          <div className="max-w-3xl space-y-2">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black font-space-grotesk tracking-tight text-white leading-tight">
              UI/UX Sandbox <span className="bg-gradient-to-r from-cyan-400 to-emerald-400 bg-clip-text text-transparent">Deployment Registry</span>
            </h1>
            <p className="text-sm sm:text-base text-slate-400 leading-relaxed">
              Welcome to the centralized staging hub. Inspect dynamic calculations, test responsive layouts, and verify high-fidelity lead flows before deployment to production domains.
            </p>
          </div>

          {/* Staging Metrics Panel */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4">
            <div className="bg-slate-900/60 p-4 rounded-xl border border-slate-900 font-mono">
              <div className="text-[10px] text-slate-500 uppercase flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-cyan-400" />
                Local Server Time
              </div>
              <div className="text-white text-sm font-bold mt-1.5">{browserTime || "loading..."}</div>
            </div>

            <div className="bg-slate-900/60 p-4 rounded-xl border border-slate-900 font-mono">
              <div className="text-[10px] text-slate-500 uppercase flex items-center gap-1.5">
                <Activity className="w-3.5 h-3.5 text-emerald-400" />
                Simulated API Load
              </div>
              <div className="text-emerald-400 text-sm font-bold mt-1.5">
                {simulatedLoad} ms <span className="text-[10px] text-slate-500 font-normal">(Optimal)</span>
              </div>
            </div>

            <div className="bg-slate-900/60 p-4 rounded-xl border border-slate-900 font-mono">
              <div className="text-[10px] text-slate-500 uppercase flex items-center gap-1.5">
                <Database className="w-3.5 h-3.5 text-blue-400" />
                Database Engine
              </div>
              <div className="text-white text-sm font-bold mt-1.5">Supabase Local</div>
            </div>

            <div className="bg-slate-900/60 p-4 rounded-xl border border-slate-900 font-mono">
              <div className="text-[10px] text-slate-500 uppercase flex items-center gap-1.5">
                <Lock className="w-3.5 h-3.5 text-red-400" />
                Preview Mode
              </div>
              <div className="text-cyan-400 text-sm font-extrabold mt-1.5 flex items-center gap-1">
                <CheckCircle className="w-3.5 h-3.5 text-cyan-400" />
                STAGE-MODE
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Registry Route Cards Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {SANDBOX_ROUTES.map((route, idx) => (
            <div 
              key={idx}
              className="bg-slate-950 border border-slate-900 hover:border-slate-800 rounded-2xl p-6 sm:p-8 flex flex-col justify-between transition-all duration-300 relative group overflow-hidden"
            >
              {/* Background gradient subtle hover glow */}
              <div className="absolute inset-0 bg-gradient-to-tr from-slate-950 via-slate-950 to-cyan-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              
              <div className="relative space-y-6">
                {/* Header Row */}
                <div className="flex justify-between items-start gap-4">
                  <div className="space-y-1.5">
                    <h2 className="text-xl font-bold font-space-grotesk text-white group-hover:text-cyan-300 transition-colors">
                      {route.title}
                    </h2>
                    <div className="font-mono text-[10px] text-slate-500">
                      Route: <span className="text-slate-400 select-all font-bold">{route.path}</span>
                    </div>
                  </div>
                  <span className={`px-2.5 py-0.5 rounded text-[9px] font-mono font-bold border uppercase tracking-wider ${route.badgeColor}`}>
                    {route.status}
                  </span>
                </div>

                {/* Description */}
                <p className="text-xs text-slate-400 leading-relaxed font-mono">
                  {route.description}
                </p>

                {/* Code Tech Specs */}
                <div className="bg-slate-900/60 p-3 rounded-lg border border-slate-900 grid grid-cols-3 gap-2 text-[10px] font-mono text-slate-500">
                  <div>
                    <span className="block text-slate-600 uppercase text-[8px]">Stack</span>
                    <span className="text-white truncate block mt-0.5">{route.specs.language}</span>
                  </div>
                  <div>
                    <span className="block text-slate-600 uppercase text-[8px]">Router</span>
                    <span className="text-white truncate block mt-0.5">{route.specs.engine}</span>
                  </div>
                  <div>
                    <span className="block text-slate-600 uppercase text-[8px]">State/Auth</span>
                    <span className="text-white truncate block mt-0.5">{route.specs.auth}</span>
                  </div>
                </div>

                {/* Features Check List */}
                <div className="space-y-2">
                  <h4 className="text-[10px] font-mono font-bold text-slate-500 uppercase tracking-widest">
                    Available Staging Interactions
                  </h4>
                  <ul className="space-y-1.5 font-mono text-[10.5px] text-slate-400">
                    {route.features.map((feature, fIdx) => (
                      <li key={fIdx} className="flex items-start gap-2 leading-relaxed">
                        <span className="text-cyan-400 flex-shrink-0">✓</span>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Navigation button */}
              <div className="relative pt-6 border-t border-slate-900 mt-8">
                <Link 
                  href={route.path}
                  className="w-full bg-slate-900 hover:bg-slate-800 border border-slate-800 text-white font-mono py-3 rounded-xl text-xs uppercase tracking-wider transition flex items-center justify-center gap-2 hover:scale-[1.01] active:scale-[0.99]"
                >
                  Enter Sandbox
                  <ArrowRight className="w-4 h-4 text-cyan-400" />
                </Link>
              </div>

            </div>
          ))}

        </div>
      </div>

    </div>
  );
}
