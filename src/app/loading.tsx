export default function Loading() {
  return (
    <div className="w-full flex items-center justify-center min-h-[50vh]">
      <div className="flex flex-col items-center space-y-4">
        <div className="w-12 h-12 border-4 border-slate-800 border-t-[#00f0ff] rounded-full animate-spin"></div>
        <p className="text-sm font-bold text-[#00f0ff] uppercase tracking-widest animate-pulse">
          Syncing Telemetry...
        </p>
      </div>
    </div>
  );
}
