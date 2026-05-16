import { create } from 'zustand'
import type { TenantConfig } from '@/types/domain'

interface TenantStore {
  config: TenantConfig | null
  setConfig: (config: TenantConfig) => void
}

export const useTenantStore = create<TenantStore>((set) => ({
  config: null,
  setConfig: (config) => set({ config }),
}))
