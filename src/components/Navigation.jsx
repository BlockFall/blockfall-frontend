import { COLORS } from '../game/constants';

const navItems = [
  {
    id: 'home',
    label: 'Home',
    icon: (active) => (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
        <path
          d="M3 9.5L12 3l9 6.5V20a1 1 0 01-1 1H4a1 1 0 01-1-1V9.5z"
          fill={active ? COLORS.orange : 'none'}
          stroke={active ? COLORS.orange : COLORS.deepSpace}
          strokeWidth="2"
          strokeLinejoin="round"
        />
        <path
          d="M9 21V12h6v9"
          stroke={active ? 'white' : COLORS.deepSpace}
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
  {
    id: 'leaderboard',
    label: 'Ranks',
    icon: (active) => (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
        <rect x="2" y="11" width="5" height="10" rx="1" fill={active ? COLORS.orange : 'none'} stroke={active ? COLORS.orange : COLORS.deepSpace} strokeWidth="2"/>
        <rect x="9.5" y="6" width="5" height="15" rx="1" fill={active ? COLORS.orange : 'none'} stroke={active ? COLORS.orange : COLORS.deepSpace} strokeWidth="2"/>
        <rect x="17" y="3" width="5" height="18" rx="1" fill={active ? COLORS.orange : 'none'} stroke={active ? COLORS.orange : COLORS.deepSpace} strokeWidth="2"/>
      </svg>
    ),
  },
  {
    id: 'profile',
    label: 'Profile',
    icon: (active) => (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="8" r="4" fill={active ? COLORS.orange : 'none'} stroke={active ? COLORS.orange : COLORS.deepSpace} strokeWidth="2"/>
        <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" stroke={active ? COLORS.orange : COLORS.deepSpace} strokeWidth="2" strokeLinecap="round"/>
      </svg>
    ),
  },
];

export default function Navigation({ screen, setScreen }) {
  return (
    <nav
      style={{
        position: 'fixed',
        bottom: 0,
        left: '50%',
        transform: 'translateX(-50%)',
        width: '100%',
        maxWidth: 600,
        background: 'white',
        borderTop: `2px solid ${COLORS.skyBlue}`,
        display: 'flex',
        justifyContent: 'space-around',
        alignItems: 'center',
        padding: '8px 0 max(8px, env(safe-area-inset-bottom))',
        zIndex: 100,
        boxShadow: '0 -4px 20px rgba(2,48,71,0.08)',
      }}
    >
      {navItems.map(item => {
        const active = screen === item.id;
        return (
          <button
            key={item.id}
            onClick={() => setScreen(item.id)}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 3,
              padding: '4px 16px',
              transition: 'transform 0.15s',
              transform: active ? 'scale(1.1)' : 'scale(1)',
            }}
          >
            {item.icon(active)}
            <span
              style={{
                fontSize: 10,
                fontWeight: active ? 700 : 500,
                color: active ? COLORS.orange : COLORS.deepSpace,
                letterSpacing: '0.3px',
              }}
            >
              {item.label}
            </span>
          </button>
        );
      })}
    </nav>
  );
}
