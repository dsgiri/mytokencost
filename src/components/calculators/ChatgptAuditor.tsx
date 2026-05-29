"use client";

import React, { useState } from "react";
import { 
  Sparkles, 
  Activity, 
  FolderGit, 
  Cpu, 
  TrendingDown, 
  Droplet, 
  Share2, 
  HelpCircle,
  ChevronDown,
  ChevronUp
} from "lucide-react";

export default function ChatgptAuditor() {
  const [uploading, setUploading] = useState(false);
  const [result, setResult] = useState<any | null>(null);
  const [emailLead, setEmailLead] = useState("");
  const [leadSubmitted, setLeadSubmitted] = useState(false);
  const [isMethodologyOpen, setIsMethodologyOpen] = useState(false);

  const handleAuditorSimulation = () => {
    setUploading(true);
    setResult(null);
    setTimeout(() => {
      setUploading(false);
      setResult({
        parsedConversations: 1482,
        parsedMessages: 28943,
        lifetimeTokens: 18453000,
        estimatedRawCost: 110.72,
        flatPaidSubs: 240.00,
        netArbitrage: 129.28,
        waterFootprintLiters: 92.26,
        waterBottles: 185
      });
    }, 1500);
  };

  const handleLeadSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (emailLead) {
      setLeadSubmitted(true);
    }
  };

  return (
    <div className="space-y-6 text-left font-sans">
      
      {/* Drag and Drop Zone */}
      {!result && (
        <div className="border border-dashed border-slate-800 rounded-2xl p-10 bg-slate-950/60 flex flex-col items-center justify-center text-center gap-5 transition hover:border-slate-700">
          <div className="bg-emerald-500/10 p-4 rounded-full border border-emerald-500/20">
            <FolderGit className="w-8 h-8 text-emerald-400" />
          </div>
          <div className="space-y-2">
            <p className="text-sm sm:text-base text-white font-extrabold tracking-tight">Drag and drop your ChatGPT/Claude export .zip here</p>
            <p className="text-xs sm:text-sm text-slate-400 font-medium">Supports conversations.json and chat_history exports cleanly</p>
          </div>
          
          <button
            onClick={handleAuditorSimulation}
            disabled={uploading}
            className="bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-extrabold px-6 py-3 rounded-xl text-[13px] tracking-wide transition flex items-center gap-2 hover:scale-[1.01] active:scale-[0.99] disabled:opacity-50 cursor-pointer shadow-lg shadow-emerald-500/5"
          >
            {uploading ? (
              <>
                <Activity className="w-4 h-4 text-slate-950 animate-spin" />
                Parsing Conversations...
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4 text-slate-950" />
                Simulate History Upload
              </>
            )}
          </button>
        </div>
      )}

      {/* Wrapped Audit Result */}
      {result && (
        <div className="space-y-6 animate-fade-in font-sans">
          
          {/* Metric blocks */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            
            {/* Token Meter */}
            <div className="bg-slate-950 border border-slate-900 p-5 rounded-2xl relative overflow-hidden group hover:border-slate-850">
              <span className="block text-[10px] text-slate-400 uppercase tracking-widest font-black">Lifetime Tokens Used</span>
              <span className="block text-3xl font-black text-white mt-2 font-display">18.45M</span>
              <span className="block text-xs text-slate-400 mt-1.5 font-medium">14,821,000 In | 3,632,000 Out</span>
              <div className="absolute right-3 bottom-3 opacity-10">
                <Cpu className="w-12 h-12 text-emerald-400" />
              </div>
            </div>

            {/* Cost Arbitrage Meter */}
            <div className="bg-slate-950 border border-slate-900 p-5 rounded-2xl relative overflow-hidden group hover:border-slate-850">
              <span className="block text-[10px] text-slate-400 uppercase tracking-widest font-black">OpenAI Hosting Cost</span>
              <span className="block text-3xl font-black text-emerald-400 mt-2 font-display">$110.72</span>
              <span className="block text-xs text-slate-300 mt-1.5 font-semibold">
                Paid: $240 <span className="text-emerald-400 font-extrabold">(You Saved $129.28)</span>
              </span>
              <div className="absolute right-3 bottom-3 opacity-10">
                <TrendingDown className="w-12 h-12 text-emerald-400" />
              </div>
            </div>

            {/* Water footprint meter */}
            <div className="bg-slate-950 border border-slate-900 p-5 rounded-2xl relative overflow-hidden group hover:border-slate-850">
              <span className="block text-[10px] text-slate-400 uppercase tracking-widest font-black">Data Center Cooling</span>
              <span className="block text-3xl font-black text-cyan-450 mt-2 font-display">92.26 L</span>
              <span className="block text-xs text-slate-300 mt-1.5 font-semibold flex items-center gap-1">
                <Droplet className="w-3.5 h-3.5 text-cyan-400" />
                Equivalent to {result.waterBottles} plastic water bottles
              </span>
              <div className="absolute right-3 bottom-3 opacity-10">
                <Droplet className="w-12 h-12 text-cyan-450" />
              </div>
            </div>

          </div>

          {/* Mock dynamic SVG receipt mockup */}
          <div className="bg-slate-950 border border-slate-850 p-6 rounded-2xl relative overflow-hidden flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="space-y-3.5 max-w-sm">
              <h4 className="text-base font-black text-white font-display">Download Your Spotify Wrapped Social Card</h4>
              <p className="text-xs sm:text-sm font-sans font-medium text-slate-300 leading-relaxed">
                Generate a sleek, dynamic, downloadable receipt optimized for direct upload to Reddit and LinkedIn. Highlights token count and net cost arbitrage.
              </p>
              <button
                onClick={() => alert("Simulating high-res 1200x630 SVG receipt generation and download.")}
                className="inline-flex items-center gap-2 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-extrabold px-5 py-2.5 rounded-xl text-xs uppercase tracking-wider transition cursor-pointer shadow-lg shadow-emerald-500/5"
              >
                <Share2 className="w-3.5 h-3.5 text-slate-950" />
                Generate Share Card
              </button>
            </div>

            {/* Graphic Mock of the Receipt */}
            <div className="w-full md:w-68 bg-slate-900 border border-slate-800 p-5 rounded-2xl flex flex-col gap-4 text-xs font-sans text-slate-300 relative selection:bg-none">
              <div className="flex justify-between items-center border-b border-slate-800 pb-2.5">
                <span className="font-extrabold text-white uppercase tracking-wider text-[10px]">MTC Audit Receipt</span>
                <span className="text-[10px] text-slate-500 font-semibold">ID: #8943-wrapped</span>
              </div>
              
              <div className="space-y-2 font-medium">
                <div className="flex justify-between">
                  <span className="text-slate-400">Total Conversations</span>
                  <span className="text-white font-extrabold">1,482</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Total Tokens Parsed</span>
                  <span className="text-white font-extrabold">18,453,000</span>
                </div>
                <div className="flex justify-between border-t border-dashed border-slate-800 pt-2">
                  <span className="text-slate-400">Computed Provider Cost</span>
                  <span className="text-white font-extrabold">$110.72</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Flat Subscriptions Paid</span>
                  <span className="text-white font-extrabold">$240.00</span>
                </div>
                <div className="flex justify-between border-t border-dashed border-slate-800 pt-2 text-emerald-400 font-extrabold">
                  <span>Arbitrage Cost Gap</span>
                  <span>+$129.28 Savings</span>
                </div>
              </div>

              <div className="bg-emerald-950/20 border border-emerald-500/20 p-2.5 rounded-lg text-center text-emerald-400 text-[10px] mt-1.5 uppercase font-black tracking-widest">
                Provider Arbitraged
              </div>
            </div>

          </div>

          {/* Lead Generation CTA Box */}
          {!leadSubmitted ? (
            <form onSubmit={handleLeadSubmit} className="bg-slate-900 p-6 rounded-2xl border border-slate-800 flex flex-col sm:flex-row gap-5 items-center justify-between">
              <div className="space-y-1 text-left w-full">
                <h4 className="text-sm text-white font-black">Get Your Full Carbon & Arbitrage PDF Report</h4>
                <p className="text-xs text-slate-400 font-medium leading-relaxed">Zero spam. Includes tips on setting up pay-as-you-go open-source local UIs.</p>
              </div>
              <div className="flex w-full sm:w-auto gap-3">
                <input 
                  type="email"
                  required
                  value={emailLead}
                  onChange={(e) => setEmailLead(e.target.value)}
                  placeholder="Enter email..."
                  className="bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-white placeholder-slate-650 focus:outline-none focus:border-emerald-500/40 w-full sm:w-56 font-semibold"
                />
                <button
                  type="submit"
                  className="bg-slate-850 hover:bg-slate-700 text-white font-bold text-xs px-5 py-2.5 rounded-xl transition cursor-pointer"
                >
                  Download
                </button>
              </div>
            </form>
          ) : (
            <div className="bg-emerald-950/10 border border-emerald-500/25 p-5 rounded-2xl text-center text-xs text-emerald-400 font-bold">
              ✓ Audit report queued! Check your inbox shortly at <strong>{emailLead}</strong>.
            </div>
          )}

          {/* Reset Audit Button */}
          <button
            onClick={() => {
              setResult(null);
              setLeadSubmitted(false);
              setEmailLead("");
            }}
            className="text-slate-500 hover:text-slate-300 text-xs font-semibold underline block mx-auto pt-2 cursor-pointer"
          >
            Reset Audit Simulation
          </button>

        </div>
      )}

      {/* Collapsible Methodology Accordion */}
      <div className="bg-slate-950 border border-slate-900 rounded-2xl overflow-hidden select-none">
        <button
          onClick={() => setIsMethodologyOpen(!isMethodologyOpen)}
          className="w-full px-6 py-4.5 flex justify-between items-center text-xs text-slate-400 hover:text-emerald-400 transition cursor-pointer"
        >
          <span className="flex items-center gap-2 font-extrabold uppercase tracking-wide">
            <HelpCircle className="w-4 h-4 text-emerald-500" />
            Methodology & Calculation Rules
          </span>
          {isMethodologyOpen ? <ChevronDown className="w-4 h-4" /> : <ChevronDown className="w-4 h-4 rotate-180" />}
        </button>

        {isMethodologyOpen && (
          <div className="px-6 pb-6 pt-2 text-xs sm:text-sm text-slate-400 space-y-4 border-t border-slate-900/60 leading-relaxed select-text font-medium">
            <div className="space-y-2">
              <h4 className="text-white font-extrabold text-xs uppercase tracking-wider">ChatGPT Wrapped Auditor Rules</h4>
              <p>
                Our uploader processes token aggregates by converting message arrays using standard API costs per million tokens:
              </p>
              <ul className="list-disc pl-4 space-y-1 text-slate-500">
                <li>Input Token Rate: $5.00 per million (standard GPT-4o input weight).</li>
                <li>Output Token Rate: $15.00 per million (standard GPT-4o response weight).</li>
                <li>Average prompt tokens/characters conversion factor: 1 token ≈ 4 characters.</li>
              </ul>
              <p>
                <strong>Environmental cooling</strong>: Utilizes an average coefficient of 0.5 Liters of cooling water consumption per 50 standard queries, mapped to regional thermoelectric data center cooling loads.
              </p>
            </div>
          </div>
        )}
      </div>

    </div>
  );
}
