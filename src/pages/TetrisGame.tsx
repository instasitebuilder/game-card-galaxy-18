import React, { useState, useEffect, useCallback } from "react";
import { useToast } from "@/components/ui/use-toast";
import TetrisBoard from "@/components/tetris/TetrisBoard";
import TetrisControls from "@/components/tetris/TetrisControls";
import GameStats from "@/components/tetris/GameStats";
import { Play, Pause, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";

const BOARD_WIDTH = 10;
const BOARD_HEIGHT = 20;

const TetrisGame = () => {
  const [board, setBoard] = useState<number[][]>(
    Array(BOARD_HEIGHT).fill(Array(BOARD_WIDTH).fill(0))
  );
  const [score, setScore] = useState(0);
  const [level, setLevel] = useState(1);
  const [lines, setLines] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const { toast } = useToast();

  const resetGame = () => {
    setBoard(Array(BOARD_HEIGHT).fill(Array(BOARD_WIDTH).fill(0)));
    setScore(0);
    setLevel(1);
    setLines(0);
    setIsPlaying(false);
  };

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
    if (!isPlaying) {
      toast({
        title: "Game Started!",
        description: "Good luck!",
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