import { Metadata } from "next";
import { sanityClient } from "@/lib/sanity";
import { Calendar, BookOpen, ArrowRight, AlertTriangle } from "lucide-react";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Compliance Intelligence Blog | MyTokenCost",
  description: "Latest insights on regulatory shifts, grid telemetry, and physical infrastructure mapping for high-density compute.",
};

async function getPosts() {
  try {
    return await sanityClient.fetch(
      `*[_type == "post"] | order(publishedAt desc) {
        _id,
        title,
        publishedAt,
        body,
        "slug": slug.current
      }`,
      {},
      { next: { revalidate: 60 } }
    );
  } catch (error) {
    console.error("Failed to fetch blog posts from Sanity:", error);
    return [];
  }
}

function renderBlockText(blocks: any[], maxLength = 250) {
  if (!blocks || !Array.isArray(blocks)) return "";
  let plainText = "";
  for (const block of blocks) {
    if (block._type === 'block' && block.children) {
      plainText += block.children.map((child: any) => child.text).join('') + " ";
    }
  }
  if (plainText.length > maxLength) {
    return plainText.substring(0, maxLength) + "...";
  }
  return plainText;
}

export default async function BlogsPage() {
  const posts = await getPosts();
  const featuredPost = posts[0];
  const remainingPosts = posts.slice(1);

  return (
    <div className="min-h-screen py-24 bg-slate-950 text-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <h1 className="text-4xl md:text-5xl font-bold font-space-grotesk tracking-tight text-white">
            Compliance <span className="text-[#00f0ff]">Intelligence</span>
          </h1>
          <p className="text-slate-400 text-lg">
            Inside briefings, telemetry assessments, and legal guides covering the intersection of physical power grids and artificial intelligence infrastructure.
          </p>
        </div>

        {posts.length === 0 ? (
          <div className="py-24 text-center border-2 border-dashed border-slate-800 rounded-2xl max-w-md mx-auto">
            <AlertTriangle className="w-12 h-12 text-[#00f0ff] mx-auto mb-4 animate-pulse" />
            <h2 className="text-xl font-bold text-white mb-2">Syncing Briefings...</h2>
            <p className="text-sm text-slate-400 px-6">
              Our intelligence articles are currently syncing from the secure distributed CMS. Please refresh in a moment.
            </p>
          </div>
        ) : (
          <div className="space-y-12">
            
            {/* Featured Post */}
            {featuredPost && (
              <div className="relative group overflow-hidden rounded-3xl border border-slate-800 bg-slate-900/40 p-6 md:p-10 transition-all hover:border-[#00f0ff]/30 shadow-xl">
                <div className="absolute top-0 right-0 p-6 text-xs font-bold text-[#00f0ff] uppercase tracking-wider bg-slate-950/80 border-b border-l border-slate-800 rounded-bl-2xl">
                  ★ Latest Briefing
                </div>
                <div className="max-w-3xl space-y-6">
                  <div className="flex flex-wrap items-center gap-4 text-xs text-slate-400">
                    <span className="flex items-center gap-1.5">
                      <Calendar className="w-4 h-4 text-slate-500" />
                      {new Date(featuredPost.publishedAt).toLocaleDateString("en-US", {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <BookOpen className="w-4 h-4 text-slate-500" />
                      Intelligence Report
                    </span>
                  </div>
                  
                  <h2 className="text-3xl md:text-4xl font-bold font-space-grotesk text-white group-hover:text-[#00f0ff] transition-colors leading-tight">
                    {featuredPost.title}
                  </h2>

                  <p className="text-slate-300 text-base md:text-lg leading-relaxed">
                    {renderBlockText(featuredPost.body, 320)}
                  </p>

                  <div className="pt-4 flex items-center gap-4">
                    <Link 
                      href={`/contact?audit-lead=true&interest=${featuredPost.slug}`}
                      className="inline-flex items-center gap-2 bg-[#00f0ff] hover:bg-[#00d8e6] text-slate-950 font-bold px-6 py-3 rounded-lg text-sm tracking-wider uppercase transition-colors shadow-lg shadow-[#00f0ff]/10 group"
                    >
                      Book Professional Audit
                      <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                    </Link>
                  </div>
                </div>
              </div>
            )}

            {/* Remaining Posts Grid */}
            {remainingPosts.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-8">
                {remainingPosts.map((post: any) => (
                  <div 
                    key={post._id} 
                    className="bg-slate-900/20 border border-slate-900 rounded-2xl p-6 md:p-8 flex flex-col justify-between hover:border-slate-800 transition-colors"
                  >
                    <div className="space-y-4">
                      <div className="flex items-center gap-3 text-xs text-slate-500">
                        <Calendar className="w-3.5 h-3.5" />
                        {new Date(post.publishedAt).toLocaleDateString("en-US", {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric'
                        })}
                      </div>

                      <h3 className="text-xl font-bold text-white font-space-grotesk leading-snug">
                        {post.title}
                      </h3>

                      <p className="text-slate-400 text-sm leading-relaxed">
                        {renderBlockText(post.body, 180)}
                      </p>
                    </div>

                    <div className="pt-6 mt-6 border-t border-slate-900 flex items-center justify-between">
                      <span className="text-xs text-slate-500">SLA Audited Content</span>
                      <Link 
                        href="/contact"
                        className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-400 hover:text-white transition-colors group"
                      >
                        Request Advisory 
                        <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            )}

          </div>
        )}

      </div>
    </div>
  );
}

