import { COLORS } from '../game/constants';
import Logo from '../components/Logo';

const MOCK_DATA = [
  { rank: 1, name: 'NovaMind', score: 142500, level: 9, lines: 187 },
  { rank: 2, name: 'Pixel_Storm', score: 118200, level: 8, lines: 162 },
  { rank: 3, name: 'BlkFall_Pro', score: 97800, level: 7, lines: 141 },
  { rank: 4, name: 'ZenDropper', score: 84300, level: 7, lines: 128 },
  { rank: 5, name: 'TetroKing88', score: 71050, level: 6, lines: 112 },
  { rank: 6, name: 'CubeRacer', score: 65400, level: 6, lines: 104 },
  { rank: 7, name: 'FallMaster', score: 58900, level: 5, lines: 97 },
  { rank: 8, name: 'BlockBuster', score: 49200, level: 5, lines: 88 },
  { rank: 9, name: 'Stacko99', score: 41700, level: 4, lines: 74 },
  { rank: 10, name: 'You', score: 0, level: 1, lines: 0, isYou: true },
];

const MEDALS = ['🥇', '🥈', '🥉'];
const RANK_COLORS = [COLORS.amber, '#9e9e9e', COLORS.orange];

export default function LeaderboardScreen() {
  return (
    <div
      style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
        background: 'linear-gradient(160deg, #e8f4fd 0%, #f5f9ff 100%)',
        paddingBottom: 80,
      }}
    >
      {/* Header */}
      <div
        style={{
          background: 'white',
          boxShadow: '0 2px 8px rgba(2,48,71,0.08)',
          padding: '20px 20px 16px',
        }}
      >
        <Logo size="sm" />
        <div style={{ marginTop: 12, display: 'flex', alignItems: 'center', gap: 8 }}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill={COLORS.amber}>
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
          </svg>
          <span style={{ fontSize: 18, fontWeight: 800, color: COLORS.deepSpace }}>Global Rankings</span>
        </div>
      </div>

      {/* Top 3 podium */}
      <div
        style={{
          display: 'flex',
          alignItems: 'flex-end',
          justifyContent: 'center',
          padding: '24px 16px 16px',
          gap: 8,
        }}
      >
        <PodiumCard entry={MOCK_DATA[1]} pos={2} height={90} />
        <PodiumCard entry={MOCK_DATA[0]} pos={1} height={120} />
        <PodiumCard entry={MOCK_DATA[2]} pos={3} height={70} />
      </div>

      {/* Rest of the list */}
      <div style={{ flex: 1, overflowY: 'auto', padding: '0 12px 8px' }}>
        {MOCK_DATA.slice(3).map(entry => (
          <LeaderRow key={entry.rank} entry={entry} />
        ))}
      </div>
    </div>
  );
}

function PodiumCard({ entry, pos, height }) {
  const color = RANK_COLORS[pos - 1] || COLORS.skyBlue;
  return (
    <div
      style={{
        flex: pos === 1 ? 1.2 : 1,
        textAlign: 'center',
        animation: `podiumRise 0.5s ease-out ${(pos - 1) * 0.1}s both`,
      }}
    >
      <div style={{ fontSize: pos === 1 ? 28 : 22, marginBottom: 4 }}>
        {MEDALS[pos - 1]}
      </div>
      <div
        style={{
          fontSize: pos === 1 ? 13 : 11,
          fontWeight: 700,
          color: COLORS.deepSpace,
          marginBottom: 4,
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap',
        }}
      >
        {entry.name}
      </div>
      <div
        style={{
          background: color,
          borderRadius: '12px 12px 8px 8px',
          height,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: `0 4px 16px ${color}55`,
        }}
      >
        <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.8)', fontWeight: 600 }}>LV{entry.level}</div>
        <div style={{ fontSize: pos === 1 ? 15 : 12, fontWeight: 900, color: 'white' }}>
          {entry.score.toLocaleString()}
        </div>
      </div>
      <style>{`
        @keyframes podiumRise {
          from { transform: translateY(30px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
      `}</style>
    </div>
  );
}

function LeaderRow({ entry }) {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        background: entry.isYou ? `${COLORS.amber}22` : 'white',
        borderRadius: 14,
        padding: '12px 16px',
        marginBottom: 8,
        border: entry.isYou ? `2px solid ${COLORS.amber}` : '2px solid transparent',
        boxShadow: '0 2px 8px rgba(2,48,71,0.06)',
      }}
    >
      <div
        style={{
          width: 28, height: 28,
          borderRadius: 8,
          background: COLORS.skyBlue + '33',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 12, fontWeight: 800, color: COLORS.deepSpace,
          marginRight: 12,
          flexShrink: 0,
        }}
      >
        {entry.rank}
      </div>
      <div style={{ flex: 1 }}>
        <div style={{ fontSize: 14, fontWeight: 700, color: COLORS.deepSpace }}>
          {entry.name}
          {entry.isYou && (
            <span
              style={{
                marginLeft: 6,
                fontSize: 10,
                background: COLORS.amber,
                color: 'white',
                borderRadius: 4,
                padding: '1px 6px',
                fontWeight: 600,
              }}
            >
              YOU
            </span>
          )}
        </div>
        <div style={{ fontSize: 11, color: COLORS.deepSpace, opacity: 0.5 }}>
          Lv{entry.level} · {entry.lines} lines
        </div>
      </div>
      <div style={{ fontSize: 16, fontWeight: 800, color: COLORS.deepSpace }}>
        {entry.score > 0 ? entry.score.toLocaleString() : '—'}
      </div>
    </div>
  );
}
