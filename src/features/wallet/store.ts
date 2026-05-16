import { create } from 'zustand'
import type { Wallet, WalletTransaction } from '@/types/domain'

interface WalletStore {
  wallet: Wallet
  addTransaction: (tx: WalletTransaction) => void
  confirmTransaction: (id: string) => void
  rejectTransaction: (id: string) => void
  setWallet: (wallet: Wallet) => void
}

const emptyWallet: Wallet = {
  available: 0,
  blocked: 0,
  spent: 0,
  transactions: [],
}

export const useWalletStore = create<WalletStore>((set) => ({
  wallet: emptyWallet,

  setWallet: (wallet) => set({ wallet }),

  addTransaction: (tx) =>
    set((state) => {
      const delta = tx.state === 'disponible' ? tx.amount : 0
      const blocked = tx.state === 'bloqueado' ? tx.amount : 0
      return {
        wallet: {
          ...state.wallet,
          available: state.wallet.available + delta,
          blocked: state.wallet.blocked + blocked,
          transactions: [tx, ...state.wallet.transactions],
        },
      }
    }),

  confirmTransaction: (id) =>
    set((state) => {
      const tx = state.wallet.transactions.find((t) => t.id === id)
      if (!tx || tx.state !== 'bloqueado') return state
      return {
        wallet: {
          ...state.wallet,
          available: state.wallet.available + tx.amount,
          blocked: state.wallet.blocked - tx.amount,
          transactions: state.wallet.transactions.map((t) =>
            t.id === id ? { ...t, state: 'disponible' as const, resolvedAt: new Date().toISOString() } : t
          ),
        },
      }
    }),

  rejectTransaction: (id) =>
    set((state) => {
      const tx = state.wallet.transactions.find((t) => t.id === id)
      if (!tx || tx.state !== 'bloqueado') return state
      return {
        wallet: {
          ...state.wallet,
          blocked: state.wallet.blocked - tx.amount,
          transactions: state.wallet.transactions.map((t) =>
            t.id === id ? { ...t, state: 'cancelado' as const, resolvedAt: new Date().toISOString() } : t
          ),
        },
      }
    }),
}))
