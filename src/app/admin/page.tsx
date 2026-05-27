import { Activity, Server, Database, ShieldAlert } from "lucide-react";

export default function AdminDashboard() {
  return (
    <div className="space-y-8">
      {/* Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-black border border-slate-800 rounded-xl p-6">
          <div className="flex items-center gap-3 mb-4">
            <Activity className="w-5 h-5 text-emerald-500" />
            <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest">Worker Node</h3>
          </div>
          <p className="text-3xl font-mono text-white">ONLINE</p>
          <p className="text-xs text-slate-500 mt-2">ERCOT Polling Active</p>
        </div>
        
        <div className="bg-black border border-slate-800 rounded-xl p-6">
          <div className="flex items-center gap-3 mb-4">
            <Database className="w-5 h-5 text-[#00f0ff]" />
            <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest">Supabase DB</h3>
          </div>
          <p className="text-3xl font-mono text-white">SYNCED</p>
          <p className="text-xs text-slate-500 mt-2">Telemetry Snapshot: Latest</p>
        </div>

        <div className="bg-black border border-slate-800 rounded-xl p-6">
          <div className="flex items-center gap-3 mb-4">
            <Server className="w-5 h-5 text-purple-500" />
            <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest">CMS Feed</h3>
          </div>
          <p className="text-3xl font-mono text-white">STABLE</p>
          <p className="text-xs text-slate-500 mt-2">Sanity connection verified</p>
        </div>

        <div className="bg-red-950/20 border border-red-900/30 rounded-xl p-6 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-2 h-full bg-red-500/20" />
          <div className="flex items-center gap-3 mb-4">
            <ShieldAlert className="w-5 h-5 text-red-500" />
            <h3 className="text-xs font-bold text-red-500 uppercase tracking-widest">Sys Errors</h3>
          </div>
          <p className="text-3xl font-mono text-white">0</p>
          <p className="text-xs text-red-400/50 mt-2">No critical faults detected</p>
        </div>
      </div>

      {/* Admin Actions Panel */}
      <div className="bg-black border border-slate-800 rounded-xl p-8">
        <h2 className="text-xl font-bold font-space-grotesk text-white mb-6">Quick Actions</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="border border-slate-800 rounded-lg p-6 hover:border-slate-700 transition-colors">
            <h3 className="font-bold text-white mb-2">Manage User Roles</h3>
            <p className="text-sm text-slate-400 mb-4">
              To upgrade an account from MTC-GUEST to MTC-USER, click the link below to open the Clerk Dashboard. 
              Edit the user's public metadata and assign `{`"role": "MTC-USER"`}`.
            </p>
            <a 
              href="https://dashboard.clerk.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-block bg-white hover:bg-slate-200 text-black font-bold px-4 py-2 rounded text-xs uppercase tracking-widest transition-colors"
            >
              Open Clerk Portal
            </a>
          </div>

          <div className="border border-slate-800 rounded-lg p-6 hover:border-slate-700 transition-colors">
            <h3 className="font-bold text-white mb-2">Database Management</h3>
            <p className="text-sm text-slate-400 mb-4">
              View raw telemetry tables, manage SQL migrations, and monitor API edge functions directly in the Supabase control plane.
            </p>
            <a 
              href="https://supabase.com/dashboard" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-block bg-emerald-500 hover:bg-emerald-400 text-emerald-950 font-bold px-4 py-2 rounded text-xs uppercase tracking-widest transition-colors"
            >
              Open Supabase Portal
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
