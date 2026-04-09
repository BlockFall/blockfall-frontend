export const BOARD_WIDTH = 10;
export const BOARD_HEIGHT = 21;
export const CELL_SIZE = 32;

export const COLORS = {
  skyBlue: '#8ecae6',
  blueGreen: '#219ebc',
  deepSpace: '#023047',
  amber: '#ffb703',
  orange: '#fb8500',
  copperWood: '#b1740f',
  brightMarine: '#296eb4',
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
    color: COLORS.copperWood,
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
    color: COLORS.brightMarine,
  }
};

export const TETROMINO_KEYS = Object.keys(TETROMINOES);

// Level config: lines to advance, speed (ms per tick), score multiplier
export const LEVELS = [
  { lines: 10, speedTouch: 750, speedKeyboard: 700, multiplier: 1 },
  { lines: 10, speedTouch: 600, speedKeyboard: 570, multiplier: 1.5 },
  { lines: 10, speedTouch: 477, speedKeyboard: 455, multiplier: 2 },
  { lines: 10, speedTouch: 381, speedKeyboard: 360, multiplier: 2.5 },
  { lines: 10, speedTouch: 305, speedKeyboard: 285, multiplier: 3 },
  { lines: 10, speedTouch: 244, speedKeyboard: 225, multiplier: 4.1 },
  { lines: 10, speedTouch: 195, speedKeyboard: 175, multiplier: 5.3 },
  { lines: 10, speedTouch: 157, speedKeyboard: 135, multiplier: 6.7 },
  { lines: 10, speedTouch: 125, speedKeyboard: 105, multiplier: 8.2 },
  { lines: 10, speedTouch: 100, speedKeyboard: 80,  multiplier: 10 },
];

export const BASE_SCORE = {
  1: 100,
  2: 250,
  3: 500,
  4: 800,
};

export const HARD_DROP_SCORE = 2;
