"use client";

import { useEffect, useState } from "react";

export function TextScaleToggle() {
  const [mounted, setMounted] = useState(false);
  const [isLarge, setIsLarge] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Load scale preference from localStorage
    const savedScale = localStorage.getItem("mtc-text-scale");
    if (savedScale === "large") {
      setIsLarge(true);
      document.documentElement.style.fontSize = "112.5%"; // Scales base font size from 16px to 18px (Boosts rem units by 12.5%)
    } else {
      document.documentElement.style.fontSize = "100%";
    }
  }, []);

  const toggleScale = () => {
    const nextLarge = !isLarge;
    setIsLarge(nextLarge);
    if (nextLarge) {
      localStorage.setItem("mtc-text-scale", "large");
      document.documentElement.style.fontSize = "112.5%";
    } else {
      localStorage.setItem("mtc-text-scale", "normal");
      document.documentElement.style.fontSize = "100%";
    }
  };

  if (!mounted) {
    return <div className="w-8 h-8"></div>; // Prevents visual layout shifts during SSR
  }

  return (
    <button
      onClick={toggleScale}
      className={`h-8 w-8 rounded-lg flex items-center justify-center border transition-all text-xs font-black cursor-pointer select-none ${
        isLarge 
          ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-450 hover:bg-emerald-500/20" 
          : "bg-slate-800/50 border-slate-700/50 text-slate-400 hover:text-white hover:bg-slate-800"
      }`}
      title={isLarge ? "Restore Standard Text Size" : "Enlarge Font Scaling (B2B SaaS Readability Mode)"}
      aria-label="Adjust Typography Scaling"
    >
      <span className="font-display tracking-tight text-[11px] leading-none">Aa</span>
    </button>
  );
}
