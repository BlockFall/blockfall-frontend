import { BOARD_WIDTH, BOARD_HEIGHT, TETROMINOES, TETROMINO_KEYS } from './constants';

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

  return {
    type:  key,
    shape: TETROMINOES[key].shape.map(row => [...row]),
    color: TETROMINOES[key].color,
    x:     Math.floor(BOARD_WIDTH / 2) - Math.floor(TETROMINOES[key].shape[0].length / 2),
    y:     0,
  };
}

export function rotate(shape, dir = 1) {
  const rows = shape.length;
  const cols = shape[0].length;
  const rotated = Array.from({ length: cols }, () => Array(rows).fill(0));
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      if (dir === 1) {
        rotated[c][rows - 1 - r] = shape[r][c];
      } else {
        rotated[cols - 1 - c][r] = shape[r][c];
      }
    }
  }
  return rotated;
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
