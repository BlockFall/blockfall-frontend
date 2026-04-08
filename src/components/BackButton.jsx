import { COLORS } from '../game/constants';

export default function BackButton({ onGoHome }) {
  return (
    <button
      onClick={onGoHome}
      style={{
        background: COLORS.skyBlue + '33',
        border: 'none',
        borderRadius: 12,
        width: 40,
        height: 40,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
        flexShrink: 0,
      }}
    >
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={COLORS.deepSpace} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M19 12H5M12 5l-7 7 7 7" />
      </svg>
    </button>
  );
}
