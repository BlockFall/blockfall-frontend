import { useEffect, useRef, useState } from 'react';
import { COLORS } from '../game/constants';

// Polyfill for older browsers
if (typeof CanvasRenderingContext2D !== 'undefined' && !CanvasRenderingContext2D.prototype.roundRect) {
  CanvasRenderingContext2D.prototype.roundRect = function(x, y, w, h, r) {
    this.beginPath();
    this.moveTo(x + r, y);
    this.lineTo(x + w - r, y);
    this.arcTo(x + w, y, x + w, y + r, r);
    this.lineTo(x + w, y + h - r);
    this.arcTo(x + w, y + h, x + w - r, y + h, r);
    this.lineTo(x + r, y + h);
    this.arcTo(x, y + h, x, y + h - r, r);
    this.lineTo(x, y + r);
    this.arcTo(x, y, x + r, y, r);
    this.closePath();
    return this;
  };
}

const PARTICLE_COLORS = Object.values(COLORS);

function createParticle(x, y) {
  const angle = Math.random() * Math.PI * 2;
  const speed = 2 + Math.random() * 5;
  return {
    id: Math.random(),
    x,
    y,
    vx: Math.cos(angle) * speed,
    vy: Math.sin(angle) * speed - 3,
    life: 1,
    decay: 0.02 + Math.random() * 0.03,
    size: 4 + Math.random() * 6,
    color: PARTICLE_COLORS[Math.floor(Math.random() * PARTICLE_COLORS.length)],
    rotation: Math.random() * 360,
    rotSpeed: (Math.random() - 0.5) * 10,
  };
}

export function useParticles() {
  const [particles, setParticles] = useState([]);
  const animRef = useRef(null);
  const particlesRef = useRef([]);

  function spawnRowClear(rowY, boardX, boardWidth, cellSize) {
    const newParticles = [];
    for (let c = 0; c < boardWidth; c++) {
      const px = boardX + c * cellSize + cellSize / 2;
      const py = rowY + cellSize / 2;
      for (let i = 0; i < 5; i++) {
        newParticles.push(createParticle(px, py));
      }
    }
    particlesRef.current = [...particlesRef.current, ...newParticles];
  }

  function spawnHardDrop(x, y) {
    const newParticles = [];
    for (let i = 0; i < 20; i++) {
      const p = createParticle(x, y);
      p.vy = Math.abs(p.vy) * 0.5;
      p.vx *= 1.5;
      p.color = COLORS.amber;
      newParticles.push(p);
    }
    particlesRef.current = [...particlesRef.current, ...newParticles];
  }

  useEffect(() => {
    function tick() {
      particlesRef.current = particlesRef.current
        .map(p => ({
          ...p,
          x: p.x + p.vx,
          y: p.y + p.vy,
          vy: p.vy + 0.15,
          life: p.life - p.decay,
          rotation: p.rotation + p.rotSpeed,
        }))
        .filter(p => p.life > 0);
      setParticles([...particlesRef.current]);
      animRef.current = requestAnimationFrame(tick);
    }
    animRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(animRef.current);
  }, []);

  return { particles, spawnRowClear, spawnHardDrop };
}

export function ParticleCanvas({ particles, width, height }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, width, height);
    particles.forEach(p => {
      ctx.save();
      ctx.globalAlpha = p.life;
      ctx.translate(p.x, p.y);
      ctx.rotate((p.rotation * Math.PI) / 180);
      ctx.fillStyle = p.color;
      ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size);
      ctx.restore();
    });
  }, [particles, width, height]);

  return (
    <canvas
      ref={canvasRef}
      width={width}
      height={height}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        pointerEvents: 'none',
        zIndex: 10,
      }}
    />
  );
}

export function RowFlash({ flashingRows, cellSize, boardX }) {
  if (!flashingRows || flashingRows.length === 0) return null;
  return (
    <>
      {flashingRows.map(row => (
        <div
          key={row}
          style={{
            position: 'absolute',
            left: boardX,
            top: row * cellSize,
            width: '100%',
            height: cellSize,
            background: 'rgba(255,255,255,0.9)',
            animation: 'rowFlash 0.3s ease-out forwards',
            zIndex: 5,
            pointerEvents: 'none',
          }}
        />
      ))}
    </>
  );
}
