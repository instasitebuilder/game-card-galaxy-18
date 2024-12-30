import React, { useEffect, useCallback } from "react";
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
import { useTetris } from "@/hooks/useTetris";
import { INITIAL_SPEED } from "@/utils/tetrisUtils";

const TetrisGame = () => {
  const [level, setLevel] = React.useState(1);
  const { toast } = useToast();
  const {
    board,
    score,
    lines,
    isPlaying,
    movePiece,
    rotatePiece,
    resetGame,
    togglePlay,
  } = useTetris(level);

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
          rotatePiece();
          break;
      }
    },
    [isPlaying, movePiece, rotatePiece]
  );

  // Game loop
  useEffect(() => {
    if (!isPlaying) return;

    const gameLoop = setInterval(() => {
      movePiece("down");
    }, INITIAL_SPEED / (1 + (level - 1) * 0.2));

    return () => clearInterval(gameLoop);
  }, [isPlaying, level, movePiece]);

  // Set up keyboard listeners
  useEffect(() => {
    window.addEventListener("keydown", handleKeyPress);
    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, [handleKeyPress]);

  const handleReset = () => {
    resetGame();
    toast({
      title: "Game Reset",
      description: "Start a new game!",
    });
  };

  const handleTogglePlay = () => {
    togglePlay();
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
              <div className="mb-4 flex justify-between items-center">
                <Select
                  value={level.toString()}
                  onValueChange={(value) => setLevel(parseInt(value))}
                  disabled={isPlaying}
                >
                  <SelectTrigger className="w-[180px] bg-white/5 text-white">
                    <SelectValue placeholder="Select Level" />
                  </SelectTrigger>
                  <SelectContent>
                    {[...Array(10)].map((_, i) => (
                      <SelectItem key={i + 1} value={(i + 1).toString()}>
                        Level {i + 1} ({i + 1 <= 2 ? "Easy" : i + 1 <= 6 ? "Medium" : "Hard"})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                
                <div className="flex gap-4">
                  <Button
                    onClick={handleTogglePlay}
                    className="bg-game-accent text-game-primary hover:bg-game-accent/90"
                  >
                    {isPlaying ? <Pause className="mr-2" /> : <Play className="mr-2" />}
                    {isPlaying ? "Pause" : "Start"}
                  </Button>
                  
                  <Button
                    onClick={handleReset}
                    variant="outline"
                    className="border-game-accent text-white hover:bg-game-accent/20"
                  >
                    <RotateCcw className="mr-2" />
                    Reset
                  </Button>
                </div>
              </div>
              
              <TetrisBoard board={board} />
            </div>

            <div className="flex flex-col gap-6">
              <GameStats score={score} level={level} lines={lines} />
              <TetrisControls />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TetrisGame;