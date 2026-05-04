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

// SRS rotation states: index 0 = spawn, 1 = clockwise, 2 = 180, 3 = counter-clockwise.
// `shape` is the spawn-state shape and is kept for animations / non-game previews.
// `shapes` is the full SRS state set used by the rotation engine.
export const TETROMINOES = {
  I: {
    color: COLORS.blueGreen,
    shape: [[1, 1, 1, 1]],
    shapes: [
      [[0,0,0,0],[1,1,1,1],[0,0,0,0],[0,0,0,0]],
      [[0,0,1,0],[0,0,1,0],[0,0,1,0],[0,0,1,0]],
      [[0,0,0,0],[0,0,0,0],[1,1,1,1],[0,0,0,0]],
      [[0,1,0,0],[0,1,0,0],[0,1,0,0],[0,1,0,0]],
    ],
  },
  O: {
    color: COLORS.amber,
    shape: [[1, 1], [1, 1]],
    shapes: [
      [[1,1],[1,1]],
      [[1,1],[1,1]],
      [[1,1],[1,1]],
      [[1,1],[1,1]],
    ],
  },
  T: {
    color: COLORS.orange,
    shape: [[0, 1, 0], [1, 1, 1]],
    shapes: [
      [[0,1,0],[1,1,1],[0,0,0]],
      [[0,1,0],[0,1,1],[0,1,0]],
      [[0,0,0],[1,1,1],[0,1,0]],
      [[0,1,0],[1,1,0],[0,1,0]],
    ],
  },
  L: {
    color: COLORS.skyBlue,
    shape: [[1, 0], [1, 0], [1, 1]],
    shapes: [
      [[0,0,1],[1,1,1],[0,0,0]],
      [[0,1,0],[0,1,0],[0,1,1]],
      [[0,0,0],[1,1,1],[1,0,0]],
      [[1,1,0],[0,1,0],[0,1,0]],
    ],
  },
  J: {
    color: COLORS.copperWood,
    shape: [[0, 1], [0, 1], [1, 1]],
    shapes: [
      [[1,0,0],[1,1,1],[0,0,0]],
      [[0,1,1],[0,1,0],[0,1,0]],
      [[0,0,0],[1,1,1],[0,0,1]],
      [[0,1,0],[0,1,0],[1,1,0]],
    ],
  },
  S: {
    color: COLORS.deepSpace,
    shape: [[0, 1, 1], [1, 1, 0]],
    shapes: [
      [[0,1,1],[1,1,0],[0,0,0]],
      [[0,1,0],[0,1,1],[0,0,1]],
      [[0,0,0],[0,1,1],[1,1,0]],
      [[1,0,0],[1,1,0],[0,1,0]],
    ],
  },
  Z: {
    color: COLORS.brightMarine,
    shape: [[1, 1, 0], [0, 1, 1]],
    shapes: [
      [[1,1,0],[0,1,1],[0,0,0]],
      [[0,0,1],[0,1,1],[0,1,0]],
      [[0,0,0],[1,1,0],[0,1,1]],
      [[0,1,0],[1,1,0],[1,0,0]],
    ],
  },
};

// SRS wall-kick offsets, in screen coordinates (+y is down).
// Indexed by `${fromState}>${toState}`. Each entry is a list of [dx, dy] tests
// applied in order; the first test that yields a valid placement wins.
export const SRS_KICKS_JLSTZ = {
  '0>1': [[0,0],[-1,0],[-1,-1],[0,2],[-1,2]],
  '1>0': [[0,0],[1,0],[1,1],[0,-2],[1,-2]],
  '1>2': [[0,0],[1,0],[1,1],[0,-2],[1,-2]],
  '2>1': [[0,0],[-1,0],[-1,-1],[0,2],[-1,2]],
  '2>3': [[0,0],[1,0],[1,-1],[0,2],[1,2]],
  '3>2': [[0,0],[-1,0],[-1,1],[0,-2],[-1,-2]],
  '3>0': [[0,0],[-1,0],[-1,1],[0,-2],[-1,-2]],
  '0>3': [[0,0],[1,0],[1,-1],[0,2],[1,2]],
};

export const SRS_KICKS_I = {
  '0>1': [[0,0],[-2,0],[1,0],[-2,1],[1,-2]],
  '1>0': [[0,0],[2,0],[-1,0],[2,-1],[-1,2]],
  '1>2': [[0,0],[-1,0],[2,0],[-1,-2],[2,1]],
  '2>1': [[0,0],[1,0],[-2,0],[1,2],[-2,-1]],
  '2>3': [[0,0],[2,0],[-1,0],[2,-1],[-1,2]],
  '3>2': [[0,0],[-2,0],[1,0],[-2,1],[1,-2]],
  '3>0': [[0,0],[1,0],[-2,0],[1,2],[-2,-1]],
  '0>3': [[0,0],[-1,0],[2,0],[-1,-2],[2,1]],
};

export const TETROMINO_KEYS = Object.keys(TETROMINOES);

// Level config: lines to advance, speed (ms per tick), score multiplier
export const LEVELS = [
  { lines: 10, speedTouch: 750, speedKeyboard: 700, multiplier: 1 },
  { lines: 10, speedTouch: 600, speedKeyboard: 570, multiplier: 2 },
  { lines: 10, speedTouch: 477, speedKeyboard: 455, multiplier: 3 },
  { lines: 10, speedTouch: 381, speedKeyboard: 360, multiplier: 4 },
  { lines: 10, speedTouch: 305, speedKeyboard: 285, multiplier: 5 },
  { lines: 10, speedTouch: 244, speedKeyboard: 225, multiplier: 6 },
  { lines: 10, speedTouch: 195, speedKeyboard: 175, multiplier: 7 },
  { lines: 10, speedTouch: 157, speedKeyboard: 135, multiplier: 8 },
  { lines: 10, speedTouch: 125, speedKeyboard: 105, multiplier: 9 },
  { lines: 10, speedTouch: 100, speedKeyboard: 80,  multiplier: 10 },
];

export const BASE_SCORE = {
  1: 100,
  2: 250,
  3: 500,
  4: 800,
};

export const HARD_DROP_SCORE = 2;
