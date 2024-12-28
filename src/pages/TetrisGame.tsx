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
const INITIAL_SPEED = 1000; // Base speed in milliseconds

// Define difficulty levels
const DIFFICULTY_LEVELS = {
  EASY: [1, 2],
  MEDIUM: [3, 4, 5, 6],
  HARD: [7, 8, 9, 10],
};

// Speed multiplier for each level
const getLevelSpeed = (level: number) => {
  return INITIAL_SPEED / (1 + (level - 1) * 0.2);
};

const TetrisGame = () => {
  const [board, setBoard] = useState<number[][]>(
    Array(BOARD_HEIGHT).fill(Array(BOARD_WIDTH).fill(0))
  );
  const [score, setScore] = useState(0);
  const [level, setLevel] = useState(1);
  const [lines, setLines] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentPiece, setCurrentPiece] = useState({ x: 0, y: 0, shape: [] });
  const { toast } = useToast();

  const handleKeyPress = useCallback(
    (event: KeyboardEvent) => {
      if (!isPlaying) return;

      switch (event.key) {
        case "ArrowLeft":
          // Move piece left
          toast({
            title: "Move Left",
            duration: 1000,
          });
          break;
        case "ArrowRight":
          // Move piece right
          toast({
            title: "Move Right",
            duration: 1000,
          });
          break;
        case "ArrowDown":
          // Move piece down
          toast({
            title: "Move Down",
            duration: 1000,
          });
          break;
        case "ArrowUp":
          // Rotate piece
          toast({
            title: "Rotate",
            duration: 1000,
          });
          break;
      }
    },
    [isPlaying, toast]
  );

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
    toast({
      title: "Game Reset",
      description: "Start a new game!",
    });
  };

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
    if (!isPlaying) {
      toast({
        title: "Game Started!",
        description: `Level ${level} - ${
          level <= 2
            ? "Easy"
            : level <= 6
            ? "Medium"
            : "Hard"
        } difficulty`,
      });
    }
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