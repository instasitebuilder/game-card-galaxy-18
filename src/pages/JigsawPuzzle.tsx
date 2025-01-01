import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Canvas } from "fabric";
import { useNavigate } from "react-router-dom";
import { ScrollArea } from "@/components/ui/scroll-area";

interface PuzzlePiece {
  id: number;
  x: number;
  y: number;
  isPlaced: boolean;
}

const DIFFICULTY_LEVELS = {
  easy: { grid: 4, name: "Easy" },
  medium: { grid: 6, name: "Medium" },
  hard: { grid: 10, name: "Hard" },
};

const SAMPLE_IMAGES = [
  {
    id: 1,
    url: "https://images.unsplash.com/photo-1501854140801-50d01698950b",
    name: "Mountain Landscape",
  },
  {
    id: 2,
    url: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d",
    name: "Workspace",
  },
  {
    id: 3,
    url: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e",
    name: "Robot",
  },
];

const JigsawPuzzle = () => {
  const navigate = useNavigate();
  const [selectedImage, setSelectedImage] = useState(SAMPLE_IMAGES[0]);
  const [difficulty, setDifficulty] = useState<keyof typeof DIFFICULTY_LEVELS>("easy");
  const [gameStarted, setGameStarted] = useState(false);
  const [time, setTime] = useState(0);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [canvas, setCanvas] = useState<Canvas | null>(null);

  useEffect(() => {
    if (isTimerRunning) {
      const timer = setInterval(() => {
        setTime((prevTime) => prevTime + 1);
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [isTimerRunning]);

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
  };

  const startGame = () => {
    setGameStarted(true);
    setIsTimerRunning(true);
    toast.success("Game started! Good luck!");
  };

  const resetGame = () => {
    setGameStarted(false);
    setTime(0);
    setIsTimerRunning(false);
    toast.info("Game reset!");
  };

  const showHint = () => {
    toast.info("Hint: Look at the reference image carefully!");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-game-background via-game-primary to-game-secondary p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold text-white">Jigsaw Puzzle</h1>
          <Button
            variant="outline"
            onClick={() => navigate("/")}
            className="hover:bg-game-accent/20"
          >
            Back to Home
          </Button>
        </div>

        {!gameStarted ? (
          <div className="bg-game-surface rounded-lg p-8 shadow-xl">
            <h2 className="text-2xl font-semibold text-white mb-6">Game Setup</h2>
            
            <div className="space-y-6">
              <div>
                <h3 className="text-lg text-white mb-4">Select an Image:</h3>
                <ScrollArea className="h-64 rounded-md border p-4">
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {SAMPLE_IMAGES.map((image) => (
                      <div
                        key={image.id}
                        className={`relative rounded-lg overflow-hidden cursor-pointer transition-transform hover:scale-105 ${
                          selectedImage.id === image.id
                            ? "ring-4 ring-game-accent"
                            : ""
                        }`}
                        onClick={() => setSelectedImage(image)}
                      >
                        <img
                          src={image.url}
                          alt={image.name}
                          className="w-full h-40 object-cover"
                        />
                        <div className="absolute bottom-0 left-0 right-0 bg-black/50 p-2">
                          <p className="text-white text-sm">{image.name}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              </div>

              <div>
                <h3 className="text-lg text-white mb-4">Select Difficulty:</h3>
                <div className="grid grid-cols-3 gap-4">
                  {Object.entries(DIFFICULTY_LEVELS).map(([key, value]) => (
                    <Button
                      key={key}
                      variant={difficulty === key ? "default" : "outline"}
                      onClick={() => setDifficulty(key as keyof typeof DIFFICULTY_LEVELS)}
                      className={`w-full ${
                        difficulty === key
                          ? "bg-game-accent text-white"
                          : "hover:bg-game-accent/20"
                      }`}
                    >
                      {value.name}
                    </Button>
                  ))}
                </div>
              </div>

              <Button
                className="w-full bg-game-accent hover:bg-game-accent/90 text-white"
                onClick={startGame}
              >
                Start Game
              </Button>
            </div>
          </div>
        ) : (
          <div className="bg-game-surface rounded-lg p-8 shadow-xl">
            <div className="flex justify-between items-center mb-6">
              <div className="space-y-2">
                <p className="text-white">Time: {formatTime(time)}</p>
                <p className="text-white">
                  Difficulty: {DIFFICULTY_LEVELS[difficulty].name}
                </p>
              </div>
              <div className="space-x-4">
                <Button variant="outline" onClick={showHint}>
                  Show Hint
                </Button>
                <Button variant="outline" onClick={resetGame}>
                  Reset Game
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-black/20 rounded-lg p-4">
                <h3 className="text-lg text-white mb-4">Reference Image:</h3>
                <img
                  src={selectedImage.url}
                  alt="Reference"
                  className="w-full rounded-lg"
                />
              </div>

              <div className="bg-black/20 rounded-lg p-4">
                <h3 className="text-lg text-white mb-4">Puzzle Area:</h3>
                <div className="aspect-square bg-black/40 rounded-lg">
                  {/* Canvas will be mounted here */}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default JigsawPuzzle;