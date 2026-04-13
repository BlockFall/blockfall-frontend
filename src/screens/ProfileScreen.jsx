import { useState, useEffect } from 'react';
import { COLORS } from '../game/constants';
import BackButton from '../components/BackButton';
import { getAuthedApi } from '../api';

const ITEM_TYPE_LABELS = {
  5: { name: 'Mystery Box Item', icon: '🎁' },
};

export default function ProfileScreen({ audio, onToggleMute, onGoHome, address }) {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchProfile() {
      const authedApi = getAuthedApi(address);
      if (!authedApi) {
        setError('Not authenticated');
        setLoading(false);
        return;
      }
      try {
        const res = await authedApi.user.$get();
        if (!res.ok) {
          setError('Failed to load profile');
          setLoading(false);
          return;
        }
        const data = await res.json();
        setProfile(data);
      } catch {
        setError('Failed to load profile');
      } finally {
        setLoading(false);
      }
    }
    fetchProfile();
  }, [address]);

  return (
    <div
      style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        background: 'linear-gradient(160deg, #e8f4fd 0%, #f5f9ff 100%)',
        overflowY: 'auto',
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
        <span style={{ fontSize: 18, fontWeight: 800, color: COLORS.deepSpace }}>Profile</span>
        <div style={{ flex: 1 }} />
        <button
          onClick={onToggleMute}
          title={audio.muted ? 'Unmute' : 'Mute'}
          style={{
            background: COLORS.skyBlue + '33',
            border: 'none',
            borderRadius: 12,
            padding: '8px 12px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: 6,
            fontSize: 13,
            fontWeight: 600,
            color: COLORS.deepSpace,
          }}
        >
          {audio.muted
            ? <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={COLORS.deepSpace} strokeWidth="2" strokeLinecap="round"><path d="M11 5L6 9H2v6h4l5 4V5z"/><line x1="23" y1="9" x2="17" y2="15"/><line x1="17" y1="9" x2="23" y2="15"/></svg>
            : <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={COLORS.deepSpace} strokeWidth="2" strokeLinecap="round"><path d="M11 5L6 9H2v6h4l5 4V5z"/><path d="M19.07 4.93a10 10 0 010 14.14M15.54 8.46a5 5 0 010 7.07"/></svg>
          }
          {audio.muted ? 'Unmuted' : 'Sound On'}
        </button>
      </div>

      {loading && (
        <div style={{ padding: 40, textAlign: 'center', color: COLORS.deepSpace, opacity: 0.5 }}>
          Loading...
        </div>
      )}

      {error && (
        <div style={{ padding: 40, textAlign: 'center', color: '#e74c3c' }}>
          {error}
        </div>
      )}

      {profile && (
        <>
          {/* Avatar + name */}
          <div style={{ padding: '28px 20px 0', textAlign: 'center' }}>
            <div
              style={{
                width: 88,
                height: 88,
                borderRadius: 24,
                background: `linear-gradient(135deg, ${COLORS.blueGreen}, ${COLORS.deepSpace})`,
                margin: '0 auto 12px',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 36,
                boxShadow: `0 8px 24px ${COLORS.blueGreen}55`,
              }}
            >
              🎮
            </div>
            <div style={{ fontSize: 22, fontWeight: 800, color: COLORS.deepSpace }}>{profile.name}</div>
          </div>

          {/* Stats grid */}
          <div style={{ padding: '24px 16px 0', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
            <StatBlock label="Today's Score" value={profile.stats.today_score.toLocaleString()} color={COLORS.blueGreen} icon="📅" />
            <StatBlock label="Total Score" value={Number(profile.stats.total_score).toLocaleString()} color={COLORS.orange} icon="🏅" />
            <StatBlock label="Best Score" value={profile.stats.best_score.toLocaleString()} color={COLORS.amber} icon="🏆" />
            <StatBlock label="Games Played" value={profile.stats.games_played} color={COLORS.deepSpace} icon="🎮" />
          </div>

          {/* Inventory */}
          <div style={{ padding: '24px 16px 0' }}>
            <div
              style={{
                fontSize: 16, fontWeight: 800, color: COLORS.deepSpace,
                marginBottom: 12,
                display: 'flex', alignItems: 'center', gap: 8,
              }}
            >
              <span>🎒</span> Inventory
            </div>
            {profile.inventory.length === 0 ? (
              <div
                style={{
                  background: 'white',
                  borderRadius: 16,
                  padding: '24px 16px',
                  textAlign: 'center',
                  boxShadow: '0 2px 10px rgba(2,48,71,0.06)',
                  color: COLORS.deepSpace,
                  opacity: 0.5,
                  fontSize: 14,
                }}
              >
                No items yet. Buy a Mystery Box from the Shop!
              </div>
            ) : (
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
                {profile.inventory.map(item => (
                  <InventoryCard key={item.item_id} item={item} />
                ))}
              </div>
            )}
          </div>

          <div style={{ height: 24 }} />
        </>
      )}
    </div>
  );
}

function StatBlock({ label, value, color, icon }) {
  return (
    <div
      style={{
        background: 'white',
        borderRadius: 16,
        padding: '16px',
        boxShadow: '0 2px 10px rgba(2,48,71,0.06)',
        border: `2px solid ${color}22`,
      }}
    >
      <div style={{ fontSize: 20, marginBottom: 6 }}>{icon}</div>
      <div style={{ fontSize: 22, fontWeight: 900, color: COLORS.deepSpace }}>
        {value || '—'}
      </div>
      <div style={{ fontSize: 11, color: color, fontWeight: 600, letterSpacing: 0.5 }}>
        {label}
      </div>
    </div>
  );
}

function InventoryCard({ item }) {
  const info = ITEM_TYPE_LABELS[item.item_type] || { name: `Item #${item.item_type}`, icon: '📦' };
  return (
    <div
      style={{
        background: `linear-gradient(135deg, ${COLORS.amber}15, ${COLORS.orange}10)`,
        borderRadius: 14,
        padding: '12px 14px',
        boxShadow: '0 2px 8px rgba(2,48,71,0.06)',
        border: `2px solid ${COLORS.amber}33`,
      }}
    >
      <div style={{ fontSize: 24, marginBottom: 4 }}>{info.icon}</div>
      <div style={{ fontSize: 12, fontWeight: 700, color: COLORS.deepSpace }}>{info.name}</div>
      <div style={{ fontSize: 10, color: COLORS.deepSpace, opacity: 0.5 }}>
        {item.acquisition_type === 'purchase' ? 'Purchased' : item.acquisition_type}
        {item.buy_date && ` · ${new Date(item.buy_date).toLocaleDateString()}`}
      </div>
    </div>
  );
}
