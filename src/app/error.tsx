"use client";

import { useEffect } from "react";

export default function ErrorBoundary({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // In a real production app, this would route to Sentry/Datadog
    console.error("Next.js Route Error Boundary Caught:", error);
  }, [error]);

  return (
    <div className="w-full flex items-center justify-center py-24 px-4">
      <div className="max-w-xl w-full bg-slate-900/50 border border-red-500/30 p-8 rounded-xl text-center space-y-6 backdrop-blur-sm">
        <div className="w-12 h-12 bg-red-500/10 text-red-500 rounded-full flex items-center justify-center mx-auto border border-red-500/30">
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
        </div>
        <div>
          <h2 className="text-xl font-bold font-space-grotesk text-white">Component Load Failure</h2>
          <p className="text-sm text-slate-400 mt-2">
            A module within this view encountered an unexpected fault. The rest of the dashboard remains operational.
          </p>
        </div>
        <button
          onClick={() => reset()}
          className="bg-slate-800 hover:bg-slate-700 text-white px-6 py-2 rounded-lg text-sm font-bold tracking-wide transition-colors border border-slate-700"
        >
          Attempt Re-render
        </button>
      </div>
    </div>
  );
}
