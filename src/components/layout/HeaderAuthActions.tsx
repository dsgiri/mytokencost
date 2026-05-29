"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { SignInButton, UserButton, useAuth } from "@clerk/nextjs";

export function HeaderAuthActions() {
  const [mounted, setMounted] = useState(false);
  const { isLoaded, userId } = useAuth();

  useEffect(() => {
    setMounted(true);
  }, []);

  // During SSR or before client hydration / Clerk loader completes,
  // render the static fallback Signed-Out visual layout to ensure perfect DOM tree matching.
  if (!mounted || !isLoaded) {
    return (
      <div className="flex items-center space-x-3.5">
        <button className="hidden md:inline-flex text-xs text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition uppercase tracking-wider font-bold opacity-0 pointer-events-none">
          Client Login
        </button>
        <div className="w-8 h-8 rounded-md bg-transparent" />
        <Link href="/contact?type=demo" className="bg-blue-600 hover:bg-blue-500 dark:bg-[#00f0ff] dark:hover:bg-[#00d8e6] text-white dark:text-slate-950 font-extrabold px-4.5 py-2.5 rounded-xl text-xs tracking-wider uppercase transition-all shadow-md shadow-blue-500/10 dark:shadow-cyan-500/5 hover:scale-[1.02] active:scale-[0.98]">
          Book a Demo
        </Link>
      </div>
    );
  }

  return (
    <div className="flex items-center space-x-3.5">
      {!userId ? (
        <>
          <SignInButton mode="modal">
            <button className="hidden md:inline-flex text-xs text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition uppercase tracking-wider font-bold cursor-pointer">
              Client Login
            </button>
          </SignInButton>
          <div className="w-8 h-8 rounded-md bg-transparent" />
        </>
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
  );
}
