export interface AuditEvent {
  id: string;
  timestamp: string;
  action: string;
  detail: string;
}

const AUDIT_LOG_KEY = 'codeguard:local-audit-log';
const MAX_AUDIT_EVENTS = 500;

export function readAuditEvents(): AuditEvent[] {
  const raw = localStorage.getItem(AUDIT_LOG_KEY);
  if (!raw) return [];
  const parsed: unknown = JSON.parse(raw);
  if (!Array.isArray(parsed) || parsed.some(event =>
    typeof event !== 'object' || event === null ||
    typeof event.id !== 'string' ||
    typeof event.timestamp !== 'string' ||
    typeof event.action !== 'string' ||
    typeof event.detail !== 'string'
  )) {
    throw new Error('The local activity log is invalid. Clear it from Settings to start a new log.');
  }
  return parsed as AuditEvent[];
}

export function recordAuditEvent(action: string, detail: string): void {
  const events = readAuditEvents();
  events.unshift({
    id: globalThis.crypto?.randomUUID?.() ?? `${Date.now()}-${Math.random().toString(36).slice(2)}`,
    timestamp: new Date().toISOString(),
    action,
    detail,
  });
  localStorage.setItem(AUDIT_LOG_KEY, JSON.stringify(events.slice(0, MAX_AUDIT_EVENTS)));
}

export function clearAuditEvents(): void {
  localStorage.removeItem(AUDIT_LOG_KEY);
}
