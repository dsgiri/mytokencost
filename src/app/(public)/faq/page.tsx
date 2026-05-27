import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Frequently Asked Questions | MyTokenCost",
  description: "Common questions regarding physical infrastructure auditing and telemetry mapping.",
};

export default function FAQPage() {
  const faqs = [
    {
      q: "What is a Physical Infrastructure Audit?",
      a: "A physical infrastructure audit evaluates your facility's energy draw, water footprint, and backup systems against specific state and regional regulatory frameworks (such as ERCOT Large Flexible Load requirements). It determines if your facility is required to file mandatory compliance paperwork to avoid penalties."
    },
    {
      q: "Does MyTokenCost need API access to my server cluster?",
      a: "No. Our system operates on a 'Black-Box' heuristic model. We only require surface-level facility parameters (e.g., total rack nodes, cooling motor horsepower) which we then run against public grid telemetry to determine your penalty exposure."
    },
    {
      q: "What does the $1,499 Flat-Rate Audit include?",
      a: "The flat-rate fee secures a full manual review of your facility by our compliance engineering team. Within 7 days, we deliver a legally formatted, audit-ready compliance playbook customized to your specific grid operator (e.g., ERCOT, PJM) and local state laws."
    },
    {
      q: "How accurate is the HUD Simulator?",
      a: "The simulator uses aggressive, conservative estimation algorithms based on worst-case grid stress scenarios. While highly accurate for scoping your liability, formal compliance filings require the certified manual audit we provide in our paid tier."
    }
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-8">
      <h1 className="text-4xl font-extrabold font-space-grotesk text-slate-900 dark:text-white">Frequently Asked Questions</h1>
      
      <div className="space-y-6">
        {faqs.map((faq, idx) => (
          <div key={idx} className="bg-slate-100 dark:bg-slate-900/60 p-6 rounded-xl border border-slate-300 dark:border-slate-800">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">{faq.q}</h3>
            <p className="text-slate-600 dark:text-slate-400">{faq.a}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
