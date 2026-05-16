import { useEffect, useState } from 'react'

interface ToastProps {
  message: string
  onDone: () => void
}

export function Toast({ message, onDone }: ToastProps) {
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    const t = setTimeout(() => { setVisible(false); setTimeout(onDone, 300) }, 2200)
    return () => clearTimeout(t)
  }, [onDone])

  return (
    <div style={{
      position: 'fixed', bottom: 100, left: '50%', transform: 'translateX(-50%)',
      zIndex: 999,
      background: '#1c1140', border: '2px solid #9B5DE5',
      boxShadow: '4px 4px 0 #06031a, 0 0 14px rgba(155,93,229,0.5)',
      padding: '10px 20px',
      fontFamily: 'var(--font-display)', fontSize: 9, letterSpacing: 2,
      color: '#E0E0F0', whiteSpace: 'nowrap',
      opacity: visible ? 1 : 0,
      transition: 'opacity 300ms ease',
    }}>
      {message}
    </div>
  )
}
