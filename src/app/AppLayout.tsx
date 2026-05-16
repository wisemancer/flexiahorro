import { Outlet, NavLink } from 'react-router-dom'
import { NavCastle, Coin, Sword } from '@/shared/components/glyphs/PixelGlyph'
import { useWalletStore } from '@/features/wallet/store'

export function AppLayout() {
  const blocked = useWalletStore(s => s.wallet.blocked)

  return (
    <div style={{
      display: 'flex', flexDirection: 'column',
      height: '100dvh',
      background: '#0f0820',
      color: '#E0E0F0',
      fontFamily: 'var(--font-body)',
    }}>
      {/* Main content */}
      <main style={{ flex: 1, overflow: 'hidden', position: 'relative', display: 'flex', flexDirection: 'column' }}>
        <Outlet />
      </main>

      {/* Pixel-art bottom nav */}
      <nav style={{
        display: 'flex',
        background: '#180a32',
        borderTop: '3px solid #5e3d99',
        boxShadow: '0 -3px 0 #06031a, inset 0 1px 0 rgba(155,93,229,0.18)',
        zIndex: 20,
        flexShrink: 0,
      }}>
        <NavLink to="/reino" style={{ flex: 1, textDecoration: 'none' }}>
          {({ isActive }) => (
            <div style={{
              padding: '8px 0 6px',
              display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4,
              borderTop: isActive ? '3px solid #FFD700' : '3px solid transparent',
              marginTop: -3,
            }}>
              <div style={{
                height: 22, display: 'flex', alignItems: 'center', justifyContent: 'center',
                filter: isActive ? 'drop-shadow(0 0 6px rgba(255,215,0,0.7))' : 'none',
              }}>
                <NavCastle unit={2} tint={isActive ? '#FFD700' : '#7D5FB3'} />
              </div>
              <div style={{
                fontFamily: 'var(--font-display)', fontSize: 8, letterSpacing: 1.5,
                color: isActive ? '#FFD700' : '#7D5FB3',
                textShadow: isActive ? '1px 1px 0 #06031a' : 'none',
              }}>REINO</div>
            </div>
          )}
        </NavLink>

        <NavLink to="/tesoro" style={{ flex: 1, textDecoration: 'none' }}>
          {({ isActive }) => (
            <div style={{
              padding: '8px 0 6px',
              display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4,
              borderTop: isActive ? '3px solid #FFD700' : '3px solid transparent',
              marginTop: -3,
            }}>
              <div style={{
                position: 'relative',
                height: 22, display: 'flex', alignItems: 'center', justifyContent: 'center',
                filter: isActive ? 'drop-shadow(0 0 6px rgba(255,215,0,0.7))' : 'none',
                opacity: isActive ? 1 : 0.5,
              }}>
                <Coin unit={2} />
                {blocked > 0 && (
                  <div style={{
                    position: 'absolute', top: -2, right: -8,
                    width: 8, height: 8,
                    background: '#CC2200', border: '2px solid #06031a',
                    boxShadow: '0 0 6px rgba(204,34,0,0.8)',
                    animation: 'dotPulse 1.5s ease-in-out infinite',
                  }} />
                )}
              </div>
              <div style={{
                fontFamily: 'var(--font-display)', fontSize: 8, letterSpacing: 1.5,
                color: isActive ? '#FFD700' : '#7D5FB3',
                textShadow: isActive ? '1px 1px 0 #06031a' : 'none',
              }}>TESORO</div>
            </div>
          )}
        </NavLink>

        <NavLink to="/torneo" style={{ flex: 1, textDecoration: 'none' }}>
          {({ isActive }) => (
            <div style={{
              padding: '8px 0 6px',
              display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4,
              borderTop: isActive ? '3px solid #FFD700' : '3px solid transparent',
              marginTop: -3,
            }}>
              <div style={{
                height: 22, display: 'flex', alignItems: 'center', justifyContent: 'center',
                filter: isActive ? 'drop-shadow(0 0 6px rgba(255,215,0,0.7))' : 'none',
              }}>
                <Sword unit={2} tint={isActive ? '#FFD700' : '#9a9ab8'} />
              </div>
              <div style={{
                fontFamily: 'var(--font-display)', fontSize: 8, letterSpacing: 1.5,
                color: isActive ? '#FFD700' : '#7D5FB3',
                textShadow: isActive ? '1px 1px 0 #06031a' : 'none',
              }}>TORNEO</div>
            </div>
          )}
        </NavLink>
      </nav>
    </div>
  )
}
