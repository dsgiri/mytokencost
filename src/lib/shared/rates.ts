export interface TokenRate {
  name: string;
  inputCostPerMillion: number;
  outputCostPerMillion: number;
}

export type ProviderKey = "openai" | "anthropic" | "google" | "openrouter";

/**
 * Standard dynamic billing rate card per 1,000,000 tokens.
 * Single Source of Truth (SSOT) for all LLM calculators, extension compilers, and dashboards.
 */
export const LLM_RATE_CARD: Record<ProviderKey, TokenRate> = {
  openai: {
    name: "gpt-4o",
    inputCostPerMillion: 5.00,
    outputCostPerMillion: 15.00
  },
  anthropic: {
    name: "claude-3-5-sonnet",
    inputCostPerMillion: 3.00,
    outputCostPerMillion: 15.00
  },
  google: {
    name: "gemini-1.5-pro",
    inputCostPerMillion: 1.25,
    outputCostPerMillion: 5.00
  },
  openrouter: {
    name: "deepseek-coder",
    inputCostPerMillion: 0.14,
    outputCostPerMillion: 0.28
  }
};
