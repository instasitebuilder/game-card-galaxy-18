import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface GameBoardProps {
  board: (string | null)[];
  onCellClick: (index: number) => void;
  winner: string | null;
}

export const GameBoard = ({ board, onCellClick, winner }: GameBoardProps) => {
  return (
    <div className="grid grid-cols-3 gap-2 max-w-md mx-auto">
      {board.map((cell, index) => (
        <motion.button
          key={index}
          whileHover={{ scale: cell ? 1 : 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => onCellClick(index)}
          className={cn(
            "h-24 md:h-32 bg-game-surface rounded-lg text-4xl font-bold",
            "transition-colors duration-200 ease-in-out",
            "flex items-center justify-center",
            "text-white border-2 border-game-accent/20",
            cell === "X" && "text-game-accent",
            cell === "O" && "text-game-highlight",
            !cell && "hover:bg-game-surface/80",
            winner && "cursor-not-allowed"
          )}
          disabled={!!winner}
        >
          {cell && (
            <motion.span
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="block"
            >
              {cell}
            </motion.span>
          )}
        </motion.button>
      ))}
    </div>
  );
};