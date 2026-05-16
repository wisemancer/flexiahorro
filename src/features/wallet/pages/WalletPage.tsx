import { motion } from 'framer-motion'
import { useWalletStore } from '@/features/wallet/store'
import type { WalletTransaction } from '@/types/domain'

const TX_ICONS: Record<string, string> = {
  ahorro: '🏦',
  skin: '🎨',
  torneo: '⚔️',
  bienvenida: '🎉',
  primer: '🎉',
  avatar: '🎨',
  default: '🍫',
}

function txIcon(description: string): string {
  const lower = description.toLowerCase()
  for (const [key, icon] of Object.entries(TX_ICONS)) {
    if (lower.includes(key)) return icon
  }
  return TX_ICONS.default
}

const STATE_CONFIG: Record<
  WalletTransaction['state'],
  { label: string; pillClass: string; amountClass: string; sign: string }
> = {
  disponible: {
    label: 'Recibido',
    pillClass: 'bg-green-500/15 text-green-400',
    amountClass: 'text-choco-gold',
    sign: '+',
  },
  bloqueado: {
    label: 'En espera',
    pillClass: 'bg-yellow-500/15 text-yellow-400',
    amountClass: 'text-yellow-400',
    sign: '+',
  },
  cancelado: {
    label: 'Cancelado',
    pillClass: 'bg-red-500/15 text-red-400',
    amountClass: 'text-red-400 line-through',
    sign: '',
  },
  gastado: {
    label: 'Gastado',
    pillClass: 'bg-white/5 text-white/40',
    amountClass: 'text-white/40',
    sign: '−',
  },
}

function BalanceBar({ available, blocked, spent }: { available: number; blocked: number; spent: number }) {
  const total = available + blocked + spent
  if (total === 0) return null

  const pctAvailable = (available / total) * 100
  const pctBlocked = (blocked / total) * 100
  const pctSpent = (spent / total) * 100

  return (
    <div className="flex flex-col gap-2">
      <div className="flex h-2 w-full overflow-hidden rounded-full bg-white/10">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${pctAvailable}%` }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="bg-choco-gold"
        />
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${pctBlocked}%` }}
          transition={{ duration: 0.8, ease: 'easeOut', delay: 0.1 }}
          className="bg-yellow-400/60"
        />
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${pctSpent}%` }}
          transition={{ duration: 0.8, ease: 'easeOut', delay: 0.2 }}
          className="bg-white/20"
        />
      </div>
      <div className="flex justify-between text-xs text-white/40">
        <span className="flex items-center gap-1">
          <span className="inline-block h-1.5 w-1.5 rounded-full bg-choco-gold" />
          Disponible {pctAvailable.toFixed(0)}%
        </span>
        {blocked > 0 && (
          <span className="flex items-center gap-1">
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-yellow-400/60" />
            En espera {pctBlocked.toFixed(0)}%
          </span>
        )}
        <span className="flex items-center gap-1">
          <span className="inline-block h-1.5 w-1.5 rounded-full bg-white/20" />
          Gastado {pctSpent.toFixed(0)}%
        </span>
      </div>
    </div>
  )
}

function LockedChest({ amount }: { amount: number }) {
  return (
    <motion.div
      animate={{ boxShadow: ['0 0 8px #fbbf24aa', '0 0 20px #fbbf24cc', '0 0 8px #fbbf24aa'] }}
      transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
      className="rounded-2xl border border-yellow-400/30 bg-yellow-500/10 px-5 py-4"
    >
      <div className="flex items-center gap-3">
        <motion.span
          animate={{ rotate: [0, -5, 5, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
          className="text-3xl"
        >
          🔒
        </motion.span>
        <div className="flex flex-col">
          <span className="font-game font-bold text-yellow-300">
            +{amount.toLocaleString()} esperando
          </span>
          <span className="text-xs text-yellow-400/70">
            Tu cofre está esperando confirmación de tu banco. Llegarán pronto.
          </span>
        </div>
      </div>
    </motion.div>
  )
}

function TransactionItem({ tx, index }: { tx: WalletTransaction; index: number }) {
  const cfg = STATE_CONFIG[tx.state]
  const icon = txIcon(tx.description)

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.06, ease: 'easeOut' }}
      className="flex items-center gap-3 rounded-2xl bg-brand-surface px-4 py-3"
    >
      {/* Icon */}
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/5 text-xl">
        {icon}
      </div>

      {/* Info */}
      <div className="flex min-w-0 flex-1 flex-col gap-0.5">
        <span className="truncate text-sm font-medium text-white">{tx.description}</span>
        <span className="text-xs text-white/40">
          {new Date(tx.createdAt).toLocaleDateString('es-EC', {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
          })}
        </span>
      </div>

      {/* Amount + state */}
      <div className="flex shrink-0 flex-col items-end gap-1">
        <span className={`font-game text-sm font-bold ${cfg.amountClass}`}>
          {cfg.sign}{tx.amount.toLocaleString()}
        </span>
        <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${cfg.pillClass}`}>
          {cfg.label}
        </span>
      </div>
    </motion.div>
  )
}

export default function WalletPage() {
  const { available, blocked, spent, transactions } = useWalletStore((s) => s.wallet)

  return (
    <div className="flex flex-col gap-5 p-5 pb-8">

      {/* Hero balance */}
      <motion.div
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-2xl bg-gradient-to-br from-brand-primary/40 to-brand-surface p-5 flex flex-col gap-4 border border-white/10"
      >
        <p className="text-xs font-medium uppercase tracking-widest text-white/40">Tu tesoro</p>

        <div className="flex items-end gap-2">
          <motion.span
            key={available}
            initial={{ scale: 1.15 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.3 }}
            className="font-game text-5xl font-bold text-choco-gold leading-none"
          >
            {available.toLocaleString()}
          </motion.span>
          <span className="mb-1 text-lg text-white/50">CP</span>
        </div>

        <BalanceBar available={available} blocked={blocked} spent={spent} />
      </motion.div>

      {/* Locked chest */}
      {blocked > 0 && <LockedChest amount={blocked} />}

      {/* Transaction list */}
      <div className="flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <h2 className="font-game text-xs uppercase tracking-widest text-white/40">
            Historial
          </h2>
          <span className="text-xs text-white/30">{transactions.length} movimientos</span>
        </div>

        {transactions.length === 0 ? (
          <div className="flex flex-col items-center gap-2 py-12 text-center">
            <span className="text-4xl">📜</span>
            <p className="text-sm text-white/30">Tu historia de ahorro empieza aquí.</p>
          </div>
        ) : (
          transactions.map((tx, i) => (
            <TransactionItem key={tx.id} tx={tx} index={i} />
          ))
        )}
      </div>
    </div>
  )
}
