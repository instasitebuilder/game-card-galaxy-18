import React, { useState, useEffect } from 'react';
import { useToast } from "@/hooks/use-toast";
import { motion } from "framer-motion";
import GameInstructions from './GameInstructions';

type GemType = 'red' | 'blue' | 'green' | 'yellow' | 'purple';
type BoardType = GemType[][];

const BOARD_SIZE = 8;
const MATCH_MIN = 3;

const Match3Game = () => {
  const { toast } = useToast();
  const [score, setScore] = useState(0);
  const [board, setBoard] = useState<BoardType>([]);
  const [selectedGem, setSelectedGem] = useState<{x: number, y: number} | null>(null);
  
  // Initialize board
  useEffect(() => {
    initializeBoard();
  }, []);

  const initializeBoard = () => {
    const gems: GemType[] = ['red', 'blue', 'green', 'yellow', 'purple'];
    const newBoard: BoardType = [];
    
    for (let i = 0; i < BOARD_SIZE; i++) {
      newBoard[i] = [];
      for (let j = 0; j < BOARD_SIZE; j++) {
        newBoard[i][j] = gems[Math.floor(Math.random() * gems.length)];
      }
    }
    
    setBoard(newBoard);
  };

  const handleGemClick = (x: number, y: number) => {
    if (!selectedGem) {
      setSelectedGem({ x, y });
    } else {
      // Check if adjacent
      const isAdjacent = 
        (Math.abs(selectedGem.x - x) === 1 && selectedGem.y === y) ||
        (Math.abs(selectedGem.y - y) === 1 && selectedGem.x === x);

      if (isAdjacent) {
        swapGems(selectedGem, { x, y });
      }
      
      setSelectedGem(null);
    }
  };

  const swapGems = (gem1: {x: number, y: number}, gem2: {x: number, y: number}) => {
    const newBoard = [...board];
    const temp = newBoard[gem1.x][gem1.y];
    newBoard[gem1.x][gem1.y] = newBoard[gem2.x][gem2.y];
    newBoard[gem2.x][gem2.y] = temp;
    
    // Check for matches after swap
    const matches = findMatches(newBoard);
    if (matches.length > 0) {
      setBoard(newBoard);
      handleMatches(matches);
      setScore(prev => prev + (matches.length * 100));
      toast({
        title: "Match Found!",
        description: `+${matches.length * 100} points`,
        duration: 1500,
      });
    } else {
      // Swap back if no matches
      setTimeout(() => {
        const revertBoard = [...newBoard];
        revertBoard[gem1.x][gem1.y] = temp;
        revertBoard[gem2.x][gem2.y] = newBoard[gem1.x][gem1.y];
        setBoard(revertBoard);
      }, 500);
    }
  };

  const findMatches = (currentBoard: BoardType) => {
    const matches: {x: number, y: number}[] = [];
    
    // Check horizontal matches
    for (let i = 0; i < BOARD_SIZE; i++) {
      for (let j = 0; j < BOARD_SIZE - 2; j++) {
        if (
          currentBoard[i][j] === currentBoard[i][j + 1] &&
          currentBoard[i][j] === currentBoard[i][j + 2]
        ) {
          matches.push({x: i, y: j}, {x: i, y: j + 1}, {x: i, y: j + 2});
        }
      }
    }
    
    // Check vertical matches
    for (let i = 0; i < BOARD_SIZE - 2; i++) {
      for (let j = 0; j < BOARD_SIZE; j++) {
        if (
          currentBoard[i][j] === currentBoard[i + 1][j] &&
          currentBoard[i][j] === currentBoard[i + 2][j]
        ) {
          matches.push({x: i, y: j}, {x: i + 1, y: j}, {x: i + 2, y: j});
        }
      }
    }
    
    return matches;
  };

  const handleMatches = (matches: {x: number, y: number}[]) => {
    const newBoard = [...board];
    
    // Remove matched gems
    matches.forEach(({x, y}) => {
      // Shift gems down
      for (let i = x; i > 0; i--) {
        newBoard[i][y] = newBoard[i - 1][y];
      }
      // Add new gem at top
      const gems: GemType[] = ['red', 'blue', 'green', 'yellow', 'purple'];
      newBoard[0][y] = gems[Math.floor(Math.random() * gems.length)];
    });
    
    setBoard(newBoard);
    
    // Check for new matches after gems fall
    setTimeout(() => {
      const newMatches = findMatches(newBoard);
      if (newMatches.length > 0) {
        handleMatches(newMatches);
        setScore(prev => prev + (newMatches.length * 100));
      }
    }, 300);
  };

  return (
    <div className="flex flex-col items-center gap-8 p-4">
      <div className="text-2xl font-bold text-white">Score: {score}</div>
      
      <GameInstructions gameType="match3" />
      
      <div className="grid gap-1 p-4 bg-gradient-card backdrop-blur-sm rounded-xl border border-game-card-border">
        {board.map((row, x) => (
          <div key={x} className="flex gap-1">
            {row.map((gem, y) => (
              <motion.button
                key={`${x}-${y}`}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => handleGemClick(x, y)}
                className={`w-12 h-12 rounded-lg transition-all duration-200 ${
                  selectedGem?.x === x && selectedGem?.y === y
                    ? 'ring-4 ring-game-accent'
                    : ''
                }`}
                style={{
                  background: `var(--${gem}-gradient, ${
                    gem === 'red' ? 'linear-gradient(to bottom right, #ff6b6b, #ee5253)'
                    : gem === 'blue' ? 'linear-gradient(to bottom right, #48dbfb, #0abde3)'
                    : gem === 'green' ? 'linear-gradient(to bottom right, #1dd1a1, #10ac84)'
                    : gem === 'yellow' ? 'linear-gradient(to bottom right, #ffd32a, #ffa502)'
                    : 'linear-gradient(to bottom right, #9c88ff, #8c7ae6)'
                  })`
                }}
              />
            ))}
          </div>
        ))}
      </div>

      <button
        onClick={initializeBoard}
        className="px-6 py-3 bg-game-accent text-white rounded-lg hover:bg-game-accent/90 transition-colors"
      >
        Reset Game
      </button>
    </div>
  );
};

export default Match3Game;
