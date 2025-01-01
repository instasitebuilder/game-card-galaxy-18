import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { toast } from '@/hooks/use-toast';
import { motion, AnimatePresence } from 'framer-motion';
import GameInstructions from '@/components/hanoi/GameInstructions';
import GameControls from '@/components/hanoi/GameControls';
import GameLayout from '@/components/layouts/GameLayout';

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
  'bg-game-secondary',
  'bg-game-accent',
  'bg-blue-500',
  'bg-green-500',
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

  const handleMove = (sourcePegIndex: number, targetPegIndex: number) => {
    if (gameState.isComplete) return;

    const sourcePeg = gameState.pegs[sourcePegIndex];
    const targetPeg = gameState.pegs[targetPegIndex];

    if (sourcePeg.length === 0) {
      toast({
        title: "Invalid Move",
        description: "No disc to move from this peg!",
        variant: "destructive",
      });
      return;
    }

    const sourceDisc = sourcePeg[sourcePeg.length - 1];
    if (targetPeg.length > 0 && sourceDisc.size > targetPeg[targetPeg.length - 1].size) {
      toast({
        title: "Invalid Move",
        description: "Cannot place a larger disc on top of a smaller one!",
        variant: "destructive",
      });
      return;
    }

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
  };

  const handleDiscClick = (pegIndex: number, discIndex: number) => {
    if (gameState.isComplete) return;

    if (gameState.selectedDisc === null) {
      if (discIndex === gameState.pegs[pegIndex].length - 1) {
        setGameState({
          ...gameState,
          selectedDisc: { pegIndex, discIndex },
        });
      }
    } else {
      handleMove(gameState.selectedDisc.pegIndex, pegIndex);
    }
  };

  const resetGame = () => {
    initializeGame(numDiscs);
  };

  return (
    <GameLayout>
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-4xl font-bold text-center mb-8 text-white">Tower of Hanoi</h1>
          
          <GameInstructions />
          
          {!gameStarted ? (
            <div className="text-center space-y-6 bg-gradient-card rounded-lg p-8 backdrop-blur-sm">
              <div className="space-y-4">
                <h2 className="text-2xl font-semibold mb-4 text-white">Select Number of Discs</h2>
                <div className="flex justify-center gap-4">
                  {[3, 4, 5, 6, 7].map((n) => (
                    <Button
                      key={n}
                      onClick={() => setNumDiscs(n)}
                      variant={numDiscs === n ? "default" : "outline"}
                      className={`w-12 h-12 ${
                        numDiscs === n ? 'bg-game-secondary text-white' : 'text-white'
                      }`}
                    >
                      {n}
                    </Button>
                  ))}
                </div>
              </div>
              <Button
                size="lg"
                onClick={() => initializeGame(numDiscs)}
                className="px-8 py-4 text-lg bg-game-secondary hover:bg-game-secondary/90 text-white"
              >
                Start Game
              </Button>
            </div>
          ) : (
            <div className="space-y-8 bg-gradient-card rounded-lg p-8 backdrop-blur-sm">
              <div className="flex justify-between items-center mb-8">
                <div className="space-y-2">
                  <p className="text-lg text-white">Moves: {gameState.moves}</p>
                  <p className="text-sm text-gray-400">
                    Optimal moves: {calculateOptimalMoves(numDiscs)}
                  </p>
                </div>
                <Button 
                  onClick={resetGame}
                  className="bg-game-secondary hover:bg-game-secondary/90 text-white"
                >
                  Reset Game
                </Button>
              </div>

              <GameControls 
                onMove={handleMove}
                isGameStarted={gameStarted}
              />

              <div className="relative flex justify-around items-end h-[400px]">
                {gameState.pegs.map((peg, pegIndex) => (
                  <div key={pegIndex} className="relative flex flex-col items-center">
                    {/* Peg */}
                    <div className="absolute bottom-0 w-2 h-[300px] bg-game-secondary/50 rounded-t-lg" />
                    
                    {/* Base */}
                    <div className="absolute bottom-0 w-32 h-2 bg-game-secondary/50 -translate-x-1/2 left-1/2" />
                    
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
        </motion.div>
      </div>
    </GameLayout>
  );
};

export default TowerOfHanoi;