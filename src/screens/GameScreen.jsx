import { useEffect, useRef, useState } from 'react';
import {
  BOARD_WIDTH, BOARD_HEIGHT, COLORS, LEVELS, BASE_SCORE, HARD_DROP_SCORE,
} from '../game/constants';
import {
  createEmptyBoard, randomTetromino, resetPieceHistory, tryRotate, isValidPosition,
  placePiece, clearLines, getDropPosition, isGameOver,
} from '../game/engine';
import { useParticles, ParticleCanvas, RowFlash } from '../effects/ParticleSystem';
import { getAuthedApi, sendGameEvent } from '../api';

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

function drawCell(ctx, x, y, cell, color, alpha = 1) {
  ctx.save();
  ctx.globalAlpha = alpha;
  ctx.fillStyle = color;
  roundRect(ctx, x + 1, y + 1, cell - 2, cell - 2, Math.max(2, cell * 0.12));
  ctx.fill();
  ctx.fillStyle = 'rgba(255,255,255,0.25)';
  roundRect(ctx, x + 3, y + 3, cell - 6, Math.max(3, cell * 0.2), 2);
  ctx.fill();
  ctx.restore();
}

export default function GameScreen({ onExit, onPlayAgain, audio, gamePlayId, address }) {
  const canvasRef = useRef(null);
  const areaRef   = useRef(null);   // canvas container — measured for sizing
  const cellRef   = useRef(28);     // current cell size, used by all game functions

  const gs        = useRef(null);
  const tickTimer = useRef(null);
  const flashTimer = useRef(null);
  const touchData = useRef({ startX: 0, startY: 0, lastX: 0, lastY: 0, moved: false, holding: false, dragInterval: null });
  const usingKeyboard = useRef(false);

  const [cell, setCell] = useState(28);   // triggers re-render for canvas size / layout
  const [uiState, setUiState] = useState({
    score: 0, level: 1, lines: 0, linesInLevel: 0,
    paused: false, gameOver: false, hardDropFlash: false,
  });
  const [flashingRows, setFlashingRows] = useState([]);
  const { particles, spawnRowClear, spawnHardDrop } = useParticles();

  // ── Sizing ────────────────────────────────────────────────────────────────
  useEffect(() => {
    const el = areaRef.current;
    if (!el) return;
    const obs = new ResizeObserver(([entry]) => {
      const { width, height } = entry.contentRect;
      const fromH = Math.floor(height / BOARD_HEIGHT);
      const fromW = Math.floor(width  / BOARD_WIDTH);
      const next  = Math.max(16, Math.min(fromH, fromW));
      if (next !== cellRef.current) {
        cellRef.current = next;
        setCell(next);
      }
    });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  // ── Helpers ───────────────────────────────────────────────────────────────
  function getSpeed() {
    const l = gs.current?.level ?? 0;
    const cfg = LEVELS[Math.min(l, LEVELS.length - 1)];
    return usingKeyboard.current ? cfg.speedKeyboard : cfg.speedTouch;
  }
  function getMultiplier() {
    const l = gs.current?.level ?? 0;
    return LEVELS[Math.min(l, LEVELS.length - 1)].multiplier;
  }
  function getLevelCfg() {
    const l = gs.current?.level ?? 0;
    return LEVELS[Math.min(l, LEVELS.length - 1)];
  }

  // ── Draw ──────────────────────────────────────────────────────────────────
  function drawBoard() {
    const canvas = canvasRef.current;
    if (!canvas || !gs.current) return;
    const ctx  = canvas.getContext('2d');
    const C    = cellRef.current;
    const W    = BOARD_WIDTH  * C;
    const H    = BOARD_HEIGHT * C;
    const { board, piece } = gs.current;

    ctx.clearRect(0, 0, W, H);
    ctx.fillStyle = '#eef6ff';
    ctx.fillRect(0, 0, W, H);

    // Grid
    ctx.strokeStyle = 'rgba(142,202,230,0.65)';
    ctx.lineWidth = 1;
    for (let r = 0; r <= BOARD_HEIGHT; r++) {
      ctx.beginPath(); ctx.moveTo(0, r * C); ctx.lineTo(W, r * C); ctx.stroke();
    }
    for (let c = 0; c <= BOARD_WIDTH; c++) {
      ctx.beginPath(); ctx.moveTo(c * C, 0); ctx.lineTo(c * C, H); ctx.stroke();
    }

    // Placed cells
    board.forEach((row, r) => {
      row.forEach((col, c) => {
        if (col) drawCell(ctx, c * C, r * C, C, col);
      });
    });

    if (!piece) return;

    // Shadow trail — per-column, from bottom of each column to landing
    const dropY = getDropPosition(board, piece);
    if (dropY > 0) {
      const colBottom = {};
      piece.shape.forEach((row, r) => {
        row.forEach((col, c) => {
          if (!col) return;
          const gc = piece.x + c;
          if (colBottom[gc] === undefined || r > colBottom[gc]) colBottom[gc] = r;
        });
      });
      ctx.save();
      ctx.globalAlpha = 0.05;
      ctx.fillStyle = '#023047';
      Object.entries(colBottom).forEach(([gc, bottom]) => {
        const x      = Number(gc) * C + 1;
        const yStart = (piece.y + bottom + 1) * C;
        const yEnd   = (piece.y + bottom + dropY + 4) * C;
        const h = yEnd - yStart;
        if (h > 0) ctx.fillRect(x, yStart, C - 2, h);
      });
      ctx.restore();
    }

    // Active piece
    piece.shape.forEach((row, r) => {
      row.forEach((col, c) => {
        if (!col) return;
        drawCell(ctx, (piece.x + c) * C, (piece.y + r) * C, C, piece.color);
      });
    });
  }

  // Redraw whenever cell size changes (placed after drawBoard is declared)
  useEffect(() => { drawBoard(); }, [cell]);

  // ── Game logic ────────────────────────────────────────────────────────────
  function lockPiece() {
    const state = gs.current;
    if (!state || !state.piece) return;
    const C = cellRef.current;

    const newBoard = placePiece(state.board, state.piece);
    const { board: clearedBoard, clearedRows } = clearLines(newBoard);

    if (clearedRows.length > 0) {
      setFlashingRows(clearedRows);
      clearedRows.forEach(rowIdx => spawnRowClear(rowIdx * C, 0, BOARD_WIDTH, C));
      clearTimeout(flashTimer.current);
      flashTimer.current = setTimeout(() => setFlashingRows([]), 350);
      audio.playClear(clearedRows.length);
      sendGameEvent(address, gamePlayId, 'line_clear', { intval: clearedRows.length });
    }

    const linesCleared      = clearedRows.length;
    const newTotalLines     = state.lines + linesCleared;
    const newLinesInLevel   = state.linesInLevel + linesCleared;
    const cfg               = getLevelCfg();
    const levelAdvance      = newLinesInLevel >= cfg.lines;
    const newLevel          = levelAdvance ? state.level + 1 : state.level;
    const newLinesReset     = levelAdvance ? newLinesInLevel - cfg.lines : newLinesInLevel;
    const scored            = linesCleared > 0
      ? Math.round((BASE_SCORE[linesCleared] ?? 0) * getMultiplier()) : 0;

    const nextPiece = randomTetromino();

    if (isGameOver(clearedBoard, nextPiece)) {
      state.board     = clearedBoard;
      state.piece     = null;
      state.gameOver  = true;
      const finalScore = state.score + scored;
      drawBoard();
      setUiState(u => ({ ...u, gameOver: true, score: finalScore }));
      audio.stopMusic();
      audio.playGameOver();

      // Report game end to backend
      if (gamePlayId && address) {
        const authedApi = getAuthedApi(address);
        if (authedApi) {
          authedApi.game.end.$post({ json: { game_play_id: gamePlayId, score: finalScore } }).catch(() => {});
        }
      }
      return;
    }

    state.board        = clearedBoard;
    state.piece        = nextPiece;
    state.score       += scored;
    state.lines        = newTotalLines;
    state.level        = newLevel;
    state.linesInLevel = newLinesReset;

    setUiState({ score: state.score, level: newLevel + 1, lines: newTotalLines, linesInLevel: newLinesReset, paused: false, gameOver: false, hardDropFlash: false });
    drawBoard();
  }

  function tick() {
    const state = gs.current;
    if (!state || state.paused || state.gameOver || !state.piece) return;
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
      if (gs.current && !gs.current.paused && !gs.current.gameOver) scheduleTick();
    }, getSpeed());
  }

  function rotatePiece(dir) {
    const state = gs.current;
    if (!state || !state.piece || state.paused || state.gameOver) return;
    const next = tryRotate(state.board, state.piece, dir);
    if (!next) return;
    state.piece = next;
    audio.playRotate();
    drawBoard();
  }

  function hardDrop() {
    const state = gs.current;
    if (!state || !state.piece || state.paused || state.gameOver) return;
    const C    = cellRef.current;
    const drop = getDropPosition(state.board, state.piece);

    state.score += drop * HARD_DROP_SCORE * (state.level + 1);
    const landX  = (state.piece.x + Math.floor(state.piece.shape[0].length / 2)) * C + C / 2;
    const landY  = (state.piece.y + drop + state.piece.shape.length) * C;
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
    resetPieceHistory();
    gs.current = { board: createEmptyBoard(), piece: randomTetromino(), score: 0, level: 0, lines: 0, linesInLevel: 0, paused: false, gameOver: false };
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
    sendGameEvent(address, gamePlayId, state.paused ? 'pause' : 'resume');
  }

  useEffect(() => {
    // Initialize gs.current directly — initial useState values already match,
    // so no setState call needed here (avoids cascading renders).
    resetPieceHistory();
    gs.current = { board: createEmptyBoard(), piece: randomTetromino(), score: 0, level: 0, lines: 0, linesInLevel: 0, paused: false, gameOver: false };
    drawBoard();
    scheduleTick();
    audio.startMusic();
    const td = touchData.current;
    return () => {
      clearTimeout(tickTimer.current);
      clearTimeout(flashTimer.current);
      clearInterval(td?.dragInterval);
      audio.stopMusic();
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // ── Touch ─────────────────────────────────────────────────────────────────
  function handleTouchStart(e) {
    usingKeyboard.current = false;
    e.preventDefault();
    const t  = e.touches[0];
    const td = touchData.current;
    td.startX      = td.lastX = t.clientX;
    td.startY      = td.lastY = t.clientY;
    td.moved       = false;
    td.holding     = true;
    td.pieceStartX = gs.current?.piece?.x ?? 0;
    clearInterval(td.dragInterval);
  }

  function handleTouchMove(e) {
    e.preventDefault();
    const t  = e.touches[0];
    const td = touchData.current;
    td.lastX = t.clientX;
    td.lastY = t.clientY;

    const dy = td.lastY - td.startY;
    if (dy > 65 && !td.moved) {
      td.moved = true;
      hardDrop();
      return;
    }

    // Horizontal: calculate total offset in cells from touch start
    const state = gs.current;
    if (!state || !state.piece || state.paused || state.gameOver) return;
    const C          = cellRef.current;
    const dx         = td.lastX - td.startX;
    const cellOffset = Math.round(dx / C);
    if (cellOffset === 0) return;

    const targetX = td.pieceStartX + cellOffset;
    if (targetX !== state.piece.x) {
      // Walk toward target respecting collisions; isValidPosition handles wall stops.
      const dir     = targetX > state.piece.x ? 1 : -1;
      let   steps   = Math.abs(targetX - state.piece.x);
      let   didMove = false;
      while (steps-- > 0 && isValidPosition(state.board, state.piece, dir, 0)) {
        state.piece.x += dir;
        didMove = true;
      }
      if (didMove) {
        td.moved = true;
        audio.playMove();
        drawBoard();
      }
    }
  }

  function handleTouchEnd(e) {
    e.preventDefault();
    clearInterval(touchData.current.dragInterval);
    touchData.current.holding = false;
    const { lastX, lastY, startX, startY, moved } = touchData.current;
    if (!moved && Math.abs(lastX - startX) < 10 && Math.abs(lastY - startY) < 30) {
      const rect = canvasRef.current?.getBoundingClientRect();
      if (rect) {
        const tapX = e.changedTouches[0]?.clientX ?? startX;
        rotatePiece(tapX > rect.left + rect.width / 2 ? 1 : -1);
      }
    }
  }

  // ── Mouse (desktop) ───────────────────────────────────────────────────────
  function handleMouseDown(e) {
    if (e.button !== 0) return;
    const td = touchData.current;
    td.startX      = td.lastX = e.clientX;
    td.startY      = td.lastY = e.clientY;
    td.moved       = false;
    td.holding     = true;
    td.pieceStartX = gs.current?.piece?.x ?? 0;
    clearInterval(td.dragInterval);
  }

  function handleMouseMove(e) {
    const td = touchData.current;
    if (!td.holding) return;
    td.lastX = e.clientX;
    td.lastY = e.clientY;

    const dy = td.lastY - td.startY;
    if (dy > 65 && !td.moved) {
      td.moved = true;
      hardDrop();
      return;
    }

    const state = gs.current;
    if (!state || !state.piece || state.paused || state.gameOver) return;
    const C          = cellRef.current;
    const dx         = td.lastX - td.startX;
    const cellOffset = Math.round(dx / C);
    if (cellOffset === 0) return;

    const targetX = td.pieceStartX + cellOffset;
    if (targetX !== state.piece.x) {
      const dir     = targetX > state.piece.x ? 1 : -1;
      let   steps   = Math.abs(targetX - state.piece.x);
      let   didMove = false;
      while (steps-- > 0 && isValidPosition(state.board, state.piece, dir, 0)) {
        state.piece.x += dir;
        didMove = true;
      }
      if (didMove) {
        td.moved = true;
        audio.playMove();
        drawBoard();
      }
    }
  }

  function handleMouseUp(e) {
    if (e.button !== 0) return;
    const td = touchData.current;
    if (!td.holding) return;
    clearInterval(td.dragInterval);
    td.holding = false;
    const { lastX, lastY, startX, startY, moved } = td;
    if (!moved && Math.abs(lastX - startX) < 10 && Math.abs(lastY - startY) < 30) {
      const rect = canvasRef.current?.getBoundingClientRect();
      if (rect) rotatePiece(e.clientX > rect.left + rect.width / 2 ? 1 : -1);
    }
  }

  function handleMouseLeave() {
    touchData.current.holding = false;
    clearInterval(touchData.current.dragInterval);
  }

  // ── Keyboard ──────────────────────────────────────────────────────────────
  useEffect(() => {
    function onKeyDown(e) {
      usingKeyboard.current = true;
      const state = gs.current;
      if (!state) return;
      switch (e.key) {
        case 'ArrowLeft':
          e.preventDefault();
          if (!state.paused && !state.gameOver && state.piece &&
              isValidPosition(state.board, state.piece, -1, 0)) {
            state.piece.x -= 1;
            audio.playMove();
            drawBoard();
          }
          break;
        case 'ArrowRight':
          e.preventDefault();
          if (!state.paused && !state.gameOver && state.piece &&
              isValidPosition(state.board, state.piece, 1, 0)) {
            state.piece.x += 1;
            audio.playMove();
            drawBoard();
          }
          break;
        case 'ArrowDown':
          e.preventDefault();
          if (!state.paused && !state.gameOver && state.piece) {
            if (isValidPosition(state.board, state.piece, 0, 1)) {
              state.piece.y += 1;
              drawBoard();
            } else {
              clearTimeout(tickTimer.current);
              lockPiece();
              if (!state.gameOver) scheduleTick();
            }
          }
          break;
        case 'ArrowUp':
        case 'x':
        case 'X':
          e.preventDefault();
          rotatePiece(1);
          break;
        case 'z':
        case 'Z':
          e.preventDefault();
          rotatePiece(-1);
          break;
        case ' ':
          e.preventDefault();
          hardDrop();
          break;
        case 'Escape':
        case 'p':
        case 'P':
          e.preventDefault();
          togglePause();
          break;
        default:
          break;
      }
    }
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // ── Render ────────────────────────────────────────────────────────────────
  const { score, level, lines, linesInLevel, paused, gameOver, hardDropFlash } = uiState;
  // `level` is 1-indexed in state; derive config without touching refs
  const levelCfg    = LEVELS[Math.min(level - 1, LEVELS.length - 1)];
  const progressPct = Math.min(100, (linesInLevel / levelCfg.lines) * 100);
  const boardW      = BOARD_WIDTH  * cell;
  const boardH      = BOARD_HEIGHT * cell;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', background: 'linear-gradient(160deg, #e8f4fd 0%, #f5f9ff 100%)', overflow: 'hidden' }}>
      {/* Top bar */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 14px', background: 'white', boxShadow: '0 2px 8px rgba(2,48,71,0.08)', flexShrink: 0 }}>
        <button onClick={togglePause} style={btnStyle(COLORS.skyBlue)}>
          {paused ? <PlayIcon /> : <PauseIcon />}
        </button>
        <div style={{ display: 'flex', gap: 14, alignItems: 'center' }}>
          <ScorePill label="SCORE" value={score.toLocaleString()} color={COLORS.orange} />
          <ScorePill label="LV"    value={level}                  color={COLORS.blueGreen} />
          <ScorePill label="LINES" value={lines}                  color={COLORS.deepSpace} />
        </div>
        <button onClick={onExit} style={btnStyle('#f0f0f0')}>
          <CloseIcon />
        </button>
      </div>

      {/* Canvas area — fills remaining space, ResizeObserver watches this */}
      <div ref={areaRef} style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', padding: '8px' }}>
        <div
          style={{
            position: 'relative', width: boardW, height: boardH,
            borderRadius: 8, overflow: 'hidden',
            boxShadow: `0 8px 40px rgba(2,48,71,0.18), 0 0 0 2px ${COLORS.skyBlue}`,
            background: hardDropFlash ? 'rgba(255,183,3,0.25)' : 'transparent',
            transition: 'background 0.1s',
            cursor: 'pointer',
            WebkitTapHighlightColor: 'transparent',
            userSelect: 'none',
            WebkitUserSelect: 'none',
          }}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseLeave}
        >
          <canvas ref={canvasRef} width={boardW} height={boardH} style={{ display: 'block', touchAction: 'none', userSelect: 'none' }} />
          <ParticleCanvas particles={particles} width={boardW} height={boardH} />
          <RowFlash flashingRows={flashingRows} cellSize={cell} boardX={0} />

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
              <OverlayBtn onClick={async () => {
                const playId = await onPlayAgain();
                if (playId) startGame();
              }} color={COLORS.orange}>PLAY AGAIN</OverlayBtn>
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

// ── Sub-components ────────────────────────────────────────────────────────────

function btnStyle(bg) {
  return { width: 40, height: 40, border: 'none', borderRadius: 12, background: bg, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 };
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
    <div onTouchStart={block} onTouchMove={block} onTouchEnd={block}
      onMouseDown={block} onMouseMove={block} onMouseUp={block} onClick={block}
      style={{ position: 'absolute', inset: 0, background: 'rgba(238,246,255,0.92)', backdropFilter: 'blur(8px)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', zIndex: 20 }}>
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

function PauseIcon() { return <svg width="18" height="18" viewBox="0 0 24 24" fill={COLORS.deepSpace}><rect x="5" y="3" width="4" height="18" rx="1"/><rect x="15" y="3" width="4" height="18" rx="1"/></svg>; }
function PlayIcon()  { return <svg width="18" height="18" viewBox="0 0 24 24" fill={COLORS.deepSpace}><polygon points="5,3 19,12 5,21"/></svg>; }
function CloseIcon() { return <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={COLORS.deepSpace} strokeWidth="2.5" strokeLinecap="round"><path d="M18 6L6 18M6 6l12 12"/></svg>; }
