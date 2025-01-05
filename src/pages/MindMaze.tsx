import React, { useState, useEffect } from "react";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import GameLayout from "@/components/layouts/GameLayout";
import { useToast } from "@/hooks/use-toast";
import MazeControls from "@/components/maze/MazeControls";
import DifficultySelector from "@/components/maze/DifficultySelector";
import MazeGrid from "@/components/maze/MazeGrid";

const MindMaze = () => {
  const [selectedDifficulty, setSelectedDifficulty] = useState("Beginner");
  const [gameStarted, setGameStarted] = useState(false);
  const [playerPosition, setPlayerPosition] = useState({ x: 1, y: 1 });
  const [maze, setMaze] = useState<string[][]>([]);
  const { toast } = useToast();

  const initializeMaze = () => {
    const mazeSize = selectedDifficulty === "Beginner" ? 10 : selectedDifficulty === "Advanced" ? 15 : 20;
    const newMaze: string[][] = Array(mazeSize).fill(null).map(() => 
      Array(mazeSize).fill("wall")
    );

    for (let i = 1; i < mazeSize - 1; i++) {
      for (let j = 1; j < mazeSize - 1; j++) {
        if (Math.random() > 0.3) {
          newMaze[i][j] = "path";
        }
      }
    }

    newMaze[1][1] = "start";
    newMaze[mazeSize - 2][mazeSize - 2] = "end";
    setMaze(newMaze);
    setPlayerPosition({ x: 1, y: 1 });
  };

  const handleMove = (direction: "up" | "down" | "left" | "right") => {
    if (!gameStarted) return;

    const moves = {
      up: { dx: 0, dy: -1 },
      down: { dx: 0, dy: 1 },
      left: { dx: -1, dy: 0 },
      right: { dx: 1, dy: 0 },
    };

    const { dx, dy } = moves[direction];
    const newX = playerPosition.x + dx;
    const newY = playerPosition.y + dy;

    if (
      newX >= 0 && newX < maze.length &&
      newY >= 0 && newY < maze.length &&
      maze[newY][newX] !== "wall"
    ) {
      setPlayerPosition({ x: newX, y: newY });
      
      if (maze[newY][newX] === "end") {
        toast({
          title: "Congratulations!",
          description: "You've completed the maze!",
          duration: 3000,
        });
        setGameStarted(false);
      }
    }
  };

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (!gameStarted) return;

      const keyMappings: { [key: string]: "up" | "down" | "left" | "right" } = {
        ArrowUp: "up",
        ArrowDown: "down",
        ArrowLeft: "left",
        ArrowRight: "right",
      };

      if (keyMappings[e.key]) {
        handleMove(keyMappings[e.key]);
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [gameStarted, playerPosition, maze]);

  const startGame = () => {
    initializeMaze();
    setGameStarted(true);
    toast({
      title: "Game Started!",
      description: "Use arrow keys or buttons to navigate through the maze.",
      duration: 3000,
    });
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-gradient-game">
        <AppSidebar />
        <GameLayout>
          <div className="space-y-8">
            <div className="text-center space-y-4">
              <h1 className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
                Mind Maze
              </h1>
              <p className="text-lg text-white/80 max-w-2xl mx-auto">
                Challenge your cognitive skills with intricate mazes and brain-teasing puzzles
              </p>
            </div>

            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-8 border border-white/10">
              {!gameStarted ? (
                <>
                  <h2 className="text-2xl font-semibold text-white mb-6">Select Difficulty</h2>
                  <DifficultySelector
                    selectedDifficulty={selectedDifficulty}
                    onSelect={setSelectedDifficulty}
                  />
                  <button
                    onClick={startGame}
                    className="bg-game-accent hover:bg-game-accent/90 text-white px-8 py-6 text-lg rounded-full w-full"
                  >
                    Start Game
                  </button>
                </>
              ) : (
                <>
                  <MazeGrid maze={maze} playerPosition={playerPosition} />
                  <MazeControls onMove={handleMove} />
                </>
              )}
            </div>
          </div>
        </GameLayout>
      </div>
    </SidebarProvider>
  );
};

export default MindMaze;