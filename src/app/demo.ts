import { useTenantStore } from '@/tenant/store'
import { useAuthStore } from '@/features/auth/store'
import { useWalletStore } from '@/features/wallet/store'
import { useGameStore } from '@/features/game/store'
import { initLogger } from '@/shared/lib/logger'

export function seedDemoData() {
  useTenantStore.getState().setConfig({
    id: 'tenant-pacifico',
    name: 'Banco del Pacífico',
    logoUrl: undefined,
    theme: {
      colorPrimary: '#7c3aed',
      colorSecondary: '#4f46e5',
      colorAccent: '#ffd700',
      colorSurface: '#1e1033',
      colorBg: '#0f0820',
    },
    distributionRules: [
      { eventType: 'deposit', chocopuntosPerUnit: 2, description: '$1 ahorrado = 2 Chocopuntos' },
    ],
    poolAvailable: 50000,
  })

  const user = {
    id: 'user-lucas-001',
    displayName: 'Lucas Mendoza',
    tenantId: 'tenant-pacifico',
    castleLevel: 3,
    streak: 3,
    isHibernating: false,
    joinedAt: '2026-02-15T10:00:00Z',
  }

  useAuthStore.getState().setUser(user)
  initLogger(user.id, user.tenantId)

  useGameStore.setState({ castleLevel: 3, streak: 3, kingdomState: 'active' })

  useWalletStore.getState().setWallet({
    available: 340,
    blocked: 80,
    spent: 120,
    transactions: [
      {
        id: 'tx-004',
        amount: 80,
        state: 'bloqueado',
        description: 'Ahorro programado — Mayo 2026',
        createdAt: '2026-05-15T08:30:00Z',
      },
      {
        id: 'tx-003',
        amount: 10,
        state: 'gastado',
        description: 'Skin pirata para avatar',
        createdAt: '2026-04-20T14:15:00Z',
      },
      {
        id: 'tx-002',
        amount: 160,
        state: 'disponible',
        description: 'Ahorro programado — Abril 2026',
        createdAt: '2026-04-15T08:00:00Z',
      },
      {
        id: 'tx-001',
        amount: 40,
        state: 'disponible',
        description: 'Primer ahorro — Bienvenida al reino',
        createdAt: '2026-03-15T09:00:00Z',
      },
    ],
  })
}
