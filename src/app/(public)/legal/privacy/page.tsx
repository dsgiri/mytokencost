import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | MyTokenCost",
  description: "Privacy policy and data handling practices for MyTokenCost compliance simulator.",
};

export default function PrivacyPolicyPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-slate-300 space-y-8">
      <h1 className="text-4xl font-extrabold font-space-grotesk text-white">Privacy Policy</h1>
      <p className="text-sm text-slate-500">Effective Date: May 2026</p>
      
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-[#00f0ff]">1. Data Collection and Usage</h2>
        <p>
          At MyTokenCost, we believe in a "Black-Box" approach to infrastructure compliance. The primary telemetry metrics you input into our interactive simulation canvases (such as Node counts, facility sizes, and peak utilization rates) are processed entirely within your local browser session. We do not persist, log, or transmit your raw facility simulation data to our backend servers without your explicit consent.
        </p>
        <p>
          When you submit a request for a custom compliance audit via our Intake Funnel, we collect your business contact information (Name, Email, Facility Location) strictly for the purpose of communicating with you and delivering our paid services.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-[#00f0ff]">2. Telemetry and Analytics</h2>
        <p>
          We monitor macro-level network telemetry to ensure our platform is functioning correctly. This includes anonymous visitor metrics, load times, and error tracking. We do not correlate your anonymous session telemetry with your business identity unless you explicitly provide it during a checkout or lead capture flow.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-[#00f0ff]">3. Third-Party Integrations</h2>
        <p>
          We utilize highly secure, industry-standard third-party providers for specific infrastructure tasks:
        </p>
        <ul className="list-disc pl-5 space-y-2 text-sm">
          <li><strong>Clerk:</strong> Manages secure user authentication and identity verification for our portal.</li>
          <li><strong>Stripe:</strong> Processes all credit card transactions and financial data. MyTokenCost never touches or stores your raw payment details.</li>
          <li><strong>Supabase:</strong> Provides our encrypted, Row-Level-Secure PostgreSQL database for storing your generated Compliance Playbooks and Audit records.</li>
        </ul>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-[#00f0ff]">4. Contact</h2>
        <p>
          If you have questions regarding this Privacy Policy or need to request the deletion of your account data, please contact our compliance engineering team.
        </p>
      </section>
    </div>
  );
}
