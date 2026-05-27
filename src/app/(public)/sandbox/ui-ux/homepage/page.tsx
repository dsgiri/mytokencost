import { Metadata } from "next";
import { Hero } from "@/components/marketing/Hero";
import { ComplianceCalculator } from "@/components/hud/ComplianceCalculator";
import { USGridTelemetry } from "@/components/hud/USGridTelemetry";
import { AuditLeadForm } from "@/components/forms/AuditLeadForm";
import Link from "next/link";
import { Sparkles, ArrowLeft, ShieldCheck, Eye, Layers } from "lucide-react";

export const metadata: Metadata = {
  title: "Staging: Homepage UI/UX Sandbox | MyTokenCost",
  description: "Live preview of proposed B2B onboarding, compliance mapping, and real-time telemetry systems.",
};

export default function SandboxUiUxHomepage() {
  return (
    <div className="min-h-screen bg-slate-900/50 dark:bg-slate-950 pb-24 transition-colors duration-300">
      
      {/* Sandbox High-Tech Top Sticky Header Bar */}
      <div className="sticky top-16 z-30 bg-slate-950/80 backdrop-blur-md border-b border-slate-800 py-3.5 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <Link href="/" className="text-slate-400 hover:text-white transition flex items-center gap-1 text-[11px] font-bold uppercase tracking-wider">
                <ArrowLeft className="w-3.5 h-3.5" />
                Back to Site
              </Link>
              <span className="text-slate-700">|</span>
              <div className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[9px] font-mono font-extrabold bg-[#00f0ff]/10 text-[#00f0ff] border border-[#00f0ff]/25 tracking-widest uppercase animate-pulse">
                Sandbox Mode
              </div>
            </div>
            <h1 className="text-lg font-bold font-space-grotesk text-white flex items-center gap-2">
              <Layers className="w-4 h-4 text-[#00f0ff]" />
              Homepage UI/UX Staging Sandbox
            </h1>
          </div>

          <div className="flex items-center gap-3">
            <Link 
              href="/contact?type=demo"
              className="bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-400 border border-cyan-500/20 font-bold px-3.5 py-1.5 rounded-lg text-xs tracking-wider uppercase transition"
            >
              Verify Lead Flow
            </Link>
            <Link 
              href="/pricing"
              className="bg-blue-600 hover:bg-blue-500 text-white font-bold px-3.5 py-1.5 rounded-lg text-xs tracking-wider uppercase transition shadow-lg shadow-blue-500/10"
            >
              Review Rates
            </Link>
          </div>

        </div>
      </div>

      {/* Hero Banner Callout */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-10">
        <div className="relative group overflow-hidden bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-2xl">
          <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500" />
          <div className="absolute -top-12 -right-12 w-48 h-48 bg-cyan-500/5 rounded-full blur-3xl" />
          
          <div className="relative space-y-4 max-w-3xl">
            <div className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[9px] font-mono font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/25 uppercase tracking-wider">
              <ShieldCheck className="w-3 h-3" />
              Fully Verified UI
            </div>
            <h2 className="text-xl sm:text-2xl font-bold font-space-grotesk text-white tracking-tight">
              Staging Home Screen Preview
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
              Welcome to the staging sandbox for the Home screen layout. Here you can inspect all upgraded visual elements that prevent onboarding friction. Click buttons, slide values, and verify how live ERCOT grid calculations adapt instantly to your inputs.
            </p>
            <div className="pt-2 flex flex-wrap gap-4 text-[10px] text-slate-500 font-mono">
              <span className="flex items-center gap-1">
                ✅ Dynamic Context-Aware Labels (Compliance Matrix)
              </span>
              <span className="flex items-center gap-1">
                ✅ Segments & Dynamic Tabs (Lead Intake)
              </span>
              <span className="flex items-center gap-1">
                ✅ Zero Type Safety Compiler Faults
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Homepage Component Grid */}
      <div className="mt-8 space-y-16">
        
        {/* Component 1: Hero Block */}
        <div className="relative">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-4 bg-slate-950 px-4 py-1 rounded-full border border-slate-800 text-[9px] font-mono font-bold text-slate-500 uppercase tracking-widest flex items-center gap-1">
            <Eye className="w-3 h-3 text-[#00f0ff]" />
            Component Preview 1: Hero
          </div>
          <div className="border-t border-b border-slate-800 bg-slate-950/20 py-4">
            <Hero />
          </div>
        </div>

        {/* Component 2: US Grid Telemetry Tickers */}
        <div className="relative">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-4 bg-slate-950 px-4 py-1 rounded-full border border-slate-800 text-[9px] font-mono font-bold text-slate-500 uppercase tracking-widest flex items-center gap-1">
            <Eye className="w-3 h-3 text-[#00f0ff]" />
            Component Preview 2: Grid Telemetry
          </div>
          <div className="py-4">
            <USGridTelemetry />
          </div>
        </div>

        {/* Component 3: Dynamic Compliance Calculator */}
        <div className="relative">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-4 bg-slate-950 px-4 py-1 rounded-full border border-slate-800 text-[9px] font-mono font-bold text-slate-500 uppercase tracking-widest flex items-center gap-1">
            <Eye className="w-3 h-3 text-[#00f0ff]" />
            Component Preview 3: Compliance Calculator
          </div>
          <div className="py-4">
            <ComplianceCalculator />
          </div>
        </div>

        {/* Component 4: Multi-Mode Intake Form */}
        <div className="relative">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-4 bg-slate-950 px-4 py-1 rounded-full border border-slate-800 text-[9px] font-mono font-bold text-slate-500 uppercase tracking-widest flex items-center gap-1">
            <Eye className="w-3 h-3 text-[#00f0ff]" />
            Component Preview 4: Multi-Mode Lead Form
          </div>
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <AuditLeadForm />
          </div>
        </div>

      </div>

    </div>
  );
}
