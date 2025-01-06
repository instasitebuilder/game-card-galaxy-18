import React, { useState, useEffect } from 'react';
import { useToast } from "@/hooks/use-toast";
import { motion } from "framer-motion";
import GameInstructions from './GameInstructions';

const JigsawPuzzle = () => {
  const { toast } = useToast();
  const [pieces, setPieces] = useState<{id: number, x: number, y: number}[]>([]);
  const [selectedPiece, setSelectedPiece] = useState<number | null>(null);
  const [score, setScore] = useState(0);

  useEffect(() => {
    // Initialize puzzle pieces
    const initialPieces = Array.from({ length: 9 }, (_, i) => ({
      id: i,
      x: Math.random() * 300,
      y: Math.random() * 300
    }));
    setPieces(initialPieces);
  }, []);

  const handlePieceClick = (id: number) => {
    setSelectedPiece(id);
    toast({
      title: "Piece Selected",
      description: `Selected piece ${id + 1}`,
      duration: 1500,
    });
  };

  return (
    <div className="flex flex-col items-center gap-8 p-4">
      <div className="text-2xl font-bold text-white">Jigsaw Puzzle</div>
      
      <GameInstructions gameType="jigsaw" />
      
      <div className="relative w-[400px] h-[400px] bg-gradient-card backdrop-blur-sm rounded-xl border border-game-card-border">
        {pieces.map((piece) => (
          <motion.div
            key={piece.id}
            className={`absolute w-20 h-20 cursor-move bg-game-accent rounded-lg ${
              selectedPiece === piece.id ? 'ring-4 ring-white' : ''
            }`}
            style={{ x: piece.x, y: piece.y }}
            drag
            dragConstraints={{
              top: 0,
              left: 0,
              right: 300,
              bottom: 300
            }}
            onClick={() => handlePieceClick(piece.id)}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          />
        ))}
      </div>
    </div>
  );
};

export default JigsawPuzzle;