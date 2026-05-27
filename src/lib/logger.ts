/**
 * Centralized logging utility to ensure system faults are trapped,
 * formatted, and optionally routed to an external observability platform.
 */

type LogLevel = "info" | "warn" | "error" | "fatal";

interface LogPayload {
  level: LogLevel;
  message: string;
  context?: Record<string, unknown>;
  error?: unknown;
  timestamp: string;
}

class SystemLogger {
  private formatLog(payload: LogPayload) {
    // In production, this could be sent to Datadog, Sentry, or generic ELK stack
    const logString = `[${payload.timestamp}] [${payload.level.toUpperCase()}] ${payload.message}`;
    
    if (payload.error) {
      return `${logString} \n Error Context: ${payload.error}`;
    }
    
    return payload.context ? `${logString} \n Data: ${JSON.stringify(payload.context)}` : logString;
  }

  info(message: string, context?: Record<string, unknown>) {
    const payload: LogPayload = { level: "info", message, context, timestamp: new Date().toISOString() };
    console.log(this.formatLog(payload));
  }

  warn(message: string, context?: Record<string, unknown>) {
    const payload: LogPayload = { level: "warn", message, context, timestamp: new Date().toISOString() };
    console.warn(this.formatLog(payload));
  }

  error(message: string, error?: unknown, context?: Record<string, unknown>) {
    const payload: LogPayload = { level: "error", message, error, context, timestamp: new Date().toISOString() };
    console.error(this.formatLog(payload));
    
    // TODO: Integrate Sentry.captureException(error) here when provisioned
  }

  fatal(message: string, error?: unknown, context?: Record<string, unknown>) {
    const payload: LogPayload = { level: "fatal", message, error, context, timestamp: new Date().toISOString() };
    console.error("🔥 FATAL SYSTEM FAULT:", this.formatLog(payload));
    
    // TODO: Trigger critical PagerDuty alert here
  }
}

export const logger = new SystemLogger();
