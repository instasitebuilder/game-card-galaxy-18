import React from "react";

interface SudokuBoardProps {
  size: number;
  board: number[][];
  selectedCell: { row: number; col: number } | null;
  handleCellClick: (row: number, col: number) => void;
}

const SudokuBoard = ({ size, board, selectedCell, handleCellClick }: SudokuBoardProps) => {
  const getCellSize = () => {
    switch (size) {
      case 9:
        return "text-base";
      case 6:
        return "text-lg";
      default:
        return "text-xl";
    }
  };

  return (
    <div className="bg-white/10 rounded-lg p-6 shadow-xl max-w-2xl mx-auto mb-6">
      <div
        className="grid gap-px bg-game-primary rounded-lg overflow-hidden"
        style={{
          gridTemplateColumns: `repeat(${size}, minmax(0, 1fr))`,
        }}
      >
        {board.map((row, rowIndex) =>
          row.map((cell, colIndex) => (
            <div
              key={`${rowIndex}-${colIndex}`}
              className={`
                aspect-square bg-white/10 flex items-center justify-center ${getCellSize()} font-bold cursor-pointer
                transition-all duration-200 hover:bg-game-accent/20
                ${selectedCell?.row === rowIndex && selectedCell?.col === colIndex ? "bg-game-accent/30" : ""}
                ${cell === 0 ? "text-transparent" : "text-white"}
                ${colIndex % Math.sqrt(size) === Math.sqrt(size) - 1 ? "border-r-2 border-r-game-accent" : ""}
                ${rowIndex % Math.sqrt(size) === Math.sqrt(size) - 1 ? "border-b-2 border-b-game-accent" : ""}
              `}
              onClick={() => handleCellClick(rowIndex, colIndex)}
            >
              {cell || "."}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default SudokuBoard;