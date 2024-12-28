import React, { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import SudokuBoard from "@/components/sudoku/SudokuBoard";
import NumberPad from "@/components/sudoku/NumberPad";
import GameHeader from "@/components/sudoku/GameHeader";
import GameSettings from "@/components/sudoku/GameSettings";
import GameActions from "@/components/sudoku/GameActions";
import AdSpace from "@/components/ads/AdSpace";

const SudokuGame = () => {
  const { toast } = useToast();
  const [size, setSize] = useState<4 | 6 | 9>(9);
  const [board, setBoard] = useState<number[][]>([]);
  const [solution, setSolution] = useState<number[][]>([]);
  const [selectedCell, setSelectedCell] = useState<{ row: number; col: number } | null>(null);
  const [wrongAttempts, setWrongAttempts] = useState(0);
  const [fixedTime, setFixedTime] = useState(15);
  const [remainingTime, setRemainingTime] = useState(fixedTime * 60);
  const [isGameActive, setIsGameActive] = useState(false);

  useEffect(() => {
    generateNewGame(size);
  }, [size]);

  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (!selectedCell || !isGameActive) return;
      
      const number = parseInt(event.key);
      if (!isNaN(number) && number >= 1 && number <= size) {
        handleNumberInput(number);
      }
    };

    window.addEventListener('keypress', handleKeyPress);
    return () => window.removeEventListener('keypress', handleKeyPress);
  }, [selectedCell, size, isGameActive]);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isGameActive && remainingTime > 0) {
      timer = setInterval(() => {
        setRemainingTime((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            handleGameOver();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isGameActive, remainingTime]);

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
    setWrongAttempts(0);
    setRemainingTime(fixedTime * 60);
    setIsGameActive(true);
  };

  const generateSudokuSolution = (boardSize: number): number[][] => {
    const solution = Array(boardSize)
      .fill(null)
      .map(() => Array(boardSize).fill(0));

    const boxSize = Math.sqrt(boardSize);

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

  const handleGameOver = () => {
    setIsGameActive(false);
    toast({
      title: "Game Over",
      description: "Time's up! Try again with a new game.",
      duration: 3000,
    });
    generateNewGame(size);
  };

  const handleCellClick = (row: number, col: number) => {
    if (board[row][col] === 0) {
      setSelectedCell({ row, col });
    }
  };

  const handleNumberInput = (number: number) => {
    if (!selectedCell || !isGameActive) return;
    const { row, col } = selectedCell;
    
    if (solution[row][col] === number) {
      const newBoard = board.map(row => [...row]);
      newBoard[row][col] = number;
      setBoard(newBoard);
      
      if (checkWin(newBoard)) {
        setIsGameActive(false);
        toast({
          title: "🎉 Congratulations!",
          description: "You've successfully solved the Sudoku puzzle!",
          duration: 5000,
        });
      }
    } else {
      const newWrongAttempts = wrongAttempts + 1;
      setWrongAttempts(newWrongAttempts);
      
      if (newWrongAttempts >= 5) {
        toast({
          title: "Game Over",
          description: "Too many wrong attempts! Starting a new game.",
          duration: 3000,
        });
        generateNewGame(size);
      } else {
        toast({
          title: "Wrong Move",
          description: `${5 - newWrongAttempts} attempts remaining`,
          duration: 2000,
        });
      }
    }
  };

  const handleHint = () => {
    if (!selectedCell || !isGameActive) return;
    const { row, col } = selectedCell;
    if (board[row][col] === 0) {
      const newBoard = board.map(row => [...row]);
      newBoard[row][col] = solution[row][col];
      setBoard(newBoard);
      toast({
        title: "Hint Used",
        description: "A number has been revealed!",
        duration: 2000,
      });
    }
  };

  const handleFixedTimeChange = (time: number) => {
    const validTime = Math.max(1, Math.min(60, time));
    setFixedTime(validTime);
    setRemainingTime(validTime * 60);
  };

  const checkWin = (currentBoard: number[][]): boolean => {
    return currentBoard.every((row, rowIndex) =>
      row.every((cell, colIndex) => cell === solution[rowIndex][colIndex])
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-game-primary via-[#6B46C1] to-game-secondary p-6">
      <div className="max-w-7xl mx-auto">
        <AdSpace position="top" />
        
        <div className="flex flex-col lg:flex-row gap-6">
          <div className="flex-1">
            <GameHeader
              wrongAttempts={wrongAttempts}
              remainingTime={remainingTime}
            />
            
            <GameSettings
              size={size}
              onSizeChange={(value) => setSize(parseInt(value) as 4 | 6 | 9)}
              fixedTime={fixedTime}
              onFixedTimeChange={handleFixedTimeChange}
            />
            
            <GameActions
              onNewGame={() => generateNewGame(size)}
              onHint={handleHint}
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