"use server";

import { createClient } from "@supabase/supabase-js";

import { logger } from "@/lib/logger";

// We instantiate a secure server-side client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
// We can use the service role key for admin actions, or anon for public reading.
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

const supabase = createClient(supabaseUrl, supabaseKey);

export async function getLatestTelemetry(region: string = "ERCOT") {
  try {
    const { data, error } = await supabase
      .from("telemetry_snapshots")
      .select("*")
      .eq("region", region)
      .order("timestamp", { ascending: false })
      .limit(1)
      .single();

    if (error || !data) {
      logger.warn("Telemetry fetch fallback triggered", { region, error: error?.message });
      // Return synthetic fallback data if the DB is empty or fails
      return {
        current_load_mw: 62000,
        capacity_mw: 82000,
        water_stress_index: 75.6,
        isSynthetic: true
      };
    }

    return {
      ...data,
      isSynthetic: false
    };
  } catch (err) {
    logger.error("Failed to fetch telemetry from Supabase", err, { region });
    return {
      current_load_mw: 62000,
      capacity_mw: 82000,
      water_stress_index: 75.6,
      isSynthetic: true
    };
  }
}
