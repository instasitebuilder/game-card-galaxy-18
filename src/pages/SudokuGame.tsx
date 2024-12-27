import React, { useState, useEffect } from "react";
import { useToast } from "@/components/ui/use-toast";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";

const SudokuGame = () => {
  const { toast } = useToast();
  const [size, setSize] = useState<4 | 9>(9);
  const [board, setBoard] = useState<number[][]>([]);
  const [solution, setSolution] = useState<number[][]>([]);
  const [selectedCell, setSelectedCell] = useState<{ row: number; col: number } | null>(null);

  useEffect(() => {
    generateNewGame(size);
  }, [size]);

  const generateNewGame = (boardSize: number) => {
    const newBoard = Array(boardSize)
      .fill(null)
      .map(() => Array(boardSize).fill(0));
    const newSolution = generateSudokuSolution(boardSize);
    
    // Create puzzle by removing some numbers
    const puzzle = [...newSolution.map(row => [...row])];
    const cellsToRemove = Math.floor((boardSize * boardSize) * 0.6);
    
    for (let i = 0; i < cellsToRemove; i++) {
      const row = Math.floor(Math.random() * boardSize);
      const col = Math.floor(Math.random() * boardSize);
      puzzle[row][col] = 0;
    }
    
    setBoard(puzzle);
    setSolution(newSolution);
  };

  const generateSudokuSolution = (boardSize: number): number[][] => {
    const solution = Array(boardSize)
      .fill(null)
      .map(() => Array(boardSize).fill(0));

    const fillBoard = (board: number[][]): boolean => {
      for (let row = 0; row < boardSize; row++) {
        for (let col = 0; col < boardSize; col++) {
          if (board[row][col] === 0) {
            const numbers = Array.from({ length: boardSize }, (_, i) => i + 1);
            for (const num of shuffleArray(numbers)) {
              if (isValidMove(board, row, col, num, boardSize)) {
                board[row][col] = num;
                if (fillBoard(board)) return true;
                board[row][col] = 0;
              }
            }
            return false;
          }
        }
      }
      return true;
    };

    fillBoard(solution);
    return solution;
  };

  const shuffleArray = (array: number[]): number[] => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  const isValidMove = (
    board: number[][],
    row: number,
    col: number,
    num: number,
    boardSize: number
  ): boolean => {
    // Check row
    for (let x = 0; x < boardSize; x++) {
      if (board[row][x] === num) return false;
    }

    // Check column
    for (let x = 0; x < boardSize; x++) {
      if (board[x][col] === num) return false;
    }

    // Check box
    const boxSize = Math.sqrt(boardSize);
    const boxRow = Math.floor(row / boxSize) * boxSize;
    const boxCol = Math.floor(col / boxSize) * boxSize;
    
    for (let i = 0; i < boxSize; i++) {
      for (let j = 0; j < boxSize; j++) {
        if (board[boxRow + i][boxCol + j] === num) return false;
      }
    }

    return true;
  };

  const handleCellClick = (row: number, col: number) => {
    if (board[row][col] === 0) {
      setSelectedCell({ row, col });
    }
  };

  const handleNumberInput = (number: number) => {
    if (!selectedCell) return;
    const { row, col } = selectedCell;
    
    if (isValidMove(board, row, col, number, size)) {
      const newBoard = board.map(row => [...row]);
      newBoard[row][col] = number;
      setBoard(newBoard);
      
      // Check if game is won
      if (checkWin(newBoard)) {
        toast({
          title: "Congratulations!",
          description: "You've solved the Sudoku puzzle!",
          duration: 5000,
        });
      }
    }
  };

  const checkWin = (currentBoard: number[][]): boolean => {
    return currentBoard.every((row, rowIndex) =>
      row.every((cell, colIndex) => cell === solution[rowIndex][colIndex])
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-game-primary to-game-secondary p-6">
      <div className="max-w-4xl mx-auto">
        <div className="mb-6 flex items-center justify-between">
          <h1 className="text-3xl font-bold text-white">Sudoku</h1>
          <div className="flex gap-4">
            <Select
              value={size.toString()}
              onValueChange={(value) => setSize(parseInt(value) as 4 | 9)}
            >
              <SelectTrigger className="w-32 bg-white">
                <SelectValue placeholder="Size" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="4">4x4</SelectItem>
                <SelectItem value="9">9x9</SelectItem>
              </SelectContent>
            </Select>
            <Button
              onClick={() => generateNewGame(size)}
              variant="secondary"
              className="bg-white hover:bg-gray-100"
            >
              New Game
            </Button>
          </div>
        </div>

        <div className="bg-white rounded-lg p-6 shadow-xl">
          <div className="grid gap-1" style={{ 
            gridTemplateColumns: `repeat(${size}, minmax(0, 1fr))` 
          }}>
            {board.map((row, rowIndex) =>
              row.map((cell, colIndex) => (
                <div
                  key={`${rowIndex}-${colIndex}`}
                  className={`
                    aspect-square border border-gray-200 flex items-center justify-center text-xl font-bold cursor-pointer
                    ${selectedCell?.row === rowIndex && selectedCell?.col === colIndex ? 'bg-blue-100' : ''}
                    ${cell === 0 ? 'text-transparent' : 'text-gray-800'}
                    ${colIndex % Math.sqrt(size) === Math.sqrt(size) - 1 ? 'border-r-2 border-r-gray-400' : ''}
                    ${rowIndex % Math.sqrt(size) === Math.sqrt(size) - 1 ? 'border-b-2 border-b-gray-400' : ''}
                  `}
                  onClick={() => handleCellClick(rowIndex, colIndex)}
                >
                  {cell || '.'}
                </div>
              ))
            )}
          </div>

          <div className="mt-6 grid grid-cols-5 gap-2">
            {Array.from({ length: size }, (_, i) => (
              <Button
                key={i + 1}
                onClick={() => handleNumberInput(i + 1)}
                variant="outline"
                className="aspect-square text-xl font-bold"
              >
                {i + 1}
              </Button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SudokuGame;