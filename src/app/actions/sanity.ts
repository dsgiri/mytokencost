"use server";

import { sanityClient } from "@/lib/sanity";
import { logger } from "@/lib/logger";

export async function getComplianceBlueprint(slug: string) {
  try {
    const query = `*[_type == "blueprint" && slug.current == $slug][0]`;
    const data = await sanityClient.fetch(query, { slug });
    if (data) {
      return {
        title: data.title,
        regulatoryBody: data.regulatoryBody || null,
        penaltyRisk: data.penaltyRisk || null,
        steps: data.steps || null,
        success: true
      };
    }
    return { success: false };
  } catch (err) {
    logger.warn("Failed to fetch blueprint from Sanity, falling back to local static rules.", { err, slug });
    return { success: false };
  }
}
