import { useNavigate } from 'react-router-dom'
import { Castle } from '@/features/auth/components/Castle'
import { Flame, Coin, Potion, Sword, Scroll, NavCastle } from '@/shared/components/glyphs/PixelGlyph'
import { useWalletStore } from '@/features/wallet/store'
import { useGameStore } from '@/features/game/store'
import { useTenantStore } from '@/tenant/store'
import { useState, useCallback } from 'react'
import { Toast } from '@/shared/components/Toast'

const SPARKLES = [[15,30,7],[280,20,9],[5,150,6],[290,170,8],[150,4,10]] as const
const TWINKLES = [[30,140],[370,180],[80,300],[330,340],[20,420],[380,460],[60,560]] as const

function XPBar({ current = 160, max = 500, chunks = 16 }: { current?: number; max?: number; chunks?: number }) {
  const filled = Math.round(chunks * Math.max(0, Math.min(1, current / max)))
  return (
    <div style={{
      background: '#06031a', border: '2px solid #5e3d99',
      boxShadow: '3px 3px 0 #06031a, inset 0 0 0 1px #1a0a30',
      padding: '8px 10px 9px',
    }}>
      <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom: 6 }}>
        <div style={{ fontFamily:'var(--font-display)', fontSize:7, letterSpacing:2, color:'#FFD700' }}>
          XP · NIVEL 3 → 4
        </div>
        <div style={{ fontFamily:'var(--font-body)', fontSize:16, lineHeight:1, color:'#E0E0F0' }}>
          <span style={{ color:'#FFD700' }}>{current}</span>
          <span style={{ color:'#7D5FB3' }}> / {max}</span>
        </div>
      </div>
      <div style={{
        height: 12, background: '#1a0a30', border: '1px solid #06031a',
        padding: 1, display: 'flex', gap: 1,
      }}>
        {Array.from({ length: chunks }, (_, i) => (
          <div key={i} style={{
            flex: 1,
            background: i < filled ? '#FFD700' : '#2D2D52',
            boxShadow: i < filled
              ? 'inset 0 1px 0 rgba(255,243,160,0.85), inset 0 -1px 0 rgba(184,138,0,0.7)'
              : 'none',
          }} />
        ))}
      </div>
    </div>
  )
}

function QuestDialog({ progress = 2, total = 3 }: { progress?: number; total?: number }) {
  return (
    <div style={{
      position: 'relative',
      background: '#1c1140', border: '3px solid #5e3d99',
      boxShadow: '4px 4px 0 #06031a, inset 0 0 0 1px #2d2058',
      padding: '12px 12px 12px 16px',
      display: 'flex', gap: 12, alignItems: 'flex-start',
    }}>
      {/* Gold corner accents */}
      <div style={{ position:'absolute', top:-3, left:-3, width:16, height:16, borderTop:'3px solid #FFD700', borderLeft:'3px solid #FFD700', pointerEvents:'none' }} />
      <div style={{ position:'absolute', bottom:-3, right:-3, width:16, height:16, borderBottom:'3px solid #FFD700', borderRight:'3px solid #FFD700', pointerEvents:'none' }} />

      <div style={{ flexShrink:0, background:'#06031a', border:'2px solid #5e3d99', padding:6, boxShadow:'2px 2px 0 #06031a' }}>
        <Scroll unit={3} />
      </div>

      <div style={{ flex:1, minWidth:0 }}>
        <div style={{ fontFamily:'var(--font-display)', fontSize:7, letterSpacing:2, color:'#FFD700', marginBottom:4 }}>
          ◆ MISIÓN DE TEMPORADA
        </div>
        <div style={{ fontFamily:'var(--font-body)', fontSize:18, lineHeight:1.05, color:'#E0E0F0', marginBottom:6 }}>
          Ahorra <span style={{ color:'#FFD700' }}>3 meses seguidos</span>
        </div>
        <div style={{ display:'flex', alignItems:'center', gap:8 }}>
          <div style={{ display:'flex', gap:3 }}>
            {Array.from({ length: total }, (_, i) => (
              <div key={i} style={{
                width:14, height:10,
                background: i < progress ? '#FFD700' : '#2D2D52',
                border: '1px solid #06031a',
                boxShadow: i < progress ? 'inset 0 1px 0 rgba(255,243,160,0.85)' : 'none',
              }} />
            ))}
          </div>
          <div style={{ fontFamily:'var(--font-display)', fontSize:9, letterSpacing:1.5, color:'#FFD700' }}>
            {progress}/{total}
          </div>
          <div style={{ flex:1 }} />
          <div style={{ fontFamily:'var(--font-display)', fontSize:7, letterSpacing:2, color:'#9B5DE5' }}>
            +150 XP →
          </div>
        </div>
      </div>
    </div>
  )
}

function ActionCard({ icon, label, sub, hot = false, onClick }: {
  icon: React.ReactNode; label: string; sub?: string; hot?: boolean; onClick?: () => void
}) {
  const [pressed, setPressed] = useState(false)
  const [hover, setHover] = useState(false)

  return (
    <button
      onClick={onClick}
      onPointerDown={() => setPressed(true)}
      onPointerUp={() => setPressed(false)}
      onPointerLeave={() => { setPressed(false); setHover(false) }}
      onPointerEnter={() => setHover(true)}
      style={{
        flex: 1, height: 148,
        background: '#1c1140',
        border: hover ? '2px solid #FFD700' : '2px solid #5e3d99',
        boxShadow: pressed
          ? '2px 2px 0 #06031a'
          : hover
            ? '4px 4px 0 #06031a, inset 0 0 0 1px #FFD700, inset 0 0 16px rgba(255,215,0,0.25), inset 0 0 32px rgba(155,93,229,0.18)'
            : '4px 4px 0 #06031a, inset 0 0 0 1px #2d2058',
        padding: '14px 8px',
        cursor: 'pointer',
        display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'space-between',
        transform: pressed ? 'translate(2px,2px)' : 'none',
        transition: 'transform 80ms cubic-bezier(.2,.9,.3,1), box-shadow 80ms cubic-bezier(.2,.9,.3,1), border-color 80ms',
        position: 'relative',
      }}
    >
      {hot && (
        <div style={{
          position:'absolute', top:-7, right:-7,
          background:'#CC2200', border:'2px solid #1a0a30',
          color:'#FFE066', fontFamily:'var(--font-display)', fontSize:7, letterSpacing:1,
          padding:'2px 4px', boxShadow:'0 0 8px rgba(204,34,0,0.7)',
        }}>NEW</div>
      )}
      <div style={{ height:50, display:'flex', alignItems:'center' }}>{icon}</div>
      <div style={{ display:'flex', flexDirection:'column', alignItems:'center', gap:5 }}>
        <div style={{
          fontFamily:'var(--font-display)', fontSize:9, letterSpacing:1.5,
          color: hover ? '#FFD700' : '#E0E0F0',
          textShadow: hover ? '0 0 6px rgba(255,215,0,0.6)' : 'none',
          transition: 'color 80ms, text-shadow 80ms',
        }}>{label}</div>
        {sub && (
          <div style={{ fontFamily:'var(--font-display)', fontSize:6, letterSpacing:1.5, color:'#7D5FB3' }}>
            {sub}
          </div>
        )}
      </div>
    </button>
  )
}

export default function DashboardPage() {
  const navigate = useNavigate()
  const [toast, setToast] = useState<string | null>(null)
  const showToast = useCallback((msg: string) => setToast(msg), [])
  const { available } = useWalletStore(s => s.wallet)
  const { streak, kingdomState } = useGameStore()
  const tenant = useTenantStore(s => s.config)
  const isHibernating = kingdomState === 'hibernating'

  return (
    <div style={{
      width: '100%', height: '100%',
      background: '#0f0820',
      position: 'relative',
      overflow: 'auto',
      fontFamily: 'var(--font-body)',
      color: '#E0E0F0',
    }}>
      {/* Vignette */}
      <div style={{
        position: 'fixed', inset: 0,
        background: 'radial-gradient(ellipse at 50% 30%, rgba(60,30,110,0.4) 0%, rgba(15,8,32,0) 60%)',
        pointerEvents: 'none', zIndex: 0,
      }} />

      {/* Scanlines */}
      <div style={{
        position: 'fixed', inset: 0, pointerEvents: 'none', opacity: 0.16,
        backgroundImage: 'repeating-linear-gradient(0deg, rgba(0,0,0,0.55) 0px, rgba(0,0,0,0.55) 1px, transparent 1px, transparent 3px)',
        mixBlendMode: 'multiply', zIndex: 50,
      }} />

      {/* Twinkles */}
      {TWINKLES.map(([x, y], i) => (
        <div key={i} style={{
          position: 'absolute', left: x, top: y, width: 2, height: 2,
          background: '#FFFCEA', opacity: 0.6,
          animation: `dashTw 3s steps(2,end) ${i * 0.4}s infinite`,
        }} />
      ))}

      <div style={{ position: 'relative', zIndex: 1, paddingBottom: 16 }}>

        {/* Top bar */}
        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: '16px 16px 0',
        }}>
          <div style={{ display:'flex', alignItems:'center', gap:8 }}>
            <div style={{
              width:30, height:30, background:'#1c1140',
              border:'2px solid #5e3d99', boxShadow:'2px 2px 0 #06031a',
              display:'flex', alignItems:'center', justifyContent:'center',
            }}>
              <NavCastle unit={2} tint="#FFD700" />
            </div>
            <div>
              <div style={{ fontFamily:'var(--font-display)', fontSize:7, letterSpacing:2, color:'#7D5FB3' }}>SUCURSAL</div>
              <div style={{ fontFamily:'var(--font-display)', fontSize:9, letterSpacing:1.5, color:'#E0E0F0', marginTop:2 }}>
                {tenant?.name?.toUpperCase() ?? 'FLEXIAHORRO'}
              </div>
            </div>
          </div>
          <div style={{
            display:'flex', alignItems:'center', gap:6,
            background:'#1c1140', border:'2px solid #FFD700',
            padding:'5px 10px 4px',
            boxShadow:'3px 3px 0 #06031a, 0 0 10px rgba(255,215,0,0.35)',
          }}>
            <Coin unit={2} />
            <span style={{ fontFamily:'var(--font-display)', fontSize:11, letterSpacing:1.5, color:'#FFD700', textShadow:'1px 1px 0 #06031a' }}>
              {available} CP
            </span>
          </div>
        </div>

        {/* Castle scene */}
        <div style={{ position:'relative', height:210, display:'flex', justifyContent:'center', alignItems:'flex-start', marginTop:8 }}>
          <div style={{
            position:'absolute', width:340, height:240, left:'50%', top:-20, marginLeft:-170,
            background: isHibernating
              ? 'radial-gradient(ellipse at 50% 60%, rgba(100,100,180,0.2) 0%, rgba(15,8,32,0) 70%)'
              : 'radial-gradient(ellipse at 50% 60%, rgba(255,215,0,0.32) 0%, rgba(255,215,0,0.12) 25%, rgba(155,93,229,0.18) 45%, rgba(15,8,32,0) 70%)',
            pointerEvents:'none', animation:'auraPulse 3s ease-in-out infinite',
          }} />
          {!isHibernating && (
            <div style={{ position:'absolute', width:240, height:240, left:'50%', top:-10, marginLeft:-120, pointerEvents:'none', opacity:0.5 }}>
              {Array.from({ length: 10 }, (_, i) => (
                <div key={i} style={{
                  position:'absolute', left:'50%', top:'50%',
                  width:3, height:120, marginLeft:-1.5, marginTop:-120,
                  transformOrigin:'50% 100%', transform:`rotate(${(i/10)*360}deg)`,
                  background:'linear-gradient(to top, rgba(255,215,0,0.32), rgba(255,215,0,0) 70%)',
                  animation:'auraSpin 30s linear infinite',
                }} />
              ))}
            </div>
          )}
          <div style={{
            position:'relative', zIndex:3, animation:'bobSlow 4s ease-in-out infinite',
            filter: isHibernating ? 'saturate(0.15) brightness(0.45)' : 'none',
            transition: 'filter 1s ease-in-out',
          }}>
            <Castle unit={8} />
          </div>
          {!isHibernating && SPARKLES.map(([x, y, s], i) => (
            <div key={i} style={{
              position:'absolute', left:'50%', top:y, marginLeft:x-150,
              width:s, height:s, animation:`dashSpk 1.8s steps(4,end) ${i*0.3}s infinite`,
            }}>
              <div style={{ position:'absolute', left:s*0.4, top:0, width:s*0.2, height:s, background:'#FFD700' }} />
              <div style={{ position:'absolute', left:0, top:s*0.4, width:s, height:s*0.2, background:'#FFD700' }} />
            </div>
          ))}
        </div>

        {/* Level badge */}
        <div style={{ textAlign:'center', marginTop:4 }}>
          {isHibernating ? (
            <div style={{
              display:'inline-block', fontFamily:'var(--font-display)', fontSize:8, letterSpacing:2,
              color:'#9a9ab8', background:'#1c1140', padding:'5px 10px',
              border:'2px solid #3b2466', boxShadow:'3px 3px 0 #06031a',
            }}>💤 EN HIBERNACIÓN</div>
          ) : (
            <div style={{
              display:'inline-flex', alignItems:'center', gap:6,
              fontFamily:'var(--font-display)', fontSize:9, letterSpacing:2,
              color:'#06031a', background:'#FFD700', padding:'5px 10px',
              border:'2px solid #1a0a30', boxShadow:'3px 3px 0 #06031a, 0 0 14px rgba(255,215,0,0.5)',
            }}>LV 3 · BASTIÓN</div>
          )}
        </div>

        {/* XP Bar */}
        <div style={{ padding:'10px 16px 0' }}>
          <XPBar current={160} max={500} />
        </div>

        {/* Streak */}
        {streak > 0 && !isHibernating && (
          <div style={{ display:'flex', justifyContent:'center', marginTop:10 }}>
            <div style={{
              display:'inline-flex', alignItems:'center', gap:10,
              background:'#1c1140', border:'2px solid #FFD700',
              padding:'8px 14px 6px',
              boxShadow:'3px 3px 0 #06031a, 0 0 12px rgba(255,107,26,0.4)',
            }}>
              <Flame unit={3} />
              <div style={{ fontFamily:'var(--font-display)', fontSize:11, letterSpacing:2, color:'#FFD700', textShadow:'2px 2px 0 #06031a' }}>
                RACHA · {streak} {streak === 1 ? 'MES' : 'MESES'}
              </div>
            </div>
          </div>
        )}

        {/* Hibernation message */}
        {isHibernating && (
          <div style={{
            margin:'10px 16px 0', background:'#1c1140', border:'2px solid #3b2466',
            padding:'12px 16px', boxShadow:'3px 3px 0 #06031a',
          }}>
            <p style={{
              fontFamily:'var(--font-display)', fontSize:8, letterSpacing:1.5,
              color:'#9a9ab8', lineHeight:1.8, margin:0, textAlign:'center',
            }}>TUS SOLDADOS DESCANSAN.<br/>VUELVEN CON TU PRÓXIMO APORTE.</p>
          </div>
        )}

        {/* Quest dialog */}
        <div style={{ padding:'10px 16px 0' }}>
          <QuestDialog progress={2} total={3} />
        </div>

        {/* Section label */}
        <div style={{ padding:'14px 20px 0' }}>
          <div style={{ fontFamily:'var(--font-display)', fontSize:9, letterSpacing:3, color:'#9B5DE5' }}>
            ▸ ACCIONES DEL REINO
          </div>
        </div>

        {/* Action cards */}
        <div style={{ display:'flex', gap:10, padding:'10px 16px 0' }}>
          <ActionCard icon={<Potion unit={3} />} label="TIENDA" sub="DESDE 20 CP" onClick={() => navigate('/tienda')} />
          <ActionCard icon={<Sword unit={3} tint="#E0E0F0" />} label="TORNEO" sub="EMPIEZA HOY" hot onClick={() => navigate('/torneo')} />
          <ActionCard icon={<Scroll unit={3} />} label="MISIONES" sub="3 ACTIVAS" onClick={() => showToast('✦ PRÓXIMAMENTE ✦')} />
        </div>

      </div>

      {toast && <Toast message={toast} onDone={() => setToast(null)} />}
    </div>
  )
}
