import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Legal Disclaimer | MyTokenCost",
  description: "Legal disclaimer regarding the use of MyTokenCost simulation tools.",
};

export default function DisclaimerPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-slate-300 space-y-8">
      <h1 className="text-4xl font-extrabold font-space-grotesk text-white">Legal Disclaimer</h1>
      <p className="text-sm text-slate-500">Effective Date: May 2026</p>
      
      <section className="space-y-4">
        <div className="bg-amber-500/10 border border-amber-500/20 p-6 rounded-lg space-y-3">
          <h2 className="text-xl font-bold text-amber-400 tracking-tight uppercase">Not Professional Engineering or Legal Advice</h2>
          <p className="text-sm">
            The telemetry mappings, penalty scorecards, and regulatory threshold calculations provided on MyTokenCost.com are designed strictly for <strong>educational and macroscopic estimation purposes</strong>. 
          </p>
          <p className="text-sm">
            The data presented by our simulation engines is derived from generalized heuristic models of public grid data (such as the ERCOT Large Flexible Load task force constraints and TCEQ guidelines). MyTokenCost does not constitute certified engineering evaluations, formal environmental audits, or legally binding advice.
          </p>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-[#00f0ff]">1. No Warranty of Accuracy</h2>
        <p>
          While we strive to keep our grid threshold baselines and state regulatory formulas up to date, energy compliance laws are highly localized and subject to constant revision by state bodies. We make no representations or warranties of any kind, express or implied, about the completeness, accuracy, reliability, or suitability of the calculations provided by our sandbox tools.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-[#00f0ff]">2. Assumption of Risk</h2>
        <p>
          Any reliance you place on such information is strictly at your own risk. Infrastructure architects, data center operators, and facility managers assume all responsibility for independently verifying their specific facility telemetry, securing formal legal representation, and passing official physical audits prior to state reporting deadlines.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-[#00f0ff]">3. Limitation of Liability</h2>
        <p>
          In no event will MyTokenCost or its engineers be liable for any loss or damage including without limitation, indirect or consequential loss or damage, or any loss or damage whatsoever arising from regulatory fines, loss of data, grid shutoffs, or profit loss arising out of, or in connection with, the use of this software.
        </p>
      </section>
    </div>
  );
}
