import { Hero } from "@/components/marketing/Hero";
import { ComplianceCalculator } from "@/components/hud/ComplianceCalculator";
import { USGridTelemetry } from "@/components/hud/USGridTelemetry";
import { AuditLeadForm } from "@/components/forms/AuditLeadForm";

export default function Home() {
  return (
    <>
      <Hero />
      <USGridTelemetry />
      <ComplianceCalculator />
      
      <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">
        <AuditLeadForm />
      </div>
    </>
  );
}
