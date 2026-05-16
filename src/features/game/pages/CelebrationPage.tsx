import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Chest } from '../components/Chest'

const BEAMS = 12

function Beams({ size = 520 }: { size?: number }) {
  return (
    <div style={{
      position: 'absolute',
      width: size, height: size,
      left: '50%', top: '50%',
      marginLeft: -size / 2, marginTop: -size / 2,
      pointerEvents: 'none',
      animation: 'beamSpin 24s linear infinite',
    }}>
      {Array.from({ length: BEAMS }, (_, i) => (
        <div key={i} style={{
          position: 'absolute',
          left: '50%', top: '50%',
          width: 4, height: size / 2,
          marginLeft: -2, marginTop: -size / 2,
          transformOrigin: '50% 100%',
          transform: `rotate(${(i / BEAMS) * 360}deg)`,
          background: 'linear-gradient(to top, rgba(255,215,0,0.55) 0%, rgba(255,215,0,0.22) 40%, rgba(255,215,0,0) 100%)',
          filter: 'blur(0.5px)',
        }} />
      ))}
      {Array.from({ length: BEAMS }, (_, i) => (
        <div key={`t-${i}`} style={{
          position: 'absolute',
          left: '50%', top: '50%',
          width: 2, height: size / 2 - 30,
          marginLeft: -1, marginTop: -(size / 2 - 30),
          transformOrigin: '50% 100%',
          transform: `rotate(${(i / BEAMS) * 360 + (360 / BEAMS) / 2}deg)`,
          background: 'linear-gradient(to top, rgba(255,224,102,0.35) 0%, rgba(255,224,102,0) 100%)',
        }} />
      ))}
    </div>
  )
}

const rng = (i: number) => { const x = Math.sin(i * 91.73) * 10000; return x - Math.floor(x) }
const PARTICLES = Array.from({ length: 40 }, (_, i) => {
  const r1 = rng(i + 1), r2 = rng(i + 17), r3 = rng(i + 41), r4 = rng(i + 71)
  return {
    leftPct: r1 * 100,
    size: r2 > 0.7 ? 6 : r2 > 0.35 ? 4 : 3,
    delay: r3 * 4,
    duration: 2.2 + r4 * 2.4,
    color: r3 > 0.55 ? '#FFD700' : r3 > 0.2 ? '#FFE066' : '#FFF3a0',
    drift: (r1 - 0.5) * 30,
  }
})

function Particles() {
  return (
    <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', overflow: 'hidden' }}>
      {PARTICLES.map((p, i) => (
        <div key={i} style={{
          position: 'absolute',
          left: `${p.leftPct}%`, top: -10,
          width: p.size, height: p.size,
          background: p.color,
          boxShadow: `0 0 ${p.size}px ${p.color}`,
          animation: `fall ${p.duration}s linear ${p.delay}s infinite`,
          ['--drift' as string]: `${p.drift}px`,
        }} />
      ))}
    </div>
  )
}

function Burst({ left, top, size = 10, delay = 0 }: { left: number; top: number; size?: number; delay?: number }) {
  return (
    <div style={{
      position: 'absolute', left, top,
      width: size, height: size,
      animation: `burst 2.2s steps(4, end) ${delay}s infinite`,
    }}>
      <div style={{ position: 'absolute', left: size * 0.4, top: 0, width: size * 0.2, height: size, background: '#FFD700' }} />
      <div style={{ position: 'absolute', left: 0, top: size * 0.4, width: size, height: size * 0.2, background: '#FFD700' }} />
      <div style={{
        position: 'absolute', left: size * 0.15, top: size * 0.15,
        width: size * 0.7, height: size * 0.7,
        background: 'radial-gradient(circle, rgba(255,243,160,0.9), rgba(255,215,0,0) 70%)',
      }} />
    </div>
  )
}

interface CelebrationPageProps {
  amount?: number
  subtitle?: string
}

export default function CelebrationPage({ amount = 40, subtitle = '¡Tu primer aporte llegó al reino!' }: CelebrationPageProps) {
  const [primaryPressed, setPrimaryPressed] = useState(false)
  const [secondaryPressed, setSecondaryPressed] = useState(false)
  const navigate = useNavigate()

  return (
    <div style={{
      width: '100%', height: '100dvh',
      background: '#0f0820',
      position: 'relative',
      overflow: 'hidden',
      fontFamily: 'var(--font-body)',
      color: 'var(--text)',
    }}>
      {/* Purple vignette */}
      <div style={{
        position: 'absolute', inset: 0,
        background: 'radial-gradient(ellipse at 50% 42%, rgba(155,93,229,0.35) 0%, rgba(15,8,32,0) 65%)',
        pointerEvents: 'none',
      }} />

      {/* Scanlines */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none', opacity: 0.16,
        backgroundImage: 'repeating-linear-gradient(0deg, rgba(0,0,0,0.55) 0px, rgba(0,0,0,0.55) 1px, transparent 1px, transparent 3px)',
        mixBlendMode: 'multiply',
      }} />

      {/* Reward banner */}
      <div style={{
        position: 'absolute', top: 60, left: 0, right: 0,
        textAlign: 'center', zIndex: 8,
      }}>
        <div style={{
          display: 'inline-block',
          fontFamily: 'var(--font-display)', fontSize: 9, letterSpacing: 3,
          color: '#0f0820', background: '#FFD700',
          padding: '5px 12px',
          border: '2px solid #1d0d3a',
          boxShadow: '3px 3px 0 #1d0d3a, 0 0 16px rgba(255,215,0,0.5)',
          textTransform: 'uppercase',
        }}>
          ◆ ¡Recompensa Obtenida! ◆
        </div>
        <div style={{
          marginTop: 14,
          fontFamily: 'var(--font-display)', fontSize: 8, letterSpacing: 4,
          color: 'var(--text-rune)',
        }}>
          — Botín del primer aporte —
        </div>
      </div>

      {/* Chest scene */}
      <div style={{
        position: 'absolute', left: 0, right: 0, top: 175, height: 280,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        zIndex: 4,
      }}>
        <div style={{ position: 'absolute', left: '50%', top: '46%', width: 0, height: 0 }}>
          <Beams size={540} />
        </div>
        <div style={{
          position: 'absolute',
          left: '50%', top: '46%',
          width: 360, height: 360,
          marginLeft: -180, marginTop: -180,
          background: 'radial-gradient(circle, rgba(255,243,160,0.55) 0%, rgba(255,215,0,0.25) 25%, rgba(155,93,229,0.2) 50%, rgba(155,93,229,0) 70%)',
          pointerEvents: 'none',
          animation: 'pulseGlow 2.2s ease-in-out infinite',
        }} />
        <div style={{ position: 'relative', animation: 'bob 2.4s ease-in-out infinite', zIndex: 3 }}>
          <Chest unit={8} />
        </div>
        <div style={{ position: 'absolute', inset: 0 }}>
          <Burst left={70}  top={40}  size={10} delay={0}   />
          <Burst left={320} top={20}  size={12} delay={0.4} />
          <Burst left={50}  top={170} size={8}  delay={0.8} />
          <Burst left={340} top={200} size={10} delay={1.2} />
          <Burst left={120} top={250} size={7}  delay={0.2} />
          <Burst left={280} top={245} size={9}  delay={1.0} />
          <Burst left={200} top={10}  size={11} delay={0.6} />
        </div>
      </div>

      <Particles />

      {/* +N Chocopuntos */}
      <div style={{
        position: 'absolute', left: 0, right: 0, top: 470,
        textAlign: 'center', zIndex: 10,
        fontFamily: 'var(--font-display)',
        color: '#FFD700',
        textShadow: '4px 4px 0 #1d0d3a, 0 0 18px rgba(255,215,0,0.6), 0 0 36px rgba(255,215,0,0.4)',
        letterSpacing: 2,
        animation: 'punchIn 600ms cubic-bezier(.2,.9,.3,1) both',
      }}>
        <div style={{ fontSize: 38, lineHeight: 1.1 }}>+{amount}</div>
        <div style={{ fontSize: 16, letterSpacing: 4, marginTop: 8 }}>CHOCOPUNTOS</div>
      </div>

      {/* Subtitle */}
      <div style={{
        position: 'absolute', left: 24, right: 24, top: 555,
        textAlign: 'center', zIndex: 10,
      }}>
        <div style={{
          fontFamily: 'var(--font-display)', fontSize: 11, letterSpacing: 1.5,
          color: 'var(--text)', lineHeight: 1.6,
          textShadow: '2px 2px 0 #1d0d3a',
        }}>
          {subtitle}
        </div>
        <div style={{
          marginTop: 14,
          fontFamily: 'var(--font-body)', fontSize: 17,
          color: 'var(--text-dim)', fontStyle: 'italic',
          textShadow: '1px 1px 0 #000', lineHeight: 1.15,
        }}>
          El cofre se abrió. La aventura comenzó.
        </div>
      </div>

      {/* Buttons */}
      <div style={{
        position: 'absolute', left: 20, right: 20, bottom: 90,
        display: 'flex', flexDirection: 'column', gap: 12,
        zIndex: 12,
      }}>
        <button
          onMouseDown={() => setPrimaryPressed(true)}
          onMouseUp={() => setPrimaryPressed(false)}
          onTouchStart={() => setPrimaryPressed(true)}
          onTouchEnd={() => setPrimaryPressed(false)}
          onClick={() => navigate('/tesoro')}
          style={{
            width: '100%',
            fontFamily: 'var(--font-display)', fontSize: 12, letterSpacing: 2,
            textTransform: 'uppercase', padding: '15px 12px',
            background: '#FFD700', color: '#1a0a30',
            border: '3px solid #1d0d3a', cursor: 'pointer',
            boxShadow: primaryPressed
              ? '2px 2px 0 #1d0d3a, 0 0 14px rgba(255,215,0,0.45)'
              : '5px 5px 0 #1d0d3a, 0 0 16px rgba(255,215,0,0.55), 0 0 36px rgba(255,215,0,0.2)',
            transform: primaryPressed ? 'translate(3px,3px)' : 'none',
            transition: 'transform 80ms cubic-bezier(.2,.9,.3,1), box-shadow 80ms cubic-bezier(.2,.9,.3,1)',
            animation: primaryPressed ? 'none' : 'goldPulse 1.8s ease-in-out infinite',
          }}
        >
          ► USAR MIS PUNTOS
        </button>

        <button
          onMouseDown={() => setSecondaryPressed(true)}
          onMouseUp={() => setSecondaryPressed(false)}
          onTouchStart={() => setSecondaryPressed(true)}
          onTouchEnd={() => setSecondaryPressed(false)}
          onClick={() => navigate('/reino')}
          style={{
            width: '100%',
            fontFamily: 'var(--font-display)', fontSize: 11, letterSpacing: 2,
            textTransform: 'uppercase', padding: '14px 12px',
            background: 'transparent', color: '#FFD700',
            border: '3px solid #FFD700', cursor: 'pointer',
            boxShadow: secondaryPressed
              ? '2px 2px 0 #1d0d3a'
              : '5px 5px 0 #1d0d3a, 0 0 10px rgba(255,215,0,0.25)',
            transform: secondaryPressed ? 'translate(3px,3px)' : 'none',
            transition: 'transform 80ms cubic-bezier(.2,.9,.3,1), box-shadow 80ms cubic-bezier(.2,.9,.3,1)',
            textShadow: '0 0 6px rgba(255,215,0,0.45)',
          }}
        >
          ✦ VER MI REINO
        </button>
      </div>
    </div>
  )
}
