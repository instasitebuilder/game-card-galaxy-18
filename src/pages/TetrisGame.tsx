import React, { useState, useEffect, useCallback } from "react";
import { useToast } from "@/components/ui/use-toast";
import TetrisBoard from "@/components/tetris/TetrisBoard";
import TetrisControls from "@/components/tetris/TetrisControls";
import GameStats from "@/components/tetris/GameStats";
import { Play, Pause, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const BOARD_WIDTH = 10;
const BOARD_HEIGHT = 20;
const INITIAL_SPEED = 1000;

// Tetris pieces (tetrominos)
const TETROMINOS = {
  I: { shape: [[1, 1, 1, 1]], color: 1 },
  L: { shape: [[1, 0], [1, 0], [1, 1]], color: 2 },
  J: { shape: [[0, 1], [0, 1], [1, 1]], color: 3 },
  O: { shape: [[1, 1], [1, 1]], color: 4 },
  Z: { shape: [[1, 1, 0], [0, 1, 1]], color: 5 },
  S: { shape: [[0, 1, 1], [1, 1, 0]], color: 6 },
  T: { shape: [[1, 1, 1], [0, 1, 0]], color: 7 },
};

const TetrisGame = () => {
  const [board, setBoard] = useState<number[][]>(
    Array(BOARD_HEIGHT).fill(Array(BOARD_WIDTH).fill(0))
  );
  const [score, setScore] = useState(0);
  const [level, setLevel] = useState(1);
  const [lines, setLines] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentPiece, setCurrentPiece] = useState<{
    shape: number[][];
    position: { x: number; y: number };
    color: number;
  } | null>(null);
  const { toast } = useToast();

  // Generate a random tetromino
  const generatePiece = useCallback(() => {
    const pieces = Object.keys(TETROMINOS);
    const randomPiece = pieces[Math.floor(Math.random() * pieces.length)] as keyof typeof TETROMINOS;
    const piece = TETROMINOS[randomPiece];
    
    return {
      shape: piece.shape,
      position: { x: Math.floor(BOARD_WIDTH / 2) - 1, y: 0 },
      color: piece.color,
    };
  }, []);

  // Update board with current piece
  const updateBoard = useCallback(() => {
    if (!currentPiece) return;

    const newBoard = Array(BOARD_HEIGHT)
      .fill(null)
      .map(() => Array(BOARD_WIDTH).fill(0));

    // Add current piece to board
    currentPiece.shape.forEach((row, y) => {
      row.forEach((value, x) => {
        if (value) {
          const boardY = y + currentPiece.position.y;
          const boardX = x + currentPiece.position.x;
          if (boardY >= 0 && boardY < BOARD_HEIGHT && boardX >= 0 && boardX < BOARD_WIDTH) {
            newBoard[boardY][boardX] = currentPiece.color;
          }
        }
      });
    });

    setBoard(newBoard);
  }, [currentPiece]);

  // Move piece
  const movePiece = useCallback(
    (direction: "left" | "right" | "down") => {
      if (!currentPiece || !isPlaying) return;

      const newPosition = { ...currentPiece.position };

      switch (direction) {
        case "left":
          newPosition.x -= 1;
          break;
        case "right":
          newPosition.x += 1;
          break;
        case "down":
          newPosition.y += 1;
          break;
      }

      // Check if move is valid
      const isValid = currentPiece.shape.every((row, y) =>
        row.every((value, x) => {
          if (!value) return true;
          const boardY = newPosition.y + y;
          const boardX = newPosition.x + x;
          return (
            boardY >= 0 &&
            boardY < BOARD_HEIGHT &&
            boardX >= 0 &&
            boardX < BOARD_WIDTH
          );
        })
      );

      if (isValid) {
        setCurrentPiece({
          ...currentPiece,
          position: newPosition,
        });
      } else if (direction === "down") {
        // Generate new piece when current piece can't move down
        setCurrentPiece(generatePiece());
      }
    },
    [currentPiece, isPlaying, generatePiece]
  );

  // Handle keyboard controls
  const handleKeyPress = useCallback(
    (event: KeyboardEvent) => {
      if (!isPlaying) return;

      switch (event.key) {
        case "ArrowLeft":
          movePiece("left");
          break;
        case "ArrowRight":
          movePiece("right");
          break;
        case "ArrowDown":
          movePiece("down");
          break;
        case "ArrowUp":
          // Rotate piece (to be implemented)
          toast({
            title: "Rotate",
            duration: 1000,
          });
          break;
      }
    },
    [isPlaying, movePiece, toast]
  );

  // Game loop
  useEffect(() => {
    if (!isPlaying) return;

    const gameLoop = setInterval(() => {
      movePiece("down");
    }, INITIAL_SPEED / (1 + (level - 1) * 0.2));

    return () => clearInterval(gameLoop);
  }, [isPlaying, level, movePiece]);

  // Update board whenever piece changes
  useEffect(() => {
    updateBoard();
  }, [currentPiece, updateBoard]);

  // Set up keyboard listeners
  useEffect(() => {
    window.addEventListener("keydown", handleKeyPress);
    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, [handleKeyPress]);

  const resetGame = () => {
    setBoard(Array(BOARD_HEIGHT).fill(Array(BOARD_WIDTH).fill(0)));
    setScore(0);
    setLines(0);
    setIsPlaying(false);
    setCurrentPiece(null);
    toast({
      title: "Game Reset",
      description: "Start a new game!",
    });
  };

  const togglePlay = () => {
    if (!isPlaying) {
      setCurrentPiece(generatePiece());
    }
    setIsPlaying(!isPlaying);
    toast({
      title: isPlaying ? "Game Paused" : "Game Started!",
      description: `Level ${level} - ${
        level <= 2 ? "Easy" : level <= 6 ? "Medium" : "Hard"
      } difficulty`,
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-game-primary via-[#6B46C1] to-game-secondary p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col items-center gap-8">
          <h1 className="text-4xl font-bold text-white/90">Tetris</h1>
          
          <div className="flex flex-wrap gap-8 justify-center items-start">
            <div className="bg-white/10 p-6 rounded-lg backdrop-blur-sm">
              <div className="mb-4">
                <Select
                  value={level.toString()}
                  onValueChange={(value) => setLevel(parseInt(value))}
                  disabled={isPlaying}
                >
                  <SelectTrigger className="w-[180px] bg-white/5 text-white">
                    <SelectValue placeholder="Select Level" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">Level 1 (Easy)</SelectItem>
                    <SelectItem value="2">Level 2 (Easy)</SelectItem>
                    <SelectItem value="3">Level 3 (Medium)</SelectItem>
                    <SelectItem value="4">Level 4 (Medium)</SelectItem>
                    <SelectItem value="5">Level 5 (Medium)</SelectItem>
                    <SelectItem value="6">Level 6 (Medium)</SelectItem>
                    <SelectItem value="7">Level 7 (Hard)</SelectItem>
                    <SelectItem value="8">Level 8 (Hard)</SelectItem>
                    <SelectItem value="9">Level 9 (Hard)</SelectItem>
                    <SelectItem value="10">Level 10 (Hard)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <TetrisBoard board={board} />
            </div>

            <div className="flex flex-col gap-6">
              <GameStats score={score} level={level} lines={lines} />
              
              <div className="flex gap-4">
                <Button
                  onClick={togglePlay}
                  className="bg-game-accent text-game-primary hover:bg-game-accent/90"
                >
                  {isPlaying ? <Pause className="mr-2" /> : <Play className="mr-2" />}
                  {isPlaying ? "Pause" : "Start"}
                </Button>
                
                <Button
                  onClick={resetGame}
                  variant="outline"
                  className="border-game-accent text-white hover:bg-game-accent/20"
                >
                  <RotateCcw className="mr-2" />
                  Reset
                </Button>
              </div>

              <TetrisControls />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TetrisGame;