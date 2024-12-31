import React from "react";
import { createBrowserRouter } from "react-router-dom";
import Index from "@/pages/Index";
import About from "@/pages/About";
import TetrisGame from "@/pages/TetrisGame";
import SudokuGame from "@/pages/SudokuGame";
import CrosswordGame from "@/pages/CrosswordGame";
import TowerOfHanoi from "@/pages/TowerOfHanoi";
import TicTacToe from "@/pages/TicTacToe";

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
]);

export default router;
