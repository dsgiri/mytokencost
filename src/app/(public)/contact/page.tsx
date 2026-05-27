import { Metadata } from "next";
import { AuditLeadForm } from "@/components/forms/AuditLeadForm";

export const metadata: Metadata = {
  title: "Contact & Book Audit | MyTokenCost",
  description: "Secure your facility compliance audit today.",
};

export default function ContactPage() {
  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-8">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-extrabold font-space-grotesk text-slate-900 dark:text-white">Contact & Auditing</h1>
        <p className="text-slate-600 dark:text-slate-400">
          Reach out to our engineering team directly to secure a priority compliance evaluation slot. We strictly limit intake to ensure high fidelity playbook generation.
        </p>
      </div>

      <AuditLeadForm />
    </div>
  );
}
