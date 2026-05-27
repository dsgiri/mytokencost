import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us | MyTokenCost",
  description: "Learn about the mission behind the physical auditor for AI infrastructure.",
};

export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-slate-300 space-y-8">
      <h1 className="text-4xl font-extrabold font-space-grotesk text-slate-900 dark:text-white">About MyTokenCost</h1>
      
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-blue-600 dark:text-[#00f0ff]">The Physical Cost of Digital Compute</h2>
        <p>
          MyTokenCost was founded to bridge the massive disconnect between cloud-native AI development and terrestrial grid infrastructure. While language models and inference clusters operate in a seemingly weightless digital environment, the physical reality is that they consume massive amounts of megawatts and millions of gallons of cooling water.
        </p>
        <p>
          Our mission is to provide facility operators, municipal utilities, and regional grid managers with a non-invasive, highly accurate telemetry dashboard that maps these digital loads to strict state compliance thresholds.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-blue-600 dark:text-[#00f0ff]">Our Methodology</h2>
        <p>
          We operate a secure "Black-Box" heuristic framework. Instead of requiring deep API access into your sensitive server racks, we rely on broad facility variables (Node counts, HP, Generator footprints) cross-referenced against regional telemetry databases (such as ERCOT and TCEQ) to estimate your exact legal liability and operating headroom.
        </p>
      </section>
    </div>
  );
}
