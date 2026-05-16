import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Castle } from '../components/Castle'

const STARS = [
  [22, 48, 1], [60, 80, 2], [110, 56, 1], [160, 90, 1], [200, 40, 2],
  [260, 70, 1], [320, 92, 2], [365, 60, 1], [38, 130, 1], [88, 160, 2],
  [140, 140, 1], [220, 168, 1], [290, 150, 2], [340, 188, 1], [18, 200, 1],
  [70, 220, 1], [120, 248, 2], [180, 230, 1], [250, 264, 1], [310, 240, 1],
  [378, 218, 2], [50, 290, 1], [200, 310, 1], [346, 308, 1], [16, 92, 1],
  [186, 60, 1], [98, 102, 2], [232, 102, 1], [296, 32, 1], [60, 38, 1],
] as const

function Twinkle({ x, y, size }: { x: number; y: number; size: number }) {
  return (
    <div style={{
      position: 'absolute', left: x, top: y,
      width: size, height: size,
      background: '#FFFCEA',
      boxShadow: size > 1 ? '0 0 6px rgba(255,252,234,0.9)' : 'none',
      animation: `tw 2.4s steps(2, end) ${(x * y) % 23 * 0.1}s infinite`,
    }} />
  )
}

function Moon() {
  return (
    <div style={{ position: 'absolute', left: 42, top: 108, width: 64, height: 64 }}>
      <div style={{
        position: 'absolute', inset: -22,
        background: 'radial-gradient(circle, rgba(255,247,180,0.35), rgba(255,247,180,0) 65%)',
      }} />
      <div style={{
        position: 'absolute', left: 8, top: 8, width: 44, height: 44,
        background: '#F7E7A5',
        boxShadow: '4px 4px 0 #c9a648, inset -4px -4px 0 rgba(0,0,0,0.18)',
      }} />
      <div style={{ position: 'absolute', left: 16, top: 18, width: 6, height: 6, background: '#c9a648' }} />
      <div style={{ position: 'absolute', left: 32, top: 30, width: 4, height: 4, background: '#c9a648' }} />
      <div style={{ position: 'absolute', left: 22, top: 36, width: 5, height: 5, background: '#c9a648' }} />
    </div>
  )
}

function Hills() {
  const layers = [
    { top: 358, color: '#1a0938', steps: [[0,0],[40,-8],[90,-14],[140,-6],[200,-18],[260,-10],[320,-16],[370,-6],[402,0]] },
    { top: 374, color: '#0f0820', steps: [[0,0],[60,-10],[120,-4],[180,-12],[240,-6],[300,-14],[360,-4],[402,0]] },
  ] as const

  return (
    <>
      {layers.map((layer, i) => (
        <div key={i} style={{
          position: 'absolute', left: 0, right: 0, top: layer.top, height: 28,
          background: layer.color,
        }}>
          {layer.steps.map(([x, dy], j) => (
            <div key={j} style={{
              position: 'absolute', left: x, top: dy,
              width: ((layer.steps[j + 1]?.[0] ?? 402) as number) - x,
              height: 4,
              background: layer.color,
            }} />
          ))}
        </div>
      ))}
    </>
  )
}

function Sparkle({ left, top, size = 8, delay = 0 }: { left: number; top: number; size?: number; delay?: number }) {
  return (
    <div style={{
      position: 'absolute', left, top,
      width: size, height: size,
      animation: `spk 1.6s steps(4, end) ${delay}s infinite`,
    }}>
      <div style={{ position: 'absolute', left: size * 0.4, top: 0, width: size * 0.2, height: size, background: '#FFD700' }} />
      <div style={{ position: 'absolute', left: 0, top: size * 0.4, width: size, height: size * 0.2, background: '#FFD700' }} />
    </div>
  )
}

export default function LoginPage() {
  const navigate = useNavigate()
  const [pressed, setPressed] = useState(false)

  return (
    <div style={{
      width: '100%', height: '100dvh',
      background: '#0f0820',
      position: 'relative',
      overflow: 'hidden',
      fontFamily: 'var(--font-body)',
      color: 'var(--text)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
    }}>
      {/* Vignette */}
      <div style={{
        position: 'absolute', inset: 0,
        background: 'radial-gradient(ellipse at 50% 35%, rgba(60,30,110,0.45) 0%, rgba(15,8,32,0) 65%)',
        pointerEvents: 'none',
      }} />

      {/* Scanlines */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none', opacity: 0.18,
        backgroundImage: 'repeating-linear-gradient(0deg, rgba(0,0,0,0.55) 0px, rgba(0,0,0,0.55) 1px, transparent 1px, transparent 3px)',
        mixBlendMode: 'multiply',
      }} />

      {/* Stars */}
      {STARS.map(([x, y, s], i) => <Twinkle key={i} x={x} y={y} size={s} />)}

      <Moon />

      {/* HUD top */}
      <div style={{
        position: 'absolute', top: 56, left: 0, right: 0,
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        padding: '0 18px', zIndex: 5,
      }}>
        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: 6,
          fontFamily: 'var(--font-display)', fontSize: 8, letterSpacing: 2,
          color: 'var(--gold)', border: '2px solid var(--primary-d)',
          padding: '5px 9px', textTransform: 'uppercase' as const,
        }}>◆ Season 01</div>
        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: 6,
          fontFamily: 'var(--font-display)', fontSize: 8, letterSpacing: 2,
          color: 'var(--primary-l)', border: '2px solid var(--primary-d)',
          padding: '5px 9px', textTransform: 'uppercase' as const,
        }}>Lvl 1 · Pupilo</div>
      </div>

      {/* Chapter label */}
      <div style={{
        position: 'absolute', top: 96, left: 0, right: 0,
        textAlign: 'center', zIndex: 5,
        fontFamily: 'var(--font-display)', fontSize: 8, letterSpacing: 4,
        color: 'var(--text-rune)',
      }}>— Prólogo —</div>

      {/* Castle */}
      <div style={{
        position: 'absolute', top: 130, left: 0, right: 0,
        display: 'flex', justifyContent: 'center', zIndex: 4,
      }}>
        <Castle unit={7} />
      </div>

      {/* Sparkles */}
      <Sparkle left={92}  top={170} size={10} delay={0}   />
      <Sparkle left={304} top={210} size={8}  delay={0.4} />
      <Sparkle left={70}  top={280} size={6}  delay={0.9} />
      <Sparkle left={324} top={310} size={9}  delay={1.2} />
      <Sparkle left={120} top={342} size={6}  delay={0.2} />
      <Sparkle left={262} top={134} size={7}  delay={0.7} />

      <Hills />

      {/* Title */}
      <div style={{
        position: 'absolute', left: 0, right: 0, bottom: 188,
        textAlign: 'center', padding: '0 20px', zIndex: 8,
      }}>
        <div style={{
          fontFamily: 'var(--font-display)',
          fontSize: 19, lineHeight: 1.35, letterSpacing: 1.5,
          color: 'var(--gold)',
          textShadow: '3px 3px 0 #000, 0 0 16px rgba(255,215,0,0.4)',
          marginBottom: 6,
        }}>
          EL REINO DEL<br />FLEXIAHORRO
        </div>
        <div style={{
          fontFamily: 'var(--font-display)', fontSize: 8, letterSpacing: 2,
          color: '#9B5DE5', textShadow: '2px 2px 0 #000', marginTop: 12,
        }}>
          ⚔ &nbsp; UNA EPOPEYA FINANCIERA &nbsp; ⚔
        </div>
        <div style={{
          fontFamily: 'var(--font-body)', fontSize: 18, fontStyle: 'italic',
          color: 'var(--text-dim)', marginTop: 10, lineHeight: 1.1,
          textShadow: '1px 1px 0 #000',
        }}>
          Tu ahorro convertido en aventura.
        </div>
      </div>

      {/* CTA */}
      <div style={{
        position: 'absolute', left: 20, right: 20, bottom: 100, zIndex: 10,
      }}>
        <button
          onMouseDown={() => setPressed(true)}
          onMouseUp={() => setPressed(false)}
          onTouchStart={() => setPressed(true)}
          onTouchEnd={() => setPressed(false)}
          onClick={() => navigate('/celebracion')}
          style={{
            width: '100%',
            fontFamily: 'var(--font-display)', fontSize: 12,
            letterSpacing: 2, textTransform: 'uppercase',
            padding: '16px 14px',
            background: '#FFD700', color: '#1a0a30',
            border: '3px solid #1d0d3a',
            boxShadow: pressed
              ? '2px 2px 0 #1d0d3a, 0 0 14px rgba(255,215,0,0.55)'
              : '5px 5px 0 #1d0d3a, 0 0 18px rgba(255,215,0,0.55), 0 0 36px rgba(255,215,0,0.25)',
            cursor: 'pointer',
            transform: pressed ? 'translate(3px, 3px)' : 'none',
            transition: 'transform 80ms cubic-bezier(.2,.9,.3,1), box-shadow 80ms cubic-bezier(.2,.9,.3,1)',
            animation: pressed ? 'none' : 'goldPulse 1.6s ease-in-out infinite',
          }}
        >
          ► ACTIVAR MI SEASON PASS
        </button>
        <div style={{
          textAlign: 'center', marginTop: 14,
          fontFamily: 'var(--font-display)', fontSize: 9, letterSpacing: 2,
          color: 'var(--text-dim)', cursor: 'pointer',
        }}>
          <span
            onClick={() => navigate('/reino')}
            style={{ borderBottom: '2px solid var(--primary-d)', paddingBottom: 2, cursor: 'pointer' }}
          >
            YA TENGO UNA CUENTA →
          </span>
        </div>
      </div>

      {/* Blink hint */}
      <div style={{
        position: 'absolute', left: 0, right: 0, bottom: 56,
        textAlign: 'center', zIndex: 6,
        fontFamily: 'var(--font-display)', fontSize: 9, letterSpacing: 3,
        color: 'var(--gold)',
        animation: 'blink 1s steps(2, end) infinite',
      }}>
        ▸ TOCA PARA CONTINUAR ◂
      </div>
    </div>
  )
}
