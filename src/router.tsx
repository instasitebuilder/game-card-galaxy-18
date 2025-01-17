import { createBrowserRouter } from "react-router-dom";
import Index from "./pages/Index";
import TetrisGame from "./pages/TetrisGame";
import SudokuGame from "./pages/SudokuGame";
import CrosswordGame from "./pages/CrosswordGame";
import TowerOfHanoi from "./pages/TowerOfHanoi";
import TicTacToe from "./pages/TicTacToe";
import JigsawPuzzle from "./pages/JigsawPuzzle";
import MindMaze from "./pages/MindMaze";
import PuzzleFusion from "./pages/PuzzleFusion";
import BrainyQuest from "./pages/BrainyQuest";
import CerebroChallenge from "./pages/CerebroChallenge";
import LogicLoop from "./pages/LogicLoop";
import GoGame from "./pages/GoGame";
import ScrabbleGame from "./pages/ScrabbleGame";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Index />,
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
    path: "/puzzle-fusion",
    element: <PuzzleFusion />,
  },
  {
    path: "/brainy-quest",
    element: <BrainyQuest />,
  },
  {
    path: "/cerebro-challenge",
    element: <CerebroChallenge />,
  },
  {
    path: "/logic-loop",
    element: <LogicLoop />,
  },
  {
    path: "/go-game",
    element: <GoGame />,
  },
  {
    path: "/scrabble",
    element: <ScrabbleGame />,
  },
]);

export default router;