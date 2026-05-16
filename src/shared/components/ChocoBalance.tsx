import { motion } from 'framer-motion'
import { useWalletStore } from '@/features/wallet/store'

export function ChocoBalance() {
  const { available, blocked } = useWalletStore((s) => s.wallet)

  return (
    <div className="flex flex-col items-end gap-0.5">
      <motion.div
        key={available}
        initial={{ scale: 1.3, color: '#FFD700' }}
        animate={{ scale: 1, color: '#FFFFFF' }}
        transition={{ duration: 0.4 }}
        className="flex items-center gap-1 text-xl font-bold font-game"
      >
        <span className="text-choco-gold">🍫</span>
        <span>{available.toLocaleString()}</span>
      </motion.div>

      {blocked > 0 && (
        <span className="text-xs text-yellow-400/70">
          +{blocked.toLocaleString()} esperando confirmación
        </span>
      )}
    </div>
  )
}
