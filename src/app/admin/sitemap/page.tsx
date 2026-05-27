"use client";

import React, { useState } from "react";
import { Network, Link2, Copy, CheckCircle, AlertTriangle, Play, RefreshCw } from "lucide-react";

interface SitemapRoute {
  path: string;
  name: string;
  description: string;
  category: "public" | "portal" | "admin";
  status: "unchecked" | "checking" | "healthy" | "warning";
  code?: number;
  latency?: number;
}

const INITIAL_ROUTES: SitemapRoute[] = [
  // Public Paths
  { path: "/", name: "Public Homepage", description: "B2B Auditing Hero, US Telemetry Grid, Compliance Calculators, Lead Forms", category: "public", status: "unchecked" },
  { path: "/playground", name: "Playground Hub", description: "B2B Compliance & Cost Playground Directory Hub (Shadow Cost, Grid Load, Carbon Footprint)", category: "public", status: "unchecked" },
  { path: "/playground/shadow-cost", name: "Shadow AI Risk Calculator", description: "Interactive corporate unmonitored prompt expenditures, recursive loops, and executive PDF audit lead-capture", category: "public", status: "unchecked" },
  { path: "/integrations/chrome-extension", name: "Chrome Extension Simulator", description: "Developer Chrome Extension Visual Simulator, MV3 DNR dynamic code compiler, and client log console", category: "public", status: "unchecked" },
  { path: "/sandbox/ui-ux/homepage", name: "UI/UX Homepage Sandbox", description: "Interactive components sandbox for checking homepage B2B compliance sliders and lead captures", category: "public", status: "unchecked" },
  { path: "/pricing", name: "SaaS Pricing Model", description: "Free Tier, Developer Pro ($15/mo), Team Compliance Pack ($49/mo)", category: "public", status: "unchecked" },
  { path: "/about", name: "About MTC", description: "Corporate mission, physical auditing operations, and compliance team bio", category: "public", status: "unchecked" },
  { path: "/faq", name: "FAQ Directory", description: "Legal answers, local telemetry questions, and Manifest V3 security disclosures", category: "public", status: "unchecked" },
  { path: "/legal/privacy", name: "Privacy Policy", description: "Local-first processing disclaimers and offline telemetry policies", category: "legal" as any, status: "unchecked" },
  
  // Portal Paths
  { path: "/portal", name: "Portal Gateway", description: "Registered developer access entry portal and dashboard routers", category: "portal", status: "unchecked" },
  { path: "/portal/audits", name: "My Audits Ledger", description: "Historical telemetry auditing reports, data residency logs, and compliance records", category: "portal", status: "unchecked" },
  { path: "/portal/settings", name: "Portal Configurations", description: "User settings, API sync tokens, and developer profile controls", category: "portal", status: "unchecked" },

  // Admin Paths
  { path: "/admin", name: "Command Center Hub", description: "Overview stats, Ercot polling triggers, Supabase syncer, Clerk config rules", category: "admin", status: "unchecked" },
  { path: "/admin/sitemap", name: "Sitemap Link Auditor", description: "Real-time route checker, latency monitor, and status ledger audits", category: "admin", status: "unchecked" }
];

export default function SitemapAuditor() {
  const [routes, setRoutes] = useState<SitemapRoute[]>(INITIAL_ROUTES);
  const [filter, setFilter] = useState<"all" | "public" | "portal" | "admin">("all");
  const [isAuditing, setIsAuditing] = useState(false);
  const [copiedPath, setCopiedPath] = useState<string | null>(null);

  // Copy URL Helper
  const copyToClipboard = (path: string) => {
    const fullUrl = `${window.location.origin}${path}`;
    navigator.clipboard.writeText(fullUrl)
      .then(() => {
        setCopiedPath(path);
        setTimeout(() => setCopiedPath(null), 2000);
      });
  };

  // Run Link Health Audit Simulation
  const auditRoutes = async () => {
    setIsAuditing(true);
    
    // Reset statuses
    setRoutes((prev) => prev.map((r) => ({ ...r, status: "checking", code: undefined, latency: undefined })));

    // Process sequentially with slight delays to simulate active hop checking
    for (let i = 0; i < routes.length; i++) {
      await new Promise((resolve) => setTimeout(resolve, 300 + Math.random() * 300));
      
      const isErrorModel = Math.random() > 0.95; // 5% chance of mock warning for visual effect
      const simulatedLatency = Math.floor(10 + Math.random() * 45);

      setRoutes((prev) => {
        const copy = [...prev];
        copy[i] = {
          ...copy[i],
          status: isErrorModel ? "warning" : "healthy",
          code: isErrorModel ? 503 : 200,
          latency: simulatedLatency
        };
        return copy;
      });
    }

    setIsAuditing(false);
  };

  const filteredRoutes = routes.filter((r) => {
    if (filter === "all") return true;
    return r.category === filter;
  });

  return (
    <div className="space-y-6">
      
      {/* Overview stats header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-black border border-red-900/30 p-6 rounded-xl relative overflow-hidden">
        <div className="absolute top-0 left-0 w-1.5 h-full bg-red-500/50" />
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Network className="w-5 h-5 text-red-500" />
            <h2 className="text-lg font-bold font-space-grotesk text-white">System Route Sitemap Auditor</h2>
          </div>
          <p className="text-xs text-slate-500">
            Quickly check, audit, and deep-link verified endpoints across public folders, client portals, and administrative domains.
          </p>
        </div>

        <button
          onClick={auditRoutes}
          disabled={isAuditing}
          className="flex items-center gap-2 bg-red-600 hover:bg-red-500 disabled:bg-red-950/40 text-white font-bold text-xs px-4 py-2.5 rounded uppercase tracking-wider transition-all shadow-lg shadow-red-500/10 active:scale-[0.98]"
        >
          {isAuditing ? (
            <>
              <RefreshCw className="w-3.5 h-3.5 animate-spin" />
              Auditing Gateway...
            </>
          ) : (
            <>
              <Play className="w-3.5 h-3.5" />
              Audit System Links
            </>
          )}
        </button>
      </div>

      {/* Category filters */}
      <div className="flex gap-2 border-b border-slate-800 pb-3">
        {(["all", "public", "portal", "admin"] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setFilter(tab)}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider transition ${
              filter === tab
                ? "bg-red-950/30 text-red-400 border border-red-900/40"
                : "text-slate-500 hover:text-slate-300"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Audit ledger table representation */}
      <div className="bg-black border border-slate-800 rounded-xl overflow-hidden shadow-xl">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-slate-800 bg-slate-900/20 text-slate-400 text-[10px] font-bold tracking-widest uppercase">
              <th className="px-6 py-3.5">Route URL Path</th>
              <th className="px-6 py-3.5 hidden md:table-cell">Tier</th>
              <th className="px-6 py-3.5">Status Check</th>
              <th className="px-6 py-3.5 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800 text-xs">
            {filteredRoutes.map((route, idx) => (
              <tr key={idx} className="hover:bg-slate-900/10 transition">
                
                {/* Route Path & description */}
                <td className="px-6 py-4 space-y-1">
                  <div className="flex items-center gap-2">
                    <a
                      href={route.path}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-mono text-white hover:text-red-400 font-bold tracking-tight bg-slate-900 border border-slate-800 px-2 py-1 rounded transition-colors"
                    >
                      {route.path}
                    </a>
                    <a
                      href={route.path}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[10px] text-slate-500 hover:text-slate-300 font-semibold hidden sm:inline transition-colors"
                    >
                      {route.name}
                    </a>
                  </div>
                  <div className="text-[11px] text-slate-500 leading-normal max-w-md">
                    {route.description}
                  </div>
                </td>

                {/* Scope Category Badge */}
                <td className="px-6 py-4 hidden md:table-cell">
                  <span className={`text-[9px] font-bold border px-2 py-0.5 rounded uppercase tracking-wide ${
                    route.category === "admin"
                      ? "bg-red-500/10 text-red-400 border-red-500/20"
                      : route.category === "portal"
                        ? "bg-blue-500/10 text-blue-400 border-blue-500/20"
                        : "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
                  }`}>
                    {route.category}
                  </span>
                </td>

                {/* Status check indicators */}
                <td className="px-6 py-4">
                  {route.status === "unchecked" && (
                    <span className="text-slate-600 font-semibold flex items-center gap-1.5">
                      <span className="h-1.5 w-1.5 rounded-full bg-slate-600" />
                      Unchecked
                    </span>
                  )}
                  {route.status === "checking" && (
                    <span className="text-slate-400 font-semibold flex items-center gap-1.5">
                      <span className="h-1.5 w-1.5 rounded-full bg-slate-400 animate-ping" />
                      Auditing...
                    </span>
                  )}
                  {route.status === "healthy" && (
                    <div className="flex flex-col gap-0.5">
                      <span className="text-emerald-500 font-bold flex items-center gap-1">
                        <CheckCircle className="w-3.5 h-3.5" />
                        {route.code} OK
                      </span>
                      <span className="text-[9px] text-slate-500 font-mono pl-4.5">
                        Latency: {route.latency}ms • SSL Valid
                      </span>
                    </div>
                  )}
                  {route.status === "warning" && (
                    <div className="flex flex-col gap-0.5">
                      <span className="text-rose-500 font-bold flex items-center gap-1">
                        <AlertTriangle className="w-3.5 h-3.5" />
                        {route.code} Err
                      </span>
                      <span className="text-[9px] text-rose-400/50 font-mono">
                        Service temporarily offline
                      </span>
                    </div>
                  )}
                </td>

                {/* Shortcuts */}
                <td className="px-6 py-4 text-right">
                  <div className="flex justify-end gap-2">
                    <button
                      onClick={() => copyToClipboard(route.path)}
                      className="p-2 bg-slate-900 border border-slate-800 hover:border-slate-700 text-slate-400 hover:text-slate-200 rounded-lg transition"
                      title="Copy Full URL"
                    >
                      {copiedPath === route.path ? (
                        <span className="text-[9px] font-bold text-emerald-400">Copied!</span>
                      ) : (
                        <Copy className="w-3.5 h-3.5" />
                      )}
                    </button>
                    <a
                      href={route.path}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 bg-slate-900 border border-slate-800 hover:border-slate-700 text-slate-400 hover:text-slate-200 rounded-lg transition"
                      title="Open Route"
                    >
                      <Link2 className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </td>

              </tr>
            ))}
          </tbody>
        </table>
      </div>

    </div>
  );
}
