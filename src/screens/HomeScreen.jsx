import { useRef, useEffect, useState } from 'react';
import Logo from '../components/Logo';
import AnimatedBlocks from '../components/AnimatedBlocks';
import { COLORS } from '../game/constants';

export default function HomeScreen({ onPlay, audio }) {
  const containerRef = useRef(null);
  const [size, setSize] = useState({ width: 600, height: 700 });

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
        paddingBottom: 80,
      }}
    >
      <AnimatedBlocks width={size.width} height={size.height} />

      <div style={{ position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        {/* Floating logo */}
        <div style={{ animation: 'logoFloat 3s ease-in-out infinite', marginBottom: 10 }}>
          <Logo size="lg" />
        </div>

        <p style={{ color: COLORS.deepSpace, opacity: 0.5, fontSize: 14, marginBottom: 48, letterSpacing: 0.5 }}>
          Stack, clear, survive.
        </p>

        {/* Play button */}
        <button
          onClick={() => { audio.initAudio(); onPlay(); }}
          style={{
            background: `linear-gradient(135deg, ${COLORS.orange}, ${COLORS.amber})`,
            color: 'white',
            border: 'none',
            borderRadius: 24,
            padding: '18px 64px',
            fontSize: 22,
            fontWeight: 900,
            cursor: 'pointer',
            letterSpacing: 2,
            boxShadow: `0 8px 32px ${COLORS.orange}66`,
            animation: 'pulseBtn 2s ease-in-out infinite',
            position: 'relative',
            overflow: 'hidden',
            marginBottom: 32,
          }}
        >
          PLAY
          <span style={{
            position: 'absolute', top: 0, left: '-100%', width: '60%', height: '100%',
            background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.35), transparent)',
            animation: 'shine 2.5s ease-in-out infinite',
          }} />
        </button>

        {/* Stat cards */}
        <div style={{ display: 'flex', gap: 12 }}>
          <StatCard label="Best Score" value="—" color={COLORS.amber} />
          <StatCard label="Games Played" value="0" color={COLORS.blueGreen} />
        </div>
      </div>

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
