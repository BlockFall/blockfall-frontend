import { useState } from 'react';
import { COLORS } from '../game/constants';
import BackButton from '../components/BackButton';

const MOCK_OVERALL = [
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

const MOCK_CURRENT_WEEK = [
  { rank: 1, name: 'BlkFall_Pro', score: 54200, level: 7, lines: 98 },
  { rank: 2, name: 'TetroKing88', score: 47800, level: 6, lines: 88 },
  { rank: 3, name: 'NovaMind', score: 39100, level: 6, lines: 74 },
  { rank: 4, name: 'CubeRacer', score: 31600, level: 5, lines: 62 },
  { rank: 5, name: 'Stacko99', score: 27900, level: 5, lines: 55 },
  { rank: 6, name: 'FallMaster', score: 21400, level: 4, lines: 44 },
  { rank: 7, name: 'Pixel_Storm', score: 18200, level: 4, lines: 38 },
  { rank: 8, name: 'BlockBuster', score: 12700, level: 3, lines: 29 },
  { rank: 9, name: 'ZenDropper', score: 8400, level: 2, lines: 18 },
  { rank: 10, name: 'You', score: 0, level: 1, lines: 0, isYou: true },
];

const LAST_WEEK_REWARDS = ['$2.50', '$1.80', '$1.20', '85¢', '60¢', '45¢', '30¢', '20¢', '12¢', '8¢'];

const MOCK_LAST_WEEK = [
  { rank: 1, name: 'ZenDropper', score: 98300, level: 9, lines: 201, reward: LAST_WEEK_REWARDS[0] },
  { rank: 2, name: 'NovaMind', score: 87400, level: 8, lines: 178, reward: LAST_WEEK_REWARDS[1] },
  { rank: 3, name: 'Pixel_Storm', score: 76200, level: 8, lines: 155, reward: LAST_WEEK_REWARDS[2] },
  { rank: 4, name: 'BlockBuster', score: 61500, level: 7, lines: 132, reward: LAST_WEEK_REWARDS[3] },
  { rank: 5, name: 'FallMaster', score: 52800, level: 6, lines: 118, reward: LAST_WEEK_REWARDS[4] },
  { rank: 6, name: 'TetroKing88', score: 44100, level: 6, lines: 99, reward: LAST_WEEK_REWARDS[5] },
  { rank: 7, name: 'BlkFall_Pro', score: 37600, level: 5, lines: 86, reward: LAST_WEEK_REWARDS[6] },
  { rank: 8, name: 'CubeRacer', score: 29300, level: 4, lines: 70, reward: LAST_WEEK_REWARDS[7] },
  { rank: 9, name: 'Stacko99', score: 21800, level: 4, lines: 56, reward: LAST_WEEK_REWARDS[8] },
  { rank: 10, name: 'You', score: 0, level: 1, lines: 0, isYou: true, reward: LAST_WEEK_REWARDS[9] },
];

const MEDALS = ['🥇', '🥈', '🥉'];
const RANK_COLORS = [COLORS.amber, '#9e9e9e', COLORS.orange];

const TABS = [
  { id: 'currentWeek', label: 'This Week' },
  { id: 'lastWeek', label: 'Last Week' },
  { id: 'overall', label: 'Overall' },
];

export default function LeaderboardScreen({ onGoHome }) {
  const [tab, setTab] = useState('currentWeek');

  const data = tab === 'overall' ? MOCK_OVERALL : tab === 'currentWeek' ? MOCK_CURRENT_WEEK : MOCK_LAST_WEEK;
  const showRewards = tab === 'lastWeek';

  return (
    <div
      style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
        background: 'linear-gradient(160deg, #e8f4fd 0%, #f5f9ff 100%)',
      }}
    >
      {/* Header */}
      <div
        style={{
          background: 'white',
          boxShadow: '0 2px 8px rgba(2,48,71,0.08)',
          padding: '16px 20px',
          display: 'flex',
          alignItems: 'center',
          gap: 12,
        }}
      >
        <BackButton onGoHome={onGoHome} />
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill={COLORS.amber}>
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
          </svg>
          <span style={{ fontSize: 18, fontWeight: 800, color: COLORS.deepSpace }}>Rankings</span>
        </div>
      </div>

      {/* Tabs */}
      <div
        style={{
          background: 'white',
          padding: '10px 16px 0',
          display: 'flex',
          gap: 8,
          borderBottom: `2px solid ${COLORS.skyBlue}44`,
        }}
      >
        {TABS.map(t => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            style={{
              background: tab === t.id ? COLORS.deepSpace : 'transparent',
              color: tab === t.id ? 'white' : COLORS.deepSpace,
              border: 'none',
              borderRadius: '10px 10px 0 0',
              padding: '8px 16px',
              fontSize: 13,
              fontWeight: 700,
              cursor: 'pointer',
              opacity: tab === t.id ? 1 : 0.55,
              transition: 'all 0.15s',
            }}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* Last Week reward note */}
      {showRewards && (
        <div
          style={{
            margin: '12px 16px 0',
            background: `${COLORS.amber}22`,
            border: `1.5px solid ${COLORS.amber}55`,
            borderRadius: 12,
            padding: '8px 14px',
            fontSize: 12,
            color: COLORS.deepSpace,
            fontWeight: 600,
          }}
        >
          🏆 Top 100 players shared protocol revenue last week
        </div>
      )}

      {/* Top 3 podium */}
      <div
        style={{
          display: 'flex',
          alignItems: 'flex-end',
          justifyContent: 'center',
          padding: '20px 16px 12px',
          gap: 8,
        }}
      >
        <PodiumCard entry={data[1]} pos={2} height={80} showReward={showRewards} />
        <PodiumCard entry={data[0]} pos={1} height={110} showReward={showRewards} />
        <PodiumCard entry={data[2]} pos={3} height={62} showReward={showRewards} />
      </div>

      {/* Rest of the list */}
      <div style={{ flex: 1, overflowY: 'auto', padding: '0 12px 16px' }}>
        {data.slice(3).map(entry => (
          <LeaderRow key={entry.rank} entry={entry} showReward={showRewards} />
        ))}
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

function PodiumCard({ entry, pos, height, showReward }) {
  const color = RANK_COLORS[pos - 1] || COLORS.skyBlue;
  return (
    <div
      style={{
        flex: pos === 1 ? 1.2 : 1,
        textAlign: 'center',
        animation: `podiumRise 0.5s ease-out ${(pos - 1) * 0.1}s both`,
      }}
    >
      <div style={{ fontSize: pos === 1 ? 26 : 20, marginBottom: 4 }}>{MEDALS[pos - 1]}</div>
      <div
        style={{
          fontSize: pos === 1 ? 12 : 10,
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
          borderRadius: '10px 10px 6px 6px',
          height,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: `0 4px 16px ${color}55`,
          gap: 2,
        }}
      >
        <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.8)', fontWeight: 600 }}>LV{entry.level}</div>
        <div style={{ fontSize: pos === 1 ? 13 : 11, fontWeight: 900, color: 'white' }}>
          {entry.score.toLocaleString()}
        </div>
        {showReward && entry.reward && (
          <div
            style={{
              fontSize: 11,
              fontWeight: 800,
              color: 'white',
              background: 'rgba(0,0,0,0.2)',
              borderRadius: 6,
              padding: '1px 6px',
              marginTop: 2,
            }}
          >
            {entry.reward}
          </div>
        )}
      </div>
    </div>
  );
}

function LeaderRow({ entry, showReward }) {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        background: entry.isYou ? `${COLORS.amber}22` : 'white',
        borderRadius: 14,
        padding: '10px 14px',
        marginBottom: 8,
        border: entry.isYou ? `2px solid ${COLORS.amber}` : '2px solid transparent',
        boxShadow: '0 2px 8px rgba(2,48,71,0.06)',
      }}
    >
      <div
        style={{
          width: 26, height: 26,
          borderRadius: 8,
          background: COLORS.skyBlue + '33',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 11, fontWeight: 800, color: COLORS.deepSpace,
          marginRight: 10,
          flexShrink: 0,
        }}
      >
        {entry.rank}
      </div>
      <div style={{ flex: 1 }}>
        <div style={{ fontSize: 13, fontWeight: 700, color: COLORS.deepSpace }}>
          {entry.name}
          {entry.isYou && (
            <span
              style={{
                marginLeft: 6,
                fontSize: 9,
                background: COLORS.amber,
                color: 'white',
                borderRadius: 4,
                padding: '1px 5px',
                fontWeight: 600,
              }}
            >
              YOU
            </span>
          )}
        </div>
        <div style={{ fontSize: 10, color: COLORS.deepSpace, opacity: 0.5 }}>
          Lv{entry.level} · {entry.lines} lines
        </div>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 2 }}>
        <div style={{ fontSize: 14, fontWeight: 800, color: COLORS.deepSpace }}>
          {entry.score > 0 ? entry.score.toLocaleString() : '—'}
        </div>
        {showReward && entry.reward && (
          <div
            style={{
              fontSize: 12,
              fontWeight: 800,
              color: COLORS.blueGreen,
              background: `${COLORS.blueGreen}18`,
              borderRadius: 6,
              padding: '1px 7px',
            }}
          >
            {entry.reward}
          </div>
        )}
      </div>
    </div>
  );
}
