import React from "react";
import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { 
  Brain, 
  Grid3X3, 
  Tetris, 
  CrosshairIcon, 
  TowerControl,
  Hash,
  Puzzle,
  Maze,
  Gamepad2,
  Sparkles,
  Zap,
  Binary,
  CircuitBoard
} from "lucide-react";

interface NavItem {
  path: string;
  label: string;
  icon: React.ReactNode;
}

const navItems: NavItem[] = [
  { path: "/tetris", label: "Tetris", icon: <Tetris className="w-5 h-5" /> },
  { path: "/sudoku", label: "Sudoku", icon: <Grid3X3 className="w-5 h-5" /> },
  { path: "/crossword", label: "Crossword", icon: <CrosshairIcon className="w-5 h-5" /> },
  { path: "/tower-of-hanoi", label: "Tower of Hanoi", icon: <TowerControl className="w-5 h-5" /> },
  { path: "/tic-tac-toe", label: "Tic Tac Toe", icon: <Hash className="w-5 h-5" /> },
  { path: "/jigsaw-puzzle", label: "Jigsaw Puzzle", icon: <Puzzle className="w-5 h-5" /> },
  { path: "/mind-maze", label: "Mind Maze", icon: <Maze className="w-5 h-5" /> },
  { path: "/puzzle-fusion", label: "Puzzle Fusion", icon: <Gamepad2 className="w-5 h-5" /> },
  { path: "/brainy-quest", label: "Brainy Quest", icon: <Brain className="w-5 h-5" /> },
  { path: "/cerebro-challenge", label: "Cerebro Challenge", icon: <Sparkles className="w-5 h-5" /> },
  { path: "/logic-loop", label: "Logic Loop", icon: <CircuitBoard className="w-5 h-5" /> },
];

const GameNavigation = () => {
  const location = useLocation();

  return (
    <nav className="fixed top-0 left-0 h-screen w-64 bg-gradient-to-b from-game-primary to-game-secondary p-6 overflow-y-auto">
      <div className="flex flex-col space-y-8">
        <Link to="/" className="flex items-center gap-2">
          <Brain className="w-8 h-8 text-game-accent" />
          <span className="text-xl font-bold text-white">Mind Marvels</span>
        </Link>

        <div className="space-y-2">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                  isActive
                    ? "bg-game-accent text-white"
                    : "text-white/70 hover:bg-white/10"
                }`}
              >
                {item.icon}
                <span>{item.label}</span>
                {isActive && (
                  <motion.div
                    layoutId="active-nav"
                    className="absolute left-0 w-1 h-8 bg-white rounded-r-full"
                    initial={false}
                    transition={{
                      type: "spring",
                      stiffness: 500,
                      damping: 30,
                    }}
                  />
                )}
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
};

export default GameNavigation;