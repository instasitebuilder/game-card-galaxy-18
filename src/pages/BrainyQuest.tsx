import React, { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { Brain, Trophy, Timer, Book, Info } from "lucide-react";
import GameLayout from "@/components/layouts/GameLayout";
import WordBuilder from "@/components/games/brainy-quest/WordBuilder";
import ScoreDisplay from "@/components/games/brainy-quest/ScoreDisplay";
import GameInstructions from "@/components/games/brainy-quest/GameInstructions";

const BrainyQuest = () => {
  const [score, setScore] = useState(0);
  const [currentLevel, setCurrentLevel] = useState(1);
  const [showInstructions, setShowInstructions] = useState(true);
  const { toast } = useToast();

  const handleWordSubmit = (word: string, wordScore: number) => {
    setScore((prev) => prev + wordScore);
    toast({
      title: "Word Submitted!",
      description: `"${word}" scored ${wordScore} points!`,
      duration: 2000,
    });
  };

  return (
    <GameLayout>
      <div className="min-h-screen bg-gradient-game p-4 md:p-8">
        <div className="max-w-4xl mx-auto">
          {/* Game Header */}
          <div className="flex flex-col md:flex-row justify-between items-center mb-8">
            <h1 className="text-4xl font-bold text-white mb-4 md:mb-0 flex items-center gap-3">
              <Brain className="w-8 h-8 text-game-accent" />
              Brainy Quest
            </h1>
            <div className="flex items-center gap-4">
              <button
                onClick={() => setShowInstructions(true)}
                className="flex items-center gap-2 bg-game-surface px-4 py-2 rounded-lg text-white hover:bg-white/10 transition-colors"
              >
                <Info className="w-4 h-4" />
                How to Play
              </button>
              <div className="flex items-center gap-2 bg-game-surface px-4 py-2 rounded-lg text-white">
                <Trophy className="w-4 h-4 text-game-accent" />
                <span>Level {currentLevel}</span>
              </div>
            </div>
          </div>

          {/* Game Instructions Modal */}
          {showInstructions && (
            <GameInstructions onClose={() => setShowInstructions(false)} />
          )}

          {/* Game Content */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Word Building Area */}
            <div className="md:col-span-2">
              <WordBuilder onWordSubmit={handleWordSubmit} />
            </div>

            {/* Score Display */}
            <div className="md:col-span-1">
              <ScoreDisplay score={score} level={currentLevel} />
            </div>
          </div>
        </div>
      </div>
    </GameLayout>
  );
};

export default BrainyQuest;