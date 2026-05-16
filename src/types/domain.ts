export type ChocopuntosState = 'disponible' | 'bloqueado' | 'cancelado' | 'gastado'

export interface WalletTransaction {
  id: string
  amount: number
  state: ChocopuntosState
  description: string
  createdAt: string
  resolvedAt?: string
}

export interface Wallet {
  available: number
  blocked: number
  spent: number
  transactions: WalletTransaction[]
}

export interface UserProfile {
  id: string
  displayName: string
  avatarUrl?: string
  tenantId: string
  castleLevel: number
  streak: number
  isHibernating: boolean
  joinedAt: string
}

export interface TenantConfig {
  id: string
  name: string
  logoUrl?: string
  theme: TenantTheme
  distributionRules: DistributionRule[]
  poolAvailable: number
}

export interface TenantTheme {
  colorPrimary: string
  colorSecondary: string
  colorAccent: string
  colorSurface: string
  colorBg: string
  fontGame?: string
  fontUi?: string
}

export interface DistributionRule {
  eventType: string
  chocopuntosPerUnit: number
  description: string
}

export interface GameItem {
  id: string
  name: string
  description: string
  priceCp: number
  type: 'skin' | 'boost' | 'decoration'
  imageUrl?: string
}

export interface Tournament {
  id: string
  name: string
  entryCostCp: number
  prizePoolCp: number
  endsAt: string
  participants: number
  status: 'open' | 'active' | 'finished'
}
