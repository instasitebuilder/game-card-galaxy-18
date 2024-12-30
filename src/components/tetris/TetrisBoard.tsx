import React from "react";

interface TetrisBoardProps {
  board: number[][];
}

const COLORS = [
  "bg-transparent",
  "bg-cyan-500",    // I piece
  "bg-orange-500",  // L piece
  "bg-blue-500",    // J piece
  "bg-yellow-500",  // O piece
  "bg-red-500",     // Z piece
  "bg-green-500",   // S piece
  "bg-purple-500",  // T piece
];

const TetrisBoard = ({ board }: TetrisBoardProps) => {
  return (
    <div className="grid gap-px bg-white/5 p-1 rounded-lg">
      {board.map((row, i) => (
        <div key={i} className="flex">
          {row.map((cell, j) => (
            <div
              key={`${i}-${j}`}
              className={`w-6 h-6 ${COLORS[cell]} border border-white/10 rounded-sm transition-all duration-150`}
            />
          ))}
        </div>
      ))}
    </div>
  );
};

export default TetrisBoard;