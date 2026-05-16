import { create } from 'zustand'

type KingdomState = 'active' | 'hibernating' | 'awakening'

interface GameStore {
  kingdomState: KingdomState
  castleLevel: number
  streak: number
  hibernate: () => void
  awaken: () => void
  incrementStreak: () => void
  resetStreak: () => void
}

export const useGameStore = create<GameStore>((set) => ({
  kingdomState: 'active',
  castleLevel: 1,
  streak: 0,

  hibernate: () => set({ kingdomState: 'hibernating' }),

  awaken: () => {
    set({ kingdomState: 'awakening' })
    setTimeout(() => set({ kingdomState: 'active' }), 2000)
  },

  incrementStreak: () => set((state) => ({ streak: state.streak + 1 })),

  resetStreak: () => set({ streak: 0 }),
}))
