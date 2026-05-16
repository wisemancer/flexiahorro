export type AppEventType =
  | 'session.start'
  | 'session.end'
  | 'savings.activated'
  | 'chocopuntos.assigned'
  | 'chocopuntos.blocked'
  | 'chocopuntos.confirmed'
  | 'chocopuntos.rejected'
  | 'chocopuntos.spent'
  | 'game.item.purchased'
  | 'game.tournament.entered'
  | 'game.tournament.completed'
  | 'kingdom.hibernated'
  | 'kingdom.awakened'
  | 'withdrawal.initiated'
  | 'deposit.received'
  | 'error.occurred'

export interface AppEvent {
  type: AppEventType
  userId: string
  tenantId: string
  timestamp: string
  payload?: Record<string, unknown>
}
