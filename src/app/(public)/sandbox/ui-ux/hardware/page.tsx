"use client";

import React, { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import { 
  Cpu, 
  Zap, 
  Layers, 
  Activity, 
  CheckCircle, 
  Server, 
  TrendingUp, 
  AlertTriangle, 
  ChevronRight, 
  Terminal, 
  Sliders, 
  X, 
  Mail, 
  User, 
  DollarSign, 
  Lock, 
  RefreshCw, 
  ShieldCheck, 
  Flame, 
  CornerDownRight 
} from "lucide-react";
import { LLM_RATE_CARD } from "@/lib/shared/rates";

// Types for pre-configured nodes
interface NodeConfig {
  id: "lite" | "pro" | "cluster";
  name: string;
  tagline: string;
  defaultPrice: number;
  upgradePrice: number;
  upgradeText: string;
  defaultSpecs: string[];
  upgradeSpecs: string[];
  targetModels: string[];
  activeWatts: number;
  standbyWatts: number;
  speedTps: number;
}

const HARDWARE_NODES: Record<"lite" | "pro" | "cluster", NodeConfig> = {
  lite: {
    id: "lite",
    name: "MTK Lite Node",
    tagline: "Compact, ultra-silent mini-PC for personal dev & lightweight apps.",
    defaultPrice: 1499,
    upgradePrice: 400,
    upgradeText: "Upgrade to 64GB DDR5 RAM",
    defaultSpecs: [
      "AMD Ryzen 9 (16 Cores / 32 Threads)",
      "32GB High-Speed DDR5 RAM",
      "1TB NVMe PCIe 4.0 SSD",
      "Ultra-quiet 18dB sound profile under full load",
      "Power average: 45W active / 15W standby"
    ],
    upgradeSpecs: [
      "AMD Ryzen 9 (16 Cores / 32 Threads)",
      "64GB High-Speed DDR5 RAM (+24GB shared VRAM capability)",
      "1TB NVMe PCIe 4.0 SSD",
      "Ultra-quiet 18dB sound profile under full load",
      "Power average: 50W active / 18W standby"
    ],
    targetModels: ["Llama-3 8B (Q8)", "Qwen-2.5 14B (Q4)", "Mistral 7B (FP16)"],
    activeWatts: 75,
    standbyWatts: 15,
    speedTps: 45
  },
  pro: {
    id: "pro",
    name: "MTK Pro Node",
    tagline: "Dual-GPU Workstation. Optimized for 70B parameter models and parallel APIs.",
    defaultPrice: 3999,
    upgradePrice: 2300,
    upgradeText: "Upgrade to 4x 24GB VRAM (96GB Total)",
    defaultSpecs: [
      "Intel Xeon Gold / AMD Threadripper 24-Core",
      "2x RTX 3090 / 4090 Dedicated GPU (48GB VRAM)",
      "128GB EEC DDR5 RAM",
      "2TB NVMe PCIe 5.0 Enterprise SSD",
      "Liquid-cooled, silent dual-fan tower workstation",
      "Power average: 380W active / 55W standby"
    ],
    upgradeSpecs: [
      "Intel Xeon Gold / AMD Threadripper 32-Core",
      "4x RTX 3090 / 4090 Dedicated GPU (96GB VRAM)",
      "256GB ECC DDR5 RAM",
      "4TB NVMe PCIe 5.0 Enterprise SSD",
      "Liquid-cooled, heavy-duty silent workstation tower",
      "Power average: 750W active / 80W standby"
    ],
    targetModels: ["DeepSeek-R1 70B (Q4)", "Llama-3 70B (Q4)", "Qwen-2.5 72B (Q5)", "Command R+ 104B"],
    activeWatts: 500,
    standbyWatts: 60,
    speedTps: 28
  },
  cluster: {
    id: "cluster",
    name: "MTK Cluster-4U",
    tagline: "4U rackmount server for dense enterprise pipelines and high concurrent workloads.",
    defaultPrice: 8499,
    upgradePrice: 1400,
    upgradeText: "Upgrade to 8TB RAID-10 NVMe Storage",
    defaultSpecs: [
      "Dual AMD EPYC Rome (64 Cores / 128 Threads)",
      "4x RTX 4090 / L40S GPU arrays (96GB VRAM)",
      "256GB ECC DDR5 System Memory",
      "2TB Enterprise SSD PCIe 5.0",
      "Standard 4U enterprise server cabinet configuration",
      "Power average: 900W active / 110W standby"
    ],
    upgradeSpecs: [
      "Dual AMD EPYC Rome (64 Cores / 128 Threads)",
      "4x RTX 4090 / L40S GPU arrays (96GB VRAM)",
      "512GB ECC DDR5 System Memory",
      "8TB RAID-10 High-IOPS NVMe Array",
      "Standard 4U enterprise server cabinet configuration",
      "Power average: 950W active / 120W standby"
    ],
    targetModels: ["DeepSeek-R1 671B Mixture-of-Experts", "Llama-3.1 405B (Q4)", "Full concurrent arrays"],
    activeWatts: 950,
    standbyWatts: 120,
    speedTps: 65
  }
};

const LOG_TEMPLATES = [
  "INFERENCE - Prompt received: 'Optimizing parallel matrix multiplication in Triton...'",
  "COMPILING - Allocating VRAM buffers across standard hardware layers...",
  "GENERATING - Model: DeepSeek-R1-70B | Active VRAM utilization: 41.5 GB",
  "METRICS - Watt-per-Token calculation finalized: 0.0094 Wh/token",
  "SECURITY - Request executed air-gapped. Zero telemetry logged to cloud.",
  "SAVINGS - Token generation saved $0.064 compared to Anthropic Claude-3.5 API rates.",
  "STANDBY - Listening on local endpoint http://127.0.0.1:8080/v1/chat/completions..."
];

export default function HardwareStorefront() {
  // Page Configuration State
  const [selectedNodeId, setSelectedNodeId] = useState<"lite" | "pro" | "cluster">("pro");
  const [upgrades, setUpgrades] = useState<Record<"lite" | "pro" | "cluster", boolean>>({
    lite: false,
    pro: false,
    cluster: false
  });

  // ROI Sliders State
  const [apiSpend, setApiSpend] = useState<number>(1250); // range 50 - 10000+
  const [dailyTokens, setDailyTokens] = useState<number>(2500); // in thousands, e.g. 2,500K = 2.5M tokens, range 100 to 20000

  // Manual Node Override in Calculator
  const [calculatorOverrideNodeId, setCalculatorOverrideNodeId] = useState<"auto" | "lite" | "pro" | "cluster">("auto");

  // Telemetry animation logs state
  const [logs, setLogs] = useState<string[]>([
    "BOOT - MTK Node-01 initialization successful. Local API monitor operational.",
    "STATUS - Listening for internal inference calls on localhost:8080..."
  ]);
  const [simulatedTokensSaved, setSimulatedTokensSaved] = useState<number>(142500);
  const [simulatedDollarsSaved, setSimulatedDollarsSaved] = useState<number>(356.25);
  const [tempCelsius, setTempCelsius] = useState<number>(44);
  const [activeSpeed, setActiveSpeed] = useState<number>(0);

  // Lead Form State
  const [leadName, setLeadName] = useState("");
  const [leadEmail, setLeadEmail] = useState("");
  const [leadModels, setLeadModels] = useState<string[]>([]);
  const [leadMessage, setLeadMessage] = useState("");
  const [leadSubmitted, setLeadSubmitted] = useState(false);

  // Reservation Modal State
  const [checkoutModalOpen, setCheckoutModalOpen] = useState(false);
  const [checkoutNodeId, setCheckoutNodeId] = useState<"lite" | "pro" | "cluster">("pro");
  const [resName, setResName] = useState("");
  const [resEmail, setResEmail] = useState("");
  const [resStreet, setResStreet] = useState("");
  const [resCity, setResCity] = useState("");
  const [resCountry, setResCountry] = useState("United States");
  const [reservationHash, setReservationHash] = useState("");
  const [resSuccess, setResSuccess] = useState(false);

  // Live simulation telemetry ticker
  useEffect(() => {
    const interval = setInterval(() => {
      // 1. Temperature fluctuations
      setTempCelsius(prev => {
        const delta = Math.random() > 0.5 ? 1 : -1;
        const next = prev + delta;
        return next < 40 ? 40 : next > 62 ? 60 : next;
      });

      // 2. Generate logs
      const randIdx = Math.floor(Math.random() * LOG_TEMPLATES.length);
      const timestamp = new Date().toLocaleTimeString();
      setLogs(prev => {
        const next = [...prev, `[${timestamp}] ${LOG_TEMPLATES[randIdx]}`];
        if (next.length > 5) next.shift();
        return next;
      });

      // 3. Add to simulated tokens & savings
      const tokensGenerated = Math.floor(Math.random() * 25000) + 5000;
      setSimulatedTokensSaved(prev => prev + tokensGenerated);
      // average cloud cost per 1M is ~$8.00. Average local power cost per 1M is ~$0.15. Savings per token is ~$0.0000078
      setSimulatedDollarsSaved(prev => prev + (tokensGenerated * 0.00000785));

      // 4. Temporarily show active speed when "generating"
      if (randIdx === 2) {
        setActiveSpeed(HARDWARE_NODES[selectedNodeId].speedTps + Math.floor(Math.random() * 6 - 3));
        setTimeout(() => setActiveSpeed(0), 1500);
      }
    }, 3000);

    return () => clearInterval(interval);
  }, [selectedNodeId]);

  // Determine recommended node tier based on monthly spend
  const recommendedNodeId = useMemo(() => {
    if (apiSpend < 500) return "lite";
    if (apiSpend <= 2500) return "pro";
    return "cluster";
  }, [apiSpend]);

  // Selected evaluating node for the calculator
  const activeCalcNodeId = useMemo(() => {
    if (calculatorOverrideNodeId === "auto") {
      return recommendedNodeId;
    }
    return calculatorOverrideNodeId;
  }, [calculatorOverrideNodeId, recommendedNodeId]);

  // Active calculator node pricing & power parameters
  const currentCalcNode = HARDWARE_NODES[activeCalcNodeId];
  const isCalcNodeUpgraded = upgrades[activeCalcNodeId];
  const activeHardwareCost = currentCalcNode.defaultPrice + (isCalcNodeUpgraded ? currentCalcNode.upgradePrice : 0);

  // Dynamic Power Cost Calculation:
  // Active speed (TPS), tokens per day, grid cost (standard default $0.15/kWh)
  const powerCostCalculations = useMemo(() => {
    const dailyTokensActual = dailyTokens * 1000; // slider is in thousands
    const activeWatts = currentCalcNode.activeWatts;
    const standbyWatts = currentCalcNode.standbyWatts;
    const tps = currentCalcNode.speedTps;

    // active runtime per day in hours
    const activeHoursPerDay = dailyTokensActual / (tps * 3600);
    const cappedActiveHours = Math.min(24, activeHoursPerDay);
    const standbyHoursPerDay = 24 - cappedActiveHours;

    // Daily kWh
    const dailyKwh = ((cappedActiveHours * activeWatts) + (standbyHoursPerDay * standbyWatts)) / 1000;
    const monthlyKwh = dailyKwh * 30.4;
    const monthlyPowerCost = monthlyKwh * 0.15; // default electricity grid cost: $0.15/kWh

    return {
      monthlyPowerCost,
      kwhPerMonth: monthlyKwh,
      dutyCyclePercent: (cappedActiveHours / 24) * 100
    };
  }, [dailyTokens, currentCalcNode]);

  // Payback & Savings metrics
  const paybackPeriodMonths = useMemo(() => {
    const monthlySavings = apiSpend - powerCostCalculations.monthlyPowerCost;
    if (monthlySavings <= 0) return 99.9; // Never breaks even if power cost is higher than cloud spend
    const months = activeHardwareCost / monthlySavings;
    return parseFloat(months.toFixed(1));
  }, [apiSpend, powerCostCalculations, activeHardwareCost]);

  const savings3Year = useMemo(() => {
    const cloud3Year = apiSpend * 36;
    const local3Year = activeHardwareCost + (powerCostCalculations.monthlyPowerCost * 36);
    const netSavings = cloud3Year - local3Year;
    return {
      cloud: cloud3Year,
      local: local3Year,
      net: netSavings
    };
  }, [apiSpend, activeHardwareCost, powerCostCalculations]);

  // Toggle checklist model select
  const toggleModelSelect = (modelName: string) => {
    if (leadModels.includes(modelName)) {
      setLeadModels(prev => prev.filter(m => m !== modelName));
    } else {
      setLeadModels(prev => [...prev, modelName]);
    }
  };

  // Launch Checkout Modal
  const openCheckout = (nodeId: "lite" | "pro" | "cluster") => {
    setCheckoutNodeId(nodeId);
    setResName("");
    setResEmail("");
    setResStreet("");
    setResCity("");
    setResSuccess(false);
    setCheckoutModalOpen(true);
  };

  // Handle shipping/reservation submission
  const handleReservationSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!resName || !resEmail || !resStreet || !resCity) return;
    
    // Generate static hex-hash for high-tech look
    const randomHex = Array.from({ length: 16 }, () => 
      Math.floor(Math.random() * 16).toString(16)
    ).join("").toUpperCase();
    
    setReservationHash(`MTK-${randomHex.substring(0,4)}-${randomHex.substring(4,8)}`);
    setResSuccess(true);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 selection:bg-cyan-500/30 selection:text-cyan-200">
      
      {/* Sandbox High-Tech Top Banner Bar */}
      <div className="sticky top-16 z-30 bg-slate-950/90 backdrop-blur-md border-b border-slate-900 py-3.5 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <Link href="/" className="text-slate-400 hover:text-white transition flex items-center gap-1 text-[11px] font-bold uppercase tracking-wider">
                <span className="text-[#00f0ff]">←</span> Back to Main
              </Link>
              <span className="text-slate-800">|</span>
              <div className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[9px] font-mono font-extrabold bg-[#00f0ff]/10 text-[#00f0ff] border border-[#00f0ff]/20 tracking-wider uppercase animate-pulse">
                Staging Preview
              </div>
            </div>
            <h1 className="text-sm font-bold font-mono text-white flex items-center gap-2">
              <Layers className="w-4 h-4 text-[#00f0ff]" />
              hw.mytokencost.com Storefront & ROI Sandbox
            </h1>
          </div>

          <div className="flex items-center gap-3 text-xs">
            <span className="text-slate-500 font-mono hidden lg:inline">
              SSOT Rates: GPT-4o @ $5.00/1M | Claude 3.5 @ $3.00/1M
            </span>
            <button 
              onClick={() => {
                setApiSpend(1250);
                setDailyTokens(2500);
                setUpgrades({ lite: false, pro: false, cluster: false });
                setCalculatorOverrideNodeId("auto");
              }}
              className="bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-400 hover:text-white font-mono px-3 py-1.5 rounded-md transition flex items-center gap-1.5"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              Reset Staging
            </button>
          </div>
        </div>
      </div>

      {/* Cyberpunk Header Background Effects */}
      <div className="relative overflow-hidden pt-20 pb-16 lg:pt-28 lg:pb-24 border-b border-slate-900 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(0,240,255,0.07),rgba(255,255,255,0))]">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#0f172a_1px,transparent_1px),linear-gradient(to_bottom,#0f172a_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-35" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            
            {/* Hero Left Column */}
            <div className="lg:col-span-7 space-y-6 text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md text-[10px] font-mono font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 uppercase tracking-widest">
                <Zap className="w-3.5 h-3.5" />
                Hardware Fundraiser for Open-Source Dev
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black font-space-grotesk tracking-tight text-white leading-[1.05]">
                Stop Renting LLMs. <br />
                <span className="bg-gradient-to-r from-cyan-400 via-emerald-400 to-[#00f0ff] bg-clip-text text-transparent">
                  Own Your Inference.
                </span>
              </h1>
              <p className="text-base sm:text-lg text-slate-400 max-w-2xl leading-relaxed">
                Pre-configured, ultra-quiet local hardware nodes optimized strictly for high price-to-VRAM density. Run DeepSeek-R1, Qwen-2.5, and Llama-3 local servers. Lock in 100% data privacy and zero monthly vendor lock-in.
              </p>
              
              <div className="pt-2 flex flex-wrap gap-4 text-xs font-mono text-slate-500">
                <span className="flex items-center gap-1.5 bg-slate-900/60 px-3 py-1.5 rounded-lg border border-slate-900">
                  <span className="w-2 h-2 rounded-full bg-emerald-500" />
                  Pre-configured & Plug-and-Play
                </span>
                <span className="flex items-center gap-1.5 bg-slate-900/60 px-3 py-1.5 rounded-lg border border-slate-900">
                  <span className="w-2 h-2 rounded-full bg-cyan-400" />
                  Local Open-Source Monitor Pre-installed
                </span>
              </div>

              <div className="pt-4 flex flex-col sm:flex-row gap-4">
                <a 
                  href="#calculator"
                  className="bg-[#00f0ff] hover:bg-[#00d8e6] text-slate-950 font-bold px-6 py-3.5 rounded-xl text-sm tracking-wider uppercase transition shadow-lg shadow-cyan-500/10 flex items-center justify-center gap-2 hover:scale-[1.01] active:scale-[0.99]"
                >
                  <Sliders className="w-4 h-4" />
                  Calculate ROI Breakeven
                </a>
                <a 
                  href="#catalog"
                  className="bg-slate-900 hover:bg-slate-800 border border-slate-800 text-white font-bold px-6 py-3.5 rounded-xl text-sm tracking-wider uppercase transition flex items-center justify-center gap-2"
                >
                  Explore Nodes
                </a>
              </div>
            </div>

            {/* Hero Right Column: Dynamic Terminal Mockup */}
            <div className="lg:col-span-5">
              <div className="relative group rounded-2xl border border-slate-800/80 bg-slate-950/60 shadow-2xl backdrop-blur-sm overflow-hidden p-0.5">
                {/* Glow border layer */}
                <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500/20 via-slate-950 to-emerald-500/15 opacity-80 rounded-2xl" />
                
                <div className="relative bg-slate-950 rounded-2xl p-4 sm:p-5 font-mono text-xs text-slate-300">
                  {/* Title Bar */}
                  <div className="flex items-center justify-between pb-3 border-b border-slate-900 mb-4">
                    <div className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-red-500/70" />
                      <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/70" />
                      <span className="w-2.5 h-2.5 rounded-full bg-green-500/70" />
                      <span className="text-[10px] text-slate-500 ml-2">node01_status.log</span>
                    </div>
                    <div className="flex items-center gap-1.5 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded px-2 py-0.5 text-[10px]">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                      ONLINE
                    </div>
                  </div>

                  {/* Grid of Telemetry */}
                  <div className="grid grid-cols-2 gap-3 mb-4">
                    <div className="bg-slate-900/60 p-3 rounded-lg border border-slate-900">
                      <div className="text-[10px] text-slate-500 uppercase">Selected Model</div>
                      <div className="text-white font-bold text-sm tracking-tight truncate flex items-center gap-1 mt-1">
                        <Cpu className="w-3.5 h-3.5 text-cyan-400" />
                        DeepSeek-R1-70B
                      </div>
                    </div>
                    <div className="bg-slate-900/60 p-3 rounded-lg border border-slate-900">
                      <div className="text-[10px] text-slate-500 uppercase">GPU Temperature</div>
                      <div className="text-white font-bold text-sm tracking-tight flex items-center gap-1 mt-1">
                        <Flame className="w-3.5 h-3.5 text-red-400" />
                        {tempCelsius}°C <span className="text-[10px] text-slate-500 font-normal">(Fan: 42%)</span>
                      </div>
                    </div>
                    <div className="bg-slate-900/60 p-3 rounded-lg border border-slate-900">
                      <div className="text-[10px] text-slate-500 uppercase">Telemetry Savings</div>
                      <div className="text-emerald-400 font-bold text-sm tracking-tight flex items-center gap-1 mt-1">
                        <DollarSign className="w-3.5 h-3.5" />
                        {simulatedDollarsSaved.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                      </div>
                    </div>
                    <div className="bg-slate-900/60 p-3 rounded-lg border border-slate-900">
                      <div className="text-[10px] text-slate-500 uppercase">Tokens Generated</div>
                      <div className="text-cyan-400 font-bold text-sm tracking-tight mt-1">
                        {simulatedTokensSaved.toLocaleString()}
                      </div>
                    </div>
                  </div>

                  {/* Telemetry log output terminal streams */}
                  <div className="bg-slate-950 p-3 rounded-lg border border-slate-900 min-h-[140px] flex flex-col justify-end space-y-1">
                    <div className="text-[10px] text-slate-600 mb-1 border-b border-slate-900 pb-1 flex justify-between">
                      <span>STREAM OUTPUT (stdout)</span>
                      <span>{activeSpeed > 0 ? `⚡ ${activeSpeed} tok/s` : "STANDBY"}</span>
                    </div>
                    {logs.map((log, index) => {
                      let color = "text-slate-400";
                      if (log.includes("SAVINGS")) color = "text-emerald-400";
                      if (log.includes("GENERATING") || log.includes("ONLINE")) color = "text-cyan-400";
                      if (log.includes("SECURITY")) color = "text-blue-400";
                      
                      return (
                        <div key={index} className={`text-[10px] tracking-tight leading-relaxed transition-all duration-300 font-mono ${color}`}>
                          {log}
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* Calculator Section */}
      <div id="calculator" className="py-20 border-b border-slate-900 bg-slate-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md text-[10px] font-mono font-bold bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 uppercase tracking-widest">
              Interactive ROI Engine
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold font-space-grotesk text-white">
              Verify the Economics in Real Time
            </h2>
            <p className="text-slate-400 text-sm sm:text-base">
              LLM API rental is a massive recurring operating expense. Run the numbers below to see the exact breakeven horizon and cost savings of purchasing local nodes.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Calculator Inputs (5 cols) */}
            <div className="lg:col-span-5 bg-slate-900/40 border border-slate-900 rounded-2xl p-6 sm:p-8 space-y-8">
              <h3 className="text-base font-bold font-mono text-white flex items-center gap-2 pb-3 border-b border-slate-900">
                <Sliders className="w-4 h-4 text-cyan-400" />
                Calculator Parameters
              </h3>

              {/* Slider 1: Cloud API Spend */}
              <div className="space-y-3">
                <div className="flex justify-between items-center text-xs font-mono">
                  <span className="text-slate-400">Current Cloud API Spend</span>
                  <span className="text-cyan-400 font-bold text-sm bg-cyan-500/10 border border-cyan-500/20 px-2 py-0.5 rounded">
                    ${apiSpend.toLocaleString()}/mo
                  </span>
                </div>
                <input 
                  type="range"
                  min="50"
                  max="10000"
                  step="50"
                  value={apiSpend}
                  onChange={(e) => setApiSpend(Number(e.target.value))}
                  className="w-full h-1 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-[#00f0ff]"
                />
                <div className="flex justify-between text-[10px] text-slate-500 font-mono">
                  <span>$50</span>
                  <span>$2,500</span>
                  <span>$5,000</span>
                  <span>$10,000+</span>
                </div>
              </div>

              {/* Slider 2: Estimated Tokens */}
              <div className="space-y-3">
                <div className="flex justify-between items-center text-xs font-mono">
                  <span className="text-slate-400">Estimated Tokens / Day</span>
                  <span className="text-[#00f0ff] font-bold text-sm bg-cyan-500/10 border border-cyan-500/20 px-2 py-0.5 rounded">
                    {(dailyTokens * 1000).toLocaleString()} tokens
                  </span>
                </div>
                <input 
                  type="range"
                  min="100"
                  max="20000"
                  step="100"
                  value={dailyTokens}
                  onChange={(e) => setDailyTokens(Number(e.target.value))}
                  className="w-full h-1 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-[#00f0ff]"
                />
                <div className="flex justify-between text-[10px] text-slate-500 font-mono">
                  <span>100K</span>
                  <span>5M</span>
                  <span>10M</span>
                  <span>20M+</span>
                </div>
              </div>

              {/* Hardware Evaluation Mode */}
              <div className="space-y-3 pt-2">
                <label className="text-xs font-mono text-slate-400">Evaluate Hardware Tier:</label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  <button
                    onClick={() => setCalculatorOverrideNodeId("auto")}
                    className={`text-[10px] font-mono py-2 px-2.5 rounded-lg border text-center transition ${
                      calculatorOverrideNodeId === "auto" 
                        ? "bg-cyan-500/10 border-cyan-400 text-cyan-300 font-bold" 
                        : "bg-slate-950 border-slate-900 text-slate-500 hover:text-slate-300 hover:border-slate-800"
                    }`}
                  >
                    Auto-Fit
                  </button>
                  <button
                    onClick={() => setCalculatorOverrideNodeId("lite")}
                    className={`text-[10px] font-mono py-2 px-2.5 rounded-lg border text-center transition ${
                      calculatorOverrideNodeId === "lite" 
                        ? "bg-cyan-500/10 border-cyan-400 text-cyan-300 font-bold" 
                        : "bg-slate-950 border-slate-900 text-slate-500 hover:text-slate-300 hover:border-slate-800"
                    }`}
                  >
                    Lite Node
                  </button>
                  <button
                    onClick={() => setCalculatorOverrideNodeId("pro")}
                    className={`text-[10px] font-mono py-2 px-2.5 rounded-lg border text-center transition ${
                      calculatorOverrideNodeId === "pro" 
                        ? "bg-cyan-500/10 border-cyan-400 text-cyan-300 font-bold" 
                        : "bg-slate-950 border-slate-900 text-slate-500 hover:text-slate-300 hover:border-slate-800"
                    }`}
                  >
                    Pro Node
                  </button>
                  <button
                    onClick={() => setCalculatorOverrideNodeId("cluster")}
                    className={`text-[10px] font-mono py-2 px-2.5 rounded-lg border text-center transition ${
                      calculatorOverrideNodeId === "cluster" 
                        ? "bg-cyan-500/10 border-cyan-400 text-cyan-300 font-bold" 
                        : "bg-slate-950 border-slate-900 text-slate-500 hover:text-slate-300 hover:border-slate-800"
                    }`}
                  >
                    Cluster-4U
                  </button>
                </div>
                <div className="text-[10px] text-slate-500 font-mono leading-relaxed pt-1">
                  {calculatorOverrideNodeId === "auto" ? (
                    <span className="flex items-center gap-1 text-emerald-400/90">
                      <CheckCircle className="w-3.5 h-3.5 flex-shrink-0" />
                      Auto-matched to: <strong>{currentCalcNode.name}</strong> ($
                      {(currentCalcNode.defaultPrice + (upgrades[currentCalcNode.id] ? currentCalcNode.upgradePrice : 0)).toLocaleString()})
                    </span>
                  ) : (
                    <span>Evaluating: <strong>{currentCalcNode.name}</strong> (Manual selection override)</span>
                  )}
                </div>
              </div>
            </div>

            {/* Calculator Outputs (7 cols) */}
            <div className="lg:col-span-7 space-y-6">
              
              {/* Output Metrics Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                
                {/* Metric 1: Recommended Node */}
                <div className="bg-slate-900/40 border border-slate-900 rounded-xl p-4 flex flex-col justify-between space-y-2">
                  <div className="text-[10px] text-slate-500 font-mono uppercase tracking-wider">Recommended Node</div>
                  <div>
                    <div className="text-white font-black text-sm tracking-tight truncate">{currentCalcNode.name}</div>
                    <div className="text-[10px] text-slate-400 font-mono mt-1">
                      Cap: {currentCalcNode.targetModels[0]}
                    </div>
                  </div>
                  <div className="pt-2 border-t border-slate-950 text-[10px] text-cyan-400 font-mono">
                    Total Hardware Cost: ${activeHardwareCost.toLocaleString()}
                  </div>
                </div>

                {/* Metric 2: Payback Period */}
                <div className="bg-slate-900/40 border border-slate-900 rounded-xl p-4 flex flex-col justify-between space-y-2">
                  <div className="text-[10px] text-slate-500 font-mono uppercase tracking-wider">Payback Horizon</div>
                  <div>
                    <div className="text-emerald-400 font-black text-2xl font-space-grotesk tracking-tight">
                      {paybackPeriodMonths > 60 ? "Never" : `${paybackPeriodMonths} Months`}
                    </div>
                    <div className="text-[10px] text-slate-400 font-mono mt-1">
                      Breakeven timeline
                    </div>
                  </div>
                  <div className="pt-2 border-t border-slate-950 text-[10px] text-slate-500 font-mono">
                    Hardware + local power amortization
                  </div>
                </div>

                {/* Metric 3: Est. Power Cost */}
                <div className="bg-slate-900/40 border border-slate-900 rounded-xl p-4 flex flex-col justify-between space-y-2">
                  <div className="text-[10px] text-slate-500 font-mono uppercase tracking-wider">Estimated Local Power</div>
                  <div>
                    <div className="text-cyan-400 font-black text-2xl font-space-grotesk tracking-tight">
                      ${powerCostCalculations.monthlyPowerCost.toFixed(2)}/mo
                    </div>
                    <div className="text-[10px] text-slate-400 font-mono mt-1 flex items-center gap-1">
                      Duty cycle: {powerCostCalculations.dutyCyclePercent.toFixed(1)}%
                    </div>
                  </div>
                  <div className="pt-2 border-t border-slate-950 text-[10px] text-slate-500 font-mono">
                    Based on {powerCostCalculations.kwhPerMonth.toFixed(1)} kWh @ $0.15/kWh
                  </div>
                </div>

              </div>

              {/* 3-Year Visual Comparison Chart */}
              <div className="bg-slate-900/40 border border-slate-900 rounded-2xl p-6 sm:p-8 space-y-6">
                <div className="flex justify-between items-center">
                  <h4 className="text-xs font-mono text-white uppercase tracking-wider">3-Year TCO Comparison</h4>
                  <span className="text-[10px] text-slate-500 font-mono bg-slate-950 border border-slate-900 px-2 py-0.5 rounded">
                    Total Cost of Ownership (36 Months)
                  </span>
                </div>

                <div className="space-y-5">
                  {/* Cloud Cost Bar */}
                  <div className="space-y-2">
                    <div className="flex justify-between text-xs font-mono">
                      <span className="text-slate-400">3-Year Cloud API Spend</span>
                      <span className="text-white font-bold">${savings3Year.cloud.toLocaleString()}</span>
                    </div>
                    <div className="h-4 bg-slate-950 border border-slate-900 rounded-full overflow-hidden p-0.5">
                      <div 
                        className="h-full rounded-full bg-gradient-to-r from-red-500 to-amber-500 transition-all duration-500"
                        style={{ width: "100%" }}
                      />
                    </div>
                  </div>

                  {/* Local Cost Bar */}
                  <div className="space-y-2">
                    <div className="flex justify-between text-xs font-mono">
                      <span className="text-slate-400">
                        3-Year Local Cost <span className="text-[10px] text-slate-500">(Hardware + Power)</span>
                      </span>
                      <span className="text-[#00f0ff] font-bold">${savings3Year.local.toLocaleString()}</span>
                    </div>
                    <div className="h-4 bg-slate-950 border border-slate-900 rounded-full overflow-hidden p-0.5">
                      <div 
                        className="h-full rounded-full bg-gradient-to-r from-cyan-500 to-emerald-400 transition-all duration-500"
                        style={{ width: `${Math.max(8, Math.min(100, (savings3Year.local / savings3Year.cloud) * 100))}%` }}
                      />
                    </div>
                  </div>
                </div>

                {/* Net Savings Box */}
                <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-xl p-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                  <div className="space-y-1">
                    <div className="text-xs font-mono font-bold text-emerald-400 uppercase tracking-widest flex items-center gap-1.5">
                      <CheckCircle className="w-4 h-4 text-emerald-400" />
                      Net 3-Year Amortized Savings
                    </div>
                    <p className="text-[11px] text-slate-400 leading-tight">
                      This represents the cold hard cash kept in your business bank account vs paying high-margin cloud LLM markups.
                    </p>
                  </div>
                  <div className="text-left sm:text-right flex-shrink-0">
                    <div className="text-emerald-400 text-3xl font-black font-space-grotesk tracking-tight">
                      ${savings3Year.net > 0 ? savings3Year.net.toLocaleString(undefined, { maximumFractionDigits: 0 }) : "0"}
                    </div>
                    <div className="text-[9px] text-emerald-500 font-mono font-extrabold tracking-widest uppercase">
                      {(savings3Year.net > 0 && savings3Year.cloud > 0) ? `${((savings3Year.net / savings3Year.cloud) * 100).toFixed(0)}% ROI SAVINGS` : "N/A"}
                    </div>
                  </div>
                </div>

                {/* Micro-Warning Box (if Cloud spend is very low compared to Hardware) */}
                {savings3Year.net < 0 && (
                  <div className="bg-amber-500/15 border border-amber-500/25 rounded-xl p-3 flex gap-2 text-[11px] text-amber-400/90 leading-normal font-mono">
                    <AlertTriangle className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
                    <span>
                      <strong>Economics Advisory:</strong> At this monthly budget, you will take longer to break even than 36 months. Consider a smaller node tier like the <strong>MTK Lite Node</strong> to achieve standard breakeven cycles.
                    </span>
                  </div>
                )}
              </div>

            </div>
          </div>
        </div>
      </div>

      {/* Catalog / Configurations Section */}
      <div id="catalog" className="py-20 border-b border-slate-900 bg-slate-900/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md text-[10px] font-mono font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 uppercase tracking-widest">
              Pre-Configured hardware
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold font-space-grotesk text-white">
              Choose & Configure Your Node
            </h2>
            <p className="text-slate-400 text-sm sm:text-base">
              All physical nodes ship completely pre-configured and air-gap verified. Every purchase includes local tracking telemetry software to audit power vs cloud savings.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {Object.values(HARDWARE_NODES).map((node) => {
              const isUpgraded = upgrades[node.id];
              const displayPrice = node.defaultPrice + (isUpgraded ? node.upgradePrice : 0);
              const displaySpecs = isUpgraded ? node.upgradeSpecs : node.defaultSpecs;
              const isFeatured = node.id === "pro";

              return (
                <div 
                  key={node.id}
                  className={`relative rounded-2xl border transition-all duration-300 flex flex-col justify-between overflow-hidden ${
                    isFeatured 
                      ? "bg-slate-950 border-cyan-500/40 shadow-xl shadow-cyan-500/5 lg:-translate-y-2 scale-100" 
                      : "bg-slate-950 border-slate-900 hover:border-slate-800 scale-98"
                  }`}
                >
                  {isFeatured && (
                    <div className="absolute top-0 right-0 bg-gradient-to-l from-cyan-500 to-emerald-400 text-slate-950 text-[9px] font-mono font-black py-1 px-4 uppercase tracking-widest rounded-bl-lg">
                      FEATURED Tier
                    </div>
                  )}

                  <div className="p-6 sm:p-8 space-y-6">
                    {/* Header Spec */}
                    <div className="space-y-1">
                      <h3 className="text-xl font-bold font-space-grotesk text-white flex items-center gap-2">
                        <Server className={`w-5 h-5 ${isFeatured ? "text-cyan-400" : "text-slate-400"}`} />
                        {node.name}
                      </h3>
                      <p className="text-xs text-slate-400 leading-relaxed font-mono">
                        {node.tagline}
                      </p>
                    </div>

                    {/* Pricing Output */}
                    <div className="pb-4 border-b border-slate-900">
                      <div className="flex items-baseline gap-1">
                        <span className="text-slate-500 text-sm font-mono">$</span>
                        <span className="text-3xl font-black font-space-grotesk tracking-tight text-white">
                          {displayPrice.toLocaleString()}
                        </span>
                        {isUpgraded && (
                          <span className="text-[10px] text-cyan-400 font-mono ml-2 border border-cyan-500/20 bg-cyan-500/5 px-2 py-0.5 rounded">
                            Upgraded Spec
                          </span>
                        )}
                      </div>
                      <div className="text-[10px] text-slate-500 font-mono mt-1">
                        One-time hardware purchase. No subscription lock-in.
                      </div>
                    </div>

                    {/* Toggle Hardware Upgrades Switch */}
                    <div className="bg-slate-900/60 p-4 rounded-xl border border-slate-900 space-y-2.5">
                      <div className="flex items-center justify-between">
                        <label className="text-[10px] font-mono text-slate-400 font-bold uppercase tracking-wider">
                          Instant Upgrades
                        </label>
                        <span className="text-[10px] font-mono text-cyan-400 font-bold">
                          +${node.upgradePrice.toLocaleString()}
                        </span>
                      </div>
                      
                      <button
                        onClick={() => {
                          setUpgrades(prev => ({
                            ...prev,
                            [node.id]: !prev[node.id]
                          }));
                        }}
                        className={`w-full flex items-center justify-between p-2 rounded-lg border text-left transition ${
                          isUpgraded 
                            ? "bg-cyan-500/10 border-cyan-500/30 text-cyan-300" 
                            : "bg-slate-950 border-slate-900 text-slate-500 hover:text-slate-400 hover:border-slate-800"
                        }`}
                      >
                        <span className="text-[10px] font-mono font-medium truncate flex items-center gap-1.5">
                          <CheckCircle className={`w-3.5 h-3.5 flex-shrink-0 ${isUpgraded ? "text-cyan-400" : "text-slate-800"}`} />
                          {node.upgradeText}
                        </span>
                        <span className={`text-[9px] font-mono font-extrabold px-1.5 py-0.5 rounded ${
                          isUpgraded ? "bg-cyan-400 text-slate-950" : "bg-slate-900 text-slate-500"
                        }`}>
                          {isUpgraded ? "ON" : "OFF"}
                        </span>
                      </button>
                    </div>

                    {/* Model Capabilities */}
                    <div className="space-y-2">
                      <h4 className="text-[10px] font-mono font-bold text-slate-500 uppercase tracking-widest">
                        Validated Local Models
                      </h4>
                      <div className="flex flex-wrap gap-1.5">
                        {node.targetModels.map((model, index) => (
                          <span 
                            key={index}
                            className="bg-slate-900/40 border border-slate-900 text-[10px] text-slate-300 px-2 py-1 rounded font-mono"
                          >
                            {model}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Specs List */}
                    <div className="space-y-2 pt-2 border-t border-slate-900">
                      <h4 className="text-[10px] font-mono font-bold text-slate-500 uppercase tracking-widest">
                        Technical Bill of Materials
                      </h4>
                      <ul className="space-y-1.5 font-mono text-[10.5px] text-slate-400">
                        {displaySpecs.map((spec, index) => (
                          <li key={index} className="flex items-start gap-2 leading-relaxed">
                            <span className="text-[#00f0ff] mt-0.5 flex-shrink-0">›</span>
                            <span>{spec}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                  </div>

                  {/* Purchase Button */}
                  <div className="p-6 bg-slate-900/30 border-t border-slate-900/80">
                    <button
                      onClick={() => openCheckout(node.id)}
                      className={`w-full font-bold px-4 py-3 rounded-xl text-xs tracking-wider uppercase transition shadow-md flex items-center justify-center gap-2 hover:scale-[1.01] active:scale-[0.99] ${
                        isFeatured 
                          ? "bg-[#00f0ff] hover:bg-[#00d8e6] text-slate-950 shadow-cyan-500/10" 
                          : "bg-slate-800 hover:bg-slate-700 text-white"
                      }`}
                    >
                      Configure & Reserve
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>

                </div>
              );
            })}

          </div>
        </div>
      </div>

      {/* Software dashboard Integration mockup block */}
      <div className="py-20 border-b border-slate-900 bg-slate-950 overflow-hidden relative">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-cyan-500/5 rounded-full blur-3xl opacity-30 pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Dashboard Left Description (5 cols) */}
            <div className="lg:col-span-5 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md text-[10px] font-mono font-bold bg-[#00f0ff]/10 text-[#00f0ff] border border-[#00f0ff]/20 uppercase tracking-widest">
                The Trojan Horse Software Suite
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold font-space-grotesk text-white">
                Pre-Installed Auditing. Local Power Monitoring.
              </h2>
              <p className="text-slate-400 text-sm leading-relaxed">
                We don&apos;t just sell you hardware and walk away. Every single pre-configured workstation ships with a local version of our <strong>MyTokenCost.com</strong> monitoring agent preloaded inside the microkernel dashboard.
              </p>

              <div className="space-y-4">
                <div className="flex gap-3">
                  <div className="w-8 h-8 rounded-lg bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center flex-shrink-0">
                    <Activity className="w-4 h-4 text-cyan-400" />
                  </div>
                  <div>
                    <h4 className="text-xs font-mono font-bold text-white uppercase">Real-Time Watt-per-Token Telemetry</h4>
                    <p className="text-[11px] text-slate-400 mt-0.5 leading-normal">
                      Tracks exactly how much electrical energy your local GPU array expends during generative pipelines, cross-referencing your power bills directly.
                    </p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center flex-shrink-0">
                    <TrendingUp className="w-4 h-4 text-emerald-400" />
                  </div>
                  <div>
                    <h4 className="text-xs font-mono font-bold text-white uppercase">Dynamic Vendor Saving Curve Comparison</h4>
                    <p className="text-[11px] text-slate-400 mt-0.5 leading-normal">
                      Maps the tokens generated locally against the live Single Source of Truth rate card (`LLM_RATE_CARD`) for OpenAI and Anthropic to display dynamic cash saved.
                    </p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <div className="w-8 h-8 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-center justify-center flex-shrink-0">
                    <Lock className="w-4 h-4 text-blue-400" />
                  </div>
                  <div>
                    <h4 className="text-xs font-mono font-bold text-white uppercase">100% Air-Gapped Local Privacy</h4>
                    <p className="text-[11px] text-slate-400 mt-0.5 leading-normal">
                      Zero cloud reporting. All model prompts, weights, system metrics, and audit logs remain locked entirely in your local `chrome.storage.local` environment.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Dashboard Right Preview Mockup (7 cols) */}
            <div className="lg:col-span-7">
              <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-2xl p-0.5">
                <div className="bg-slate-950 p-4 sm:p-6 rounded-2xl space-y-6">
                  
                  {/* Dashboard Header Mock */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-900 pb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-lg bg-emerald-500/10 border border-emerald-500/25 flex items-center justify-center">
                        <Activity className="w-5 h-5 text-emerald-400" />
                      </div>
                      <div>
                        <div className="text-xs font-bold font-space-grotesk text-white">MYTOKENCOST LOCAL AUDIT</div>
                        <div className="text-[10px] text-slate-500 font-mono">Telemetry Active • Local node id: MTK-PRO-08</div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[9px] font-mono font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                        SECURE LOGGING ONLY
                      </span>
                    </div>
                  </div>

                  {/* Dashboard Key Numbers Row */}
                  <div className="grid grid-cols-3 gap-4">
                    <div className="bg-slate-900/80 p-3 rounded-lg border border-slate-900">
                      <div className="text-[9px] text-slate-500 font-mono uppercase">Avg Power Efficiency</div>
                      <div className="text-emerald-400 font-black text-sm tracking-tight mt-1">
                        0.0091 Wh/tok
                      </div>
                    </div>
                    <div className="bg-slate-900/80 p-3 rounded-lg border border-slate-900">
                      <div className="text-[9px] text-slate-500 font-mono uppercase">Simulated Savings / hr</div>
                      <div className="text-white font-black text-sm tracking-tight mt-1 text-emerald-400">
                        +$12.44/hr
                      </div>
                    </div>
                    <div className="bg-slate-900/80 p-3 rounded-lg border border-slate-900">
                      <div className="text-[9px] text-slate-500 font-mono uppercase">Security Audit Status</div>
                      <div className="text-cyan-400 font-black text-sm tracking-tight mt-1 flex items-center gap-1 font-mono">
                        <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" />
                        100% PRIVATE
                      </div>
                    </div>
                  </div>

                  {/* Comparative Cost Curve Graph Simulator */}
                  <div className="bg-slate-900/40 p-4 rounded-xl border border-slate-900 space-y-4">
                    <div className="flex justify-between items-center text-[10px] font-mono">
                      <span className="text-slate-400 font-bold uppercase">Dynamic Local vs. Cloud Cost Curve</span>
                      <span className="text-slate-500">Scale: Cost per 1M Tokens</span>
                    </div>

                    <div className="space-y-3.5">
                      {/* OpenAI Rate comparison */}
                      <div className="space-y-1">
                        <div className="flex justify-between text-[10px] font-mono">
                          <span className="text-slate-400">OpenAI ({LLM_RATE_CARD.openai.name} Blended Average)</span>
                          <span className="text-slate-400 font-bold">${((LLM_RATE_CARD.openai.inputCostPerMillion + LLM_RATE_CARD.openai.outputCostPerMillion) / 2).toFixed(2)} / 1M</span>
                        </div>
                        <div className="h-2 bg-slate-950 border border-slate-900 rounded overflow-hidden">
                          <div className="h-full bg-red-500/70" style={{ width: "95%" }} />
                        </div>
                      </div>

                      {/* Anthropic Rate comparison */}
                      <div className="space-y-1">
                        <div className="flex justify-between text-[10px] font-mono">
                          <span className="text-slate-400">Anthropic ({LLM_RATE_CARD.anthropic.name} Blended)</span>
                          <span className="text-slate-400 font-bold">${((LLM_RATE_CARD.anthropic.inputCostPerMillion + LLM_RATE_CARD.anthropic.outputCostPerMillion) / 2).toFixed(2)} / 1M</span>
                        </div>
                        <div className="h-2 bg-slate-950 border border-slate-900 rounded overflow-hidden">
                          <div className="h-full bg-orange-500/70" style={{ width: "85%" }} />
                        </div>
                      </div>

                      {/* Google Rate comparison */}
                      <div className="space-y-1">
                        <div className="flex justify-between text-[10px] font-mono">
                          <span className="text-slate-400">Google ({LLM_RATE_CARD.google.name} Blended)</span>
                          <span className="text-slate-400 font-bold">${((LLM_RATE_CARD.google.inputCostPerMillion + LLM_RATE_CARD.google.outputCostPerMillion) / 2).toFixed(2)} / 1M</span>
                        </div>
                        <div className="h-2 bg-slate-950 border border-slate-900 rounded overflow-hidden">
                          <div className="h-full bg-blue-500/70" style={{ width: "32%" }} />
                        </div>
                      </div>

                      {/* Local Node Power Rate comparison */}
                      <div className="space-y-1">
                        <div className="flex justify-between text-[10px] font-mono">
                          <span className="text-emerald-400 font-bold">MTK Pre-Configured Node (Local Electricity Power Only)</span>
                          <span className="text-emerald-400 font-bold">$0.18 / 1M</span>
                        </div>
                        <div className="h-2 bg-slate-950 border border-slate-900 rounded overflow-hidden p-0.5">
                          <div className="h-full bg-gradient-to-r from-cyan-400 to-emerald-400 rounded-sm" style={{ width: "4%" }} />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="text-[10px] text-slate-500 font-mono leading-relaxed bg-slate-900/40 p-3 rounded-lg border border-slate-900 text-center">
                    🤖 Every hardware node transaction directly funds and supports the development of our global free open-source cost analytics tools!
                  </div>

                </div>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* Mission Section & Custom Quote / Consultation Form */}
      <div className="py-20 bg-slate-950 border-b border-slate-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md text-[10px] font-mono font-bold bg-[#00f0ff]/10 text-[#00f0ff] border border-[#00f0ff]/20 uppercase tracking-widest">
              The Mission Statement
            </div>
            <h2 className="text-3xl font-extrabold font-space-grotesk text-white">
              Bootstrapping Independent Developer Infrastructure
            </h2>
            <p className="text-slate-400 text-xs sm:text-sm max-w-2xl mx-auto leading-relaxed">
              We have exactly zero venture capital pressure. The open-source telemetry trackers at <strong>mytokencost.com</strong> are funded 100% by developers choosing to own their physical inference nodes. No tracking, no recurring fees, no data harvesting. Just bare metal VRAM and elegant software.
            </p>
          </div>

          {/* Consultation Intake Card */}
          <div className="bg-slate-900/60 border border-slate-900 rounded-2xl p-6 sm:p-8">
            <h3 className="text-lg font-bold font-space-grotesk text-white mb-2 flex items-center gap-2">
              <Mail className="w-5 h-5 text-cyan-400" />
              Need a Custom Cluster Setup or Hardware Advisory?
            </h3>
            <p className="text-xs text-slate-400 mb-6 font-mono">
              Fill out the technical scope outline below and our lead engineer will configure custom spec matrices for your workload.
            </p>

            {leadSubmitted ? (
              <div className="bg-emerald-500/10 border border-emerald-500/20 p-8 rounded-xl text-center space-y-4">
                <CheckCircle className="w-12 h-12 text-emerald-400 mx-auto" />
                <h4 className="text-base font-bold font-space-grotesk text-white">Consultation Scope Lodged Successfully!</h4>
                <p className="text-xs text-slate-400 font-mono max-w-md mx-auto leading-relaxed">
                  Thanks <strong>{leadName}</strong>. We have logged your request under ticket <strong className="text-cyan-400">#MTK-INQUIRY-{Math.floor(Math.random()*9000)+1000}</strong>. We will review your target models ({leadModels.join(", ") || "Custom"}) and contact you at <strong className="text-white">{leadEmail}</strong> within 12 hours.
                </p>
                <button
                  onClick={() => {
                    setLeadSubmitted(false);
                    setLeadName("");
                    setLeadEmail("");
                    setLeadModels([]);
                    setLeadMessage("");
                  }}
                  className="bg-slate-800 hover:bg-slate-700 text-white text-[10px] font-mono px-4 py-2 rounded-lg transition"
                >
                  Submit Another Request
                </button>
              </div>
            ) : (
              <form 
                onSubmit={(e) => {
                  e.preventDefault();
                  if (leadName && leadEmail) setLeadSubmitted(true);
                }} 
                className="space-y-6"
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-mono uppercase text-slate-400 flex items-center gap-1">
                      <User className="w-3 h-3" /> Full Name
                    </label>
                    <input 
                      type="text" 
                      required
                      placeholder="Jane Doe"
                      value={leadName}
                      onChange={(e) => setLeadName(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-900 hover:border-slate-800 focus:border-cyan-400 rounded-xl px-4 py-2.5 text-xs text-white placeholder-slate-600 outline-none transition font-mono"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[10px] font-mono uppercase text-slate-400 flex items-center gap-1">
                      <Mail className="w-3 h-3" /> Corporate Email
                    </label>
                    <input 
                      type="email" 
                      required
                      placeholder="jane@company.com"
                      value={leadEmail}
                      onChange={(e) => setLeadEmail(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-900 hover:border-slate-800 focus:border-cyan-400 rounded-xl px-4 py-2.5 text-xs text-white placeholder-slate-600 outline-none transition font-mono"
                    />
                  </div>
                </div>

                {/* Model targets Multi Checkboxes */}
                <div className="space-y-2">
                  <label className="text-[10px] font-mono uppercase text-slate-400 block">
                    Select Target Models / Workloads
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {["DeepSeek-R1 (671B)", "Llama-3.1 (70B/405B)", "Qwen-2.5 (Dense)", "Custom Whisper/Triton"].map((model) => {
                      const isSelected = leadModels.includes(model);
                      return (
                        <button
                          key={model}
                          type="button"
                          onClick={() => toggleModelSelect(model)}
                          className={`text-[10px] font-mono p-2.5 rounded-lg border text-left transition flex items-center justify-between ${
                            isSelected 
                              ? "bg-cyan-500/10 border-cyan-400 text-cyan-300" 
                              : "bg-slate-950 border-slate-900 text-slate-500 hover:text-slate-400 hover:border-slate-800"
                          }`}
                        >
                          <span>{model}</span>
                          <span className={`w-2.5 h-2.5 rounded-full border border-slate-800 ml-1.5 ${
                            isSelected ? "bg-cyan-400 border-none animate-pulse" : "bg-transparent"
                          }`} />
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Scope outline */}
                <div className="space-y-1.5">
                  <label className="text-[10px] font-mono uppercase text-slate-400 block">
                    Describe your VRAM / Latency requirements
                  </label>
                  <textarea 
                    rows={4}
                    placeholder="Describe concurrent user counts, latency bounds, and fine-tuning storage requirements..."
                    value={leadMessage}
                    onChange={(e) => setLeadMessage(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-900 hover:border-slate-800 focus:border-cyan-400 rounded-xl px-4 py-3 text-xs text-white placeholder-slate-600 outline-none transition font-mono resize-none"
                  />
                </div>

                <div className="flex items-center justify-between pt-2">
                  <span className="text-[10px] text-slate-500 font-mono flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
                    Zero sales calls. Pure engineering advisory.
                  </span>
                  <button
                    type="submit"
                    className="bg-[#00f0ff] hover:bg-[#00d8e6] text-slate-950 font-bold px-6 py-3 rounded-xl text-xs tracking-wider uppercase transition shadow-md shadow-cyan-500/10"
                  >
                    Submit Scope File
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>

      {/* Reservation & checkout dynamic modal overlay */}
      {checkoutModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
          <div className="relative w-full max-w-xl bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-2xl p-0.5 animate-in fade-in zoom-in-95 duration-150">
            {/* Top Close Button */}
            <button 
              onClick={() => setCheckoutModalOpen(false)}
              className="absolute top-4 right-4 text-slate-500 hover:text-white transition p-1 hover:bg-slate-850 rounded-lg"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="bg-slate-950 rounded-2xl p-6 sm:p-8 space-y-6">
              
              {resSuccess ? (
                // Order reservation confirmation screen
                <div className="text-center space-y-5 py-6">
                  <div className="w-14 h-14 bg-emerald-500/10 border border-emerald-500/20 rounded-full flex items-center justify-center mx-auto text-emerald-400">
                    <CheckCircle className="w-8 h-8" />
                  </div>
                  
                  <div className="space-y-2">
                    <h3 className="text-xl font-bold font-space-grotesk text-white">Node Reservation Complete</h3>
                    <p className="text-xs text-slate-400 font-mono">
                      Queue Ticket: <strong className="text-cyan-400">{reservationHash}</strong>
                    </p>
                  </div>

                  <div className="bg-slate-900/60 p-4 rounded-xl border border-slate-900 text-left space-y-3 max-w-md mx-auto">
                    <div className="text-[10px] text-slate-500 font-mono uppercase pb-2 border-b border-slate-950 flex justify-between">
                      <span>Invoice Summary</span>
                      <span className="text-emerald-400">PENDING AUDIT</span>
                    </div>

                    <div className="space-y-1 text-xs font-mono">
                      <div className="flex justify-between">
                        <span className="text-slate-400">Model Tier:</span>
                        <span className="text-white font-bold">{HARDWARE_NODES[checkoutNodeId].name}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-400">Upgraded Option:</span>
                        <span className="text-cyan-400 font-bold">{upgrades[checkoutNodeId] ? "Yes" : "No"}</span>
                      </div>
                      <div className="flex justify-between border-t border-slate-950 pt-2 text-sm">
                        <span className="text-slate-300">Total Pre-Order:</span>
                        <span className="text-[#00f0ff] font-extrabold">
                          ${(HARDWARE_NODES[checkoutNodeId].defaultPrice + (upgrades[checkoutNodeId] ? HARDWARE_NODES[checkoutNodeId].upgradePrice : 0)).toLocaleString()}
                        </span>
                      </div>
                    </div>

                    <div className="text-[10px] text-slate-500 font-mono leading-relaxed pt-2">
                      <span className="text-white font-bold">Next Steps:</span> We have queued your order and sent a hardware confirmation manifest to <strong className="text-white">{resEmail}</strong>. We will manually contact you for secure wiring and shipping dispatch window allocations.
                    </div>
                  </div>

                  <button
                    onClick={() => setCheckoutModalOpen(false)}
                    className="w-full bg-slate-800 hover:bg-slate-700 text-white font-bold py-3 rounded-xl text-xs tracking-wider uppercase transition"
                  >
                    Close & Monitor
                  </button>

                </div>
              ) : (
                // Shipping inputs screen
                <form onSubmit={handleReservationSubmit} className="space-y-6">
                  
                  {/* Modal Header */}
                  <div className="space-y-1 pb-4 border-b border-slate-900">
                    <h3 className="text-lg font-bold font-space-grotesk text-white flex items-center gap-2">
                      <Lock className="w-5 h-5 text-cyan-400" />
                      Configure & Reserve Node Queue
                    </h3>
                    <p className="text-xs text-slate-400 font-mono">
                      Pre-order queue reservation. No immediate merchant transaction required.
                    </p>
                  </div>

                  {/* Summary of what they are reserving */}
                  <div className="bg-slate-900/60 p-4 rounded-xl border border-slate-900 flex justify-between items-center">
                    <div className="space-y-1">
                      <div className="text-[9px] text-slate-500 font-mono uppercase">Reserving Configuration</div>
                      <div className="text-xs font-bold text-white font-mono flex items-center gap-1.5">
                        <Server className="w-3.5 h-3.5 text-cyan-400" />
                        {HARDWARE_NODES[checkoutNodeId].name}
                        {upgrades[checkoutNodeId] && <span className="text-[9px] bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 px-1 rounded uppercase">Upgraded</span>}
                      </div>
                    </div>
                    
                    <div className="text-right">
                      <div className="text-[9px] text-slate-500 font-mono uppercase">Reservation Cost</div>
                      <div className="text-sm font-black text-emerald-400 font-space-grotesk">
                        ${(HARDWARE_NODES[checkoutNodeId].defaultPrice + (upgrades[checkoutNodeId] ? HARDWARE_NODES[checkoutNodeId].upgradePrice : 0)).toLocaleString()}
                      </div>
                    </div>
                  </div>

                  {/* Form inputs */}
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <label className="text-[9px] font-mono uppercase text-slate-500">Contact Name</label>
                        <input 
                          type="text" 
                          required
                          placeholder="John Doe"
                          value={resName}
                          onChange={(e) => setResName(e.target.value)}
                          className="w-full bg-slate-950 border border-slate-900 focus:border-cyan-400 rounded-xl px-3 py-2 text-xs text-white placeholder-slate-700 outline-none font-mono"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[9px] font-mono uppercase text-slate-500">Dispatch Email</label>
                        <input 
                          type="email" 
                          required
                          placeholder="john@doe.com"
                          value={resEmail}
                          onChange={(e) => setResEmail(e.target.value)}
                          className="w-full bg-slate-950 border border-slate-900 focus:border-cyan-400 rounded-xl px-3 py-2 text-xs text-white placeholder-slate-700 outline-none font-mono"
                        />
                      </div>
                    </div>

                    <div className="space-y-1">
                      <label className="text-[9px] font-mono uppercase text-slate-500">Shipping Street Address</label>
                      <input 
                        type="text" 
                        required
                        placeholder="123 Silicon Alley, Suite 400"
                        value={resStreet}
                        onChange={(e) => setResStreet(e.target.value)}
                        className="w-full bg-slate-950 border border-slate-900 focus:border-cyan-400 rounded-xl px-3 py-2 text-xs text-white placeholder-slate-700 outline-none font-mono"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div className="space-y-1 sm:col-span-2">
                        <label className="text-[9px] font-mono uppercase text-slate-500">City / State / ZIP</label>
                        <input 
                          type="text" 
                          required
                          placeholder="San Francisco, CA 94107"
                          value={resCity}
                          onChange={(e) => setResCity(e.target.value)}
                          className="w-full bg-slate-950 border border-slate-900 focus:border-cyan-400 rounded-xl px-3 py-2 text-xs text-white placeholder-slate-700 outline-none font-mono"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[9px] font-mono uppercase text-slate-500">Country</label>
                        <select 
                          value={resCountry}
                          onChange={(e) => setResCountry(e.target.value)}
                          className="w-full bg-slate-950 border border-slate-900 focus:border-cyan-400 rounded-xl px-3 py-2 text-xs text-white outline-none font-mono cursor-pointer"
                        >
                          <option value="United States">United States</option>
                          <option value="Canada">Canada</option>
                          <option value="United Kingdom">United Kingdom</option>
                          <option value="Germany">Germany</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  {/* Submission and warning */}
                  <div className="space-y-4 pt-2">
                    <div className="text-[10px] text-slate-500 font-mono leading-relaxed bg-slate-900/40 p-3 rounded-lg border border-slate-900 flex gap-2">
                      <ShieldCheck className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                      <span>
                        <strong>Telemetry Promise:</strong> We respect absolute privacy. We will never share or store these addresses on any central cloud server. All pre-order requests are handled through encrypted channels.
                      </span>
                    </div>

                    <div className="flex gap-3">
                      <button
                        type="button"
                        onClick={() => setCheckoutModalOpen(false)}
                        className="w-1/3 bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-400 py-3 rounded-xl text-xs tracking-wider uppercase transition"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="w-2/3 bg-[#00f0ff] hover:bg-[#00d8e6] text-slate-950 font-extrabold py-3 rounded-xl text-xs tracking-wider uppercase transition shadow-lg shadow-cyan-500/10 flex items-center justify-center gap-2"
                      >
                        Confirm Queue Spot
                        <CornerDownRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                </form>
              )}

            </div>
          </div>
        </div>
      )}

    </div>
  );
}
