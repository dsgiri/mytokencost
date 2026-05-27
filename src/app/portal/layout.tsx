import { ReactNode } from "react";
import Link from "next/link";
import { LayoutDashboard, FileText, Settings } from "lucide-react";
import { UserButton } from "@clerk/nextjs";
import { currentUser } from "@clerk/nextjs/server";
import { getUserRole } from "@/lib/roles";

export default async function PortalLayout({ children }: { children: ReactNode }) {
  const user = await currentUser();
  const greetingName = user?.firstName || user?.emailAddresses?.[0]?.emailAddress || "Guest";
  const role = await getUserRole();

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col md:flex-row">
      {/* Sidebar */}
      <aside className="w-full md:w-64 bg-slate-900 border-r border-slate-800 flex flex-col">
        <div className="p-6 border-b border-slate-800">
          <Link href="/" className="font-space-grotesk font-black text-xl text-white tracking-tighter">
            MyToken<span className="text-[#00f0ff]">Cost</span>
          </Link>
          <div className="mt-1 text-[10px] text-emerald-400 font-mono tracking-widest uppercase">
            Client Portal
          </div>
        </div>

        <nav className="flex-1 p-4 space-y-2">
          <Link href="/portal" className="flex items-center space-x-3 px-4 py-3 bg-slate-800 text-white rounded-lg transition-colors">
            <LayoutDashboard className="w-4 h-4 text-[#00f0ff]" />
            <span className="text-sm font-semibold">Dashboard</span>
          </Link>
          <Link href="/portal/audits" className="flex items-center space-x-3 px-4 py-3 text-slate-400 hover:bg-slate-800/50 hover:text-white rounded-lg transition-colors">
            <FileText className="w-4 h-4" />
            <span className="text-sm font-semibold">My Audits</span>
          </Link>
          <Link href="/portal/settings" className="flex items-center space-x-3 px-4 py-3 text-slate-400 hover:bg-slate-800/50 hover:text-white rounded-lg transition-colors">
            <Settings className="w-4 h-4" />
            <span className="text-sm font-semibold">Settings</span>
          </Link>
        </nav>

        <div className="p-4 border-t border-slate-800">
          <div className="flex w-full items-center justify-between px-2 py-2">
            <span className="text-sm font-semibold text-slate-400">Account</span>
            <UserButton appearance={{ elements: { userButtonAvatarBox: "w-8 h-8 rounded-md" } }} />
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        <header className="h-16 border-b border-slate-800 bg-slate-950/50 backdrop-blur flex items-center px-8 justify-between sticky top-0 z-10">
          <h1 className="text-lg font-bold text-white tracking-tight">Active Infrastructure for {greetingName}</h1>
          <div className="flex items-center space-x-4">
            <span className="text-[10px] font-mono tracking-widest px-2 py-1 rounded bg-slate-800 border border-slate-700 text-[#00f0ff] uppercase">
              ROLE: {role}
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
