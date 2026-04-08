import { useEffect, useRef } from 'react';

// Spinner SVG
function Spinner() {
  return (
    <svg
      width="48"
      height="48"
      viewBox="0 0 48 48"
      fill="none"
      style={{ animation: 'txSpin 0.9s linear infinite' }}
    >
      <circle cx="24" cy="24" r="20" stroke="#e2e8f0" strokeWidth="4" />
      <path
        d="M24 4a20 20 0 0 1 20 20"
        stroke="#f97316"
        strokeWidth="4"
        strokeLinecap="round"
      />
    </svg>
  );
}

// Toast shown briefly for rejected / error
export function Toast({ message, onDone }) {
  const timerRef = useRef(null);

  useEffect(() => {
    timerRef.current = setTimeout(onDone, 3000);
    return () => clearTimeout(timerRef.current);
  }, [onDone]);

  return (
    <div
      style={{
        position: 'fixed',
        bottom: 32,
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: 1000,
        background: '#1e293b',
        color: 'white',
        borderRadius: 14,
        padding: '14px 24px',
        fontSize: 15,
        fontWeight: 600,
        boxShadow: '0 8px 32px rgba(0,0,0,0.25)',
        whiteSpace: 'nowrap',
        animation: 'toastIn 0.25s ease',
      }}
    >
      {message}
      <style>{`
        @keyframes toastIn {
          from { opacity: 0; transform: translateX(-50%) translateY(12px); }
          to   { opacity: 1; transform: translateX(-50%) translateY(0); }
        }
      `}</style>
    </div>
  );
}

// Full-screen overlay for awaiting_wallet / confirming / error states
export function TxOverlay({ txStatus, onClose }) {
  if (!txStatus || txStatus === 'success' || txStatus === 'rejected') return null;

  const isError = txStatus === 'error';

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 900,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'rgba(2,48,71,0.55)',
        backdropFilter: 'blur(4px)',
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
          boxShadow: '0 24px 64px rgba(2,48,71,0.2)',
        }}
      >
        {isError ? (
          <div
            style={{
              width: 48,
              height: 48,
              borderRadius: '50%',
              background: '#fee2e2',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M12 8v4M12 16h.01" stroke="#ef4444" strokeWidth="2.5" strokeLinecap="round" />
              <circle cx="12" cy="12" r="10" stroke="#ef4444" strokeWidth="2" />
            </svg>
          </div>
        ) : (
          <Spinner />
        )}

        <p
          style={{
            margin: 0,
            fontSize: 16,
            fontWeight: 700,
            color: '#0f172a',
            textAlign: 'center',
            lineHeight: 1.4,
          }}
        >
          {txStatus === 'awaiting_wallet' && 'Please accept in wallet'}
          {txStatus === 'confirming' && 'Waiting for transaction confirmation'}
          {isError && 'An error occurred. Please try again.'}
        </p>

        {isError && (
          <button
            onClick={onClose}
            style={{
              background: 'linear-gradient(135deg, #f97316, #fbbf24)',
              color: 'white',
              border: 'none',
              borderRadius: 12,
              padding: '12px 28px',
              fontSize: 15,
              fontWeight: 700,
              cursor: 'pointer',
            }}
          >
            Close
          </button>
        )}
      </div>

      <style>{`
        @keyframes txSpin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}
