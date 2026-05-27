export interface LogEntry {
  time: string;
  model: string;
  tokens: number;
  cost: number;
  status: "Allowed" | "Blocked";
}

export interface TerminalLog {
  id: string;
  time: string;
  type: "info" | "success" | "warning" | "error";
  msg: string;
}

export interface Toast {
  id: string;
  message: string;
  type: "success" | "warning" | "error";
}

export interface ProviderScope {
  openai: boolean;
  anthropic: boolean;
  google: boolean;
  openrouter: boolean;
}

export interface ExtensionSettings {
  sessionCost: number;
  tokenCount: number;
  activeModel: string;
  budgetCeiling: number;
  enabledProviders: ProviderScope;
  historyLog: LogEntry[];
}
