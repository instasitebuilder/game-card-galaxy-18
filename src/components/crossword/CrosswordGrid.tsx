import React from 'react';

interface CrosswordGridProps {
  size: number;
  clues: Array<{
    number: number;
    startRow: number;
    startCol: number;
  }>;
  selectedCell: { row: number; col: number } | null;
  userAnswers: string[][];
  onCellSelect: (row: number, col: number) => void;
  onInput: (row: number, col: number, value: string) => void;
}

export const CrosswordGrid: React.FC<CrosswordGridProps> = ({
  size,
  clues,
  selectedCell,
  userAnswers,
  onCellSelect,
  onInput,
}) => {
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, row: number, col: number) => {
    if (e.key === 'Backspace' && userAnswers[row][col] === '') {
      e.preventDefault();
      if (col > 0) {
        onCellSelect(row, col - 1);
      } else if (row > 0) {
        onCellSelect(row - 1, size - 1);
      }
    } else if (e.key === 'ArrowLeft') {
      e.preventDefault();
      if (col > 0) onCellSelect(row, col - 1);
    } else if (e.key === 'ArrowRight') {
      e.preventDefault();
      if (col < size - 1) onCellSelect(row, col + 1);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (row > 0) onCellSelect(row - 1, col);
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (row < size - 1) onCellSelect(row + 1, col);
    }
  };

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>, row: number, col: number) => {
    const value = e.target.value.slice(-1);
    if (/^[A-Za-z]$/.test(value)) {
      onInput(row, col, value);
      if (col < size - 1) {
        onCellSelect(row, col + 1);
      } else if (row < size - 1) {
        onCellSelect(row + 1, 0);
      }
    }
  };

  return (
    <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
      <div className="grid gap-1" style={{ gridTemplateColumns: `repeat(${size}, minmax(0, 1fr))` }}>
        {Array.from({ length: size }, (_, row) =>
          Array.from({ length: size }, (_, col) => {
            const clueNumber = clues.find(
              (clue) => clue.startRow === row && clue.startCol === col
            )?.number;

            const isSelected = selectedCell?.row === row && selectedCell?.col === col;

            return (
              <div
                key={`${row}-${col}`}
                className="relative aspect-square"
              >
                {clueNumber && (
                  <span className="absolute top-1 left-1 text-xs text-white/70">
                    {clueNumber}
                  </span>
                )}
                <input
                  type="text"
                  maxLength={1}
                  value={userAnswers[row][col]}
                  onChange={(e) => handleInput(e, row, col)}
                  onKeyDown={(e) => handleKeyDown(e, row, col)}
                  onClick={() => onCellSelect(row, col)}
                  className={`w-full h-full text-center text-lg font-semibold uppercase bg-white/5 border ${
                    isSelected ? 'border-game-accent' : 'border-white/20'
                  } text-white focus:outline-none focus:ring-2 focus:ring-game-accent transition-colors`}
                />
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};