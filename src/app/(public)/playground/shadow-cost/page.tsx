"use client";

import React, { useState, useMemo, useEffect } from "react";
import Link from "next/link";
import { 
  ShieldAlert, 
  Users, 
  Zap, 
  DollarSign, 
  TrendingUp, 
  Sparkles, 
  Send, 
  Mail, 
  Download, 
  RefreshCw, 
  BarChart2, 
  CheckCircle2, 
  ArrowRight, 
  AlertTriangle, 
  Info, 
  Lock,
  Building,
  Briefcase
} from "lucide-react";
import { LLM_RATE_CARD, ProviderKey } from "@/lib/shared/rates";

export default function ShadowAIUsageCalculator() {
  // --- Form & Metric Slider Inputs ---
  const [devCount, setDevCount] = useState<number>(50);
  const [promptsPerDay, setPromptsPerDay] = useState<number>(30);
  const [selectedProvider, setSelectedProvider] = useState<ProviderKey>("anthropic");
  
  // Advanced payload sliders
  const [inputTokens, setInputTokens] = useState<number>(2000);
  const [outputTokens, setOutputTokens] = useState<number>(1000);
  
  // Shadow Loop sliders
  const [runawayCount, setRunawayCount] = useState<number>(5);
  const [runawayTokens, setRunawayTokens] = useState<number>(15000);

  // --- Lead Capture & Lead Simulation State ---
  const [leadName, setLeadName] = useState("");
  const [leadEmail, setLeadEmail] = useState("");
  const [leadCompany, setLeadCompany] = useState("");
  const [leadScale, setLeadScale] = useState("<$1k/mo");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStep, setSubmitStep] = useState(0); // 0: unsubmitted, 1: scrubbing, 2: compiling, 3: rendering, 4: complete
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Toast Helper
  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  // --- Core Dynamic Financial Calculations (SSOT-based) ---
  const rates = useMemo(() => {
    return LLM_RATE_CARD[selectedProvider];
  }, [selectedProvider]);

  const metrics = useMemo(() => {
    const inputRate = rates.inputCostPerMillion;
    const outputRate = rates.outputCostPerMillion;

    // Daily calculations (assumes 5-day work week, so 22 working days/month)
    const dailyTokensPerDev = promptsPerDay * (inputTokens + outputTokens);
    const dailyCostPerDev = promptsPerDay * (
      ((inputTokens / 1_000_000) * inputRate) + 
      ((outputTokens / 1_000_000) * outputRate)
    );

    const totalDailyBaselineTokens = devCount * dailyTokensPerDev;
    const totalDailyBaselineCost = devCount * dailyCostPerDev;

    // Monthly Baseline (22 workdays)
    const monthlyBaselineTokens = 22 * totalDailyBaselineTokens;
    const monthlyBaselineCost = 22 * totalDailyBaselineCost;

    // Monthly Shadow Runaway Cost
    // Runaway loops average 70% input and 30% output distribution
    const runawayCostPerEvent = (
      ((runawayTokens * 0.7 / 1_000_000) * inputRate) + 
      ((runawayTokens * 0.3 / 1_000_000) * outputRate)
    );
    const monthlyRunawayCost = runawayCount * runawayCostPerEvent;
    const monthlyRunawayTokens = runawayCount * runawayTokens;

    // Combined Monthly
    const totalMonthlyCost = monthlyBaselineCost + monthlyRunawayCost;
    const totalMonthlyTokens = monthlyBaselineTokens + monthlyRunawayTokens;

    // Annualized
    const annualBaselineCost = 12 * monthlyBaselineCost;
    const annualRunawayCost = 12 * monthlyRunawayCost;
    const totalAnnualCost = annualBaselineCost + annualRunawayCost;

    // Risk Meter & Rating Category
    let riskRating: "Low" | "Moderate" | "High" | "Critical" = "Low";
    let riskColor = "text-emerald-400 border-emerald-500/25 bg-emerald-500/10";
    let riskDesc = "Your unmonitored shadow AI spending profile is currently optimized. Standard Chrome telemetry is highly recommended for security compliance.";
    
    if (totalAnnualCost >= 100_000) {
      riskRating = "Critical";
      riskColor = "text-red-500 border-red-500/25 bg-red-500/10 animate-pulse";
      riskDesc = "CRITICAL: High unmonitored employee prompt loads and unblocked recursive script loops represent severe runaway financial liabilities. Immediate local gateway rule enforcement is required.";
    } else if (totalAnnualCost >= 25_000) {
      riskRating = "High";
      riskColor = "text-orange-400 border-orange-400/25 bg-orange-400/10";
      riskDesc = "HIGH RISK: Your enterprise is leaking significant budget to shadow LLM prompt allocations and recursive looping. Active budget limit ceilings should be integrated instantly.";
    } else if (totalAnnualCost >= 5_000) {
      riskRating = "Moderate";
      riskColor = "text-amber-400 border-amber-400/25 bg-amber-400/10";
      riskDesc = "MODERATE: Runaway local agent routines are slowly compounding unmonitored overheads. Establish localized privacy filtering to enforce network visibility.";
    }

    return {
      dailyTokensPerDev,
      dailyCostPerDev,
      totalDailyBaselineCost,
      monthlyBaselineCost,
      monthlyRunawayCost,
      totalMonthlyCost,
      totalMonthlyTokens,
      annualBaselineCost,
      annualRunawayCost,
      totalAnnualCost,
      riskRating,
      riskColor,
      riskDesc
    };
  }, [devCount, promptsPerDay, rates, inputTokens, outputTokens, runawayCount, runawayTokens]);

  // --- Dynamic SVG Graph Compiling ---
  // Compiles exact coordinates for 12 months.
  // Unmonitored shadow AI spending compounds at 4% monthly unmonitored waste increases.
  const chartData = useMemo(() => {
    const points: { month: number; name: string; monitored: number; unmonitored: number }[] = [];
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    
    let cumulativeMonitored = 0;
    let cumulativeUnmonitored = 0;

    for (let i = 0; i < 12; i++) {
      cumulativeMonitored += metrics.monthlyBaselineCost;
      
      // Unmonitored cost includes runaway loop costs compounding by 4% each month as developer usage expands
      const monthlyCompoundingRunaway = metrics.monthlyRunawayCost * (1 + (i * 0.04));
      cumulativeUnmonitored += (metrics.monthlyBaselineCost + monthlyCompoundingRunaway);

      points.push({
        month: i + 1,
        name: months[i],
        monitored: cumulativeMonitored,
        unmonitored: cumulativeUnmonitored
      });
    }
    return points;
  }, [metrics.monthlyBaselineCost, metrics.monthlyRunawayCost]);

  // SVG dimensions & scales
  const svgWidth = 600;
  const svgHeight = 240;
  const paddingX = 50;
  const paddingY = 25;

  const maxVal = useMemo(() => {
    const maxValFound = chartData[11].unmonitored;
    return maxValFound * 1.1 || 1000;
  }, [chartData]);

  const svgCoordinates = useMemo(() => {
    const w = svgWidth - paddingX * 2;
    const h = svgHeight - paddingY * 2;

    const monitoredCoords = chartData.map((d, i) => {
      const x = paddingX + (i * (w / 11));
      const y = paddingY + h - ((d.monitored / maxVal) * h);
      return { x, y };
    });

    const unmonitoredCoords = chartData.map((d, i) => {
      const x = paddingX + (i * (w / 11));
      const y = paddingY + h - ((d.unmonitored / maxVal) * h);
      return { x, y };
    });

    // Make SVG Path Strings
    const makePathString = (coords: { x: number; y: number }[]) => {
      return coords.reduce((acc, c, i) => {
        return i === 0 ? `M ${c.x} ${c.y}` : `${acc} L ${c.x} ${c.y}`;
      }, "");
    };

    const makeAreaPathString = (coords: { x: number; y: number }[]) => {
      if (coords.length === 0) return "";
      const path = makePathString(coords);
      return `${path} L ${coords[coords.length - 1].x} ${svgHeight - paddingY} L ${coords[0].x} ${svgHeight - paddingY} Z`;
    };

    return {
      monitored: makePathString(monitoredCoords),
      monitoredArea: makeAreaPathString(monitoredCoords),
      unmonitored: makePathString(unmonitoredCoords),
      unmonitoredArea: makeAreaPathString(unmonitoredCoords),
      rawCoords: { monitoredCoords, unmonitoredCoords }
    };
  }, [chartData, maxVal]);

  // --- Lead Submission Trigger Simulation ---
  const handleLeadSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!leadName || !leadEmail || !leadCompany) {
      triggerToast("Please fill out all contact credentials.");
      return;
    }

    setIsSubmitting(true);
    setSubmitStep(1);

    // Multi-stage animated server simulation
    setTimeout(() => {
      setSubmitStep(2);
      setTimeout(() => {
        setSubmitStep(3);
        setTimeout(() => {
          setSubmitStep(4);
          setTimeout(() => {
            setIsSubmitting(false);
            setIsSubmitted(true);
            triggerToast("Report generated successfully!");
          }, 600);
        }, 1000);
      }, 1000);
    }, 1000);
  };

  return (
    <div className="bg-slate-950 text-slate-100 min-h-screen flex flex-col font-sans selection:bg-emerald-500/30 selection:text-emerald-400">
      
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900 border border-slate-800 text-slate-100 px-4 py-3 rounded-xl shadow-2xl flex items-center gap-2 animate-slide-in">
          <span className="h-2 w-2 rounded-full bg-emerald-500 animate-ping" />
          <span className="text-xs font-mono font-bold">{toastMessage}</span>
        </div>
      )}

      {/* Header Navigation */}
      <div className="max-w-7xl w-full mx-auto px-6 pt-16 pb-8 space-y-4">
        <div className="flex items-center gap-2 text-xs font-mono font-bold text-emerald-400 uppercase tracking-widest">
          <Link href="/" className="hover:text-emerald-300">Home</Link>
          <span>/</span>
          <Link href="/playground" className="hover:text-emerald-300">Playground</Link>
          <span>/</span>
          <span className="text-slate-300">Shadow Cost</span>
        </div>

        <div className="border-b border-slate-800 pb-8 flex flex-col lg:flex-row justify-between items-start lg:items-end gap-6">
          <div className="space-y-2">
            <h1 className="text-4xl font-extrabold font-space-grotesk tracking-tight text-white flex items-center gap-2">
              Shadow AI Cost & Risk <span className="text-emerald-500">Calculator</span>
            </h1>
            <p className="text-sm text-slate-400 max-w-2xl leading-relaxed">
              Analyze unmonitored employee prompt utilization and recursive loop vulnerabilities across your infrastructure. Estimate waste before applying client declarative rules.
            </p>
          </div>
          
          <div className="flex gap-2">
            <button 
              onClick={() => {
                setDevCount(50);
                setPromptsPerDay(30);
                setSelectedProvider("anthropic");
                setInputTokens(2000);
                setOutputTokens(1000);
                setRunawayCount(5);
                setRunawayTokens(15000);
                triggerToast("Calculator parameters restored to standard profiles.");
              }}
              className="px-4 py-2 bg-slate-900 hover:bg-slate-850 border border-slate-800 text-xs font-bold text-slate-300 rounded-lg flex items-center gap-2 transition"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              Reset Inputs
            </button>

            <Link 
              href="/integrations/chrome-extension"
              className="px-4 py-2 bg-emerald-500 hover:bg-emerald-400 text-emerald-950 text-xs font-extrabold rounded-lg flex items-center gap-1.5 shadow-lg shadow-emerald-500/10 transition uppercase tracking-wide"
            >
              Get Chrome Extension
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>

      {/* Main Grid Interface */}
      <main className="max-w-7xl w-full mx-auto px-6 pb-24 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* LEFT COLUMN: Input Sliders & Presets (7/12 cols) */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* Section: Standard Developer Prompt Exposure */}
          <div className="bg-slate-900 border border-slate-850 rounded-xl p-5 space-y-6 shadow-xl">
            <div className="flex items-center gap-2 border-b border-slate-800 pb-3">
              <Users className="w-4 h-4 text-emerald-400" />
              <h3 className="text-xs font-bold uppercase tracking-wider text-white">
                1. Regular Developer/Employee Usage Profile
              </h3>
            </div>

            {/* Slider: Developer Count */}
            <div className="space-y-2">
              <div className="flex justify-between items-baseline">
                <label className="text-xs text-slate-300 font-semibold">Active LLM Consumers (Developers / Teams)</label>
                <span className="text-sm font-mono text-emerald-400 font-bold bg-slate-950 border border-slate-800 px-2.5 py-0.5 rounded">
                  {devCount} Users
                </span>
              </div>
              <input 
                type="range" 
                min={5} 
                max={1500} 
                step={5} 
                value={devCount}
                onChange={(e) => setDevCount(parseInt(e.target.value))}
                className="w-full h-1.5 bg-slate-950 rounded-lg appearance-none cursor-pointer accent-emerald-500 focus:outline-none"
              />
              <div className="flex gap-2 pt-1">
                {[
                  { label: "Small Team", val: 15 },
                  { label: "Mid-Market", val: 150 },
                  { label: "Enterprise", val: 1000 }
                ].map((preset) => (
                  <button
                    key={preset.label}
                    onClick={() => setDevCount(preset.val)}
                    className={`px-2 py-1 bg-slate-950 hover:bg-slate-800 border border-slate-800 text-[10px] rounded font-semibold text-slate-400 hover:text-white transition ${
                      devCount === preset.val ? "text-emerald-400 border-emerald-500/30 bg-emerald-500/5" : ""
                    }`}
                  >
                    {preset.label} ({preset.val})
                  </button>
                ))}
              </div>
            </div>

            {/* Slider: Average Prompts per day */}
            <div className="space-y-2">
              <div className="flex justify-between items-baseline">
                <label className="text-xs text-slate-300 font-semibold">Average Prompts / Tasks Per User / Day</label>
                <span className="text-sm font-mono text-emerald-400 font-bold bg-slate-950 border border-slate-800 px-2.5 py-0.5 rounded">
                  {promptsPerDay} prompts
                </span>
              </div>
              <input 
                type="range" 
                min={1} 
                max={200} 
                step={1} 
                value={promptsPerDay}
                onChange={(e) => setPromptsPerDay(parseInt(e.target.value))}
                className="w-full h-1.5 bg-slate-950 rounded-lg appearance-none cursor-pointer accent-emerald-500 focus:outline-none"
              />
              <div className="flex gap-2 pt-1">
                {[
                  { label: "Light Copilot", val: 10 },
                  { label: "Standard Coding", val: 40 },
                  { label: "Agent Heavy", val: 120 }
                ].map((preset) => (
                  <button
                    key={preset.label}
                    onClick={() => setPromptsPerDay(preset.val)}
                    className={`px-2 py-1 bg-slate-950 hover:bg-slate-800 border border-slate-800 text-[10px] rounded font-semibold text-slate-400 hover:text-white transition ${
                      promptsPerDay === preset.val ? "text-emerald-400 border-emerald-500/30 bg-emerald-500/5" : ""
                    }`}
                  >
                    {preset.label} ({preset.val})
                  </button>
                ))}
              </div>
            </div>

            {/* Selector: Primary LLM Rates (Strictly bound to LLM_RATE_CARD SSOT) */}
            <div className="space-y-2.5 pt-2">
              <label className="block text-xs text-slate-300 font-semibold">Primary Selected Provider Billing Rate Card</label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                {(Object.keys(LLM_RATE_CARD) as ProviderKey[]).map((key) => {
                  const item = LLM_RATE_CARD[key];
                  const isSelected = selectedProvider === key;
                  return (
                    <button
                      key={key}
                      onClick={() => setSelectedProvider(key)}
                      className={`p-3 bg-slate-950 hover:bg-slate-850 border rounded-xl flex flex-col items-start gap-1 transition text-left cursor-pointer ${
                        isSelected 
                          ? "border-emerald-500 ring-1 ring-emerald-500/20 bg-emerald-500/5" 
                          : "border-slate-800 hover:border-slate-700"
                      }`}
                    >
                      <span className="text-[10px] font-mono font-bold tracking-widest text-slate-500 uppercase">
                        {key === "google" ? "Google (Gemini)" : key}
                      </span>
                      <span className="text-xs font-bold text-white tracking-tight leading-none mt-0.5 truncate w-full">
                        {item.name}
                      </span>
                      <div className="text-[9px] text-emerald-400/90 font-mono mt-1 font-semibold leading-tight">
                        In: ${item.inputCostPerMillion.toFixed(2)}/M<br />
                        Out: ${item.outputCostPerMillion.toFixed(2)}/M
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Advanced Token Payloads */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 pt-3 border-t border-slate-800/60">
              <div className="space-y-2">
                <div className="flex justify-between items-baseline">
                  <label className="text-[11px] text-slate-400 font-semibold">Avg. Input Tokens / Prompt</label>
                  <span className="text-xs font-mono font-bold text-slate-300">{inputTokens.toLocaleString()}</span>
                </div>
                <input 
                  type="range" 
                  min={200} 
                  max={20000} 
                  step={100} 
                  value={inputTokens}
                  onChange={(e) => setInputTokens(parseInt(e.target.value))}
                  className="w-full h-1.5 bg-slate-950 rounded-lg appearance-none cursor-pointer accent-slate-600 focus:outline-none"
                />
              </div>

              <div className="space-y-2">
                <div className="flex justify-between items-baseline">
                  <label className="text-[11px] text-slate-400 font-semibold">Avg. Output Tokens / Prompt</label>
                  <span className="text-xs font-mono font-bold text-slate-300">{outputTokens.toLocaleString()}</span>
                </div>
                <input 
                  type="range" 
                  min={100} 
                  max={10000} 
                  step={100} 
                  value={outputTokens}
                  onChange={(e) => setOutputTokens(parseInt(e.target.value))}
                  className="w-full h-1.5 bg-slate-950 rounded-lg appearance-none cursor-pointer accent-slate-600 focus:outline-none"
                />
              </div>
            </div>

          </div>

          {/* Section: Shadow Runaway Loops & Recursions */}
          <div className="bg-slate-900 border border-slate-850 rounded-xl p-5 space-y-6 shadow-xl relative overflow-hidden">
            <div className="absolute top-0 right-0 h-16 w-16 bg-red-500/5 blur-xl rounded-full" />
            
            <div className="flex items-center gap-2 border-b border-slate-800 pb-3">
              <AlertTriangle className="w-4 h-4 text-red-500 animate-pulse" />
              <h3 className="text-xs font-bold uppercase tracking-wider text-white">
                2. Shadow Runaway Agent Loops (Unmonitored Incidents)
              </h3>
            </div>

            {/* Slider: Monthly Incident Counts */}
            <div className="space-y-2">
              <div className="flex justify-between items-baseline">
                <div className="space-y-0.5">
                  <label className="text-xs text-slate-300 font-semibold flex items-center gap-1">
                    Monthly Uncontrolled Loop Incidents
                  </label>
                  <p className="text-[10px] text-slate-500">Autonomous scripts spinning recursively without code barriers.</p>
                </div>
                <span className="text-sm font-mono text-red-400 font-bold bg-slate-950 border border-slate-800 px-2.5 py-0.5 rounded">
                  {runawayCount} Loops / Mo
                </span>
              </div>
              <input 
                type="range" 
                min={0} 
                max={100} 
                step={1} 
                value={runawayCount}
                onChange={(e) => setRunawayCount(parseInt(e.target.value))}
                className="w-full h-1.5 bg-slate-950 rounded-lg appearance-none cursor-pointer accent-red-500 focus:outline-none"
              />
              <div className="flex gap-2 pt-1">
                {[
                  { label: "Minimal Outages", val: 1 },
                  { label: "Moderate Agentic", val: 10 },
                  { label: "High Automation Scale", val: 35 }
                ].map((preset) => (
                  <button
                    key={preset.label}
                    onClick={() => setRunawayCount(preset.val)}
                    className={`px-2 py-1 bg-slate-950 hover:bg-slate-800 border border-slate-800 text-[10px] rounded font-semibold text-slate-400 hover:text-white transition ${
                      runawayCount === preset.val ? "text-red-400 border-red-500/30 bg-red-500/5" : ""
                    }`}
                  >
                    {preset.label} ({preset.val})
                  </button>
                ))}
              </div>
            </div>

            {/* Slider: Loop Token Payload Size */}
            <div className="space-y-2 pt-1">
              <div className="flex justify-between items-baseline">
                <label className="text-xs text-slate-300 font-semibold">Average Tokens Wasted per Loop Outage</label>
                <span className="text-sm font-mono text-red-400 font-bold bg-slate-950 border border-slate-800 px-2.5 py-0.5 rounded">
                  {runawayTokens.toLocaleString()} tokens
                </span>
              </div>
              <input 
                type="range" 
                min={1000} 
                max={150000} 
                step={1000} 
                value={runawayTokens}
                onChange={(e) => setRunawayTokens(parseInt(e.target.value))}
                className="w-full h-1.5 bg-slate-950 rounded-lg appearance-none cursor-pointer accent-red-500 focus:outline-none"
              />
              <p className="text-[10px] text-slate-500">
                A standard runaway recursive node fires multiple subsequent loops before timing out. Average costs scale rapidly per instance.
              </p>
            </div>

          </div>

          {/* Graphical Projection Panel */}
          <div className="bg-slate-900 border border-slate-850 rounded-xl p-5 space-y-4 shadow-xl">
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                <BarChart2 className="w-4 h-4 text-emerald-400" />
                12-Month Projected Shadow Spending & Leakage Curve
              </h3>
              <p className="text-[10px] text-slate-500">
                Visualizing standard baseline monitored spending vs unmonitored shadow runaway trajectories over a fiscal year.
              </p>
            </div>

            {/* SVG Interactive Visual Chart */}
            <div className="bg-slate-950 border border-slate-850 p-4 rounded-xl flex justify-center items-center overflow-x-auto">
              <svg 
                width={svgWidth} 
                height={svgHeight} 
                viewBox={`0 0 ${svgWidth} ${svgHeight}`}
                className="overflow-visible select-none text-slate-500 font-mono text-[9px] font-medium"
              >
                {/* Glowing Gradients definitions */}
                <defs>
                  <linearGradient id="monitoredGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#10b981" stopOpacity="0.12" />
                    <stop offset="100%" stopColor="#10b981" stopOpacity="0.00" />
                  </linearGradient>
                  <linearGradient id="unmonitoredGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#ef4444" stopOpacity="0.18" />
                    <stop offset="100%" stopColor="#ef4444" stopOpacity="0.00" />
                  </linearGradient>
                </defs>

                {/* Horizontal grid lines */}
                {Array.from({ length: 5 }).map((_, idx) => {
                  const yVal = paddingY + (idx * ((svgHeight - paddingY * 2) / 4));
                  const gridAmount = maxVal - (idx * (maxVal / 4));
                  return (
                    <g key={idx}>
                      <line 
                        x1={paddingX} 
                        y1={yVal} 
                        x2={svgWidth - paddingX} 
                        y2={yVal} 
                        stroke="#1e293b" 
                        strokeDasharray="2 2"
                      />
                      <text x={10} y={yVal + 3} fill="#475569" className="font-mono">
                        ${Math.round(gridAmount).toLocaleString()}
                      </text>
                    </g>
                  );
                })}

                {/* Shaded Areas underneath paths */}
                <path d={svgCoordinates.unmonitoredArea} fill="url(#unmonitoredGrad)" />
                <path d={svgCoordinates.monitoredArea} fill="url(#monitoredGrad)" />

                {/* Path Lines */}
                <path 
                  d={svgCoordinates.unmonitored} 
                  fill="none" 
                  stroke="#ef4444" 
                  strokeWidth="2.5" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                />
                <path 
                  d={svgCoordinates.monitored} 
                  fill="none" 
                  stroke="#10b981" 
                  strokeWidth="2.5" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                />

                {/* Nodes & Data Dots on Month 12 */}
                {svgCoordinates.rawCoords.monitoredCoords.length > 0 && (
                  <>
                    {/* Monitored node */}
                    <circle 
                      cx={svgCoordinates.rawCoords.monitoredCoords[11].x} 
                      cy={svgCoordinates.rawCoords.monitoredCoords[11].y} 
                      r="4.5" 
                      fill="#10b981" 
                      stroke="#020617" 
                      strokeWidth="1.5"
                    />
                    <text 
                      x={svgCoordinates.rawCoords.monitoredCoords[11].x - 65} 
                      y={svgCoordinates.rawCoords.monitoredCoords[11].y - 8} 
                      fill="#34d399" 
                      className="font-bold font-mono"
                    >
                      ${Math.round(chartData[11].monitored).toLocaleString()}
                    </text>

                    {/* Unmonitored node */}
                    <circle 
                      cx={svgCoordinates.rawCoords.unmonitoredCoords[11].x} 
                      cy={svgCoordinates.rawCoords.unmonitoredCoords[11].y} 
                      r="4.5" 
                      fill="#ef4444" 
                      stroke="#020617" 
                      strokeWidth="1.5"
                    />
                    <text 
                      x={svgCoordinates.rawCoords.unmonitoredCoords[11].x - 65} 
                      y={svgCoordinates.rawCoords.unmonitoredCoords[11].y - 8} 
                      fill="#f87171" 
                      className="font-bold font-mono"
                    >
                      ${Math.round(chartData[11].unmonitored).toLocaleString()}
                    </text>
                  </>
                )}

                {/* X-Axis labels */}
                {chartData.map((d, i) => {
                  const xVal = paddingX + (i * ((svgWidth - paddingX * 2) / 11));
                  return (
                    <text 
                      key={i} 
                      x={xVal - 8} 
                      y={svgHeight - 8} 
                      fill="#475569" 
                      className="font-mono text-[9px] font-bold"
                    >
                      {d.name}
                    </text>
                  );
                })}
              </svg>
            </div>

            {/* Legend & Summary indicators */}
            <div className="flex flex-wrap justify-between items-center text-[10px] pt-1.5 gap-4">
              <div className="flex gap-4">
                <div className="flex items-center gap-1.5">
                  <span className="h-2 w-2 rounded-full bg-emerald-500" />
                  <span className="text-slate-400 font-semibold">Monitored Base (Stable Endpoint Limits)</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="h-2 w-2 rounded-full bg-red-500" />
                  <span className="text-slate-400 font-semibold">Unmonitored Shadow (4% Compounding Slip)</span>
                </div>
              </div>
              <p className="text-slate-500 font-mono italic">
                *Estimated dynamic compounds assuming unblocked API access contexts.
              </p>
            </div>

          </div>

        </div>

        {/* RIGHT COLUMN: Real-time Ledger Dashboard & Lead Capture (5/12 cols) */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* Executive Exposure Summary Panel */}
          <div className="bg-slate-900 border border-slate-850 rounded-xl p-5 space-y-4 shadow-xl">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
              <TrendingUp className="w-4 h-4 text-emerald-400" />
              Corporate Telemetry Auditor Ledger
            </h3>

            {/* Risk Assessment Indicator Box */}
            <div className={`p-4 rounded-xl border flex gap-3 ${metrics.riskColor}`}>
              <ShieldAlert className="w-5 h-5 flex-shrink-0 mt-0.5" />
              <div className="space-y-1">
                <span className="text-xs font-bold uppercase tracking-wider block">
                  {metrics.riskRating} Exposure Risk Profile
                </span>
                <p className="text-[10px] leading-relaxed font-semibold">
                  {metrics.riskDesc}
                </p>
              </div>
            </div>

            {/* Financial metrics list */}
            <div className="space-y-2.5">
              
              <div className="bg-slate-950 border border-slate-850 p-3.5 rounded-xl flex justify-between items-center">
                <div className="space-y-0.5">
                  <span className="text-[9px] font-bold text-slate-500 uppercase tracking-widest block">Baseline Monthly Costs</span>
                  <span className="text-xs text-slate-300 font-semibold">Productive developer prompting spend</span>
                </div>
                <div className="text-right">
                  <span className="text-base font-extrabold text-white font-mono">${metrics.monthlyBaselineCost.toFixed(2)}</span>
                </div>
              </div>

              <div className="bg-slate-950 border border-slate-850 p-3.5 rounded-xl flex justify-between items-center">
                <div className="space-y-0.5">
                  <span className="text-[9px] font-bold text-red-500 uppercase tracking-widest block">Shadow Loop Leakage (Monthly)</span>
                  <span className="text-xs text-slate-300 font-semibold">Unmonitored runaway loop waste</span>
                </div>
                <div className="text-right">
                  <span className="text-base font-extrabold text-red-400 font-mono">${metrics.monthlyRunawayCost.toFixed(2)}</span>
                </div>
              </div>

              <div className="bg-slate-950 border border-emerald-500/10 p-3.5 rounded-xl flex justify-between items-center bg-gradient-to-r from-emerald-500/5 to-teal-500/0">
                <div className="space-y-0.5">
                  <span className="text-[9px] font-bold text-emerald-400 uppercase tracking-widest block">Annualized Shadow Exposure</span>
                  <span className="text-xs text-slate-300 font-semibold">Estimated fiscal unmonitored liabilities</span>
                </div>
                <div className="text-right">
                  <span className="text-xl font-extrabold text-emerald-400 font-mono">${metrics.totalAnnualCost.toFixed(2)}</span>
                </div>
              </div>

            </div>

            {/* Quick telemetry indicators */}
            <div className="grid grid-cols-2 gap-3 pt-2 text-center">
              <div className="bg-slate-950/60 border border-slate-850 p-3 rounded-lg">
                <span className="text-[8px] font-bold text-slate-500 uppercase tracking-widest block">Tokens Consumed / Mo</span>
                <span className="text-xs font-bold text-white font-mono mt-1 block">
                  {metrics.totalMonthlyTokens.toLocaleString()}
                </span>
              </div>

              <div className="bg-slate-950/60 border border-slate-850 p-3 rounded-lg">
                <span className="text-[8px] font-bold text-slate-500 uppercase tracking-widest block">Avg. Spent / Prompt Task</span>
                <span className="text-xs font-bold text-emerald-400 font-mono mt-1 block">
                  ${metrics.dailyCostPerDev.toFixed(4)}
                </span>
              </div>
            </div>

          </div>

          {/* Premium Multi-step Lead Capture Form */}
          <div className="bg-slate-900 border border-slate-850 rounded-xl p-5 space-y-4 shadow-xl relative overflow-hidden">
            
            {/* Background glowing indicator */}
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-emerald-500 via-teal-500 to-emerald-400" />
            
            {!isSubmitted ? (
              <>
                <div className="space-y-1">
                  <span className="text-[9px] font-bold text-emerald-400 uppercase tracking-widest block">
                    ENTERPRISE INTEGRATION REPORT
                  </span>
                  <h3 className="text-base font-extrabold font-space-grotesk text-white">
                    Download Free Shadow Cost Action Plan
                  </h3>
                  <p className="text-[10px] text-slate-400 leading-normal">
                    Receive a customized compliance blueprint PDF and local declarative MV3 rule manifests configured for your team's API infrastructure.
                  </p>
                </div>

                {/* Form Elements */}
                {!isSubmitting ? (
                  <form onSubmit={handleLeadSubmit} className="space-y-3.5 pt-2">
                    
                    <div className="space-y-1">
                      <label className="block text-[10px] text-slate-400 font-bold uppercase tracking-wider">Full Corporate Name</label>
                      <div className="relative">
                        <Users className="w-3.5 h-3.5 text-slate-500 absolute left-3.5 top-3" />
                        <input 
                          type="text" 
                          required
                          value={leadName}
                          onChange={(e) => setLeadName(e.target.value)}
                          placeholder="e.g. Johnathan Vance"
                          className="w-full bg-slate-950 border border-slate-800 focus:border-emerald-500 rounded-lg py-2 pl-9.5 pr-4 text-xs text-slate-200 focus:outline-none transition font-semibold"
                        />
                      </div>
                    </div>

                    <div className="space-y-1">
                      <label className="block text-[10px] text-slate-400 font-bold uppercase tracking-wider">Corporate Email Address</label>
                      <div className="relative">
                        <Mail className="w-3.5 h-3.5 text-slate-500 absolute left-3.5 top-3" />
                        <input 
                          type="email" 
                          required
                          value={leadEmail}
                          onChange={(e) => setLeadEmail(e.target.value)}
                          placeholder="e.g. j.vance@company.com"
                          className="w-full bg-slate-950 border border-slate-800 focus:border-emerald-500 rounded-lg py-2 pl-9.5 pr-4 text-xs text-slate-200 focus:outline-none transition font-mono font-medium"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div className="space-y-1">
                        <label className="block text-[10px] text-slate-400 font-bold uppercase tracking-wider">Company Name</label>
                        <div className="relative">
                          <Building className="w-3.5 h-3.5 text-slate-500 absolute left-3.5 top-3" />
                          <input 
                            type="text" 
                            required
                            value={leadCompany}
                            onChange={(e) => setLeadCompany(e.target.value)}
                            placeholder="Vance Labs"
                            className="w-full bg-slate-950 border border-slate-800 focus:border-emerald-500 rounded-lg py-2 pl-9.5 pr-3 text-xs text-slate-200 focus:outline-none transition font-semibold"
                          />
                        </div>
                      </div>

                      <div className="space-y-1">
                        <label className="block text-[10px] text-slate-400 font-bold uppercase tracking-wider">LLM Spending Scale</label>
                        <div className="relative">
                          <Briefcase className="w-3.5 h-3.5 text-slate-500 absolute left-3.5 top-3" />
                          <select 
                            value={leadScale}
                            onChange={(e) => setLeadScale(e.target.value)}
                            className="w-full bg-slate-950 border border-slate-800 focus:border-emerald-500 rounded-lg py-2 pl-9.5 pr-3 text-xs text-slate-200 focus:outline-none transition font-semibold"
                          >
                            <option value="<$1k/mo">&lt; $1,000 / mo</option>
                            <option value="$1k-$10k/mo">$1,000 - $10,000</option>
                            <option value="$10k-$50k/mo">$10,000 - $50,000</option>
                            <option value="$50k+/mo">$50,000+ / mo</option>
                          </select>
                        </div>
                      </div>
                    </div>

                    <button 
                      type="submit"
                      className="w-full bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs py-3 rounded-lg transition shadow-lg shadow-emerald-500/15 uppercase tracking-wider flex items-center justify-center gap-1.5 cursor-pointer mt-2"
                    >
                      <Sparkles className="w-3.5 h-3.5" />
                      Compile Action Plan & PDF Report
                    </button>
                  </form>
                ) : (
                  // Stateful Step progress indicator
                  <div className="py-8 flex flex-col items-center justify-center text-center space-y-4">
                    <RefreshCw className="w-8 h-8 text-emerald-500 animate-spin" />
                    
                    <div className="space-y-1">
                      <span className="text-[10px] font-mono font-bold text-emerald-400 uppercase tracking-widest block">
                        Processing Telemetry Audit
                      </span>
                      
                      <div className="text-xs text-slate-300 font-semibold h-5">
                        {submitStep === 1 && "Scrubbing unmonitored employee API ports..."}
                        {submitStep === 2 && "Analyzing cumulative recursive loop spends..."}
                        {submitStep === 3 && "Integrating MV3 declarative DNR compliance rules..."}
                        {submitStep === 4 && "Assembling executive cost reduction PDF blueprint..."}
                      </div>
                    </div>

                    {/* Faux load bar */}
                    <div className="w-48 h-1 bg-slate-950 border border-slate-850 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-emerald-500 transition-all duration-500" 
                        style={{ width: `${(submitStep * 25)}%` }}
                      />
                    </div>
                  </div>
                )}
              </>
            ) : (
              // Stateful submission success & data presentation
              <div className="py-2 space-y-4 animate-fade-in">
                <div className="flex items-center gap-2 border-b border-slate-800 pb-3">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0" />
                  <div>
                    <h3 className="text-sm font-bold text-white leading-tight">
                      Action Plan Compiled Successfully!
                    </h3>
                    <p className="text-[9.5px] text-slate-500">
                      Report code: MTC-SHADOW-{leadCompany.toUpperCase().slice(0,4)}-2026
                    </p>
                  </div>
                </div>

                <div className="bg-slate-950 border border-slate-850 rounded-xl p-3.5 text-xs space-y-2">
                  <div className="flex justify-between">
                    <span className="text-slate-500 font-semibold">Prepared For:</span>
                    <span className="text-white font-bold">{leadName}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500 font-semibold">Corporate Domain:</span>
                    <span className="text-white font-bold font-mono">{leadCompany}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500 font-semibold">Target API Spend:</span>
                    <span className="text-white font-bold font-mono">{leadScale}</span>
                  </div>
                  <div className="flex justify-between border-t border-slate-850 pt-2 mt-1">
                    <span className="text-slate-500 font-semibold">Shadow Waste Leakage:</span>
                    <span className="text-red-400 font-extrabold font-mono">${metrics.monthlyRunawayCost.toFixed(2)}/mo</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500 font-semibold">Annual Prevented Spends:</span>
                    <span className="text-emerald-400 font-extrabold font-mono">${(metrics.annualRunawayCost).toFixed(2)}/yr</span>
                  </div>
                </div>

                <p className="text-[10px] text-slate-400 leading-relaxed">
                  We have dispatched your dynamic sitemap telemetry and optimized declarative net rules configuration to <strong className="text-emerald-400 font-mono font-medium">{leadEmail}</strong>.
                </p>

                <div className="flex gap-2">
                  <button 
                    onClick={() => {
                      triggerToast("Mock Action Plan PDF successfully saved.");
                    }}
                    className="flex-grow bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs py-2.5 rounded-lg transition shadow-lg shadow-emerald-500/10 uppercase tracking-wider flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <Download className="w-3.5 h-3.5" />
                    Download PDF Blueprint
                  </button>

                  <button 
                    onClick={() => {
                      setIsSubmitted(false);
                      setLeadName("");
                      setLeadEmail("");
                      setLeadCompany("");
                    }}
                    className="px-3 bg-slate-950 hover:bg-slate-850 border border-slate-800 hover:border-slate-700 text-xs font-bold text-slate-300 rounded-lg transition"
                    title="Audit another domain"
                  >
                    Reset
                  </button>
                </div>
              </div>
            )}

          </div>

          {/* Secure gateway disclaimer */}
          <div className="bg-slate-900/50 border border-slate-850 rounded-xl p-4 flex gap-3 text-[10px] text-slate-400 leading-normal">
            <Lock className="w-4 h-4 text-emerald-400/80 flex-shrink-0 mt-0.5" />
            <p>
              MyTokenCost respects enterprise security boundaries. All calculations and sliders processed inside this Shadow AI Auditor are compiled 100% locally in your client's web browser environment. We never store or upload unencrypted telemetry indicators.
            </p>
          </div>

        </div>

      </main>

    </div>
  );
}
