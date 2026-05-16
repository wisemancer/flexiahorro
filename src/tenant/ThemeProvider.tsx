import { useEffect } from 'react'
import { useTenantStore } from './store'

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const config = useTenantStore((s) => s.config)

  useEffect(() => {
    if (!config) return

    const root = document.documentElement
    const { theme } = config

    root.style.setProperty('--color-primary', theme.colorPrimary)
    root.style.setProperty('--color-secondary', theme.colorSecondary)
    root.style.setProperty('--color-accent', theme.colorAccent)
    root.style.setProperty('--color-surface', theme.colorSurface)
    root.style.setProperty('--color-bg', theme.colorBg)

    if (theme.fontGame) root.style.setProperty('--font-game', theme.fontGame)
    if (theme.fontUi) root.style.setProperty('--font-ui', theme.fontUi)
  }, [config])

  return <>{children}</>
}
