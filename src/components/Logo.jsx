import { COLORS } from '../game/constants';

export default function Logo({ size = 'md' }) {
  const scales = {
    sm: { block: 10, fontSize: 18, gap: 2 },
    md: { block: 16, fontSize: 28, gap: 3 },
    lg: { block: 22, fontSize: 40, gap: 4 },
  };
  const s = scales[size] || scales.md;
  const b = s.block;
  const g = s.gap;

  // Logo: stylized falling block icon + "BlockFall" text
  const blocks = [
    // Top-left corner block
    { x: 0, y: 0, c: COLORS.blueGreen },
    { x: b + g, y: 0, c: COLORS.amber },
    { x: 0, y: b + g, c: COLORS.orange },
    { x: b + g, y: b + g, c: COLORS.skyBlue },
    // Falling piece below
    { x: b + g, y: (b + g) * 2, c: COLORS.deepSpace },
    { x: b + g, y: (b + g) * 3, c: COLORS.blueGreen, opacity: 0.3 },
  ];

  const totalH = (b + g) * 4 + b;
  const totalW = (b + g) * 2 + b;

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 12, userSelect: 'none' }}>
      <svg width={totalW} height={totalH} viewBox={`0 0 ${totalW} ${totalH}`}>
        {blocks.map((bl, i) => (
          <rect
            key={i}
            x={bl.x}
            y={bl.y}
            width={b}
            height={b}
            rx={2}
            fill={bl.c}
            opacity={bl.opacity ?? 1}
          />
        ))}
        {/* Motion lines for the falling piece */}
        <line
          x1={b + g + b / 2}
          y1={(b + g) * 2 - 2}
          x2={b + g + b / 2}
          y2={(b + g) * 2 - 8}
          stroke={COLORS.deepSpace}
          strokeWidth={2}
          strokeDasharray="2,3"
          opacity={0.4}
        />
      </svg>
      <div style={{ display: 'flex', flexDirection: 'column', lineHeight: 1 }}>
        <span
          style={{
            fontSize: s.fontSize,
            fontWeight: 900,
            letterSpacing: '-0.5px',
            color: COLORS.deepSpace,
            fontFamily: "'Segoe UI', system-ui, sans-serif",
          }}
        >
          Block
          <span style={{ color: COLORS.orange }}>Fall</span>
        </span>
      </div>
    </div>
  );
}
