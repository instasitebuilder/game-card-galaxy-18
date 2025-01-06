import React, { useState } from 'react';
import { useToast } from "@/hooks/use-toast";
import { motion } from "framer-motion";

const LogicPuzzle = () => {
  const { toast } = useToast();
  const [grid, setGrid] = useState<boolean[][]>(Array(5).fill(Array(5).fill(false)));
  const [hints, setHints] = useState<{rows: number[], cols: number[]}>({
    rows: [2, 3, 1, 4, 2],
    cols: [3, 2, 2, 3, 2]
  });

  const handleCellClick = (row: number, col: number) => {
    const newGrid = grid.map((r, i) => 
      i === row ? r.map((cell, j) => j === col ? !cell : cell) : r
    );
    setGrid(newGrid);
    
    toast({
      title: "Cell Toggled",
      description: `Position: (${row + 1}, ${col + 1})`,
      duration: 1000,
    });
  };

  return (
    <div className="flex flex-col items-center gap-8 p-4">
      <div className="text-2xl font-bold text-white">Logic Master</div>
      <div className="relative p-4 bg-gradient-card backdrop-blur-sm rounded-xl border border-game-card-border">
        <div className="grid grid-cols-6 gap-1">
          <div className="w-8 h-8" /> {/* Empty corner */}
          {hints.cols.map((hint, i) => (
            <div key={i} className="w-8 h-8 flex items-center justify-center text-white">
              {hint}
            </div>
          ))}
          {grid.map((row, rowIndex) => (
            <React.Fragment key={rowIndex}>
              <div className="w-8 h-8 flex items-center justify-center text-white">
                {hints.rows[rowIndex]}
              </div>
              {row.map((cell, colIndex) => (
                <motion.button
                  key={colIndex}
                  onClick={() => handleCellClick(rowIndex, colIndex)}
                  className={`w-8 h-8 rounded-sm ${
                    cell ? 'bg-game-accent' : 'bg-game-surface'
                  }`}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                />
              ))}
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LogicPuzzle;