interface FriendlyErrorProps {
  message: string
  action?: string
}

export function FriendlyError({ message, action }: FriendlyErrorProps) {
  return (
    <div className="rounded-xl border border-yellow-500/30 bg-yellow-500/10 px-4 py-3 text-center">
      <p className="text-sm text-yellow-200">{message}</p>
      {action && <p className="mt-1 text-xs text-yellow-400/70">{action}</p>}
    </div>
  )
}
