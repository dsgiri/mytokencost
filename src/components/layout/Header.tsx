import Link from 'next/link';
import { ThemeToggle } from "./ThemeToggle";
import { SignInButton, UserButton } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";

export async function Header() {
  const { userId } = await auth();

  return (
    <header className="border-b border-slate-200/80 dark:border-slate-800/80 bg-white/85 dark:bg-slate-950/85 backdrop-blur-md sticky top-0 z-40 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        
        {/* Brand Group */}
        <div className="flex items-center space-x-3">
          <svg className="w-8 h-8 flex-shrink-0" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="16" cy="16" r="14" className="stroke-blue-600 dark:stroke-[#00f0ff]" strokeWidth="2.5" />
            <path d="M10 11h12v3.5h-4.25V22h-3.5v-7.5H10V11z" className="fill-blue-600 dark:fill-[#00f0ff]" />
          </svg>
          <div className="flex flex-col">
            <Link href="/" className="font-space-grotesk font-bold text-lg tracking-wider text-slate-950 dark:text-white leading-none">
              MyToken<span className="text-blue-600 dark:text-[#00f0ff]">Cost</span>.com
            </Link>
            <span className="text-[9px] text-slate-500 dark:text-slate-400 tracking-tight transition-colors">Real-time AI Infrastructure & Compliance Audit</span>
          </div>
        </div>
        
        {/* Actions & Navigation Group */}
        <div className="flex items-center space-x-4 sm:space-x-6">
          
          {/* Grouped Public Navigation (Separated by subtle border) */}
          <nav className="hidden lg:flex items-center space-x-6 border-r border-slate-200 dark:border-slate-800/80 pr-6 mr-2 transition-colors">
            <Link href="/blueprints" className="text-xs text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition uppercase tracking-wider font-semibold">
              Blueprints
            </Link>
            <Link href="/blogs" className="text-xs text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition uppercase tracking-wider font-semibold">
              Intelligence
            </Link>
            <Link href="/playground" className="text-xs text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition uppercase tracking-wider font-semibold">
              Playground
            </Link>
            <Link href="/pricing" className="text-xs text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition uppercase tracking-wider font-semibold">
              Pricing
            </Link>
          </nav>

          {/* User Operations & primary transaction trigger */}
          <div className="flex items-center space-x-3.5">
            <ThemeToggle />

            {!userId ? (
              <SignInButton mode="modal">
                <button className="hidden md:inline-flex text-xs text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition uppercase tracking-wider font-bold cursor-pointer">
                  Client Login
                </button>
              </SignInButton>
            ) : (
              <>
                <Link href="/portal" className="hidden md:inline-flex text-xs text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition uppercase tracking-wider font-bold">
                  Dashboard
                </Link>
                <UserButton appearance={{ elements: { userButtonAvatarBox: "w-8 h-8 rounded-md" } }} />
              </>
            )}

            <Link href="/contact?type=demo" className="bg-blue-600 hover:bg-blue-500 dark:bg-[#00f0ff] dark:hover:bg-[#00d8e6] text-white dark:text-slate-950 font-extrabold px-4.5 py-2.5 rounded-xl text-xs tracking-wider uppercase transition-all shadow-md shadow-blue-500/10 dark:shadow-cyan-500/5 hover:scale-[1.02] active:scale-[0.98]">
              Book a Demo
            </Link>
          </div>
        </div>

      </div>
    </header>
  );
}
