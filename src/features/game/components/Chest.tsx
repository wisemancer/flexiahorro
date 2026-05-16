const COL: Record<string, string> = {
  W: '#6b3a14', L: '#9a5a26', S: '#3d1f08',
  M: '#d9a72a', m: '#FFE066', d: '#7d5e10',
  G: '#FFD700', g: '#FFF3a0', o: '#b88a00',
  R: '#ec3a3a', B: '#5e9bff', E: '#3df084',
  K: '#1a0a30',
}

const CHEST = [
  ".......KKKKKKKKKKK.......",
  ".......KLLLLLLLLLK.......",
  ".......KLMWWWWWMLK.......",
  ".......KSWMWWWMWSK.......",
  ".......KKKKKKKKKKK.......",
  ".....GGgGGGEGGgGGGGG.....",
  "....GGgGRGGGgGGGggGGG....",
  "...GGoGggGGGGGGGGgGBgo...",
  "..KKKKKKKKKKKKKKKKKKKKK..",
  "..KWLWWWWWWWWWWWWWWWLWK.",
  "..KWWWWWWWWWWWWWWWWWWWK..",
  "..KWWWWWWMMMMMMMWWWWWWK..",
  "..KWLWWWMMmddddmMWWWWLWK",
  "..KWWWWWMmddddddmWWWWWWK",
  "..KWLWWWMMmddddmMWWWWLWK",
  "..KWWWWWWMMMMMMMWWWWWWK..",
  "..KSSSSSSSSSSSSSSSSSSSK..",
  "..KKKKKKKKKKKKKKKKKKKKK..",
]

const W = 25
const H = CHEST.length

export function Chest({ unit = 8 }: { unit?: number }) {
  const rows = CHEST.map(r =>
    r.length === W ? r : r.length < W ? r.padEnd(W, '.') : r.slice(0, W)
  )

  const pixels: React.ReactNode[] = []
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
    }
  }

  return (
    <div style={{
      position: 'relative',
      width: W * unit,
      height: H * unit,
      filter: 'drop-shadow(4px 6px 0 rgba(0,0,0,0.65)) drop-shadow(0 0 22px rgba(255,215,0,0.5))',
    }}>
      <div style={{
        position: 'absolute',
        left: 5 * unit, top: 3 * unit,
        width: 15 * unit, height: 6 * unit,
        background: 'radial-gradient(ellipse at 50% 80%, rgba(255,255,200,1) 0%, rgba(255,215,0,0.75) 25%, rgba(255,215,0,0.25) 55%, rgba(255,215,0,0) 80%)',
        pointerEvents: 'none',
      }} />
      {pixels}
    </div>
  )
}
