import React, { useState, useEffect } from "react";
import { useToast } from "@/components/ui/use-toast";
import SudokuBoard from "@/components/sudoku/SudokuBoard";
import NumberPad from "@/components/sudoku/NumberPad";
import GameControls from "@/components/sudoku/GameControls";
import AdSpace from "@/components/ads/AdSpace";

const SudokuGame = () => {
  const { toast } = useToast();
  const [size, setSize] = useState<4 | 9>(9);
  const [board, setBoard] = useState<number[][]>([]);
  const [solution, setSolution] = useState<number[][]>([]);
  const [selectedCell, setSelectedCell] = useState<{ row: number; col: number } | null>(null);

  useEffect(() => {
    generateNewGame(size);
  }, [size]);

  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (!selectedCell) return;
      
      const number = parseInt(event.key);
      if (!isNaN(number) && number >= 1 && number <= size) {
        handleNumberInput(number);
      }
    };

    window.addEventListener('keypress', handleKeyPress);
    return () => window.removeEventListener('keypress', handleKeyPress);
  }, [selectedCell, size]);

  const generateNewGame = (boardSize: number) => {
    const newBoard = Array(boardSize)
      .fill(null)
      .map(() => Array(boardSize).fill(0));
    const newSolution = generateSudokuSolution(boardSize);
    
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
      
      if (checkWin(newBoard)) {
        toast({
          title: "🎉 Congratulations!",
          description: "You've successfully solved the Sudoku puzzle!",
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
      <div className="max-w-7xl mx-auto">
        <AdSpace position="top" />
        
        <div className="flex flex-col lg:flex-row gap-6">
          <div className="flex-1">
            <GameControls
              size={size}
              onSizeChange={(value) => setSize(parseInt(value) as 4 | 9)}
              onNewGame={() => generateNewGame(size)}
            />
            
            <SudokuBoard
              size={size}
              board={board}
              selectedCell={selectedCell}
              handleCellClick={handleCellClick}
            />
            
            <NumberPad size={size} handleNumberInput={handleNumberInput} />
          </div>
          
          <div className="hidden lg:block">
            <AdSpace position="sidebar" />
          </div>
        </div>
        
        <AdSpace position="bottom" />
      </div>
    </div>
  );
};

export default SudokuGame;
