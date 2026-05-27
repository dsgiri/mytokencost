import { ReactNode } from "react";
import { redirect } from "next/navigation";
import Link from "next/link";
import { getUserRole } from "@/lib/roles";
import { UserButton } from "@clerk/nextjs";
import { ShieldAlert, Terminal, Users, Database, Network } from "lucide-react";

export default async function AdminLayout({ children }: { children: ReactNode }) {
  const role = await getUserRole();

  // STRIKE PROTOCOL: Eject unauthorized users immediately
  if (role !== "MTC-ADMIN") {
    redirect("/portal");
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] flex flex-col md:flex-row text-slate-300">
      {/* Admin Sidebar */}
      <aside className="w-full md:w-64 bg-black border-r border-red-900/30 flex flex-col">
        <div className="p-6 border-b border-red-900/30">
          <Link href="/admin" className="font-space-grotesk font-black text-xl text-white tracking-tighter flex items-center gap-2">
            <ShieldAlert className="w-5 h-5 text-red-500" />
            MTC<span className="text-red-500">Admin</span>
          </Link>
          <div className="mt-1 text-[10px] text-red-500 font-mono tracking-widest uppercase animate-pulse">
            GOD MODE ACTIVE
          </div>
        </div>

        <nav className="flex-1 p-4 space-y-1.5">
          <Link href="/admin" className="flex items-center space-x-3 px-4 py-2.5 text-slate-400 hover:text-slate-200 rounded-lg transition-colors">
            <Terminal className="w-4 h-4" />
            <span className="text-sm font-semibold tracking-wider">Command Center</span>
          </Link>
          <Link href="/admin/sitemap" className="flex items-center space-x-3 px-4 py-2.5 text-slate-400 hover:text-slate-200 rounded-lg transition-colors">
            <Network className="w-4 h-4" />
            <span className="text-sm font-semibold tracking-wider">Sitemap Auditor</span>
          </Link>
          <a 
            href="https://dashboard.clerk.com" 
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center space-x-3 px-4 py-2.5 text-slate-500 hover:text-slate-300 rounded-lg transition-colors"
          >
            <Users className="w-4 h-4" />
            <span className="text-sm font-semibold tracking-wider">Access Control</span>
          </a>
          <a 
            href="https://supabase.com/dashboard" 
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center space-x-3 px-4 py-2.5 text-slate-500 hover:text-slate-300 rounded-lg transition-colors"
          >
            <Database className="w-4 h-4" />
            <span className="text-sm font-semibold tracking-wider">Data Pipeline</span>
          </a>
        </nav>

        <div className="p-4 border-t border-red-900/30">
          <div className="flex w-full items-center justify-between px-2 py-2">
            <span className="text-xs font-mono text-slate-500">Root Account</span>
            <UserButton appearance={{ elements: { userButtonAvatarBox: "w-8 h-8 rounded-md ring-2 ring-red-500/50" } }} />
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        <header className="h-16 border-b border-red-900/30 bg-black/50 backdrop-blur flex items-center px-8 justify-between sticky top-0 z-10">
          <h1 className="text-sm font-mono text-red-400 tracking-widest uppercase">System Override Terminal</h1>
          <div className="flex items-center space-x-4">
            <span className="text-[10px] font-mono tracking-widest px-2 py-1 rounded bg-red-950/50 border border-red-900/50 text-red-400 uppercase">
              NETWORK: SECURE
            </span>
          </div>
        </header>
        <div className="p-8">
          {children}
        </div>
      </main>
    </div>
  );
}
