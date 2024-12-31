import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { toast } from '@/hooks/use-toast';
import { motion, AnimatePresence } from 'framer-motion';

interface Disc {
  size: number;
  color: string;
}

interface GameState {
  pegs: Disc[][];
  selectedDisc: { pegIndex: number; discIndex: number } | null;
  moves: number;
  isComplete: boolean;
}

const DISC_COLORS = [
  'bg-red-500',
  'bg-blue-500',
  'bg-green-500',
  'bg-yellow-500',
  'bg-purple-500',
  'bg-pink-500',
  'bg-orange-500',
];

const TowerOfHanoi = () => {
  const [gameStarted, setGameStarted] = useState(false);
  const [numDiscs, setNumDiscs] = useState(3);
  const [gameState, setGameState] = useState<GameState>({
    pegs: [[], [], []],
    selectedDisc: null,
    moves: 0,
    isComplete: false,
  });

  const calculateOptimalMoves = (discs: number) => Math.pow(2, discs) - 1;

  const initializeGame = (discs: number) => {
    const initialPegs: Disc[][] = [
      Array.from({ length: discs }, (_, i) => ({
        size: discs - i,
        color: DISC_COLORS[i % DISC_COLORS.length],
      })),
      [],
      [],
    ];

    setGameState({
      pegs: initialPegs,
      selectedDisc: null,
      moves: 0,
      isComplete: false,
    });
    setGameStarted(true);
  };

  const handleDiscClick = (pegIndex: number, discIndex: number) => {
    if (gameState.isComplete) return;

    if (gameState.selectedDisc === null) {
      // Only allow selecting top disc
      if (discIndex === gameState.pegs[pegIndex].length - 1) {
        setGameState({
          ...gameState,
          selectedDisc: { pegIndex, discIndex },
        });
      }
    } else {
      handleMove(pegIndex);
    }
  };

  const handleMove = (targetPegIndex: number) => {
    if (!gameState.selectedDisc) return;

    const { pegIndex: sourcePegIndex, discIndex } = gameState.selectedDisc;
    const sourceDisc = gameState.pegs[sourcePegIndex][discIndex];
    const targetPeg = gameState.pegs[targetPegIndex];

    // Check if move is valid
    if (targetPeg.length === 0 || sourceDisc.size < targetPeg[targetPeg.length - 1].size) {
      const newPegs = gameState.pegs.map((peg, i) => {
        if (i === sourcePegIndex) {
          return peg.slice(0, -1);
        }
        if (i === targetPegIndex) {
          return [...peg, sourceDisc];
        }
        return peg;
      });

      const newMoves = gameState.moves + 1;
      const isComplete = targetPegIndex === 2 && newPegs[2].length === numDiscs;

      if (isComplete) {
        toast({
          title: "Congratulations! 🎉",
          description: `You solved the puzzle in ${newMoves} moves! (Optimal: ${calculateOptimalMoves(numDiscs)})`,
        });
      }

      setGameState({
        pegs: newPegs,
        selectedDisc: null,
        moves: newMoves,
        isComplete,
      });
    } else {
      toast({
        title: "Invalid Move",
        description: "You cannot place a larger disc on top of a smaller one!",
        variant: "destructive",
      });
      setGameState({
        ...gameState,
        selectedDisc: null,
      });
    }
  };

  const resetGame = () => {
    initializeGame(numDiscs);
  };

  return (
    <div className="min-h-screen bg-game-background text-white p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-8">Tower of Hanoi</h1>
        
        {!gameStarted ? (
          <div className="text-center space-y-6">
            <div className="space-y-4">
              <h2 className="text-2xl font-semibold mb-4">Select Number of Discs</h2>
              <div className="flex justify-center gap-4">
                {[3, 4, 5, 6, 7].map((n) => (
                  <Button
                    key={n}
                    onClick={() => setNumDiscs(n)}
                    variant={numDiscs === n ? "default" : "outline"}
                    className="w-12 h-12"
                  >
                    {n}
                  </Button>
                ))}
              </div>
            </div>
            <Button
              size="lg"
              onClick={() => initializeGame(numDiscs)}
              className="px-8 py-4 text-lg"
            >
              Start Game
            </Button>
          </div>
        ) : (
          <div className="space-y-8">
            <div className="flex justify-between items-center mb-8">
              <div className="space-y-2">
                <p className="text-lg">Moves: {gameState.moves}</p>
                <p className="text-sm text-gray-400">
                  Optimal moves: {calculateOptimalMoves(numDiscs)}
                </p>
              </div>
              <Button onClick={resetGame}>Reset Game</Button>
            </div>

            <div className="relative flex justify-around items-end h-[400px]">
              {gameState.pegs.map((peg, pegIndex) => (
                <div key={pegIndex} className="relative flex flex-col items-center">
                  {/* Peg */}
                  <div className="absolute bottom-0 w-2 h-[300px] bg-gray-600 rounded-t-lg" />
                  
                  {/* Base */}
                  <div className="absolute bottom-0 w-32 h-2 bg-gray-600 -translate-x-1/2 left-1/2" />
                  
                  {/* Discs */}
                  <div className="relative w-full h-[300px] flex flex-col-reverse items-center justify-end">
                    <AnimatePresence>
                      {peg.map((disc, discIndex) => (
                        <motion.div
                          key={`${disc.size}-${pegIndex}-${discIndex}`}
                          initial={{ scale: 0.8, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          exit={{ scale: 0.8, opacity: 0 }}
                          className={`absolute cursor-pointer transition-transform
                            ${disc.color} 
                            ${gameState.selectedDisc?.pegIndex === pegIndex && 
                              gameState.selectedDisc?.discIndex === discIndex
                                ? 'ring-4 ring-white'
                                : ''
                            }`}
                          style={{
                            width: `${disc.size * 40}px`,
                            height: '30px',
                            borderRadius: '15px',
                            bottom: `${discIndex * 35}px`,
                          }}
                          onClick={() => handleDiscClick(pegIndex, discIndex)}
                        />
                      ))}
                    </AnimatePresence>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TowerOfHanoi;