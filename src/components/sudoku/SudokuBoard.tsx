import React from "react";

interface SudokuBoardProps {
  size: number;
  board: number[][];
  selectedCell: { row: number; col: number } | null;
  handleCellClick: (row: number, col: number) => void;
}

const SudokuBoard = ({ size, board, selectedCell, handleCellClick }: SudokuBoardProps) => {
  return (
    <div className="bg-white rounded-lg p-6 shadow-xl max-w-2xl mx-auto">
      <div
        className="grid gap-1"
        style={{
          gridTemplateColumns: `repeat(${size}, minmax(0, 1fr))`,
        }}
      >
        {board.map((row, rowIndex) =>
          row.map((cell, colIndex) => (
            <div
              key={`${rowIndex}-${colIndex}`}
              className={`
                aspect-square border-2 border-gray-200 flex items-center justify-center text-xl font-bold cursor-pointer
                transition-all duration-200 hover:bg-game-accent/10
                ${selectedCell?.row === rowIndex && selectedCell?.col === colIndex ? "bg-game-accent/20 border-game-secondary" : ""}
                ${cell === 0 ? "text-transparent" : "text-game-primary"}
                ${colIndex % Math.sqrt(size) === Math.sqrt(size) - 1 ? "border-r-4 border-r-game-primary" : ""}
                ${rowIndex % Math.sqrt(size) === Math.sqrt(size) - 1 ? "border-b-4 border-b-game-primary" : ""}
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