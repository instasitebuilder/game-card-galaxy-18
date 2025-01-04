import React, { useState, useEffect } from "react";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { Button } from "@/components/ui/button";
import { Trophy, Brain, Users, Sparkles, ArrowUp, ArrowDown, ArrowLeft, ArrowRight } from "lucide-react";
import GameLayout from "@/components/layouts/GameLayout";
import { useToast } from "@/hooks/use-toast";

// Define maze cell types
type CellType = "wall" | "path" | "start" | "end" | "player" | "visited";

const MindMaze = () => {
  const [selectedDifficulty, setSelectedDifficulty] = useState("Beginner");
  const [gameStarted, setGameStarted] = useState(false);
  const [playerPosition, setPlayerPosition] = useState({ x: 1, y: 1 });
  const [maze, setMaze] = useState<CellType[][]>([]);
  const { toast } = useToast();

  // Initialize maze based on difficulty
  const initializeMaze = () => {
    const mazeSize = selectedDifficulty === "Beginner" ? 10 : selectedDifficulty === "Advanced" ? 15 : 20;
    const newMaze: CellType[][] = Array(mazeSize).fill(null).map(() => 
      Array(mazeSize).fill("wall")
    );

    // Create a simple maze pattern (this can be enhanced with proper maze generation algorithms)
    for (let i = 1; i < mazeSize - 1; i++) {
      for (let j = 1; j < mazeSize - 1; j++) {
        if (Math.random() > 0.3) {
          newMaze[i][j] = "path";
        }
      }
    }

    // Set start and end points
    newMaze[1][1] = "start";
    newMaze[mazeSize - 2][mazeSize - 2] = "end";
    setMaze(newMaze);
    setPlayerPosition({ x: 1, y: 1 });
  };

  // Handle keyboard movement
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (!gameStarted) return;

      const move = (dx: number, dy: number) => {
        const newX = playerPosition.x + dx;
        const newY = playerPosition.y + dy;

        if (
          newX >= 0 && newX < maze.length &&
          newY >= 0 && newY < maze.length &&
          maze[newY][newX] !== "wall"
        ) {
          setPlayerPosition({ x: newX, y: newY });
          
          // Check if player reached the end
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

      switch (e.key) {
        case "ArrowUp":
          move(0, -1);
          break;
        case "ArrowDown":
          move(0, 1);
          break;
        case "ArrowLeft":
          move(-1, 0);
          break;
        case "ArrowRight":
          move(1, 0);
          break;
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
      description: "Use arrow keys to navigate through the maze.",
      duration: 3000,
    });
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-gradient-game">
        <AppSidebar />
        <GameLayout>
          <div className="space-y-8">
            {/* Hero Section */}
            <div className="text-center space-y-4">
              <h1 className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
                Mind Maze
              </h1>
              <p className="text-lg text-white/80 max-w-2xl mx-auto">
                Challenge your cognitive skills with intricate mazes and brain-teasing puzzles
              </p>
            </div>

            {/* Game Controls */}
            {!gameStarted ? (
              <div className="bg-white/5 backdrop-blur-sm rounded-xl p-8 border border-white/10">
                <h2 className="text-2xl font-semibold text-white mb-6">Select Difficulty</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                  {["Beginner", "Advanced", "Master"].map((level) => (
                    <button
                      key={level}
                      onClick={() => setSelectedDifficulty(level)}
                      className={`p-4 rounded-lg border-2 transition-all ${
                        selectedDifficulty === level
                          ? "border-game-accent bg-white/10"
                          : "border-transparent bg-white/5 hover:bg-white/10"
                      }`}
                    >
                      <span className="text-white font-medium">{level}</span>
                    </button>
                  ))}
                </div>
                <Button
                  onClick={startGame}
                  className="bg-game-accent hover:bg-game-accent/90 text-white px-8 py-6 text-lg rounded-full"
                >
                  Start Game
                </Button>
              </div>
            ) : (
              <div className="bg-white/5 backdrop-blur-sm rounded-xl p-8 border border-white/10">
                {/* Maze Grid */}
                <div className="grid place-items-center mb-8">
                  <div 
                    className="grid gap-0.5 bg-white/10 p-2 rounded-lg"
                    style={{
                      gridTemplateColumns: `repeat(${maze.length}, minmax(0, 1fr))`,
                    }}
                  >
                    {maze.map((row, y) =>
                      row.map((cell, x) => (
                        <div
                          key={`${x}-${y}`}
                          className={`w-8 h-8 rounded-sm ${
                            playerPosition.x === x && playerPosition.y === y
                              ? "bg-game-accent animate-pulse"
                              : cell === "wall"
                              ? "bg-gray-800"
                              : cell === "end"
                              ? "bg-green-500"
                              : cell === "start"
                              ? "bg-blue-500"
                              : "bg-white/20"
                          }`}
                        />
                      ))
                    )}
                  </div>
                </div>

                {/* Controls */}
                <div className="flex flex-col items-center gap-4">
                  <div className="grid grid-cols-3 gap-2">
                    <div />
                    <Button
                      onClick={() => {
                        const event = new KeyboardEvent("keydown", { key: "ArrowUp" });
                        window.dispatchEvent(event);
                      }}
                      className="bg-white/10 hover:bg-white/20"
                    >
                      <ArrowUp className="h-4 w-4" />
                    </Button>
                    <div />
                    <Button
                      onClick={() => {
                        const event = new KeyboardEvent("keydown", { key: "ArrowLeft" });
                        window.dispatchEvent(event);
                      }}
                      className="bg-white/10 hover:bg-white/20"
                    >
                      <ArrowLeft className="h-4 w-4" />
                    </Button>
                    <Button
                      onClick={() => {
                        const event = new KeyboardEvent("keydown", { key: "ArrowDown" });
                        window.dispatchEvent(event);
                      }}
                      className="bg-white/10 hover:bg-white/20"
                    >
                      <ArrowDown className="h-4 w-4" />
                    </Button>
                    <Button
                      onClick={() => {
                        const event = new KeyboardEvent("keydown", { key: "ArrowRight" });
                        window.dispatchEvent(event);
                      }}
                      className="bg-white/10 hover:bg-white/20"
                    >
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </GameLayout>
      </div>
    </SidebarProvider>
  );
};

export default MindMaze;