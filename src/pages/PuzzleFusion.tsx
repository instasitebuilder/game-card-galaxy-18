import React from "react";
import { useToast } from "@/hooks/use-toast";
import { Gamepad } from "lucide-react";

const PuzzleFusion = () => {
  const { toast } = useToast();

  React.useEffect(() => {
    toast({
      title: "Coming Soon",
      description: "Puzzle Fusion is currently in development. Stay tuned for the release!",
      duration: 5000,
    });
  }, []);

  return (
    <div className="min-h-screen bg-gradient-game p-8">
      <div className="max-w-4xl mx-auto text-center">
        <div className="mb-12">
          <h1 className="text-5xl font-bold text-white mb-6">Puzzle Fusion</h1>
          <p className="text-white/80 text-lg mb-8">
            A revolutionary puzzle game blending multiple genres with dynamic gameplay and stunning visuals.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 mb-12">
          <div className="bg-gradient-card backdrop-blur-sm border border-game-card-border rounded-xl p-6">
            <h2 className="text-2xl font-bold text-white mb-4">Key Features</h2>
            <ul className="text-left text-white/80 space-y-2">
              <li>• Multiple puzzle genres in one game</li>
              <li>• Dynamic level transitions</li>
              <li>• Themed worlds with unique mechanics</li>
              <li>• Story-driven progression</li>
              <li>• Multiplayer modes</li>
            </ul>
          </div>

          <div className="bg-gradient-card backdrop-blur-sm border border-game-card-border rounded-xl p-6">
            <h2 className="text-2xl font-bold text-white mb-4">Game Modes</h2>
            <ul className="text-left text-white/80 space-y-2">
              <li>• Single Player Campaign</li>
              <li>• Cooperative Challenges</li>
              <li>• Competitive Matches</li>
              <li>• Daily Puzzles</li>
              <li>• Practice Mode</li>
            </ul>
          </div>
        </div>

        <button
          className="inline-flex items-center gap-2 bg-game-accent text-white px-8 py-4 rounded-lg hover:bg-game-accent/90 transition-colors text-lg"
          onClick={() => toast({
            title: "Coming Soon",
            description: "We'll notify you when Puzzle Fusion is available!",
            duration: 3000,
          })}
        >
          <Gamepad className="w-6 h-6" />
          <span>Notify Me on Release</span>
        </button>
      </div>
    </div>
  );
};

export default PuzzleFusion;