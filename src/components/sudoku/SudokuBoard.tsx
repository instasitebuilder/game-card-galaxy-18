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
      case 12:
        return "text-sm";
      case 9:
        return "text-base";
      default:
        return "text-xl";
    }
  };

  return (
    <div className="bg-white rounded-lg p-4 shadow-xl max-w-2xl mx-auto">
      <div
        className="grid gap-px bg-game-primary"
        style={{
          gridTemplateColumns: `repeat(${size}, minmax(0, 1fr))`,
        }}
      >
        {board.map((row, rowIndex) =>
          row.map((cell, colIndex) => (
            <div
              key={`${rowIndex}-${colIndex}`}
              className={`
                aspect-square bg-white flex items-center justify-center ${getCellSize()} font-bold cursor-pointer
                transition-all duration-200 hover:bg-game-accent/10
                ${selectedCell?.row === rowIndex && selectedCell?.col === colIndex ? "bg-game-accent/20 border-game-secondary" : ""}
                ${cell === 0 ? "text-transparent" : "text-game-primary"}
                ${colIndex % Math.sqrt(size) === Math.sqrt(size) - 1 ? "border-r-2 border-r-game-primary" : ""}
                ${rowIndex % Math.sqrt(size) === Math.sqrt(size) - 1 ? "border-b-2 border-b-game-primary" : ""}
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