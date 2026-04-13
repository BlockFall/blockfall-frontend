import { COLORS } from '../game/constants';
import BackButton from '../components/BackButton';

const SECTIONS = [
  {
    icon: '🧩',
    title: 'What is BlockFall?',
    color: COLORS.blueGreen,
    content:
      'BlockFall is a classic block-stacking game. Shaped blocks fall from the top of the board. Stack them to fill complete horizontal lines and they vanish, earning you points. The board fills up fast — how long can you last?',
  },
  {
    icon: '🎮',
    title: 'How to Play',
    color: COLORS.orange,
    items: [
      { icon: '↔️', text: 'Drag left or right to move the falling piece' },
      { icon: '👆', text: 'Tap to rotate the piece' },
      { icon: '⬇️', text: 'Swipe down hard to instantly drop the piece' },
      { icon: '⏸️', text: 'Tap the pause button to pause the game' },
    ],
  },
  {
    icon: '🏅',
    title: 'Scoring & Points',
    color: COLORS.amber,
    items: [
      { icon: '1️⃣', text: '1 line cleared → 100 pts' },
      { icon: '2️⃣', text: '2 lines at once → 250 pts' },
      { icon: '3️⃣', text: '3 lines at once → 500 pts' },
      { icon: '4️⃣', text: '4 lines at once → 800 pts' },
      { icon: '⚡', text: 'Higher levels multiply your score up to 10×' },
    ],
  },
  {
    icon: '💰',
    title: 'Daily Rewards',
    color: COLORS.brightMarine,
    content:
      "Every day, the top 50 players on the leaderboard share a portion of the protocol's revenue. Rankings reset every day at midnight UTC (00:00) — so every day is a fresh shot at the top. You can claim your rewards on the profile page. The more you play, the more points you earn, and the bigger your share of the prize pool.",
    highlight: 'Top 50 players · Daily revenue share · Resets every day at 00:00 UTC',
  },
];

export default function HelpGuideScreen({ onGoHome }) {
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
        <span style={{ fontSize: 18, fontWeight: 800, color: COLORS.deepSpace }}>Help Guide</span>
      </div>

      <div style={{ padding: '16px 16px 28px', display: 'flex', flexDirection: 'column', gap: 14 }}>
        {SECTIONS.map(section => (
          <SectionCard key={section.title} section={section} />
        ))}
      </div>
    </div>
  );
}

function SectionCard({ section }) {
  return (
    <div
      style={{
        background: 'white',
        borderRadius: 18,
        overflow: 'hidden',
        boxShadow: '0 4px 16px rgba(2,48,71,0.07)',
        border: `2px solid ${section.color}22`,
      }}
    >
      <div
        style={{
          background: `linear-gradient(135deg, ${section.color}22, ${section.color}0a)`,
          padding: '14px 18px',
          display: 'flex',
          alignItems: 'center',
          gap: 10,
          borderBottom: `1.5px solid ${section.color}22`,
        }}
      >
        <span style={{ fontSize: 24 }}>{section.icon}</span>
        <span style={{ fontSize: 15, fontWeight: 800, color: COLORS.deepSpace }}>{section.title}</span>
      </div>

      <div style={{ padding: '14px 18px' }}>
        {section.content && (
          <p style={{ fontSize: 13, color: COLORS.deepSpace, lineHeight: 1.65, margin: 0, opacity: 0.75 }}>
            {section.content}
          </p>
        )}

        {section.items && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {section.items.map((item, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 10 }}>
                <span style={{ fontSize: 18, flexShrink: 0, lineHeight: 1.3 }}>{item.icon}</span>
                <span style={{ fontSize: 13, color: COLORS.deepSpace, opacity: 0.75, lineHeight: 1.5 }}>
                  {item.text}
                </span>
              </div>
            ))}
          </div>
        )}

        {section.highlight && (
          <div
            style={{
              marginTop: 12,
              background: `${section.color}18`,
              border: `1.5px solid ${section.color}44`,
              borderRadius: 10,
              padding: '8px 12px',
              fontSize: 12,
              fontWeight: 700,
              color: section.color,
              letterSpacing: 0.3,
              textAlign: 'center',
            }}
          >
            {section.highlight}
          </div>
        )}
      </div>
    </div>
  );
}
