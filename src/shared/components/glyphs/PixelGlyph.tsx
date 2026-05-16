function makeGlyph(rows: string[], colorMap: Record<string, string>, unit: number) {
  const pixels: React.ReactNode[] = []
  rows.forEach((row, y) =>
    [...row].forEach((c, x) => {
      const bg = colorMap[c]
      if (!bg) return
      pixels.push(
        <div key={`${x}-${y}`} style={{
          position: 'absolute', left: x * unit, top: y * unit,
          width: unit, height: unit, background: bg,
        }} />
      )
    })
  )
  return pixels
}

export function Flame({ unit = 3 }: { unit?: number }) {
  const rows = [
    "...K...", "..KMK..", "..KYK..", ".KMYMK.",
    ".KYWYK.", "KMYWYMK", "KOYYYOK", "KOOOMOK", ".KKKKK.",
  ]
  const pixels = makeGlyph(rows, { K:'#1a0a30', O:'#ff6b1a', M:'#ffb12e', Y:'#FFD700', W:'#fff3a0' }, unit)
  return <div style={{ position:'relative', width:7*unit, height:9*unit, display:'inline-block', verticalAlign:'middle' }}>{pixels}</div>
}

export function Coin({ unit = 3 }: { unit?: number }) {
  const rows = [
    "..OOOO..", ".OMLLLO.", "OMLDLDLO", "OMLDLLMO",
    "OMLDLLMO", "OMLDDLMO", ".OMLLMO.", "..OOOO..",
  ]
  const pixels = makeGlyph(rows, { O:'#1a0a30', D:'#b88a00', M:'#FFD700', L:'#FFF3a0' }, unit)
  return <div style={{ position:'relative', width:8*unit, height:8*unit, display:'inline-block', verticalAlign:'middle' }}>{pixels}</div>
}

export function Sword({ unit = 3, tint = '#E0E0F0' }: { unit?: number; tint?: string }) {
  const rows = [
    ".....K...", "....KBK..", "...KBDK..", "...KBDK..",
    "..KBDDK..", "..KBDDK..", ".KBDDDK..", "KGGGGGGGK",
    "..KHHHK..", "..KHHHK..", "...KKK...",
  ]
  const pixels = makeGlyph(rows, { K:'#1a0a30', B:tint, D:'#9a9ab8', G:'#d9a72a', H:'#6b3a14' }, unit)
  return <div style={{ position:'relative', width:9*unit, height:11*unit, display:'inline-block', verticalAlign:'middle' }}>{pixels}</div>
}

export function Scroll({ unit = 3 }: { unit?: number }) {
  const rows = [
    "KKK.....KKK", "KPK.....KPK", "KPKKKKKKKPK",
    "KPDIIIIIPDK", "KPDIIDIIDPK", "KPDIIIDIDPK",
    "KPDIIIIIDPK", "KPKKKKKKKPK", "KKK.....KKK",
  ]
  const pixels = makeGlyph(rows, { K:'#1a0a30', P:'#e8d8a8', D:'#b89a68', R:'#9B5DE5', I:'#3d1f08' }, unit)
  return <div style={{ position:'relative', width:11*unit, height:9*unit, display:'inline-block', verticalAlign:'middle' }}>{pixels}</div>
}

export function Potion({ unit = 3 }: { unit?: number }) {
  const rows = [
    "...KKK...", "...KCK...", "..KKCKK..", "..KGLGK..",
    ".KGLLLGK.", ".KGLPLGK.", "KGLPLDDGK", "KGLDLDDGK",
    "KGDDLDDGK", "KGDDDDDGK", ".KGDDDGK.", "..KKKKK..",
  ]
  const pixels = makeGlyph(rows, { K:'#1a0a30', C:'#d9a72a', G:'#5e9bff', L:'#a8c6ff', D:'#2a5599', P:'#FFD700' }, unit)
  return <div style={{ position:'relative', width:9*unit, height:12*unit, display:'inline-block', verticalAlign:'middle' }}>{pixels}</div>
}

export function NavCastle({ unit = 2, tint = '#FFD700' }: { unit?: number; tint?: string }) {
  const rows = [
    "T.T.T.T.T.T", "TTTTTTTTTTT", "T...T.T...T",
    "TTTTTTTTTTT", "TTTTTTTTTTT", "TTT.TTT.TTT",
    "TTT.TTT.TTT", "TTT.TTT.TTT", "TTTTTTTTTTT",
  ]
  const pixels = makeGlyph(rows, { T: tint }, unit)
  return <div style={{ position:'relative', width:11*unit, height:9*unit, display:'inline-block', verticalAlign:'middle' }}>{pixels}</div>
}
