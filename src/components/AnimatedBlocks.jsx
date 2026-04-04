import { useEffect, useRef } from 'react';
import { COLORS, TETROMINOES, TETROMINO_KEYS } from '../game/constants';

const BLOCK_SIZE = 24;
const COLORS_LIST = Object.values(COLORS);

function rr(ctx, x, y, w, h, r) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.lineTo(x + w - r, y);
  ctx.arcTo(x + w, y, x + w, y + r, r);
  ctx.lineTo(x + w, y + h - r);
  ctx.arcTo(x + w, y + h, x + w - r, y + h, r);
  ctx.lineTo(x + r, y + h);
  ctx.arcTo(x, y + h, x, y + h - r, r);
  ctx.lineTo(x, y + r);
  ctx.arcTo(x, y, x + r, y, r);
  ctx.closePath();
}

function createBlock(width, height) {
  const key = TETROMINO_KEYS[Math.floor(Math.random() * TETROMINO_KEYS.length)];
  const shape = TETROMINOES[key].shape;
  const color = COLORS_LIST[Math.floor(Math.random() * COLORS_LIST.length)];
  return {
    x: Math.random() * (width - shape[0].length * BLOCK_SIZE),
    y: -shape.length * BLOCK_SIZE - Math.random() * height,
    speed: 0.3 + Math.random() * 0.7,
    shape,
    color,
    opacity: 0.1 + Math.random() * 0.14,
    rotation: Math.floor(Math.random() * 4) * 90,
  };
}

export default function AnimatedBlocks({ width = 600, height = 800 }) {
  const canvasRef = useRef(null);
  const blocksRef = useRef([]);
  const rafRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    blocksRef.current = Array.from({ length: 12 }, () => {
      const b = createBlock(width, height);
      b.y = Math.random() * height;
      return b;
    });

    function draw() {
      ctx.clearRect(0, 0, width, height);
      blocksRef.current.forEach(block => {
        block.y += block.speed;
        if (block.y > height + BLOCK_SIZE * 4) {
          const fresh = createBlock(width, height);
          Object.assign(block, fresh);
        }

        const bw = block.shape[0].length;
        const bh = block.shape.length;
        const cx = block.x + (bw * BLOCK_SIZE) / 2;
        const cy = block.y + (bh * BLOCK_SIZE) / 2;

        ctx.save();
        ctx.globalAlpha = block.opacity;
        ctx.translate(cx, cy);
        ctx.rotate((block.rotation * Math.PI) / 180);
        ctx.translate(-cx, -cy);

        block.shape.forEach((row, r) => {
          row.forEach((cell, c) => {
            if (!cell) return;
            const bx = block.x + c * BLOCK_SIZE;
            const by = block.y + r * BLOCK_SIZE;
            ctx.fillStyle = block.color;
            rr(ctx, bx + 1, by + 1, BLOCK_SIZE - 2, BLOCK_SIZE - 2, 3);
            ctx.fill();
          });
        });
        ctx.restore();
      });
      rafRef.current = requestAnimationFrame(draw);
    }

    rafRef.current = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(rafRef.current);
  }, [width, height]);

  return (
    <canvas
      ref={canvasRef}
      width={width}
      height={height}
      style={{ position: 'absolute', top: 0, left: 0, pointerEvents: 'none' }}
    />
  );
}
