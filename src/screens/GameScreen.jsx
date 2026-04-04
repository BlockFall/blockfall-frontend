import { useEffect, useRef, useState } from 'react';
import {
  BOARD_WIDTH, BOARD_HEIGHT, COLORS, LEVELS, BASE_SCORE, HARD_DROP_SCORE,
} from '../game/constants';
import {
  createEmptyBoard, randomTetromino, rotate, isValidPosition,
  placePiece, clearLines, getDropPosition, isGameOver,
} from '../game/engine';
import { useParticles, ParticleCanvas, RowFlash } from '../effects/ParticleSystem';

const CELL = 30;
const BOARD_PX_W = BOARD_WIDTH * CELL;
const BOARD_PX_H = BOARD_HEIGHT * CELL;

function roundRect(ctx, x, y, w, h, r) {
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

function drawCell(ctx, x, y, color, alpha = 1) {
  ctx.save();
  ctx.globalAlpha = alpha;
  ctx.fillStyle = color;
  roundRect(ctx, x + 1, y + 1, CELL - 2, CELL - 2, 4);
  ctx.fill();
  ctx.fillStyle = 'rgba(255,255,255,0.25)';
  roundRect(ctx, x + 3, y + 3, CELL - 6, 6, 2);
  ctx.fill();
  ctx.restore();
}

export default function GameScreen({ onExit, audio }) {
  const canvasRef = useRef(null);

  // All game state in a single ref to avoid stale closures
  const gs = useRef(null);
  const tickTimer = useRef(null);
  const touchData = useRef({ startX: 0, startY: 0, lastX: 0, lastY: 0, moved: false, holding: false, dragInterval: null });
  const flashTimer = useRef(null);


  const [uiState, setUiState] = useState({
    score: 0, level: 1, lines: 0, linesInLevel: 0,
    paused: false, gameOver: false, hardDropFlash: false,
  });
  const [flashingRows, setFlashingRows] = useState([]);
  const { particles, spawnRowClear, spawnHardDrop } = useParticles();

  function getSpeed() {
    const l = gs.current?.level ?? 0;
    return LEVELS[Math.min(l, LEVELS.length - 1)].speed;
  }

  function getMultiplier() {
    const l = gs.current?.level ?? 0;
    return LEVELS[Math.min(l, LEVELS.length - 1)].multiplier;
  }

  function getLevelCfg() {
    const l = gs.current?.level ?? 0;
    return LEVELS[Math.min(l, LEVELS.length - 1)];
  }

  function drawBoard() {
    const canvas = canvasRef.current;
    if (!canvas || !gs.current) return;
    const ctx = canvas.getContext('2d');
    const { board, piece } = gs.current;

    ctx.clearRect(0, 0, BOARD_PX_W, BOARD_PX_H);

    // Background
    ctx.fillStyle = '#eef6ff';
    ctx.fillRect(0, 0, BOARD_PX_W, BOARD_PX_H);

    // Grid
    ctx.strokeStyle = 'rgba(142,202,230,0.65)';
    ctx.lineWidth = 1;
    for (let r = 0; r <= BOARD_HEIGHT; r++) {
      ctx.beginPath(); ctx.moveTo(0, r * CELL); ctx.lineTo(BOARD_PX_W, r * CELL); ctx.stroke();
    }
    for (let c = 0; c <= BOARD_WIDTH; c++) {
      ctx.beginPath(); ctx.moveTo(c * CELL, 0); ctx.lineTo(c * CELL, BOARD_PX_H); ctx.stroke();
    }

    // Placed cells
    board.forEach((row, r) => {
      row.forEach((cell, c) => {
        if (cell) drawCell(ctx, c * CELL, r * CELL, cell);
      });
    });

    if (!piece) return;

    // Shadow trail — per-column bar, starts below each column's bottom cell, stops above landing
    const dropY = getDropPosition(board, piece);
    console.log('dropY', dropY);
    console.log(piece)
    if (dropY > 0) {
      const colBottom = {};
      piece.shape.forEach((row, r) => {
        row.forEach((cell, c) => {
          if (!cell) return;
          const col = piece.x + c;
          if (colBottom[col] === undefined || r > colBottom[col]) colBottom[col] = r;
        });
      });

      ctx.save();
      ctx.globalAlpha = 0.05;
      ctx.fillStyle = '#023047';
      Object.entries(colBottom).forEach(([col, bottom]) => {
        const x = Number(col) * CELL + 1;
        const yStart = (piece.y + bottom + 1) * CELL;
        const yEnd   = (piece.y + bottom + dropY + 3) * CELL; // stop at top of landing cell, no overlap
        const h = yEnd - yStart;
        if (h > 0) ctx.fillRect(x, yStart, CELL - 2, h);
      });
      ctx.restore();
    }

    // Active piece
    piece.shape.forEach((row, r) => {
      row.forEach((cell, c) => {
        if (!cell) return;
        drawCell(ctx, (piece.x + c) * CELL, (piece.y + r) * CELL, piece.color);
      });
    });
  }

  function lockPiece() {
    const state = gs.current;
    if (!state || !state.piece) return;

    const newBoard = placePiece(state.board, state.piece);
    const { board: clearedBoard, clearedRows } = clearLines(newBoard);

    if (clearedRows.length > 0) {
      setFlashingRows(clearedRows);
      clearedRows.forEach(rowIdx => {
        spawnRowClear(rowIdx * CELL, 0, BOARD_WIDTH, CELL);
      });
      clearTimeout(flashTimer.current);
      flashTimer.current = setTimeout(() => setFlashingRows([]), 350);
      audio.playClear(clearedRows.length);
    }

    const linesCleared = clearedRows.length;
    const newTotalLines = state.lines + linesCleared;
    const newLinesInLevel = state.linesInLevel + linesCleared;
    const cfg = getLevelCfg();
    const levelAdvance = newLinesInLevel >= cfg.lines;
    const newLevel = levelAdvance ? state.level + 1 : state.level;
    const newLinesInLevelReset = levelAdvance ? newLinesInLevel - cfg.lines : newLinesInLevel;

    const scored = linesCleared > 0
      ? Math.round((BASE_SCORE[linesCleared] ?? 0) * getMultiplier())
      : 0;

    const nextPiece = randomTetromino();

    if (isGameOver(clearedBoard, nextPiece)) {
      state.board = clearedBoard;
      state.piece = null;
      state.gameOver = true;
      drawBoard();
      setUiState(u => ({ ...u, gameOver: true }));
      audio.stopMusic();
      audio.playGameOver();
      return;
    }

    state.board = clearedBoard;
    state.piece = nextPiece;
    state.score += scored;
    state.lines = newTotalLines;
    state.level = newLevel;
    state.linesInLevel = newLinesInLevelReset;

    setUiState({
      score: state.score,
      level: newLevel + 1,
      lines: newTotalLines,
      linesInLevel: newLinesInLevelReset,
      paused: false,
      gameOver: false,
      hardDropFlash: false,
    });
    drawBoard();
  }

  function tick() {
    const state = gs.current;
    if (!state || state.paused || state.gameOver) return;
    if (!state.piece) return;

    if (isValidPosition(state.board, state.piece, 0, 1)) {
      state.piece.y += 1;
      drawBoard();
    } else {
      lockPiece();
    }
  }

  function scheduleTick() {
    clearTimeout(tickTimer.current);
    tickTimer.current = setTimeout(() => {
      tick();
      if (gs.current && !gs.current.paused && !gs.current.gameOver) {
        scheduleTick();
      }
    }, getSpeed());
  }

  function movePiece(dir) {
    const state = gs.current;
    if (!state || !state.piece || state.paused || state.gameOver) return;
    if (isValidPosition(state.board, state.piece, dir, 0)) {
      state.piece.x += dir;
      audio.playMove();
      drawBoard();
    }
  }

  function rotatePiece(dir) {
    const state = gs.current;
    if (!state || !state.piece || state.paused || state.gameOver) return;
    const rotated = rotate(state.piece.shape, dir);
    const kicks = [0, 1, -1, 2, -2];
    for (const kick of kicks) {
      const test = { ...state.piece, shape: rotated, x: state.piece.x + kick };
      if (isValidPosition(state.board, test)) {
        state.piece.shape = rotated;
        state.piece.x += kick;
        audio.playRotate();
        drawBoard();
        return;
      }
    }
  }

  function hardDrop() {
    const state = gs.current;
    if (!state || !state.piece || state.paused || state.gameOver) return;
    const drop = getDropPosition(state.board, state.piece);
    if (drop === 0) {
      lockPiece();
      scheduleTick();
      return;
    }

    const dropScore = drop * HARD_DROP_SCORE * (state.level + 1);
    state.score += dropScore;

    const landX = (state.piece.x + Math.floor(state.piece.shape[0].length / 2)) * CELL + CELL / 2;
    const landY = (state.piece.y + drop + state.piece.shape.length) * CELL;
    spawnHardDrop(landX, landY);

    setUiState(u => ({ ...u, hardDropFlash: true, score: state.score }));
    setTimeout(() => setUiState(u => ({ ...u, hardDropFlash: false })), 150);

    state.piece.y += drop;
    audio.playDrop();
    drawBoard();

    clearTimeout(tickTimer.current);
    lockPiece();
    if (!state.gameOver) scheduleTick();
  }

  function startGame() {
    clearTimeout(tickTimer.current);
    clearInterval(touchData.current.dragInterval);
    gs.current = {
      board: createEmptyBoard(),
      piece: randomTetromino(),
      score: 0, level: 0, lines: 0, linesInLevel: 0,
      paused: false, gameOver: false,
    };
    setUiState({ score: 0, level: 1, lines: 0, linesInLevel: 0, paused: false, gameOver: false, hardDropFlash: false });
    setFlashingRows([]);
    drawBoard();
    scheduleTick();
    audio.startMusic();
  }

  function togglePause() {
    const state = gs.current;
    if (!state || state.gameOver) return;
    state.paused = !state.paused;
    setUiState(u => ({ ...u, paused: state.paused }));
    if (!state.paused) scheduleTick();
    else clearTimeout(tickTimer.current);
  }

  // Init
  useEffect(() => {
    startGame();
    return () => {
      clearTimeout(tickTimer.current);
      clearTimeout(flashTimer.current);
      clearInterval(touchData.current?.dragInterval);
      audio.stopMusic();
    };
  }, []);

  // Touch handlers
  function handleTouchStart(e) {
    e.preventDefault();
    const t = e.touches[0];
    const td = touchData.current;
    td.startX = t.clientX;
    td.startY = t.clientY;
    td.lastX = t.clientX;
    td.lastY = t.clientY;
    td.moved = false;
    td.holding = true;

    clearInterval(td.dragInterval);
    td.dragInterval = setInterval(() => {
      if (!td.holding) return;
      const dx = td.lastX - td.startX;
      if (Math.abs(dx) >= CELL) {
        const dir = dx > 0 ? 1 : -1;
        movePiece(dir);
        td.startX = td.lastX - (dx % CELL);
        td.moved = true;
      }
    }, 75);
  }

  function handleTouchMove(e) {
    e.preventDefault();
    const t = e.touches[0];
    touchData.current.lastX = t.clientX;
    touchData.current.lastY = t.clientY;
    const dy = t.clientY - touchData.current.startY;
    if (dy > 55 && !touchData.current.moved) {
      touchData.current.moved = true;
      clearInterval(touchData.current.dragInterval);
      hardDrop();
    }
  }

  function handleTouchEnd(e) {
    e.preventDefault();
    clearInterval(touchData.current.dragInterval);
    touchData.current.holding = false;
    const td = touchData.current;
    const dx = td.lastX - td.startX;
    const dy = td.lastY - td.startY;

    if (!td.moved && Math.abs(dx) < 10 && Math.abs(dy) < 30) {
      const canvas = canvasRef.current;
      const rect = canvas?.getBoundingClientRect();
      if (rect) {
        const tapX = e.changedTouches[0]?.clientX ?? td.startX;
        const midX = rect.left + rect.width / 2;
        rotatePiece(tapX > midX ? 1 : -1);
      }
    }
  }

  const { score, level, lines, linesInLevel, paused, gameOver, hardDropFlash } = uiState;
  const levelCfg = getLevelCfg();
  const progressPct = Math.min(100, (linesInLevel / levelCfg.lines) * 100);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', background: 'linear-gradient(160deg, #e8f4fd 0%, #f5f9ff 100%)', overflow: 'hidden' }}>
      {/* Top bar */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 14px', background: 'white', boxShadow: '0 2px 8px rgba(2,48,71,0.08)', flexShrink: 0 }}>
        <button onClick={togglePause} style={btnStyle(COLORS.skyBlue)}>
          {paused
            ? <PlayIcon />
            : <PauseIcon />}
        </button>

        <div style={{ display: 'flex', gap: 14, alignItems: 'center' }}>
          <ScorePill label="SCORE" value={score.toLocaleString()} color={COLORS.orange} />
          <ScorePill label="LV" value={level} color={COLORS.blueGreen} />
          <ScorePill label="LINES" value={lines} color={COLORS.deepSpace} />
        </div>

        <button onClick={onExit} style={btnStyle('#f0f0f0')}>
          <CloseIcon />
        </button>
      </div>

      {/* Canvas area */}
      <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', padding: '8px 0' }}>
        <div
          style={{
            position: 'relative', width: BOARD_PX_W, height: BOARD_PX_H,
            borderRadius: 8, overflow: 'hidden',
            boxShadow: `0 8px 40px rgba(2,48,71,0.18), 0 0 0 2px ${COLORS.skyBlue}`,
            background: hardDropFlash ? 'rgba(255,183,3,0.25)' : 'transparent',
            transition: 'background 0.1s',
          }}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <canvas ref={canvasRef} width={BOARD_PX_W} height={BOARD_PX_H} style={{ display: 'block', touchAction: 'none', userSelect: 'none' }} />
          <ParticleCanvas particles={particles} width={BOARD_PX_W} height={BOARD_PX_H} />
          <RowFlash flashingRows={flashingRows} cellSize={CELL} boardX={0} />

          {paused && !gameOver && (
            <Overlay>
              <OverlayTitle>PAUSED</OverlayTitle>
              <OverlaySubtitle>Tap to resume</OverlaySubtitle>
              <OverlayBtn onClick={togglePause} color={COLORS.orange}>RESUME</OverlayBtn>
              <OverlayBtn onClick={onExit} color={COLORS.blueGreen} mt>EXIT</OverlayBtn>
            </Overlay>
          )}

          {gameOver && (
            <Overlay>
              <OverlayTitle color={COLORS.orange}>GAME OVER</OverlayTitle>
              <div style={{ fontSize: 13, color: COLORS.deepSpace, opacity: 0.55, marginBottom: 16 }}>Level {level} reached</div>
              <div style={{ background: COLORS.deepSpace, borderRadius: 18, padding: '14px 32px', marginBottom: 20, textAlign: 'center' }}>
                <div style={{ fontSize: 10, color: COLORS.skyBlue, letterSpacing: 2, fontWeight: 700 }}>FINAL SCORE</div>
                <div style={{ fontSize: 34, fontWeight: 900, color: 'white', lineHeight: 1.2 }}>{score.toLocaleString()}</div>
                <div style={{ fontSize: 11, color: COLORS.amber, marginTop: 2 }}>{lines} LINES CLEARED</div>
              </div>
              <OverlayBtn onClick={startGame} color={COLORS.orange}>PLAY AGAIN</OverlayBtn>
              <OverlayBtn onClick={onExit} color={COLORS.blueGreen} mt>HOME</OverlayBtn>
            </Overlay>
          )}
        </div>
      </div>

      {/* Level progress */}
      <div style={{ padding: '4px 18px 10px', flexShrink: 0 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 3 }}>
          <span style={{ fontSize: 10, color: COLORS.deepSpace, opacity: 0.5, fontWeight: 700, letterSpacing: 1 }}>LEVEL {level}</span>
          <span style={{ fontSize: 10, color: COLORS.deepSpace, opacity: 0.45 }}>{linesInLevel}/{levelCfg.lines}</span>
        </div>
        <div style={{ height: 5, background: COLORS.skyBlue + '33', borderRadius: 3 }}>
          <div style={{ height: '100%', width: `${progressPct}%`, background: `linear-gradient(90deg, ${COLORS.blueGreen}, ${COLORS.orange})`, borderRadius: 3, transition: 'width 0.3s ease' }} />
        </div>
      </div>
    </div>
  );
}

// ── Sub-components ──────────────────────────────────────────────────────────

function btnStyle(bg) {
  return {
    width: 40, height: 40, border: 'none', borderRadius: 12,
    background: bg, cursor: 'pointer',
    display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
  };
}

function ScorePill({ label, value, color }) {
  return (
    <div style={{ textAlign: 'center', minWidth: 52 }}>
      <div style={{ fontSize: 9, color, fontWeight: 700, letterSpacing: 1, opacity: 0.8 }}>{label}</div>
      <div style={{ fontSize: 18, fontWeight: 800, color: COLORS.deepSpace, lineHeight: 1.2 }}>{value}</div>
    </div>
  );
}

function Overlay({ children }) {
  function block(e) { e.stopPropagation(); }
  return (
    <div
      onTouchStart={block} onTouchMove={block} onTouchEnd={block}
      onClick={block}
      style={{ position: 'absolute', inset: 0, background: 'rgba(238,246,255,0.92)', backdropFilter: 'blur(8px)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', zIndex: 20 }}
    >
      {children}
    </div>
  );
}

function OverlayTitle({ children, color = COLORS.deepSpace }) {
  return <div style={{ fontSize: 28, fontWeight: 900, color, marginBottom: 6, letterSpacing: 1 }}>{children}</div>;
}

function OverlaySubtitle({ children }) {
  return <div style={{ fontSize: 13, color: COLORS.blueGreen, marginBottom: 20 }}>{children}</div>;
}

function OverlayBtn({ children, onClick, color, mt }) {
  return (
    <button onClick={onClick} style={{ background: color, color: 'white', border: 'none', borderRadius: 16, padding: '12px 42px', fontSize: 15, fontWeight: 800, cursor: 'pointer', letterSpacing: 1, boxShadow: `0 4px 16px ${color}55`, ...(mt ? { marginTop: 10 } : {}) }}>
      {children}
    </button>
  );
}

function PauseIcon() {
  return <svg width="18" height="18" viewBox="0 0 24 24" fill={COLORS.deepSpace}><rect x="5" y="3" width="4" height="18" rx="1"/><rect x="15" y="3" width="4" height="18" rx="1"/></svg>;
}
function PlayIcon() {
  return <svg width="18" height="18" viewBox="0 0 24 24" fill={COLORS.deepSpace}><polygon points="5,3 19,12 5,21"/></svg>;
}
function CloseIcon() {
  return <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={COLORS.deepSpace} strokeWidth="2.5" strokeLinecap="round"><path d="M18 6L6 18M6 6l12 12"/></svg>;
}
