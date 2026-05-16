import { create } from 'zustand'
import type { UserProfile } from '@/types/domain'

interface AuthStore {
  user: UserProfile | null
  isAuthenticated: boolean
  setUser: (user: UserProfile) => void
  clearSession: () => void
}

export const useAuthStore = create<AuthStore>((set) => ({
  user: null,
  isAuthenticated: false,
  setUser: (user) => {
    sessionStorage.setItem('auth_token', user.id)
    sessionStorage.setItem('tenant_id', user.tenantId)
    set({ user, isAuthenticated: true })
  },
  clearSession: () => {
    sessionStorage.clear()
    set({ user: null, isAuthenticated: false })
  },
}))
