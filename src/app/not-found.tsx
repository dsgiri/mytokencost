import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center space-y-8">
        <div className="space-y-4">
          <h1 className="text-8xl font-extrabold font-space-grotesk text-slate-800">404</h1>
          <h2 className="text-2xl font-bold text-white tracking-tight">Telemetry Endpoints Not Found</h2>
          <p className="text-slate-400">
            The infrastructure mapping or compliance record you are looking for does not exist in our active directories.
          </p>
        </div>
        <Link 
          href="/" 
          className="inline-block bg-[#00f0ff] hover:bg-[#00d8e6] text-slate-950 font-bold px-8 py-3 rounded text-sm tracking-wider uppercase transition-colors"
        >
          Return to Dashboard
        </Link>
      </div>
    </div>
  );
}
