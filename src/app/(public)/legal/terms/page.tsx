import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service | MyTokenCost",
  description: "Terms of Service and legal disclaimers for MyTokenCost.",
};

export default function TermsOfServicePage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-slate-300 space-y-8">
      <h1 className="text-4xl font-extrabold font-space-grotesk text-white">Terms of Service</h1>
      <p className="text-sm text-slate-500">Effective Date: May 2026</p>
      
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-[#00f0ff]">1. Acceptance of Terms</h2>
        <p>
          By accessing or using the MyTokenCost platform, you agree to be bound by these Terms of Service. If you do not agree to all the terms and conditions, you must navigate away from this platform immediately.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-[#00f0ff]">2. Educational and Simulation Purposes Only</h2>
        <p>
          <strong>DISCLAIMER:</strong> The MyTokenCost interactive simulator, dashboard scorecards, and estimated penalty liabilities are provided strictly for educational and macroscopic estimation purposes. The figures calculated by the application are estimates based on public grid data and generalized regulatory frameworks (such as ERCOT LFL or TCEQ bounds). 
        </p>
        <p>
          They do not constitute legally binding environmental audits, certified engineering evaluations, or formal legal advice. You assume all responsibility for verifying your actual facility telemetry and securing formal legal representation for state filings.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-[#00f0ff]">3. Paid Audit Services</h2>
        <p>
          If you purchase a Custom Compliance Audit ($1,499), our engineering team will provide a manual, documented review of your infrastructure parameters. All digital deliverables are final once submitted to your client portal. Refunds are only issued in the event that we cannot process your specific facility type or geographic grid profile.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-[#00f0ff]">4. Limitation of Liability</h2>
        <p>
          In no event shall MyTokenCost, its founders, or affiliates be liable for any direct, indirect, incidental, or consequential damages, including but not limited to fines levied by state regulators, loss of data, or power disruptions resulting from the use or inability to use this software.
        </p>
      </section>
    </div>
  );
}
