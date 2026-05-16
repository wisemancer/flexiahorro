const SM = '#5e3d99'
const SL = '#8b62c8'
const SK = '#1d0d3a'
const WI = '#FFE066'
const WC = '#FFD700'
const FL = '#C81F1F'
const FD = '#7d1313'
const PL = '#6b4a18'
const GR = '#2e1857'
const GD = '#0a0118'
const BR = '#C9A82B'

const COL: Record<string, string> = {
  S: SM, L: SL, K: SK,
  W: WI, w: WC,
  F: FL, f: FD, P: PL,
  G: GR, g: GD, B: BR,
}

const CASTLE = [
  "..............F..............",
  "..............FF.............",
  "..............FFf............",
  "..............FF.............",
  "..............P..............",
  ".............LPL.............",
  "...........LSSPSSL...........",
  "...........S.SSS.S...........",
  "...........SSSSSSS...........",
  "...........SSWwWSS...........",
  "...........SSWwWSS...........",
  "...........SSSSSSS...........",
  "...........SSSSSSS...........",
  "...L.L.....KSSSSSK.....L.L...",
  "...LLL.....SSSSSSS.....LLL...",
  "...SSS.....SSSSSSS.....SSS...",
  "...SSSLLLLLSSSWSSSLLLLLSSS...",
  "...SWSSSSSSSSWwWSSSSSSSSWS...",
  "...SwSSWSSSSSSWSSSSSSWSSSwS...",
  "...SSSSSSSSSSSSSSSSSSSSSSSS..",
  "...SSSSSSBBBBGGGGGBBBBSSSSS..",
  "...SSSSSSSSSSGgggGSSSSSSSSS..",
  "...SSSSSSSSSSGgggGSSSSSSSSS..",
  "..KKKKKKKKKKKKKKKKKKKKKKKKK..",
]

const W = 29
const H = CASTLE.length

export function Castle({ unit = 7 }: { unit?: number }) {
  const rows = CASTLE.map(r => r.padEnd(W, '.').slice(0, W))

  const pixels: React.ReactNode[] = []
  const glows: React.ReactNode[] = []

  for (let y = 0; y < H; y++) {
    for (let x = 0; x < W; x++) {
      const c = rows[y][x]
      if (c === '.' || !COL[c]) continue
      pixels.push(
        <div key={`p-${x}-${y}`} style={{
          position: 'absolute',
          left: x * unit, top: y * unit,
          width: unit, height: unit,
          background: COL[c],
        }} />
      )
      if (c === 'w') {
        glows.push(
          <div key={`g-${x}-${y}`} style={{
            position: 'absolute',
            left: x * unit - unit * 2.5,
            top: y * unit - unit * 2.5,
            width: unit * 6, height: unit * 6,
            background: 'radial-gradient(circle, rgba(255,215,0,0.75) 0%, rgba(255,215,0,0.2) 40%, rgba(255,215,0,0) 70%)',
            pointerEvents: 'none',
          }} />
        )
      }
    }
  }

  return (
    <div style={{
      position: 'relative',
      width: W * unit,
      height: H * unit,
      filter: 'drop-shadow(0 0 14px rgba(255,215,0,0.28)) drop-shadow(0 6px 0 rgba(0,0,0,0.55))',
    }}>
      <div style={{
        position: 'absolute',
        left: -unit * 10, top: -unit * 6,
        width: (W + 20) * unit, height: (H + 14) * unit,
        background: 'radial-gradient(ellipse at 50% 50%, rgba(155,93,229,0.45) 0%, rgba(155,93,229,0.18) 30%, rgba(0,0,0,0) 65%)',
        pointerEvents: 'none',
      }} />
      {glows}
      {pixels}
    </div>
  )
}
