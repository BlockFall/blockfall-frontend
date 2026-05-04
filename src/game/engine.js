import {
  BOARD_WIDTH,
  BOARD_HEIGHT,
  TETROMINOES,
  TETROMINO_KEYS,
  SRS_KICKS_JLSTZ,
  SRS_KICKS_I,
} from './constants';

export function createEmptyBoard() {
  return Array.from({ length: BOARD_HEIGHT }, () => Array(BOARD_WIDTH).fill(null));
}

// 7-bag randomizer: shuffle all keys into a bag, deal one at a time, refill when empty.
const pieceHistory = {
  bag: [],
};

export function resetPieceHistory() {
  pieceHistory.bag = [];
}

function refillBag() {
  const bag = TETROMINO_KEYS.slice();
  for (let i = bag.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [bag[i], bag[j]] = [bag[j], bag[i]];
  }
  pieceHistory.bag = bag;
}

export function randomTetromino() {
  if (pieceHistory.bag.length === 0) refillBag();
  const key = pieceHistory.bag.pop();
  const spawnShape = TETROMINOES[key].shapes[0];

  return {
    type:     key,
    rotation: 0,
    shape:    spawnShape.map(row => [...row]),
    color:    TETROMINOES[key].color,
    x:        Math.floor(BOARD_WIDTH / 2) - Math.floor(spawnShape[0].length / 2),
    y:        0,
  };
}

// SRS rotation with wall kicks. Returns a new piece on success, or null if every
// kick test collides. Direction: 1 = clockwise, -1 = counter-clockwise.
export function tryRotate(board, piece, dir = 1) {
  if (piece.type === 'O') return piece;
  const from = piece.rotation ?? 0;
  const to   = (from + (dir === 1 ? 1 : 3)) % 4;
  const shape = TETROMINOES[piece.type].shapes[to];
  const table = piece.type === 'I' ? SRS_KICKS_I : SRS_KICKS_JLSTZ;
  const kicks = table[`${from}>${to}`];
  for (const [dx, dy] of kicks) {
    const test = { ...piece, shape, rotation: to, x: piece.x + dx, y: piece.y + dy };
    if (isValidPosition(board, test)) return test;
  }
  return null;
}

export function isValidPosition(board, piece, offsetX = 0, offsetY = 0) {
  const shape = piece.shape;
  for (let r = 0; r < shape.length; r++) {
    for (let c = 0; c < shape[r].length; c++) {
      if (!shape[r][c]) continue;
      const newX = piece.x + c + offsetX;
      const newY = piece.y + r + offsetY;
      if (newX < 0 || newX >= BOARD_WIDTH) return false;
      if (newY >= BOARD_HEIGHT) return false;
      if (newY < 0) continue;
      if (board[newY][newX]) return false;
    }
  }
  return true;
}

export function placePiece(board, piece) {
  const newBoard = board.map(row => [...row]);
  const shape = piece.shape;
  for (let r = 0; r < shape.length; r++) {
    for (let c = 0; c < shape[r].length; c++) {
      if (!shape[r][c]) continue;
      const y = piece.y + r;
      const x = piece.x + c;
      if (y >= 0 && y < BOARD_HEIGHT && x >= 0 && x < BOARD_WIDTH) {
        newBoard[y][x] = piece.color;
      }
    }
  }
  return newBoard;
}

export function clearLines(board) {
  const clearedRows = [];
  const remaining = board.filter((row, i) => {
    if (row.every(cell => cell !== null)) {
      clearedRows.push(i);
      return false;
    }
    return true;
  });
  const newRows = Array.from({ length: clearedRows.length }, () => Array(BOARD_WIDTH).fill(null));
  return { board: [...newRows, ...remaining], clearedRows };
}

export function getDropPosition(board, piece) {
  let dropY = 0;
  while (isValidPosition(board, piece, 0, dropY + 1)) {
    dropY++;
  }
  return dropY;
}

export function isGameOver(board, piece) {
  return !isValidPosition(board, piece);
}
