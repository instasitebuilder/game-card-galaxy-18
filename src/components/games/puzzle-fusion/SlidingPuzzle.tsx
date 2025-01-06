import React, { useState, useEffect } from 'react';
import { useToast } from "@/hooks/use-toast";
import { motion } from "framer-motion";
import GameInstructions from './GameInstructions';

const SlidingPuzzle = () => {
  const { toast } = useToast();
  const [tiles, setTiles] = useState<number[]>([]);
  const [moves, setMoves] = useState(0);

  useEffect(() => {
    // Initialize tiles in random order
    const initialTiles = Array.from({ length: 8 }, (_, i) => i + 1);
    initialTiles.push(0); // Empty tile
    shuffleTiles(initialTiles);
  }, []);

  const shuffleTiles = (tiles: number[]) => {
    const shuffled = [...tiles].sort(() => Math.random() - 0.5);
    setTiles(shuffled);
  };

  const handleTileClick = (index: number) => {
    const emptyIndex = tiles.indexOf(0);
    if (isAdjacent(index, emptyIndex)) {
      const newTiles = [...tiles];
      [newTiles[index], newTiles[emptyIndex]] = [newTiles[emptyIndex], newTiles[index]];
      setTiles(newTiles);
      setMoves(moves + 1);
      
      toast({
        title: "Tile Moved",
        description: `Moves: ${moves + 1}`,
        duration: 1000,
      });
    }
  };

  const isAdjacent = (index1: number, index2: number) => {
    const row1 = Math.floor(index1 / 3);
    const col1 = index1 % 3;
    const row2 = Math.floor(index2 / 3);
    const col2 = index2 % 3;
    
    return Math.abs(row1 - row2) + Math.abs(col1 - col2) === 1;
  };

  return (
    <div className="flex flex-col items-center gap-8 p-4">
      <div className="text-2xl font-bold text-white">Sliding Puzzle</div>
      
      <GameInstructions gameType="sliding" />
      
      <div className="grid grid-cols-3 gap-1 p-4 bg-gradient-card backdrop-blur-sm rounded-xl border border-game-card-border">
        {tiles.map((tile, index) => (
          <motion.button
            key={index}
            onClick={() => handleTileClick(index)}
            className={`w-20 h-20 rounded-lg ${
              tile === 0 ? 'invisible' : 'bg-game-accent'
            }`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {tile !== 0 && (
              <span className="text-2xl font-bold text-white">{tile}</span>
            )}
          </motion.button>
        ))}
      </div>
      <div className="text-white">Moves: {moves}</div>
    </div>
  );
};

export default SlidingPuzzle;