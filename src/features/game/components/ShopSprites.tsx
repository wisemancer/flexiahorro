function PixelSprite({ grid, palette, unit = 3 }: {
  grid: string[]; palette: Record<string, string>; unit?: number
}) {
  const rows = grid.map(r => r.padEnd(grid[0].length, '.'))
  const W = rows[0].length
  const H = rows.length
  const pixels: React.ReactNode[] = []
  for (let y = 0; y < H; y++) {
    for (let x = 0; x < W; x++) {
      const c = rows[y][x]
      const bg = palette[c]
      if (!bg) continue
      pixels.push(<div key={`${x}-${y}`} style={{ position:'absolute', left:x*unit, top:y*unit, width:unit, height:unit, background:bg }} />)
    }
  }
  return <div style={{ position:'relative', width:W*unit, height:H*unit, display:'inline-block', verticalAlign:'middle' }}>{pixels}</div>
}

export function Knight({ unit = 3 }: { unit?: number }) {
  return <PixelSprite unit={unit} palette={{ K:'#1a0a30', M:'#9a9ab8', m:'#d0d0e5', D:'#3a3a52', G:'#FFD700', R:'#8B1A1A', r:'#5a0e0e' }} grid={[
    ".....KKK.....", "...KKMMMKK...", "..KMmmmmmMK..", ".KMmmmmmmMMK.",
    ".KMmmmmmmMMK.", ".KKKKKKKKKKK.", ".KMDDDDDDDMK.", ".KMMMMMMMMMK.",
    ".KMMMGGGMMMK.", ".KKMMMMMMMKK.", "..KKMMMMMKK..", "..KrRRRRRrK..", ".KrRRRRRRRrK.",
  ]} />
}

export function Pirate({ unit = 3 }: { unit?: number }) {
  return <PixelSprite unit={unit} palette={{ K:'#1a0a30', H:'#2a1a1a', G:'#FFD700', S:'#FFFCEA', F:'#e8b88c', P:'#06031a', B:'#5a4030' }} grid={[
    ".....KKK.....", "...KKHHHKK...", "..KKHHHHHKK..", "..KHHHHHHHK..",
    ".KHHHHHHHHHK.", "KHHHHHSSHHHHK", "KGGGGGGGGGGGK", "KKKKKKKKKKKKK",
    "..KFFFFFFFK..", "..KFPKFKBFK..", "..KFFFFFFBK..", "..KKBBBBBKK..", "...KKKKKKK...",
  ]} />
}

export function Wizard({ unit = 3 }: { unit?: number }) {
  return <PixelSprite unit={unit} palette={{ K:'#1a0a30', P:'#5e3d99', p:'#8b62c8', S:'#FFD700', G:'#FFD700', F:'#e8b88c', B:'#cfcfe8' }} grid={[
    "......K......", ".....KPK.....", ".....KPK.....", "....KPpPK....",
    "....KPSpK....", "...KPpPpPK...", "...KPPpPPK...", "..KPPpPpPPK..",
    ".KPPPpPpPPPK.", ".KKKKKKKKKKK.", ".KGGGGGGGGGK.", ".KKKKKKKKKKK.", "...KFFBBFK...",
  ]} />
}

export function Flag({ unit = 3 }: { unit?: number }) {
  return <PixelSprite unit={unit} palette={{ K:'#1a0a30', G:'#FFD700', g:'#b88a00', R:'#8B1A1A' }} grid={[
    "..KKKKKKKKKK.", "..KGgGGGGGGK.", "..KGGRGRRGGK.", "..KGRRRRRGGK.",
    "..KGGRGRGGK..", "..KGGGGGGK...", "..KKKKKKK....", "..K..........",
    "..K..........", "..K..........", "..K..........", "..K..........", ".KKK.........",
  ]} />
}

export function Fountain({ unit = 3 }: { unit?: number }) {
  return <PixelSprite unit={unit} palette={{ K:'#1a0a30', S:'#FFD700', W:'#5e9bff', w:'#a8c6ff', M:'#7a7a98', m:'#a0a0c0' }} grid={[
    ".....KSK.....", "....KSWSK....", "....KWWWK....", "....KWWWK....",
    "...KWWWWWK...", "...KKKKKKK...", ".KKMMMMMMMKK.", ".KMmMMMMMmMK.",
    ".KMMMMMMMMMK.", ".KMmMMmMMmMK.", ".KMMMMMMMMMK.", ".KKKKKKKKKKK.", "..KKKKKKKKK..",
  ]} />
}

export function Garden({ unit = 3 }: { unit?: number }) {
  return <PixelSprite unit={unit} palette={{ K:'#1a0a30', G:'#2D6A4F', g:'#4caa70', F:'#ff6b9b', M:'#6b3a14', m:'#9a5a26' }} grid={[
    "....KKKK.....", "...KFGGFK....", "..KGGgFGGK...", ".KGgGGGgGGK..",
    "KGFGGgGGFGGK.", "KGgGGGgGGGGK.", "KGGFggGGGFGGK", ".KGGGgGGGGGK.",
    ".KKGGGGGGGKK.", "..KKKKKKKKK..", "..MmMMMMMmM..", "..MMMMmMMMM..", "..KKKKKKKKK..",
  ]} />
}
