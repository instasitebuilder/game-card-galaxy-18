export const BOARD_WIDTH = 10;
export const BOARD_HEIGHT = 20;
export const INITIAL_SPEED = 1000;

export const TETROMINOS = {
  I: {
    shape: [[1, 1, 1, 1]],
    color: 1,
  },
  L: {
    shape: [
      [1, 0],
      [1, 0],
      [1, 1],
    ],
    color: 2,
  },
  J: {
    shape: [
      [0, 1],
      [0, 1],
      [1, 1],
    ],
    color: 3,
  },
  O: {
    shape: [
      [1, 1],
      [1, 1],
    ],
    color: 4,
  },
  Z: {
    shape: [
      [1, 1, 0],
      [0, 1, 1],
    ],
    color: 5,
  },
  S: {
    shape: [
      [0, 1, 1],
      [1, 1, 0],
    ],
    color: 6,
  },
  T: {
    shape: [
      [1, 1, 1],
      [0, 1, 0],
    ],
    color: 7,
  },
};

export const checkCollision = (
  piece: { shape: number[][]; position: { x: number; y: number }; color: number } | null,
  board: number[][]
) => {
  if (!piece) return false;

  return piece.shape.some((row, dy) =>
    row.some((value, dx) => {
      if (value !== 0) {
        const newY = piece.position.y + dy;
        const newX = piece.position.x + dx;
        return (
          newX < 0 ||
          newX >= BOARD_WIDTH ||
          newY >= BOARD_HEIGHT ||
          (newY >= 0 && board[newY][newX] !== 0)
        );
      }
      return false;
    })
  );
};

export const mergeBoard = (
  board: number[][],
  piece: { shape: number[][]; position: { x: number; y: number }; color: number } | null
) => {
  if (!piece) return board;

  const newBoard = board.map(row => [...row]);
  piece.shape.forEach((row, y) => {
    row.forEach((value, x) => {
      if (value !== 0) {
        const boardY = y + piece.position.y;
        const boardX = x + piece.position.x;
        if (boardY >= 0 && boardY < BOARD_HEIGHT && boardX >= 0 && boardX < BOARD_WIDTH) {
          newBoard[boardY][boardX] = piece.color;
        }
      }
    });
  });
  return newBoard;
};

export const rotatePiece = (piece: { shape: number[][]; position: { x: number; y: number }; color: number }) => {
  // Transpose the matrix and reverse each row to rotate 90 degrees clockwise
  const rotatedShape = piece.shape[0].map((_, index) =>
    piece.shape.map(row => row[index]).reverse()
  );
  
  return {
    ...piece,
    shape: rotatedShape,
  };
};

export const clearLines = (board: number[][]) => {
  let linesCleared = 0;
  const newBoard = board.filter(row => {
    const isLineFull = row.every(cell => cell !== 0);
    if (isLineFull) linesCleared++;
    return !isLineFull;
  });

  // Add new empty lines at the top
  while (newBoard.length < BOARD_HEIGHT) {
    newBoard.unshift(Array(BOARD_WIDTH).fill(0));
  }

  return { newBoard, linesCleared };
};

export const calculateScore = (linesCleared: number, level: number) => {
  const basePoints = {
    1: 100,
    2: 300,
    3: 500,
    4: 800,
  };
  return (basePoints[linesCleared as keyof typeof basePoints] || 0) * level;
};

export const calculateLevel = (lines: number) => {
  return Math.floor(lines / 10) + 1;
};

export const calculateSpeed = (level: number) => {
  return Math.max(100, INITIAL_SPEED - (level - 1) * 100); // Speed increases with level
};