import { COLORS } from '../game/constants';
import Logo from '../components/Logo';

const MOCK_PROFILE = {
  name: 'BlockFall Player',
  joined: 'April 2026',
  gamesPlayed: 0,
  bestScore: 0,
  totalLines: 0,
  bestLevel: 1,
  achievements: [
    { id: 1, name: 'First Drop', desc: 'Complete your first game', icon: '🎯', unlocked: false },
    { id: 2, name: 'Line Buster', desc: 'Clear 10 lines in one game', icon: '💥', unlocked: false },
    { id: 3, name: 'Speed Demon', desc: 'Reach level 5', icon: '⚡', unlocked: false },
    { id: 4, name: 'Centurion', desc: 'Clear 100 total lines', icon: '🏆', unlocked: false },
    { id: 5, name: 'High Riser', desc: 'Score over 10,000', icon: '🚀', unlocked: false },
    { id: 6, name: 'Quad King', desc: 'Clear 4 lines at once', icon: '👑', unlocked: false },
  ],
};

export default function ProfileScreen({ audio, onToggleMute }) {
  return (
    <div
      style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        background: 'linear-gradient(160deg, #e8f4fd 0%, #f5f9ff 100%)',
        paddingBottom: 80,
        overflowY: 'auto',
      }}
    >
      {/* Header */}
      <div
        style={{
          background: 'white',
          boxShadow: '0 2px 8px rgba(2,48,71,0.08)',
          padding: '20px 20px 16px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <Logo size="sm" />
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
        <div style={{ fontSize: 22, fontWeight: 800, color: COLORS.deepSpace }}>{MOCK_PROFILE.name}</div>
        <div style={{ fontSize: 12, color: COLORS.deepSpace, opacity: 0.5, marginTop: 2 }}>
          Joined {MOCK_PROFILE.joined}
        </div>
      </div>

      {/* Stats grid */}
      <div style={{ padding: '24px 16px 0', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
        <StatBlock label="Best Score" value={MOCK_PROFILE.bestScore.toLocaleString() || '—'} color={COLORS.amber} icon="🏅" />
        <StatBlock label="Best Level" value={MOCK_PROFILE.bestLevel} color={COLORS.orange} icon="⚡" />
        <StatBlock label="Total Lines" value={MOCK_PROFILE.totalLines} color={COLORS.blueGreen} icon="🧱" />
        <StatBlock label="Games Played" value={MOCK_PROFILE.gamesPlayed} color={COLORS.deepSpace} icon="🎮" />
      </div>

      {/* Achievements */}
      <div style={{ padding: '24px 16px 0' }}>
        <div
          style={{
            fontSize: 16, fontWeight: 800, color: COLORS.deepSpace,
            marginBottom: 12,
            display: 'flex', alignItems: 'center', gap: 8,
          }}
        >
          <span>🏆</span> Achievements
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
          {MOCK_PROFILE.achievements.map(a => (
            <AchievementCard key={a.id} achievement={a} />
          ))}
        </div>
      </div>
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

function AchievementCard({ achievement }) {
  return (
    <div
      style={{
        background: achievement.unlocked ? `linear-gradient(135deg, ${COLORS.amber}22, ${COLORS.orange}11)` : 'white',
        borderRadius: 14,
        padding: '12px 14px',
        boxShadow: '0 2px 8px rgba(2,48,71,0.06)',
        border: `2px solid ${achievement.unlocked ? COLORS.amber : 'transparent'}`,
        opacity: achievement.unlocked ? 1 : 0.55,
        filter: achievement.unlocked ? 'none' : 'grayscale(0.8)',
      }}
    >
      <div style={{ fontSize: 24, marginBottom: 4 }}>{achievement.icon}</div>
      <div style={{ fontSize: 12, fontWeight: 700, color: COLORS.deepSpace }}>{achievement.name}</div>
      <div style={{ fontSize: 10, color: COLORS.deepSpace, opacity: 0.5 }}>{achievement.desc}</div>
    </div>
  );
}
