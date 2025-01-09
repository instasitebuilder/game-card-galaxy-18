import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface GoBoardProps {
  size: 9 | 13 | 19;
  stones: Array<Array<"black" | "white" | null>>;
  onIntersectionClick: (row: number, col: number) => void;
  validMoves?: Set<string>;
  lastMove?: { row: number; col: number } | null;
}

const GoBoard: React.FC<GoBoardProps> = ({
  size,
  stones,
  onIntersectionClick,
  validMoves = new Set(),
  lastMove,
}) => {
  const starPoints = getStarPoints(size);

  return (
    <div className="relative">
      <div
        className="grid bg-[#DCB35C] rounded-lg p-4 shadow-xl"
        style={{
          gridTemplateColumns: `repeat(${size}, minmax(0, 1fr))`,
          gap: "0px",
        }}
      >
        {stones.map((row, rowIndex) =>
          row.map((stone, colIndex) => (
            <div
              key={`${rowIndex}-${colIndex}`}
              className="relative aspect-square"
              onClick={() => onIntersectionClick(rowIndex, colIndex)}
            >
              {/* Grid lines */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="absolute w-full h-[2px] bg-black/80" />
                <div className="absolute h-full w-[2px] bg-black/80" />
              </div>

              {/* Star points */}
              {starPoints.some(
                ([r, c]) => r === rowIndex && c === colIndex
              ) && (
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-black/80 rounded-full" />
              )}

              {/* Stones */}
              {stone && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className={cn(
                    "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] h-[90%] rounded-full shadow-lg",
                    stone === "black" ? "bg-black" : "bg-white"
                  )}
                />
              )}

              {/* Valid move indicator */}
              {validMoves?.has(`${rowIndex}-${colIndex}`) && !stone && (
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 bg-green-500/20 rounded-full" />
              )}

              {/* Last move indicator */}
              {lastMove?.row === rowIndex && lastMove?.col === colIndex && (
                <div
                  className={cn(
                    "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full",
                    stones[rowIndex][colIndex] === "black"
                      ? "bg-white"
                      : "bg-black"
                  )}
                />
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

const getStarPoints = (size: number): [number, number][] => {
  if (size === 19) {
    return [
      [3, 3],
      [3, 9],
      [3, 15],
      [9, 3],
      [9, 9],
      [9, 15],
      [15, 3],
      [15, 9],
      [15, 15],
    ];
  } else if (size === 13) {
    return [
      [3, 3],
      [3, 9],
      [6, 6],
      [9, 3],
      [9, 9],
    ];
  } else {
    return [
      [2, 2],
      [2, 6],
      [4, 4],
      [6, 2],
      [6, 6],
    ];
  }
};

export default GoBoard;