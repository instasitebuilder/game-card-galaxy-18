import React from "react";
import { createBrowserRouter } from "react-router-dom";
import Index from "@/pages/Index";
import About from "@/pages/About";
import TetrisGame from "@/pages/TetrisGame";
import SudokuGame from "@/pages/SudokuGame";
import CrosswordGame from "@/pages/CrosswordGame";
import TowerOfHanoi from "@/pages/TowerOfHanoi";
import TicTacToe from "@/pages/TicTacToe";
import JigsawPuzzle from "@/pages/JigsawPuzzle";
import MindMaze from "@/pages/MindMaze";
import FutureGames from "@/pages/FutureGames";
import PuzzleFusion from "@/pages/PuzzleFusion";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Index />,
  },
  {
    path: "/about",
    element: <About />,
  },
  {
    path: "/tetris",
    element: <TetrisGame />,
  },
  {
    path: "/sudoku",
    element: <SudokuGame />,
  },
  {
    path: "/crossword",
    element: <CrosswordGame />,
  },
  {
    path: "/tower-of-hanoi",
    element: <TowerOfHanoi />,
  },
  {
    path: "/tic-tac-toe",
    element: <TicTacToe />,
  },
  {
    path: "/jigsaw-puzzle",
    element: <JigsawPuzzle />,
  },
  {
    path: "/mind-maze",
    element: <MindMaze />,
  },
  {
    path: "/future-games",
    element: <FutureGames />,
  },
  {
    path: "/puzzle-fusion",
    element: <PuzzleFusion />,
  },
]);

export default router;