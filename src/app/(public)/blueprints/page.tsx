import { Metadata } from "next";
import { sanityClient } from "@/lib/sanity";
import { FileText, ShieldAlert, CheckCircle2, ArrowRight } from "lucide-react";
import Link from "next/link";

export const metadata: Metadata = {
  title: "SOP Blueprints | MyTokenCost",
  description: "Browse our repository of standardized operating procedures and compliance blueprints.",
};

async function getBlueprints() {
  try {
    return await sanityClient.fetch(
      `*[_type == "blueprint"] | order(title asc) {
        _id,
        title,
        regulatoryBody,
        penaltyRisk,
        steps,
        "slug": slug.current
      }`,
      {},
      { next: { revalidate: 60 } }
    );
  } catch (error) {
    console.error("Failed to fetch blueprints from Sanity:", error);
    return [];
  }
}

function renderBlockText(blocks: any[]) {
  if (!blocks || !Array.isArray(blocks)) return null;
  return blocks.map((block, i) => {
    if (block._type === 'block' && block.children) {
      const text = block.children.map((child: any) => child.text).join('');
      return (
        <p key={i} className="text-slate-300 text-sm leading-relaxed mb-3">
          {text}
        </p>
      );
    }
    return null;
  });
}

export default async function BlueprintsPage() {
  const blueprints = await getBlueprints();

  return (
    <div className="min-h-screen py-24 bg-slate-950 text-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Section */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <h1 className="text-4xl md:text-5xl font-bold font-space-grotesk tracking-tight text-white">
            Compliance <span className="text-[#00f0ff]">Blueprints</span>
          </h1>
          <p className="text-slate-400 text-lg">
            Standard operating procedures (SOPs) engineered to map high-density compute loads to complex physical grid frameworks. Non-invasive, legal-grade compliance checklists.
          </p>
        </div>

        {blueprints.length === 0 ? (
          <div className="py-24 text-center border-2 border-dashed border-slate-800 rounded-2xl max-w-md mx-auto">
            <ShieldAlert className="w-12 h-12 text-amber-500 mx-auto mb-4 animate-pulse" />
            <h2 className="text-xl font-bold text-white mb-2">Syncing with Secure Node...</h2>
            <p className="text-sm text-slate-400 px-6">
              Our compliance blueprints are currently syncing from the secure distributed CMS. Please refresh in a moment.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {blueprints.map((bp: any) => (
              <div 
                key={bp._id} 
                className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 md:p-8 flex flex-col justify-between transition-all hover:border-[#00f0ff]/40 hover:shadow-[0_0_30px_rgba(0,240,255,0.05)]"
              >
                <div>
                  {/* Badge & Agency Info */}
                  <div className="flex items-center justify-between mb-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider ${
                      bp.regulatoryBody === "ERCOT" 
                        ? "bg-[#00f0ff]/10 text-[#00f0ff] border border-[#00f0ff]/20" 
                        : "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                    }`}>
                      {bp.regulatoryBody || "GENERAL"} Agency Heuristic
                    </span>
                    <FileText className="w-5 h-5 text-slate-500" />
                  </div>

                  {/* Title */}
                  <h3 className="text-2xl font-bold font-space-grotesk text-white mb-4">
                    {bp.title}
                  </h3>

                  {/* Penalty Box */}
                  {bp.penaltyRisk && (
                    <div className="bg-amber-500/10 border border-amber-500/20 rounded-xl p-4 mb-6 flex items-start gap-3">
                      <ShieldAlert className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
                      <div>
                        <span className="text-xs font-bold uppercase tracking-wider text-amber-500 block">
                          Civil Penalty Risk
                        </span>
                        <span className="text-sm text-slate-200">
                          {bp.penaltyRisk}
                        </span>
                      </div>
                    </div>
                  )}

                  {/* SOP Steps */}
                  <div className="space-y-4 mb-8">
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-2">
                      Structured SOP Checklist
                    </span>
                    {bp.steps && renderBlockText(bp.steps)}
                  </div>
                </div>

                {/* Call to Action */}
                <div className="pt-6 border-t border-slate-800 flex items-center justify-between gap-4">
                  <div className="text-xs text-slate-500">
                    Playbook SLA: Verified 7-Day Output
                  </div>
                  <Link 
                    href={`/contact?blueprint=${bp.slug}`} 
                    className="inline-flex items-center gap-2 text-sm font-semibold text-[#00f0ff] hover:text-white transition-colors group"
                  >
                    Deploy Certified SOP 
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
}

