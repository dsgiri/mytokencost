"use server";

import { logger } from "@/lib/logger";

/**
 * Returns immediate local static telemetry snapshot.
 * 100% offline-first, local, and zero remote dependencies as per user guidelines.
 */
export async function getLatestTelemetry(region: string = "ERCOT") {
  logger.info("Serving secure local static telemetry snapshot", { region });
  
  return {
    current_load_mw: 62000,
    capacity_mw: 82000,
    water_stress_index: 75.6,
    isSynthetic: true
  };
}
