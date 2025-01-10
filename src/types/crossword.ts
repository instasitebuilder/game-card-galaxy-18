export type Direction = "across" | "down";

export interface Clue {
  number: number;
  text: string;
  answer: string;
  direction: Direction;
  startRow: number;
  startCol: number;
}

export type Difficulty = "level1" | "level2" | "level3" | "level4" | "level5" | "level6" | "level7" | "level8" | "level9" | "level10";

export interface Puzzle {
  size: number;
  clues: Clue[];
}

export interface PuzzleCollection {
  [key: string]: Puzzle;
}