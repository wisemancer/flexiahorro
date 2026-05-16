import { motion } from 'framer-motion'

export function PageLoader() {
  return (
    <div className="flex h-full min-h-[60vh] items-center justify-center">
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 1.2, repeat: Infinity, ease: 'linear' }}
        className="text-4xl"
      >
        🍫
      </motion.div>
    </div>
  )
}
