"use client";

import { useState, useEffect } from "react";
import { 
  Building, 
  Mail, 
  Zap, 
  CheckCircle2, 
  ShieldCheck, 
  Sparkles, 
  RefreshCw, 
  ArrowRight,
  TrendingUp,
  Database,
  Layers,
  PhoneCall
} from "lucide-react";

type TabMode = "demo" | "audit" | "enterprise";

export function AuditLeadForm() {
  const [activeTab, setActiveTab] = useState<TabMode>("demo");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    location: "",
    aiProvider: "openai",
    orgSize: "50-250",
    hurdle: "",
  });

  // Client-side detection of entry intent parameters
  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const type = params.get("type");
      if (type === "audit" || type === "enterprise" || type === "demo") {
        const timer = setTimeout(() => {
          setActiveTab(type as TabMode);
        }, 0);
        return () => clearTimeout(timer);
      }
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");

    try {
      // Build tailored submission payload
      const payload: Record<string, string> = {
        access_key: process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY || "YOUR_ACCESS_KEY_HERE",
        subject: `New B2B ${activeTab.toUpperCase()} Lead - MyTokenCost.com`,
        lead_type: activeTab,
        name: formData.name,
        email: formData.email,
      };

      if (activeTab === "demo") {
        payload.primary_ai_provider = formData.aiProvider;
      } else if (activeTab === "audit") {
        payload.grid_region_location = formData.location;
      } else if (activeTab === "enterprise") {
        payload.est_monthly_tokens = formData.orgSize;
        payload.compliance_hurdle = formData.hurdle;
      }

      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(payload),
      });

      const result = await response.json();
      if (result.success) {
        setStatus("success");
        setFormData({
          name: "",
          email: "",
          location: "",
          aiProvider: "openai",
          orgSize: "50-250",
          hurdle: "",
        });
      } else {
        setStatus("error");
      }
    } catch (err) {
      console.error(err);
      setStatus("error");
    }
  };

  if (status === "success") {
    const successMessages = {
      demo: "Our engineering team will contact you within 24 hours to schedule your live walkthrough and dynamic sandbox demo.",
      audit: "Our compliance engineering team will contact you within 24 hours to coordinate your custom compliance playbook scheduling.",
      enterprise: "Your enterprise engineering consultation ticket is locked. A lead architect will contact you in under 2 hours."
    };

    const borders = {
      demo: "border-cyan-500 bg-cyan-500/5",
      audit: "border-emerald-500 bg-emerald-500/5",
      enterprise: "border-indigo-500 bg-indigo-500/5"
    };

    const textColors = {
      demo: "text-cyan-400",
      audit: "text-emerald-400",
      enterprise: "text-indigo-400"
    };

    return (
      <div className={`border rounded-2xl p-8 text-center space-y-4 shadow-2xl relative overflow-hidden transition-all duration-300 ${borders[activeTab]}`}>
        <div className={`absolute top-0 left-0 w-full h-1 ${
          activeTab === "demo" ? "bg-cyan-500" : activeTab === "audit" ? "bg-emerald-500" : "bg-indigo-500"
        }`} />
        <div className={`h-12 w-12 rounded-full flex items-center justify-center mx-auto border ${
          activeTab === "demo" ? "bg-cyan-500/10 border-cyan-500/20" : activeTab === "audit" ? "bg-emerald-500/10 border-emerald-500/20" : "bg-indigo-500/10 border-indigo-500/20"
        }`}>
          <CheckCircle2 className={`w-6 h-6 animate-pulse ${textColors[activeTab]}`} />
        </div>
        <div className="space-y-1">
          <h3 className={`font-extrabold font-space-grotesk text-lg tracking-tight ${textColors[activeTab]}`}>
            Request Received
          </h3>
          <p className="text-xs text-slate-400 leading-relaxed max-w-sm mx-auto">
            {successMessages[activeTab]}
          </p>
        </div>
      </div>
    );
  }

  // Visual highlights and badges configuration
  const tabConfig = {
    demo: {
      badge: "15-Min Free Call",
      badgeColor: "bg-cyan-500/10 text-cyan-400 border-cyan-500/25",
      glowColor: "from-cyan-500 to-blue-500",
      focusBorder: "focus:border-cyan-500",
      ctaBg: "bg-cyan-500 hover:bg-cyan-400 text-slate-950 shadow-cyan-500/10",
      ctaText: "Schedule Free Call",
      subLabel: "⚡ Calendar scheduling link sent instantly to your inbox.",
      icon: <Sparkles className="w-4 h-4 animate-pulse" />,
      checklistTitle: "INCLUDED IN THE 15-MIN CALL",
      checklist: [
        { label: "Live Simulator Tour", desc: "Dynamic sandbox tour explaining custom rate cards and token metrics." },
        { label: "DNR Security Setup", desc: "How MV3 rules block rogue outbound calls without code changes." },
        { label: "Grid Stress Assessment", desc: "Initial analysis of your grid-stress zones and local utility tier bottlenecks." }
      ]
    },
    audit: {
      badge: "Compliance Playbook",
      badgeColor: "bg-emerald-500/10 text-emerald-400 border-emerald-500/25",
      glowColor: "from-emerald-500 to-teal-500",
      focusBorder: "focus:border-emerald-500",
      ctaBg: "bg-emerald-500 hover:bg-emerald-400 text-slate-950 shadow-emerald-500/10",
      ctaText: "Request $1,499 Playbook",
      subLabel: "🔐 Lock in an audit-ready compliance playbook in 7 days.",
      icon: <ShieldCheck className="w-4 h-4" />,
      checklistTitle: "INCLUDED IN THE AUDIT PLAYBOOK",
      checklist: [
        { label: "7-Day Playbook Delivery", desc: "Custom audit-ready compliance strategy and SEC reporting blueprints." },
        { label: "Proactive Bottleneck Audit", desc: "Identify and resolve state utility caps before rate penalties trigger." },
        { label: "100% Remote Telemetry", desc: "Zero physical installations. Safe, remote grid boundaries mapping." }
      ]
    },
    enterprise: {
      badge: "High-Volume Infrastructure",
      badgeColor: "bg-indigo-500/10 text-indigo-400 border-indigo-500/25",
      glowColor: "from-indigo-500 to-purple-500",
      focusBorder: "focus:border-indigo-500",
      ctaBg: "bg-indigo-600 hover:bg-indigo-500 text-white shadow-indigo-500/10",
      ctaText: "Submit Enterprise Inquiry",
      subLabel: "🤝 Strictly NDA-protected. Direct connection to lead engineers.",
      icon: <Building className="w-4 h-4" />,
      checklistTitle: "ENTERPRISE NODE BENEFITS",
      checklist: [
        { label: "Dedicated Telemetry Nodes", desc: "Direct Postgres replica or raw API hooks for enterprise databases." },
        { label: "Priority Escalation SLA", desc: "Dedicated Slack channel with under-2-hour SLA response guarantees." },
        { label: "ERCOT Dispute Advocate", desc: "Professional compliance support and formal rate card reconciliations." }
      ]
    }
  };

  const current = tabConfig[activeTab];

  return (
    <div className="relative group">
      {/* Glowing Outer Card Background */}
      <div className={`absolute -inset-0.5 bg-gradient-to-r ${current.glowColor} rounded-2xl blur opacity-10 group-hover:opacity-20 transition duration-1000 group-hover:duration-200`} />
      
      <div className="relative bg-gradient-to-b from-slate-900 to-slate-950/95 backdrop-blur-md rounded-2xl border border-slate-800/80 shadow-2xl hover:border-slate-700/80 transition-all duration-300 overflow-hidden">
        {/* Top-border Dynamic Glow */}
        <div className={`absolute top-0 left-0 w-full h-[3px] bg-gradient-to-r ${current.glowColor}`} />

        {/* High-Fidelity Tab Switcher */}
        <div className="flex border-b border-slate-800/60 bg-slate-950/60 p-1.5 overflow-x-auto gap-1 scrollbar-none items-center">
          <button
            type="button"
            onClick={() => { setActiveTab("demo"); setStatus("idle"); }}
            className={`flex-1 min-w-[130px] text-center py-2.5 px-3 rounded-xl text-[10px] font-extrabold uppercase tracking-wider transition-all duration-300 cursor-pointer flex items-center justify-center gap-1.5 ${
              activeTab === "demo"
                ? "bg-slate-800/90 text-cyan-400 border border-cyan-500/20 shadow-md shadow-cyan-500/5"
                : "text-slate-400 hover:text-slate-200 hover:bg-slate-900/40"
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            15-Min Free Call
          </button>
          <button
            type="button"
            onClick={() => { setActiveTab("audit"); setStatus("idle"); }}
            className={`flex-1 min-w-[130px] text-center py-2.5 px-3 rounded-xl text-[10px] font-extrabold uppercase tracking-wider transition-all duration-300 cursor-pointer flex items-center justify-center gap-1.5 ${
              activeTab === "audit"
                ? "bg-slate-800/90 text-emerald-400 border border-emerald-500/20 shadow-md shadow-emerald-500/5"
                : "text-slate-400 hover:text-slate-200 hover:bg-slate-900/40"
            }`}
          >
            <ShieldCheck className="w-3.5 h-3.5" />
            Certified Audit ($1,499)
          </button>
          <button
            type="button"
            onClick={() => { setActiveTab("enterprise"); setStatus("idle"); }}
            className={`flex-1 min-w-[130px] text-center py-2.5 px-3 rounded-xl text-[10px] font-extrabold uppercase tracking-wider transition-all duration-300 cursor-pointer flex items-center justify-center gap-1.5 ${
              activeTab === "enterprise"
                ? "bg-slate-800/90 text-indigo-400 border border-indigo-500/20 shadow-md shadow-indigo-500/5"
                : "text-slate-400 hover:text-slate-200 hover:bg-slate-900/40"
            }`}
          >
            <Building className="w-3.5 h-3.5" />
            Enterprise Sales
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 lg:grid-cols-12 divide-y lg:divide-y-0 lg:divide-x divide-slate-800/60">
            
            {/* LEFT COLUMN: Inputs & Header */}
            <div className="lg:col-span-7 p-6 sm:p-8 space-y-5">
              
              {/* Header Badging */}
              <div className="space-y-2.5">
                <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[9px] font-mono font-extrabold border tracking-widest uppercase ${current.badgeColor}`}>
                  {current.icon}
                  {current.badge}
                </div>
                <div>
                  <h3 className="font-space-grotesk text-xl font-extrabold text-white tracking-tight">
                    {activeTab === "demo" && "Schedule 15-Min Free Call"}
                    {activeTab === "audit" && "Secure Compliance Playbook"}
                    {activeTab === "enterprise" && "Contact Corporate Engineering"}
                  </h3>
                  <p className="text-[11px] text-slate-400 leading-relaxed mt-0.5 font-medium">
                    {activeTab === "demo" && "Provide your contact coordinates below. We will coordinate a call to demonstrate how to enforce real-time rate card telemetry in your ecosystem."}
                    {activeTab === "audit" && "Sourcing errors or missing state agency reporting criteria can trigger crippling utility fees or license suspensions. Lock in an audit-ready compliance playbook in 7 days."}
                    {activeTab === "enterprise" && "Inquire about custom dedicated nodes, white-labeled reporting integrations, or direct database replica streaming."}
                  </p>
                </div>
              </div>

              {/* Inputs */}
              <div className="space-y-3.5 pt-1">
                
                <div className="space-y-1">
                  <label className="block text-[10px] text-slate-400 font-bold uppercase tracking-wider">
                    {activeTab === "enterprise" ? "Organization / Company Name" : "Facility / Company Name"}
                  </label>
                  <div className="relative">
                    <Building className="w-3.5 h-3.5 text-slate-500 absolute left-3.5 top-3" />
                    <input
                      type="text"
                      required
                      placeholder={activeTab === "enterprise" ? "e.g. Acme Grid Systems Corp." : "e.g. Hyperion Labs Inc."}
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className={`w-full bg-slate-950 border border-slate-800/80 ${current.focusBorder} rounded-xl py-2.5 pl-9.5 pr-4 text-xs text-white focus:outline-none transition-all font-semibold placeholder:text-slate-600`}
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="block text-[10px] text-slate-400 font-bold uppercase tracking-wider">
                    {activeTab === "enterprise" ? "Engineering Officer Email" : "Compliance Officer Email"}
                  </label>
                  <div className="relative">
                    <Mail className="w-3.5 h-3.5 text-slate-500 absolute left-3.5 top-3" />
                    <input
                      type="email"
                      required
                      placeholder="e.g. audit@company.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className={`w-full bg-slate-950 border border-slate-800/80 ${current.focusBorder} rounded-xl py-2.5 pl-9.5 pr-4 text-xs text-white focus:outline-none transition-all font-mono font-medium placeholder:text-slate-600`}
                    />
                  </div>
                </div>

                {/* Conditional Specific Inputs based on Active Tab */}
                {activeTab === "demo" && (
                  <div className="space-y-1">
                    <label className="block text-[10px] text-slate-400 font-bold uppercase tracking-wider">Primary AI / LLM Provider</label>
                    <div className="relative">
                      <Sparkles className="w-3.5 h-3.5 text-slate-500 absolute left-3.5 top-3" />
                      <select
                        value={formData.aiProvider}
                        onChange={(e) => setFormData({ ...formData, aiProvider: e.target.value })}
                        className={`w-full bg-slate-950 border border-slate-800/80 ${current.focusBorder} rounded-xl py-2.5 pl-9.5 pr-10 text-xs text-white focus:outline-none transition-all font-semibold appearance-none cursor-pointer`}
                      >
                        <option value="openai">OpenAI (GPT-4o, o1, etc.)</option>
                        <option value="anthropic">Anthropic (Claude 3.5 Sonnet, etc.)</option>
                        <option value="google">Google (Gemini 1.5 Pro, etc.)</option>
                        <option value="openrouter">OpenRouter / Multiple API Providers</option>
                        <option value="custom">Self-Hosted / Open-Source / Local Models</option>
                      </select>
                      <div className="absolute right-3.5 top-3.5 pointer-events-none w-0 h-0 border-l-4 border-l-transparent border-r-4 border-r-transparent border-t-4 border-t-slate-500" />
                    </div>
                  </div>
                )}

                {activeTab === "audit" && (
                  <div className="space-y-1">
                    <label className="block text-[10px] text-slate-400 font-bold uppercase tracking-wider">Grid Region Location</label>
                    <div className="relative">
                      <Zap className="w-3.5 h-3.5 text-slate-500 absolute left-3.5 top-3" />
                      <input
                        type="text"
                        required
                        placeholder="e.g. ERCOT, PJM, SPP, California ISO"
                        value={formData.location}
                        onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                        className={`w-full bg-slate-950 border border-slate-800/80 ${current.focusBorder} rounded-xl py-2.5 pl-9.5 pr-4 text-xs text-white focus:outline-none transition-all font-semibold placeholder:text-slate-600`}
                      />
                    </div>
                  </div>
                )}

                {activeTab === "enterprise" && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    <div className="space-y-1">
                      <label className="block text-[10px] text-slate-400 font-bold uppercase tracking-wider">Est. Monthly Tokens</label>
                      <div className="relative">
                        <Building className="w-3.5 h-3.5 text-slate-500 absolute left-3.5 top-3" />
                        <select
                          value={formData.orgSize}
                          onChange={(e) => setFormData({ ...formData, orgSize: e.target.value })}
                          className={`w-full bg-slate-950 border border-slate-800/80 ${current.focusBorder} rounded-xl py-2.5 pl-9.5 pr-10 text-xs text-white focus:outline-none transition-all font-semibold appearance-none cursor-pointer`}
                        >
                          <option value="<50M">&lt; 50M Tokens / mo</option>
                          <option value="50M-500M">50M - 500M / mo</option>
                          <option value="500M-5B">500M - 5B / mo</option>
                          <option value="5B+">5B+ Tokens / mo</option>
                        </select>
                        <div className="absolute right-3.5 top-3.5 pointer-events-none w-0 h-0 border-l-4 border-l-transparent border-r-4 border-r-transparent border-t-4 border-t-slate-500" />
                      </div>
                    </div>
                    
                    <div className="space-y-1">
                      <label className="block text-[10px] text-slate-400 font-bold uppercase tracking-wider">Primary Hurdle / Goal</label>
                      <div className="relative">
                        <Zap className="w-3.5 h-3.5 text-slate-500 absolute left-3.5 top-3" />
                        <input
                          type="text"
                          placeholder="e.g. Shadow AI spend, API limits"
                          value={formData.hurdle}
                          onChange={(e) => setFormData({ ...formData, hurdle: e.target.value })}
                          className={`w-full bg-slate-950 border border-slate-800/80 ${current.focusBorder} rounded-xl py-2.5 pl-9.5 pr-4 text-xs text-white focus:outline-none transition-all font-semibold placeholder:text-slate-600`}
                        />
                      </div>
                    </div>
                  </div>
                )}

              </div>
            </div>

            {/* RIGHT COLUMN: CTA & Value Proposition Checklist */}
            <div className="lg:col-span-5 p-6 sm:p-8 bg-slate-950/40 flex flex-col justify-between space-y-6">
              
              {/* Deliverables Checklist */}
              <div className="space-y-4">
                <h4 className="text-[10px] font-mono font-bold text-slate-500 uppercase tracking-widest">
                  {current.checklistTitle}
                </h4>
                
                <div className="space-y-3.5 text-[11px] text-slate-400 font-medium leading-relaxed">
                  {current.checklist.map((item, idx) => (
                    <div key={idx} className="flex items-start gap-2.5">
                      <CheckCircle2 className={`w-4 h-4 flex-shrink-0 mt-0.5 ${
                        activeTab === "demo" ? "text-cyan-400" : activeTab === "audit" ? "text-emerald-400" : "text-indigo-400"
                      }`} />
                      <span>
                        <strong className="text-white">{item.label}:</strong> {item.desc}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Checkout Trigger & Faux Lock */}
              <div className="space-y-3">
                <button
                  type="submit"
                  disabled={status === "loading"}
                  className={`w-full ${current.ctaBg} disabled:bg-slate-800 disabled:text-slate-500 font-extrabold text-xs uppercase tracking-wider py-4 rounded-xl shadow-lg transition-all hover:scale-[1.01] active:scale-[0.99] disabled:opacity-50 flex items-center justify-center gap-2 cursor-pointer`}
                >
                  {status === "loading" ? (
                    <>
                      <RefreshCw className="w-4 h-4 animate-spin" />
                      Initializing secure pipeline...
                    </>
                  ) : (
                    <>
                      {activeTab === "demo" && <PhoneCall className="w-4.5 h-4.5" />}
                      {activeTab === "audit" && <ShieldCheck className="w-4.5 h-4.5" />}
                      {activeTab === "enterprise" && <Database className="w-4.5 h-4.5" />}
                      {current.ctaText}
                      <ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-0.5 transition-transform" />
                    </>
                  )}
                </button>

                <div className="text-[10px] text-slate-500 text-center flex items-center justify-center gap-1.5 font-semibold">
                  <span>🛡️</span>
                  <span>{current.subLabel}</span>
                </div>
              </div>

            </div>

          </div>

          {status === "error" && (
            <p className="text-red-500 text-[11px] text-center pb-6 font-semibold">
              Error submitting request. Please coordinate directly with support.
            </p>
          )}
        </form>
      </div>
    </div>
  );
}
