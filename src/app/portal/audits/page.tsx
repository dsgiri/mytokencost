import Link from "next/link";
import { FileWarning } from "lucide-react";

export default function AuditsPage() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <div className="max-w-md w-full bg-slate-900/50 border border-slate-800 p-8 rounded-xl text-center space-y-6 backdrop-blur-sm">
        <div className="w-16 h-16 bg-slate-800 text-slate-400 rounded-full flex items-center justify-center mx-auto border border-slate-700">
          <FileWarning className="w-8 h-8" />
        </div>
        <div>
          <h2 className="text-xl font-bold font-space-grotesk text-white">No Audit Records Found</h2>
          <p className="text-sm text-slate-400 mt-2 leading-relaxed">
            Your enterprise account currently has no active or historical ERCOT compliance playbooks associated with it.
          </p>
        </div>
        <div className="pt-4 border-t border-slate-800">
          <Link
            href="/contact"
            className="block w-full bg-[#00f0ff] hover:bg-[#00d8e6] text-slate-950 font-bold py-3 rounded-lg text-sm tracking-wider uppercase transition-colors"
          >
            Initiate Compliance Audit
          </Link>
        </div>
      </div>
    </div>
  );
}
