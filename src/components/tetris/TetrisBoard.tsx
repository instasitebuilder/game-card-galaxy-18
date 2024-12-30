import React from "react";

interface TetrisBoardProps {
  board: number[][];
}

const COLORS = [
  "bg-transparent",
  "bg-purple-500",
  "bg-blue-500",
  "bg-green-500",
  "bg-yellow-500",
  "bg-red-500",
  "bg-orange-500",
  "bg-pink-500",
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