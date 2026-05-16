import type { AppEvent, AppEventType } from '@/types/events'

let _userId = 'anonymous'
let _tenantId = 'unknown'

export function initLogger(userId: string, tenantId: string) {
  _userId = userId
  _tenantId = tenantId
}

export function logEvent(type: AppEventType, payload?: Record<string, unknown>) {
  const event: AppEvent = {
    type,
    userId: _userId,
    tenantId: _tenantId,
    timestamp: new Date().toISOString(),
    payload,
  }

  // Structured JSON to console — replace with external service in production
  console.log(JSON.stringify(event))
}

export function logError(message: string, error?: unknown) {
  logEvent('error.occurred', {
    message,
    error: error instanceof Error ? { name: error.name, message: error.message } : String(error),
  })
}
