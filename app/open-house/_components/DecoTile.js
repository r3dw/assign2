// Generated Art Deco pattern tiles (the sites without photos use these).
const PALETTES = [
  ['#0F5D4B', '#C9A24B'], // emerald + gold
  ['#8E1B2E', '#C9A24B'], // ruby + gold
  ['#2B4C8C', '#C9A24B'], // lapis blue + gold (lighter than the page so it stays visible)
  ['#16161C', '#C9A24B'], // onyx + gold
];
const VARIANTS = ['sunburst', 'chevron', 'fans', 'steps'];

// Round trig results: Node and browsers differ in the last float digits, which breaks hydration.
const r2 = (v) => Math.round(v * 100) / 100;

export default function DecoTile({ index = 0, uid }) {
  const [bg, fg] = PALETTES[index % PALETTES.length];
  const v = VARIANTS[(index + Math.floor(index / 4)) % VARIANTS.length];
  const id = `p-${uid}`;
  let art = null;
  if (v === 'sunburst') {
    // 15 rays + 14 equal gaps exactly fill the half circle, so rays sit flush on the baseline at both ends.
    const N = 15, W = Math.PI / (2 * N - 1);
    const rays = Array.from({ length: N }, (_, i) => {
      const a0 = Math.PI + i * 2 * W, a1 = a0 + W, r = 420;
      return <path key={i} d={`M160 200 L${r2(160 + r * Math.cos(a0))} ${r2(200 + r * Math.sin(a0))} L${r2(160 + r * Math.cos(a1))} ${r2(200 + r * Math.sin(a1))}Z`} fill={fg} />;
    });
    art = <>{rays}<circle cx="160" cy="200" r="34" fill={bg} stroke={fg} strokeWidth="4" /></>;
  } else if (v === 'chevron') {
    art = (
      <>
        <defs><pattern id={id} width="40" height="40" patternUnits="userSpaceOnUse"><path d="M0 10 L20 30 L40 10" stroke={fg} strokeWidth="4" fill="none" /><path d="M0 30 L20 50 L40 30" stroke="#EFE4C8" strokeWidth="2" fill="none" opacity=".7" /></pattern></defs>
        <rect width="320" height="200" fill={`url(#${id})`} />
      </>
    );
  } else if (v === 'fans') {
    const centers = [[0, 0], [40, 0], [20, 10], [0, 20], [40, 20]];
    art = (
      <>
        <defs><pattern id={id} width="40" height="20" patternUnits="userSpaceOnUse">
          {centers.map(([cx, cy]) => [20, 15, 10, 5].map((r) => <circle key={`${cx}${cy}${r}`} cx={cx} cy={cy} r={r} fill={bg} stroke={fg} strokeWidth="1.5" />))}
        </pattern></defs>
        <rect width="320" height="200" fill={`url(#${id})`} />
      </>
    );
  } else {
    // Keep the bottom band clear so the day badge never sits on a gold step.
    art = Array.from({ length: 6 }, (_, i) => {
      const w = 260 - i * 40;
      return <rect key={i} x={160 - w / 2} y={128 - i * 22} width={w} height="22" fill={i % 2 ? bg : fg} stroke={fg} strokeWidth="3" />;
    });
  }
  return (
    <svg viewBox="0 0 320 200" preserveAspectRatio="xMidYMid slice" aria-hidden="true" focusable="false" className="tile-svg">
      <rect width="320" height="200" fill={bg} />
      {art}
    </svg>
  );
}
