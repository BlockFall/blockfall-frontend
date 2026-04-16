import { useRef, useEffect, useState } from 'react';
import { useAccount } from 'wagmi';
import Logo from '../components/Logo';
import AnimatedBlocks from '../components/AnimatedBlocks';
import SignUpModal from '../components/SignUpModal';
import { COLORS } from '../game/constants';

const FLOAT_BUTTONS_ALWAYS = [
  {
    id: 'leaderboard',
    label: 'Ranks',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
        <rect x="2" y="11" width="5" height="10" rx="1" fill={COLORS.amber} />
        <rect x="9.5" y="6" width="5" height="15" rx="1" fill={COLORS.amber} />
        <rect x="17" y="3" width="5" height="18" rx="1" fill={COLORS.amber} />
      </svg>
    ),
  },
  {
    id: 'helpguide',
    label: 'Help',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="12" r="10" fill={COLORS.deepSpace} />
        <path d="M9.09 9a3 3 0 015.83 1c0 2-3 3-3 3" stroke="white" strokeWidth="2" strokeLinecap="round" />
        <circle cx="12" cy="17" r="1" fill="white" />
      </svg>
    ),
  },
];

const FLOAT_BUTTONS_AUTHED = [
  {
    id: 'leaderboard',
    label: 'Ranks',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
        <rect x="2" y="11" width="5" height="10" rx="1" fill={COLORS.amber} />
        <rect x="9.5" y="6" width="5" height="15" rx="1" fill={COLORS.amber} />
        <rect x="17" y="3" width="5" height="18" rx="1" fill={COLORS.amber} />
      </svg>
    ),
  },
  {
    id: 'profile',
    label: 'Profile',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="8" r="4" fill={COLORS.blueGreen} />
        <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" stroke={COLORS.blueGreen} strokeWidth="2.5" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    id: 'shop',
    label: 'Shop',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
        <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" fill={COLORS.orange} stroke={COLORS.orange} strokeWidth="0.5" />
        <line x1="3" y1="6" x2="21" y2="6" stroke="white" strokeWidth="2" />
        <path d="M16 10a4 4 0 01-8 0" stroke="white" strokeWidth="2" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    id: 'checkin',
    label: 'Check-in',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
        <rect x="3" y="4" width="18" height="18" rx="3" fill={COLORS.brightMarine} />
        <path d="M16 2v4M8 2v4M3 10h18" stroke="white" strokeWidth="2" strokeLinecap="round" />
        <path d="M8 15l2.5 2.5L16 13" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    id: 'helpguide',
    label: 'Help',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="12" r="10" fill={COLORS.deepSpace} />
        <path d="M9.09 9a3 3 0 015.83 1c0 2-3 3-3 3" stroke="white" strokeWidth="2" strokeLinecap="round" />
        <circle cx="12" cy="17" r="1" fill="white" />
      </svg>
    ),
  },
];

function shortenAddress(addr) {
  if (!addr) return '';
  return addr.slice(0, 6) + '...' + addr.slice(-4);
}

export default function HomeScreen({
  onPlay,
  onConnectWallet,
  isConnected,
  audio,
  energy,
  onNavigate,
  authStatus,
  user,
  authError,
  onSignIn,
  onSignUp,
  checkName,
  balanceError,
  resetBalanceError,
}) {
  const containerRef = useRef(null);
  const [size, setSize] = useState({ width: 600, height: 700 });
  const [showSignUpModal, setShowSignUpModal] = useState(false);
  const { address } = useAccount();

  useEffect(() => {
    function update() {
      if (containerRef.current) {
        const r = containerRef.current.getBoundingClientRect();
        setSize({ width: Math.round(r.width), height: Math.round(r.height) });
      }
    }
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);

  const noEnergy = energy <= 0;
  const isSignedIn = authStatus === 'signed_in';
  const isRegistered = authStatus === 'registered';
  const isNotRegistered = authStatus === 'not_registered';
  const isLoading = authStatus === 'loading';

  const floatButtons = isSignedIn ? FLOAT_BUTTONS_AUTHED : FLOAT_BUTTONS_ALWAYS;

  async function handleSignUpSubmit(name) {
    await onSignUp(name);
    setShowSignUpModal(false);
  }

  return (
    <div
      ref={containerRef}
      style={{
        position: 'relative',
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        background: 'linear-gradient(165deg, #e8f4fd 0%, #f5f9ff 50%, #fff8ee 100%)',
      }}
    >
      <AnimatedBlocks width={size.width} height={size.height} />

      {/* Energy indicator — top left (only when signed in) */}
      <div
        style={{
          position: 'absolute',
          top: 16,
          left: 16,
          zIndex: 10,
          display: 'flex',
          flexDirection: 'column',
          gap: 8,
        }}
      >
        {isSignedIn && (
          <div
            style={{
              background: 'white',
              borderRadius: 14,
              padding: '8px 14px',
              boxShadow: '0 4px 16px rgba(2,48,71,0.10)',
              border: `2px solid ${noEnergy ? '#ef4444' : COLORS.amber}33`,
              display: 'flex',
              alignItems: 'center',
              gap: 6,
            }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill={noEnergy ? '#ef4444' : COLORS.amber}>
              <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
            </svg>
            <span
              style={{
                fontSize: 14,
                fontWeight: 800,
                color: noEnergy ? '#ef4444' : COLORS.deepSpace,
                letterSpacing: 0.5,
              }}
            >
              {energy} / 10
            </span>
            <span
              style={{
                fontSize: 10,
                fontWeight: 600,
                color: noEnergy ? '#ef4444' : COLORS.deepSpace,
                opacity: 0.5,
              }}
            >
              energy
            </span>
          </div>
        )}

        {/* Wallet address badge */}
        {isConnected && address && (
          <div
            style={{
              background: 'white',
              borderRadius: 14,
              padding: '7px 12px',
              boxShadow: '0 4px 16px rgba(2,48,71,0.10)',
              border: `2px solid ${COLORS.blueGreen}33`,
              display: 'flex',
              alignItems: 'center',
              gap: 6,
            }}
          >
            <div
              style={{
                width: 8,
                height: 8,
                borderRadius: '50%',
                background: '#22c55e',
                flexShrink: 0,
              }}
            />
            <span
              style={{
                fontSize: 12,
                fontWeight: 700,
                color: COLORS.deepSpace,
                fontFamily: 'monospace',
                letterSpacing: 0.5,
              }}
            >
              {shortenAddress(address)}
            </span>
          </div>
        )}
      </div>

      {/* Floating buttons — top right */}
      <div
        style={{
          position: 'absolute',
          top: 12,
          right: 12,
          zIndex: 10,
          display: 'flex',
          flexDirection: 'column',
          gap: 8,
        }}
      >
        {floatButtons.map(btn => (
          <button
            key={btn.id}
            onClick={() => onNavigate(btn.id)}
            style={{
              background: 'white',
              border: 'none',
              borderRadius: 14,
              padding: '8px 10px',
              cursor: 'pointer',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 3,
              boxShadow: '0 4px 14px rgba(2,48,71,0.12)',
              minWidth: 52,
              transition: 'transform 0.12s',
            }}
            onMouseDown={e => (e.currentTarget.style.transform = 'scale(0.93)')}
            onMouseUp={e => (e.currentTarget.style.transform = 'scale(1)')}
            onMouseLeave={e => (e.currentTarget.style.transform = 'scale(1)')}
            onTouchStart={e => (e.currentTarget.style.transform = 'scale(0.93)')}
            onTouchEnd={e => (e.currentTarget.style.transform = 'scale(1)')}
          >
            {btn.icon}
            <span style={{ fontSize: 9, fontWeight: 700, color: COLORS.deepSpace, letterSpacing: 0.3 }}>
              {btn.label}
            </span>
          </button>
        ))}
      </div>

      {/* Center content */}
      <div style={{ position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <div style={{ animation: 'logoFloat 3s ease-in-out infinite', marginBottom: 10 }}>
          <Logo size="lg" />
        </div>

        <p style={{ color: COLORS.deepSpace, opacity: 0.5, fontSize: 14, marginBottom: 48, letterSpacing: 0.5 }}>
          Stack, Sweep, Survive.
        </p>

        {/* CTA based on auth state */}
        {isLoading ? (
          <div style={{
            padding: '18px 64px',
            fontSize: 16,
            fontWeight: 700,
            color: COLORS.deepSpace,
            opacity: 0.5,
            marginBottom: 32,
          }}>
            Loading...
          </div>
        ) : !isConnected ? (
          /* Wallet not connected */
          <button
            onClick={onConnectWallet}
            style={{
              background: `linear-gradient(135deg, ${COLORS.blueGreen}, #0ea5e9)`,
              color: 'white',
              border: 'none',
              borderRadius: 24,
              padding: '18px 48px',
              fontSize: 18,
              fontWeight: 900,
              cursor: 'pointer',
              letterSpacing: 1,
              boxShadow: `0 8px 32px ${COLORS.blueGreen}66`,
              position: 'relative',
              overflow: 'hidden',
              marginBottom: 32,
              display: 'flex',
              alignItems: 'center',
              gap: 10,
            }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <rect x="2" y="6" width="20" height="14" rx="3" stroke="white" strokeWidth="2" />
              <path d="M16 13a1 1 0 1 0 2 0 1 1 0 0 0-2 0z" fill="white" />
              <path d="M2 10h20" stroke="white" strokeWidth="2" />
            </svg>
            Connect Wallet
          </button>
        ) : isSignedIn ? (
          /* Signed in — Play button */
          <button
            onClick={onPlay}
            style={{
              background: noEnergy
                ? `linear-gradient(135deg, ${COLORS.blueGreen}, #0ea5e9)`
                : `linear-gradient(135deg, ${COLORS.orange}, ${COLORS.amber})`,
              color: 'white',
              border: 'none',
              borderRadius: 24,
              padding: '18px 64px',
              fontSize: 22,
              fontWeight: 900,
              cursor: 'pointer',
              letterSpacing: 2,
              boxShadow: noEnergy
                ? `0 8px 32px ${COLORS.blueGreen}66`
                : `0 8px 32px ${COLORS.orange}66`,
              animation: 'pulseBtn 2s ease-in-out infinite',
              position: 'relative',
              overflow: 'hidden',
              marginBottom: 32,
            }}
          >
            {noEnergy ? 'BUY & PLAY' : 'PLAY'}
            <span style={{
              position: 'absolute', top: 0, left: '-100%', width: '60%', height: '100%',
              background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.35), transparent)',
              animation: 'shine 2.5s ease-in-out infinite',
            }} />
          </button>
        ) : isRegistered ? (
          /* Registered but not signed in */
          <button
            onClick={onSignIn}
            style={{
              background: `linear-gradient(135deg, ${COLORS.blueGreen}, #0ea5e9)`,
              color: 'white',
              border: 'none',
              borderRadius: 24,
              padding: '18px 56px',
              fontSize: 18,
              fontWeight: 900,
              cursor: 'pointer',
              letterSpacing: 1,
              boxShadow: `0 8px 32px ${COLORS.blueGreen}66`,
              position: 'relative',
              overflow: 'hidden',
              marginBottom: 32,
              display: 'flex',
              alignItems: 'center',
              gap: 10,
            }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path d="M15 3h4a2 2 0 012 2v14a2 2 0 01-2 2h-4" stroke="white" strokeWidth="2" strokeLinecap="round" />
              <path d="M10 17l5-5-5-5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              <line x1="15" y1="12" x2="3" y2="12" stroke="white" strokeWidth="2" strokeLinecap="round" />
            </svg>
            Sign In
          </button>
        ) : isNotRegistered ? (
          /* Not registered */
          <button
            onClick={() => setShowSignUpModal(true)}
            style={{
              background: `linear-gradient(135deg, ${COLORS.orange}, ${COLORS.amber})`,
              color: 'white',
              border: 'none',
              borderRadius: 24,
              padding: '18px 56px',
              fontSize: 18,
              fontWeight: 900,
              cursor: 'pointer',
              letterSpacing: 1,
              boxShadow: `0 8px 32px ${COLORS.orange}66`,
              position: 'relative',
              overflow: 'hidden',
              marginBottom: 32,
              display: 'flex',
              alignItems: 'center',
              gap: 10,
            }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <circle cx="12" cy="8" r="4" stroke="white" strokeWidth="2" />
              <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" stroke="white" strokeWidth="2" strokeLinecap="round" />
              <path d="M20 8v6M17 11h6" stroke="white" strokeWidth="2" strokeLinecap="round" />
            </svg>
            Sign Up
          </button>
        ) : null}

        {/* Auth error message */}
        {authError && (
          <div style={{
            background: '#fef2f2',
            border: '1px solid #fecaca',
            borderRadius: 12,
            padding: '8px 16px',
            marginBottom: 16,
            fontSize: 13,
            fontWeight: 600,
            color: '#dc2626',
            maxWidth: 300,
            textAlign: 'center',
          }}>
            {authError}
          </div>
        )}

        {/* Balance error message */}
        {balanceError && (
          <div style={{
            background: '#fffbeb',
            border: '1px solid #fde68a',
            borderRadius: 12,
            padding: '8px 16px',
            marginBottom: 16,
            fontSize: 13,
            fontWeight: 600,
            color: '#d97706',
            maxWidth: 300,
            textAlign: 'center',
            display: 'flex',
            alignItems: 'center',
            gap: 8,
          }}>
            <span style={{ flex: 1 }}>{balanceError}</span>
            <button
              onClick={resetBalanceError}
              style={{
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                padding: 0,
                fontSize: 16,
                color: '#d97706',
                fontWeight: 700,
                lineHeight: 1,
              }}
            >
              &times;
            </button>
          </div>
        )}

        {/* Stat cards — only when signed in */}
        {isSignedIn && user && (
          <div style={{ display: 'flex', gap: 12 }}>
            <StatCard label="Best Score" value={user.stats?.best_score || '—'} color={COLORS.amber} />
            <StatCard label="Games Played" value={user.stats?.games_played ?? 0} color={COLORS.blueGreen} />
          </div>
        )}

        {/* Welcome message for signed-in users */}
        {isSignedIn && user?.name && (
          <div style={{
            marginTop: 16,
            fontSize: 13,
            fontWeight: 700,
            color: COLORS.deepSpace,
            opacity: 0.6,
          }}>
            Welcome back, {user.name}!
          </div>
        )}
      </div>

      {/* Footer bar */}
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          zIndex: 5,
          background: 'rgba(255,255,255,0.85)',
          backdropFilter: 'blur(8px)',
          borderTop: `1px solid ${COLORS.deepSpace}1a`,
          padding: '8px 14px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 8,
          flexWrap: 'wrap',
        }}
      >
        <span
          style={{
            fontSize: 11,
            fontWeight: 700,
            color: COLORS.deepSpace,
            opacity: 0.6,
            letterSpacing: 0.3,
          }}
        >
          Operated by Blockfall
        </span>
        <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
          <button
            onClick={() => onNavigate('privacy')}
            style={{
              background: 'none',
              border: 'none',
              padding: 0,
              cursor: 'pointer',
              fontSize: 11,
              fontWeight: 700,
              color: COLORS.blueGreen,
              letterSpacing: 0.3,
              textDecoration: 'underline',
            }}
          >
            Privacy Policy
          </button>
          <button
            onClick={() => onNavigate('terms')}
            style={{
              background: 'none',
              border: 'none',
              padding: 0,
              cursor: 'pointer',
              fontSize: 11,
              fontWeight: 700,
              color: COLORS.blueGreen,
              letterSpacing: 0.3,
              textDecoration: 'underline',
            }}
          >
            Terms of Service
          </button>
        </div>
      </div>

      {showSignUpModal && (
        <SignUpModal
          onSubmit={handleSignUpSubmit}
          onClose={() => setShowSignUpModal(false)}
          checkName={checkName}
        />
      )}

      <style>{`
        @keyframes logoFloat {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        @keyframes pulseBtn {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.04); }
        }
        @keyframes shine {
          0% { left: -100%; }
          60%, 100% { left: 150%; }
        }
      `}</style>
    </div>
  );
}

function StatCard({ label, value, color }) {
  return (
    <div style={{ background: 'white', borderRadius: 16, padding: '12px 20px', textAlign: 'center', boxShadow: '0 4px 16px rgba(2,48,71,0.08)', minWidth: 110, border: `2px solid ${color}22` }}>
      <div style={{ fontSize: 20, fontWeight: 800, color: COLORS.deepSpace }}>{value}</div>
      <div style={{ fontSize: 11, color, fontWeight: 600, letterSpacing: 1 }}>{label}</div>
    </div>
  );
}
