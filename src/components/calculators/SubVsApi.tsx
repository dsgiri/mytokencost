"use client";

import React, { useState } from "react";
import { 
  HelpCircle, 
  ChevronDown, 
  ChevronUp, 
  TrendingDown, 
  AlertTriangle, 
  Zap
} from "lucide-react";
import { LLM_RATE_CARD, ProviderKey } from "@/lib/shared/rates";

export default function SubVsApi() {
  const [promptsPerDay, setPromptsPerDay] = useState(15);
  const [wordsPerPrompt, setWordsPerPrompt] = useState(250);
  const [selectedProvider, setSelectedProvider] = useState<ProviderKey>("anthropic");
  const [isMethodologyOpen, setIsMethodologyOpen] = useState(false);

  const calcBreakeven = () => {
    const rateCard = LLM_RATE_CARD[selectedProvider];
    const totalWords = wordsPerPrompt;
    const inputWords = totalWords * 0.7;
    const outputWords = totalWords * 0.3;

    const queryInputTokens = inputWords * 1.33;
    const queryOutputTokens = outputWords * 1.33;

    const dailyInputTokens = queryInputTokens * promptsPerDay;
    const dailyOutputTokens = queryOutputTokens * promptsPerDay;

    const monthlyInputTokens = dailyInputTokens * 30.5;
    const monthlyOutputTokens = dailyOutputTokens * 30.5;

    const monthlyInputCost = (monthlyInputTokens / 1000000) * rateCard.inputCostPerMillion;
    const monthlyOutputCost = (monthlyOutputTokens / 1000000) * rateCard.outputCostPerMillion;
    const totalMonthlyCost = monthlyInputCost + monthlyOutputCost;

    const subCost = 20.00;
    const netSavings = subCost - totalMonthlyCost;

    return {
      monthlyCost: totalMonthlyCost.toFixed(2),
      savings: netSavings.toFixed(2),
      overpaying: netSavings > 0,
      totalMonthlyTokens: Math.floor(monthlyInputTokens + monthlyOutputTokens).toLocaleString()
    };
  };

  const results = calcBreakeven();

  return (
    <div className="space-y-6 text-left">
      
      {/* Slider inputs */}
      <div className="bg-slate-950/60 border border-slate-900 p-6 rounded-2xl space-y-6 font-mono text-xs text-left">
        
        {/* Model select */}
        <div className="space-y-2">
          <label className="text-slate-450 text-[10px] uppercase font-bold tracking-wider block">1. Select AI Model & API Rates</label>
          <select
            value={selectedProvider}
            onChange={(e) => setSelectedProvider(e.target.value as ProviderKey)}
            className="bg-slate-900 border border-slate-850 focus:border-emerald-500/40 rounded-xl px-3 py-3 text-xs text-white focus:outline-none w-full"
          >
            {Object.keys(LLM_RATE_CARD).map((key) => (
              <option key={key} value={key}>
                {key.toUpperCase()} ({LLM_RATE_CARD[key as ProviderKey].name})
              </option>
            ))}
          </select>
        </div>

        {/* Prompts/day */}
        <div className="space-y-2.5">
          <div className="flex justify-between text-[10px] uppercase font-bold tracking-wider">
            <span className="text-slate-455">2. Daily Prompts Sent</span>
            <span className="text-emerald-400 font-bold">{promptsPerDay} prompts/day</span>
          </div>
          <input 
            type="range"
            min="1"
            max="100"
            value={promptsPerDay}
            onChange={(e) => setPromptsPerDay(Number(e.target.value))}
            className="w-full accent-emerald-500 bg-slate-900 h-1 rounded"
          />
        </div>

        {/* Words/prompt */}
        <div className="space-y-2.5">
          <div className="flex justify-between text-[10px] uppercase font-bold tracking-wider">
            <span className="text-slate-455">3. Average Word Count (Input + Output)</span>
            <span className="text-emerald-400 font-bold">{wordsPerPrompt} words per prompt</span>
          </div>
          <input 
            type="range"
            min="50"
            max="1500"
            step="50"
            value={wordsPerPrompt}
            onChange={(e) => setWordsPerPrompt(Number(e.target.value))}
            className="w-full accent-emerald-500 bg-slate-900 h-1 rounded"
          />
        </div>

      </div>

      {/* Results panel */}
      <div className="bg-slate-950 border border-slate-900 p-6 rounded-2xl space-y-5 font-mono text-left">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 border-b border-slate-900 pb-5">
          
          <div>
            <span className="text-[9px] text-slate-500 uppercase tracking-widest block font-bold">Monthly Token Flow</span>
            <span className="text-xl font-bold text-white mt-1 block font-space-grotesk">{results.totalMonthlyTokens}</span>
          </div>

          <div>
            <span className="text-[9px] text-slate-500 uppercase tracking-widest block font-bold">Projected Monthly API Cost</span>
            <span className="text-xl font-bold text-emerald-400 mt-1 block font-space-grotesk">${results.monthlyCost}</span>
          </div>

          <div>
            <span className="text-[9px] text-slate-500 uppercase tracking-widest block font-bold">Subscription Savings Delta</span>
            <span className={`text-xl font-bold mt-1 block font-space-grotesk ${
              results.overpaying ? "text-emerald-400" : "text-amber-500"
            }`}>
              {results.overpaying ? `+$${results.savings} Saved` : `-$${Math.abs(Number(results.savings)).toFixed(2)} Loss`}
            </span>
          </div>

        </div>

        {/* Verdict block */}
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between pt-2">
          <div className="space-y-1.5">
            <div className="text-xs text-white font-bold flex items-center gap-1.5">
              {results.overpaying ? (
                <>
                  <Zap className="w-4 h-4 text-emerald-500" />
                  Verdict: You are wastefully bleeding money on flat subscriptions!
                </>
              ) : (
                <>
                  <AlertTriangle className="w-4 h-4 text-amber-500" />
                  Verdict: Your prompt density leverages the flat $20 plan.
                </>
              )}
            </div>
            <p className="text-[10px] text-slate-500 leading-relaxed font-mono">
              {results.overpaying 
                ? "Your active prompt limits remain low. Swapping your flat $20 license for dynamic API tokens in a free Web UI like LibreChat saves you capital."
                : "Your usage exceeds standard break-even levels. A flat subscription offers a more cost-effective model for your workflows."}
            </p>
          </div>

          {results.overpaying && (
            <button
              onClick={() => alert("Simulating redirection to active setup manuals on r/MyTokenCost.")}
              className="bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold px-4 py-2.5 rounded-xl text-xs transition whitespace-nowrap"
            >
              Configure Free UI ➜
            </button>
          )}
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
            Methodology & Rate Card Equations
          </span>
          {isMethodologyOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </button>

        {isMethodologyOpen && (
          <div className="px-6 pb-6 pt-2 text-[10.5px] text-slate-400 space-y-4 border-t border-slate-900/60 leading-relaxed select-text">
            <div className="space-y-2">
              <h4 className="text-white font-bold text-xs uppercase">Break-Even Calculation Mechanics</h4>
              <p>
                To convert user queries into pricing metrics, we utilize standard token splits and coefficients:
              </p>
              <pre className="bg-slate-900 p-3 rounded border border-slate-805 text-[10px] text-emerald-400 leading-relaxed">
                Total Monthly Words = Words per Prompt * Prompts per Day * 30.5
                Token Multiplier = 1.33 tokens per word average
                Split Weight: 70% input prompts / 30% output response generation
              </pre>
              <p>
                API costs are dynamically calculated using the provider rates imported from our single source of truth (`src/lib/shared/rates.ts`).
              </p>
            </div>
          </div>
        )}
      </div>

    </div>
  );
}
