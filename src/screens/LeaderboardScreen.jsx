import { useState, useEffect } from 'react';
import { COLORS } from '../game/constants';
import BackButton from '../components/BackButton';
import { api, getAuthedApi } from '../api';

const MEDALS = ['🥇', '🥈', '🥉'];
const RANK_COLORS = [COLORS.amber, '#9e9e9e', COLORS.orange];

const TABS = [
  { id: 'today', label: 'Today' },
  { id: 'yesterday', label: 'Yesterday' },
  { id: 'overall', label: 'Overall' },
];

export default function LeaderboardScreen({ onGoHome, address, user }) {
  const [tab, setTab] = useState('today');
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;
    async function fetchLeaderboard() {
      setLoading(true);
      setError(null);
      try {
        const client = getAuthedApi(address) || api;
        const res = await client.leaderboard.$get();
        if (!res.ok) {
          if (!cancelled) setError('Failed to load leaderboard');
          return;
        }
        const json = await res.json();
        if (!cancelled) setData(json);
      } catch {
        if (!cancelled) setError('Failed to load leaderboard');
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    fetchLeaderboard();
    return () => { cancelled = true; };
  }, [address]);

  const section = data?.[tab];
  const top = section?.top ?? [];
  const myRank = section?.my_rank ?? null;
  const showRewards = tab === 'yesterday';

  const myUserId = user?.user_id;
  const isMe = (entry) => entry && myUserId && entry.user_id === myUserId;
  const meInTop = top.some(isMe);

  const podium = [top[0], top[1], top[2]];

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

      {/* Yesterday reward note */}
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
          🏆 Top players shared protocol revenue yesterday
        </div>
      )}

      {loading && (
        <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', color: COLORS.deepSpace, opacity: 0.6, fontSize: 14 }}>
          Loading…
        </div>
      )}

      {!loading && error && (
        <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', color: COLORS.deepSpace, opacity: 0.6, fontSize: 14 }}>
          {error}
        </div>
      )}

      {!loading && !error && top.length === 0 && (
        <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', color: COLORS.deepSpace, opacity: 0.5, fontSize: 14, padding: 20, textAlign: 'center' }}>
          No scores yet. Be the first to play!
        </div>
      )}

      {!loading && !error && top.length > 0 && (
        <>
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
            {podium[1] && <PodiumCard entry={podium[1]} pos={2} height={80} showReward={showRewards} isMe={isMe(podium[1])} />}
            {podium[0] && <PodiumCard entry={podium[0]} pos={1} height={110} showReward={showRewards} isMe={isMe(podium[0])} />}
            {podium[2] && <PodiumCard entry={podium[2]} pos={3} height={62} showReward={showRewards} isMe={isMe(podium[2])} />}
          </div>

          {/* Rest of the list */}
          <div style={{ flex: 1, overflowY: 'auto', padding: '0 12px 16px' }}>
            {top.slice(3).map(entry => (
              <LeaderRow key={entry.user_id} entry={entry} showReward={showRewards} isMe={isMe(entry)} />
            ))}
          </div>

          {/* Sticky current user row if not in top */}
          {myRank && !meInTop && (
            <div style={{ padding: '8px 12px 12px', borderTop: `1px solid ${COLORS.skyBlue}44`, background: 'white' }}>
              <LeaderRow entry={myRank} showReward={showRewards} isMe={true} />
            </div>
          )}
        </>
      )}

      <style>{`
        @keyframes podiumRise {
          from { transform: translateY(30px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
      `}</style>
    </div>
  );
}

function PodiumCard({ entry, pos, height, showReward, isMe }) {
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
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          gap: 4,
        }}
      >
        {entry.name}
        {isMe && (
          <span style={{ fontSize: 8, background: COLORS.amber, color: 'white', borderRadius: 4, padding: '1px 4px', fontWeight: 700 }}>
            YOU
          </span>
        )}
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
          outline: isMe ? `3px solid ${COLORS.amber}` : 'none',
        }}
      >
        <div style={{ fontSize: pos === 1 ? 14 : 12, fontWeight: 900, color: 'white' }}>
          {entry.total_score.toLocaleString()}
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

function LeaderRow({ entry, showReward, isMe }) {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        background: isMe ? `${COLORS.amber}22` : 'white',
        borderRadius: 14,
        padding: '10px 14px',
        marginBottom: 8,
        border: isMe ? `2px solid ${COLORS.amber}` : '2px solid transparent',
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
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontSize: 13, fontWeight: 700, color: COLORS.deepSpace, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
          {entry.name}
          {isMe && (
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
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 2 }}>
        <div style={{ fontSize: 14, fontWeight: 800, color: COLORS.deepSpace }}>
          {entry.total_score > 0 ? entry.total_score.toLocaleString() : '—'}
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
