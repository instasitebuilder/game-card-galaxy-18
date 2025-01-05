import React, { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Gamepad, Sparkles, Users, Trophy, Lightbulb, Palette } from "lucide-react";
import { Button } from "@/components/ui/button";
import GameLayout from "@/components/layouts/GameLayout";

type GameMode = "match3" | "jigsaw" | "sliding" | "logic" | null;
type ThemeWorld = "fire" | "water" | "earth" | "air";

const PuzzleFusion = () => {
  const { toast } = useToast();
  const [selectedMode, setSelectedMode] = useState<GameMode>(null);
  const [selectedTheme, setSelectedTheme] = useState<ThemeWorld>("fire");
  const [showTutorial, setShowTutorial] = useState(true);

  const handleModeSelect = (mode: GameMode) => {
    setSelectedMode(mode);
    toast({
      title: "Game Mode Selected",
      description: `${mode} mode activated! This feature is coming soon.`,
      duration: 3000,
    });
  };

  const handleThemeSelect = (theme: ThemeWorld) => {
    setSelectedTheme(theme);
    toast({
      title: "Theme Changed",
      description: `Switched to ${theme} world!`,
      duration: 2000,
    });
  };

  return (
    <GameLayout>
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-game-surface backdrop-blur-sm border border-game-card-border mb-4">
            <Sparkles className="w-4 h-4 text-game-accent" />
            <span className="text-sm text-white/80">Beta Version</span>
          </div>
          <h1 className="text-5xl font-bold text-white mb-6">Puzzle Fusion</h1>
          <p className="text-xl text-white/80 max-w-2xl mx-auto">
            Experience the future of puzzle gaming where multiple genres blend into one seamless adventure.
          </p>
        </div>

        {/* Game Modes Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {[
            { mode: "match3", title: "Match-3 Fusion", icon: Palette },
            { mode: "jigsaw", title: "Jigsaw Journey", icon: Users },
            { mode: "sliding", title: "Sliding Puzzler", icon: Trophy },
            { mode: "logic", title: "Logic Master", icon: Lightbulb },
          ].map(({ mode, title, icon: Icon }) => (
            <button
              key={mode}
              onClick={() => handleModeSelect(mode as GameMode)}
              className="group relative overflow-hidden rounded-2xl bg-gradient-card backdrop-blur-sm border border-game-card-border p-6 text-left transition-all duration-300 hover:scale-105"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-game-accent/10 rounded-full blur-3xl group-hover:bg-game-accent/20 transition-all duration-500" />
              <Icon className="w-8 h-8 text-game-accent mb-4" />
              <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
              <p className="text-white/60 text-sm">Coming Soon</p>
            </button>
          ))}
        </div>

        {/* Theme Worlds */}
        <div className="bg-gradient-card backdrop-blur-sm border border-game-card-border rounded-2xl p-6 mb-12">
          <h2 className="text-2xl font-bold text-white mb-6">Elemental Worlds</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {["fire", "water", "earth", "air"].map((theme) => (
              <button
                key={theme}
                onClick={() => handleThemeSelect(theme as ThemeWorld)}
                className={`px-4 py-3 rounded-lg text-white font-medium transition-all duration-300 ${
                  selectedTheme === theme
                    ? "bg-game-accent"
                    : "bg-game-surface hover:bg-game-accent/20"
                }`}
              >
                {theme.charAt(0).toUpperCase() + theme.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* Tutorial Card */}
        {showTutorial && (
          <div className="bg-gradient-card backdrop-blur-sm border border-game-card-border rounded-2xl p-6 mb-12">
            <div className="flex justify-between items-start mb-4">
              <h2 className="text-2xl font-bold text-white">How to Play</h2>
              <Button
                variant="ghost"
                onClick={() => setShowTutorial(false)}
                className="text-white/60 hover:text-white"
              >
                Dismiss
              </Button>
            </div>
            <div className="grid gap-4 text-white/80">
              <p>• Select a game mode to begin your puzzle journey</p>
              <p>• Each mode combines different puzzle mechanics</p>
              <p>• Complete challenges to unlock new themes and power-ups</p>
              <p>• Compete with friends or play cooperatively</p>
            </div>
          </div>
        )}

        {/* Coming Soon Notice */}
        <div className="text-center">
          <Button
            onClick={() => {
              toast({
                title: "Coming Soon!",
                description: "Puzzle Fusion is currently in development. Stay tuned for the full release!",
                duration: 5000,
              });
            }}
            className="bg-game-accent hover:bg-game-accent/90 text-white px-8 py-6 rounded-xl text-lg font-semibold"
          >
            <Gamepad className="w-5 h-5 mr-2" />
            Join the Waitlist
          </Button>
        </div>
      </div>
    </GameLayout>
  );
};

export default PuzzleFusion;