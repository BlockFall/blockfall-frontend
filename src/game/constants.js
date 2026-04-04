export const BOARD_WIDTH = 10;
export const BOARD_HEIGHT = 20;
export const CELL_SIZE = 32;

export const COLORS = {
  skyBlue: '#8ecae6',
  blueGreen: '#219ebc',
  deepSpace: '#023047',
  amber: '#ffb703',
  orange: '#fb8500',
};

// 5 Tetromino shapes
export const TETROMINOES = {
  I: {
    shape: [[1, 1, 1, 1]],
    color: COLORS.blueGreen,
  },
  O: {
    shape: [
      [1, 1],
      [1, 1],
    ],
    color: COLORS.amber,
  },
  T: {
    shape: [
      [0, 1, 0],
      [1, 1, 1],
    ],
    color: COLORS.orange,
  },
  L: {
    shape: [
      [1, 0],
      [1, 0],
      [1, 1],
    ],
    color: COLORS.skyBlue,
  },
  J: {
    shape: [
      [0, 1],
      [0, 1],
      [1, 1],
    ],
    color: COLORS.skyBlue,
  },
  S: {
    shape: [
      [0, 1, 1],
      [1, 1, 0],
    ],
    color: COLORS.deepSpace,
  },
  Z: {
    shape: [
      [1, 1, 0],
      [0, 1, 1],
    ],
    color: COLORS.deepSpace,
  }
};

export const TETROMINO_KEYS = Object.keys(TETROMINOES);

// Level config: lines to advance, speed (ms per tick), score multiplier
export const LEVELS = [
  { lines: 10, speed: 800, multiplier: 1 },
  { lines: 10, speed: 650, multiplier: 1.5 },
  { lines: 10, speed: 500, multiplier: 2 },
  { lines: 10, speed: 400, multiplier: 2.5 },
  { lines: 10, speed: 300, multiplier: 3 },
  { lines: 10, speed: 220, multiplier: 4 },
  { lines: 10, speed: 160, multiplier: 5 },
  { lines: 10, speed: 120, multiplier: 6 },
  { lines: 10, speed: 90,  multiplier: 7 },
  { lines: 10, speed: 70,  multiplier: 8 },
];

export const BASE_SCORE = {
  1: 100,
  2: 300,
  3: 700,
  4: 1500,
};

export const HARD_DROP_SCORE = 2;
