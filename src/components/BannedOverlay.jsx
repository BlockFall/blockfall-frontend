export function BannedOverlay({ onSignOut }) {
  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 1100,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'rgba(2,48,71,0.85)',
        backdropFilter: 'blur(6px)',
      }}
    >
      <div
        style={{
          background: 'white',
          borderRadius: 24,
          padding: '40px 36px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 20,
          minWidth: 280,
          maxWidth: 340,
          boxShadow: '0 24px 64px rgba(2,48,71,0.35)',
        }}
      >
        <div
          style={{
            width: 56,
            height: 56,
            borderRadius: '50%',
            background: '#fee2e2',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <svg width="30" height="30" viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="12" r="10" stroke="#ef4444" strokeWidth="2.5" />
            <path d="M5 5l14 14" stroke="#ef4444" strokeWidth="2.5" strokeLinecap="round" />
          </svg>
        </div>

        <p
          style={{
            margin: 0,
            fontSize: 18,
            fontWeight: 700,
            color: '#0f172a',
            textAlign: 'center',
            lineHeight: 1.4,
          }}
        >
          User has been banned
        </p>

        <button
          onClick={onSignOut}
          style={{
            background: 'linear-gradient(135deg, #ef4444, #f97316)',
            color: 'white',
            border: 'none',
            borderRadius: 12,
            padding: '12px 32px',
            fontSize: 15,
            fontWeight: 700,
            cursor: 'pointer',
            marginTop: 4,
          }}
        >
          Sign out
        </button>
      </div>
    </div>
  );
}
