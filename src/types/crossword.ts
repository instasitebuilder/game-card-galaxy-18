export type Direction = "down" | "across";

export interface Clue {
  number: number;
  text: string;
  answer: string;
  direction: Direction;
  startRow: number;
  startCol: number;
}

export interface Puzzle {
  size: number;
  clues: Clue[];
}

export type Difficulty = "easy" | "medium" | "hard";

export interface PuzzleCollection {
  [key: string]: Puzzle;
}