import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Coin } from '@/shared/components/glyphs/PixelGlyph'
import { Knight, Pirate, Wizard, Flag, Fountain, Garden } from '../components/ShopSprites'
import { useWalletStore } from '@/features/wallet/store'
import { logEvent } from '@/shared/lib/logger'

type Category = 'SKINS' | 'BOOSTS' | 'DECORACIÓN'

interface ShopItem {
  id: string
  name: string
  tag: 'SKIN' | 'DECO' | 'BOOST'
  price: number
  icon: string
  isNew?: boolean
  sold?: boolean
}

const ITEMS: ShopItem[] = [
  { id: 'knight',   name: 'CABALLERO',     tag: 'SKIN', price: 20,  icon: 'knight' },
  { id: 'pirate',   name: 'PIRATA ANDINO', tag: 'SKIN', price: 35,  icon: 'pirate' },
  { id: 'wizard',   name: 'SABIO ARCANO',  tag: 'SKIN', price: 50,  icon: 'wizard', isNew: true },
  { id: 'flag',     name: 'ESTANDARTE',    tag: 'DECO', price: 15,  icon: 'flag' },
  { id: 'fountain', name: 'FUENTE REAL',   tag: 'DECO', price: 80,  icon: 'fountain', sold: true },
  { id: 'garden',   name: 'JARDÍN',        tag: 'DECO', price: 40,  icon: 'garden' },
]

const ICON_MAP: Record<string, React.ComponentType<{ unit?: number }>> = {
  knight: Knight, pirate: Pirate, wizard: Wizard,
  flag: Flag, fountain: Fountain, garden: Garden,
}

const TAB_TAGS: Record<Category, string> = { SKINS: 'SKIN', BOOSTS: 'BOOST', 'DECORACIÓN': 'DECO' }

function CategoryTab({ label, active, count, onClick }: {
  label: string; active: boolean; count: number; onClick: () => void
}) {
  return (
    <button
      onClick={onClick}
      style={{
        flex: 1, background: 'transparent', border: 'none', cursor: 'pointer',
        padding: '8px 6px 6px',
        borderBottom: active ? '3px solid #FFD700' : '3px solid #2d2058',
        transition: 'border-color 80ms cubic-bezier(.2,.9,.3,1)',
      }}
    >
      <span style={{
        fontFamily: 'var(--font-display)', fontSize: 10, letterSpacing: 2,
        color: active ? '#FFD700' : '#7D5FB3',
        textShadow: active ? '1px 1px 0 #06031a' : 'none',
      }}>{label}</span>
      <span style={{
        marginLeft: 5, fontFamily: 'var(--font-display)', fontSize: 8,
        color: active ? '#FFD700' : '#5e3d99',
      }}>·{count}</span>
    </button>
  )
}

function ItemCard({ item, canAfford, owned, onBuy }: {
  item: ShopItem; canAfford: boolean; owned: boolean; onBuy: (item: ShopItem) => void
}) {
  const [pressed, setPressed] = useState(false)
  const [hover, setHover] = useState(false)
  const IconComp = ICON_MAP[item.icon]
  const isDisabled = item.sold || owned || !canAfford

  return (
    <div
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        position: 'relative',
        background: '#1c1140',
        border: hover && !isDisabled ? '2px solid #FFD700' : '2px solid #5e3d99',
        boxShadow: isDisabled
          ? '4px 4px 0 #06031a'
          : hover
            ? '4px 4px 0 #06031a, inset 0 0 0 1px #FFD700, inset 0 0 14px rgba(255,215,0,0.2)'
            : '4px 4px 0 #06031a, inset 0 0 0 1px #2d2058',
        padding: 10,
        display: 'flex', flexDirection: 'column',
        opacity: isDisabled && !owned ? 0.78 : 1,
        transition: 'border-color 80ms, box-shadow 80ms',
      }}
    >
      {/* Tag chip */}
      <div style={{
        position: 'absolute', top: -2, left: -2,
        background: item.tag === 'SKIN' ? '#5e3d99' : '#2D6A4F',
        color: '#E0E0F0',
        fontFamily: 'var(--font-display)', fontSize: 6, letterSpacing: 1.5,
        padding: '2px 5px', border: '2px solid #06031a',
      }}>{item.tag}</div>

      {/* NEW badge */}
      {item.isNew && !item.sold && !owned && (
        <div style={{
          position: 'absolute', top: -7, right: -7,
          background: '#FFD700', color: '#06031a',
          fontFamily: 'var(--font-display)', fontSize: 7, letterSpacing: 1,
          padding: '3px 5px', border: '2px solid #06031a',
          boxShadow: '0 0 10px rgba(255,215,0,0.6)',
        }}>NEW</div>
      )}

      {/* AGOTADO badge */}
      {item.sold && (
        <div style={{
          position: 'absolute', top: -3, right: -3,
          background: '#CC2200', color: '#FFE066',
          fontFamily: 'var(--font-display)', fontSize: 7, letterSpacing: 1.5,
          padding: '4px 7px', border: '2px solid #06031a',
          boxShadow: '2px 2px 0 #06031a, 0 0 10px rgba(204,34,0,0.5)',
          transform: 'rotate(4deg)', zIndex: 4,
        }}>AGOTADO</div>
      )}

      {/* Owned badge */}
      {owned && (
        <div style={{
          position: 'absolute', top: -3, right: -3,
          background: '#2D6A4F', color: '#FFE066',
          fontFamily: 'var(--font-display)', fontSize: 7, letterSpacing: 1,
          padding: '4px 7px', border: '2px solid #06031a',
          boxShadow: '2px 2px 0 #06031a',
          zIndex: 4,
        }}>✓ TUYO</div>
      )}

      {/* Icon area */}
      <div style={{
        height: 90, background: '#06031a', border: '2px solid #2d2058',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        marginTop: 6, marginBottom: 10,
        filter: item.sold ? 'grayscale(0.55) brightness(0.7)' : 'none',
        position: 'relative', overflow: 'hidden',
      }}>
        {!item.sold && (
          <div style={{
            position: 'absolute', inset: 0,
            background: 'radial-gradient(ellipse at 50% 60%, rgba(255,215,0,0.12), rgba(255,215,0,0) 65%)',
            pointerEvents: 'none',
          }} />
        )}
        {IconComp && <IconComp unit={4} />}
      </div>

      {/* Name */}
      <div style={{
        fontFamily: 'var(--font-display)', fontSize: 9, letterSpacing: 1.5,
        color: item.sold ? '#7D5FB3' : '#E0E0F0',
        textAlign: 'center', marginBottom: 6,
        textDecoration: item.sold ? 'line-through' : 'none',
      }}>{item.name}</div>

      {/* Price */}
      <div style={{ display:'flex', alignItems:'center', justifyContent:'center', gap:6, marginBottom:8 }}>
        <Coin unit={2} />
        <span style={{
          fontFamily: 'var(--font-display)', fontSize: 10, letterSpacing: 1.5,
          color: item.sold ? '#7D5FB3' : canAfford ? '#FFD700' : '#CC2200',
          textShadow: item.sold ? 'none' : '1px 1px 0 #06031a',
        }}>{item.price} CP</span>
      </div>

      {/* Buy button / states */}
      {item.sold ? (
        <div style={{
          textAlign: 'center', fontFamily: 'var(--font-display)', fontSize: 9, letterSpacing: 2,
          color: '#CC2200', background: '#06031a', border: '2px solid #CC2200',
          padding: '7px 0', boxShadow: 'inset 0 0 8px rgba(204,34,0,0.25)',
        }}>SIN STOCK</div>
      ) : owned ? (
        <div style={{
          textAlign: 'center', fontFamily: 'var(--font-display)', fontSize: 9, letterSpacing: 2,
          color: '#2D6A4F', background: '#06031a', border: '2px solid #2D6A4F',
          padding: '7px 0',
        }}>EQUIPADO ✓</div>
      ) : (
        <button
          onClick={() => !isDisabled && onBuy(item)}
          onPointerDown={() => setPressed(true)}
          onPointerUp={() => setPressed(false)}
          onPointerLeave={() => setPressed(false)}
          disabled={isDisabled}
          style={{
            width: '100%',
            fontFamily: 'var(--font-display)', fontSize: 9, letterSpacing: 2,
            color: canAfford ? '#06031a' : '#7D5FB3',
            background: canAfford ? '#FFD700' : '#1c1140',
            border: `2px solid ${canAfford ? '#06031a' : '#3b2466'}`,
            padding: '7px 0 6px', cursor: canAfford ? 'pointer' : 'not-allowed',
            boxShadow: pressed || !canAfford ? '1px 1px 0 #06031a' : '3px 3px 0 #06031a, 0 0 10px rgba(255,215,0,0.35)',
            transform: pressed && canAfford ? 'translate(2px,2px)' : 'none',
            transition: 'transform 80ms cubic-bezier(.2,.9,.3,1), box-shadow 80ms cubic-bezier(.2,.9,.3,1)',
          }}
        >{canAfford ? '► COMPRAR' : 'CP INSUF.'}</button>
      )}
    </div>
  )
}

export default function ShopPage() {
  const navigate = useNavigate()
  const { available } = useWalletStore(s => s.wallet)
  const [tab, setTab] = useState<Category>('SKINS')
  const [owned, setOwned] = useState<Set<string>>(new Set())

  const counts: Record<Category, number> = {
    SKINS:      ITEMS.filter(i => i.tag === 'SKIN').length,
    BOOSTS:     0,
    'DECORACIÓN': ITEMS.filter(i => i.tag === 'DECO').length,
  }

  const visibleItems = tab === 'BOOSTS'
    ? []
    : ITEMS.filter(i => i.tag === TAB_TAGS[tab])

  const handleBuy = (item: ShopItem) => {
    if (available < item.price || owned.has(item.id)) return

    useWalletStore.getState().addTransaction({
      id: `purchase-${item.id}-${Date.now()}`,
      amount: item.price,
      state: 'gastado',
      description: `Compra: ${item.name}`,
      createdAt: new Date().toISOString(),
    })

    logEvent('game.item.purchased', { itemId: item.id, price: item.price })
    setOwned(prev => new Set([...prev, item.id]))
  }

  return (
    <div style={{
      width: '100%', height: '100%',
      background: '#0f0820', position: 'relative',
      overflow: 'hidden', fontFamily: 'var(--font-body)', color: '#E0E0F0',
    }}>
      {/* Vignette */}
      <div style={{
        position: 'absolute', inset: 0,
        background: 'radial-gradient(ellipse at 50% 0%, rgba(60,30,110,0.32) 0%, rgba(15,8,32,0) 55%)',
        pointerEvents: 'none',
      }} />
      {/* Scanlines */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none', opacity: 0.16,
        backgroundImage: 'repeating-linear-gradient(0deg, rgba(0,0,0,0.55) 0px, rgba(0,0,0,0.55) 1px, transparent 1px, transparent 3px)',
        mixBlendMode: 'multiply', zIndex: 50,
      }} />

      {/* Top bar */}
      <div style={{
        position: 'absolute', top: 16, left: 16, right: 16,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        gap: 10, zIndex: 10,
      }}>
        <div style={{ display:'flex', alignItems:'center', gap:10, minWidth:0 }}>
          <button
            onClick={() => navigate('/reino')}
            style={{
              width: 32, height: 32, background: '#1c1140',
              border: '2px solid #5e3d99', color: '#FFD700',
              boxShadow: '2px 2px 0 #06031a', cursor: 'pointer',
              fontFamily: 'var(--font-display)', fontSize: 12,
              display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 0,
            }}>◀</button>
          <div style={{ minWidth: 0 }}>
            <div style={{ fontFamily:'var(--font-display)', fontSize:7, letterSpacing:2, color:'#7D5FB3' }}>▸ MERCADO ARCANO</div>
            <div style={{
              fontFamily: 'var(--font-display)', fontSize: 11, letterSpacing: 1.5,
              color: '#FFD700', marginTop: 3,
              textShadow: '2px 2px 0 #06031a, 0 0 10px rgba(255,215,0,0.4)',
            }}>TIENDA DEL REINO</div>
          </div>
        </div>
        <div style={{
          display: 'flex', alignItems: 'center', gap: 6,
          background: '#1c1140', border: '2px solid #FFD700',
          padding: '5px 9px 4px', flexShrink: 0,
          boxShadow: '3px 3px 0 #06031a, 0 0 10px rgba(255,215,0,0.35)',
        }}>
          <Coin unit={2} />
          <span style={{ fontFamily:'var(--font-display)', fontSize:11, letterSpacing:1.5, color:'#FFD700', textShadow:'1px 1px 0 #06031a' }}>
            {available} CP
          </span>
        </div>
      </div>

      {/* Category tabs */}
      <div style={{
        position: 'absolute', top: 82, left: 16, right: 16,
        display: 'flex', background: '#06031a', border: '2px solid #2d2058', zIndex: 6,
      }}>
        {(['SKINS', 'BOOSTS', 'DECORACIÓN'] as Category[]).map(t => (
          <CategoryTab key={t} label={t} active={tab === t} count={counts[t]} onClick={() => setTab(t)} />
        ))}
      </div>

      {/* Item grid */}
      <div style={{
        position: 'absolute', top: 140, left: 16, right: 16, bottom: 8,
        zIndex: 5, overflowY: 'auto',
      }}>
        {visibleItems.length === 0 ? (
          <div style={{
            marginTop: 80, textAlign: 'center',
            fontFamily: 'var(--font-display)', fontSize: 10, letterSpacing: 2,
            color: '#7D5FB3', lineHeight: 1.8,
          }}>
            <div style={{ fontSize: 14, color: '#9B5DE5', marginBottom: 12 }}>✦ PRÓXIMAMENTE ✦</div>
            <div style={{ fontFamily:'var(--font-body)', fontSize:18, color:'#E0E0F0', fontStyle:'italic' }}>
              Los hechiceros forjan<br/>nuevas pociones…
            </div>
          </div>
        ) : (
          <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:12, paddingTop:4, paddingBottom:16 }}>
            {visibleItems.map(item => (
              <ItemCard
                key={item.id}
                item={item}
                canAfford={available >= item.price}
                owned={owned.has(item.id)}
                onBuy={handleBuy}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
