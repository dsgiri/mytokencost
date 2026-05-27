import Link from "next/link";
import { Check } from "lucide-react";

export default function PricingPage() {
  return (
    <div className="min-h-screen py-24 bg-slate-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h1 className="text-4xl md:text-5xl font-bold font-space-grotesk text-white tracking-tight mb-4">
            Enterprise Compliance, <span className="text-[#00f0ff]">De-risked.</span>
          </h1>
          <p className="text-slate-400 text-lg">
            Whether you are a startup miner or a state-level utility, choose the tier that matches your regulatory exposure. No hidden fees.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
          
          {/* Tier 1: Self-Serve */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8 flex flex-col transition-transform hover:-translate-y-1">
            <h3 className="text-xl font-bold text-white mb-2">Self-Serve Telemetry</h3>
            <p className="text-slate-400 text-sm mb-6 h-10">Raw data access for internal teams.</p>
            <div className="mb-6">
              <span className="text-4xl font-extrabold text-white">$299</span>
              <span className="text-slate-500">/mo</span>
            </div>
            <Link 
              href="/portal" 
              className="w-full py-3 px-4 bg-slate-800 hover:bg-slate-700 text-white font-bold rounded-lg text-center text-sm tracking-wider uppercase transition-colors mb-8"
            >
              Start Free Trial
            </Link>
            <div className="space-y-4 flex-1">
              <div className="flex items-start gap-3">
                <Check className="w-5 h-5 text-[#00f0ff] shrink-0" />
                <span className="text-sm text-slate-300">Live ERCOT load telemetry</span>
              </div>
              <div className="flex items-start gap-3">
                <Check className="w-5 h-5 text-[#00f0ff] shrink-0" />
                <span className="text-sm text-slate-300">Basic email grid alerts</span>
              </div>
              <div className="flex items-start gap-3">
                <Check className="w-5 h-5 text-[#00f0ff] shrink-0" />
                <span className="text-sm text-slate-300">Dashboard UI access</span>
              </div>
            </div>
          </div>

          {/* Tier 2: Certified Audit (Primary) */}
          <div className="bg-slate-900 border-2 border-[#00f0ff] rounded-2xl p-8 flex flex-col relative transform md:-translate-y-4 shadow-[0_0_40px_rgba(0,240,255,0.15)]">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#00f0ff] text-slate-950 font-bold px-4 py-1 rounded-full text-xs uppercase tracking-widest">
              Most Popular
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Certified Playbook</h3>
            <p className="text-slate-400 text-sm mb-6 h-10">Full liability protection and engineering certification.</p>
            <div className="mb-6">
              <span className="text-4xl font-extrabold text-[#00f0ff]">$1,499</span>
              <span className="text-slate-500"> one-time</span>
            </div>
            <Link 
              href="/contact?type=audit" 
              className="w-full py-3 px-4 bg-[#00f0ff] hover:bg-[#00d8e6] text-slate-950 font-bold rounded-lg text-center text-sm tracking-wider uppercase transition-colors mb-8 shadow-lg shadow-[#00f0ff]/20"
            >
              Book Audit Now
            </Link>
            <div className="space-y-4 flex-1">
              <div className="flex items-start gap-3">
                <Check className="w-5 h-5 text-[#00f0ff] shrink-0" />
                <span className="text-sm text-white font-medium">Everything in Self-Serve, plus:</span>
              </div>
              <div className="flex items-start gap-3">
                <Check className="w-5 h-5 text-[#00f0ff] shrink-0" />
                <span className="text-sm text-slate-300">1-on-1 Engineering Consultation</span>
              </div>
              <div className="flex items-start gap-3">
                <Check className="w-5 h-5 text-[#00f0ff] shrink-0" />
                <span className="text-sm text-slate-300">Certified SLA & Liability Ledger</span>
              </div>
              <div className="flex items-start gap-3">
                <Check className="w-5 h-5 text-[#00f0ff] shrink-0" />
                <span className="text-sm text-slate-300">Custom facility blueprints</span>
              </div>
            </div>
          </div>

          {/* Tier 3: Enterprise */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8 flex flex-col transition-transform hover:-translate-y-1">
            <h3 className="text-xl font-bold text-white mb-2">Enterprise Node</h3>
            <p className="text-slate-400 text-sm mb-6 h-10">White-glove API integration for state-level grids.</p>
            <div className="mb-6">
              <span className="text-4xl font-extrabold text-white">Custom</span>
            </div>
            <Link 
              href="/contact?type=enterprise" 
              className="w-full py-3 px-4 bg-slate-800 hover:bg-slate-700 text-white font-bold rounded-lg text-center text-sm tracking-wider uppercase transition-colors mb-8"
            >
              Contact Sales
            </Link>
            <div className="space-y-4 flex-1">
              <div className="flex items-start gap-3">
                <Check className="w-5 h-5 text-slate-500 shrink-0" />
                <span className="text-sm text-slate-300">Direct Supabase DB API Access</span>
              </div>
              <div className="flex items-start gap-3">
                <Check className="w-5 h-5 text-slate-500 shrink-0" />
                <span className="text-sm text-slate-300">Dedicated Slack Support Channel</span>
              </div>
              <div className="flex items-start gap-3">
                <Check className="w-5 h-5 text-slate-500 shrink-0" />
                <span className="text-sm text-slate-300">Priority ERCOT Dispute Resolution</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
