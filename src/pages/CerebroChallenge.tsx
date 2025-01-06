import React, { useState } from "react";
import GameLayout from "@/components/layouts/GameLayout";
import { Brain, Clock, Trophy, Zap } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import CognitiveChallenge from "@/components/games/cerebro/CognitiveChallenge";
import GameStats from "@/components/games/cerebro/GameStats";
import GameInstructions from "@/components/games/cerebro/GameInstructions";

const CerebroChallenge = () => {
  const [score, setScore] = useState(0);
  const [currentLevel, setCurrentLevel] = useState(1);
  const { toast } = useToast();

  const handleScoreUpdate = (points: number) => {
    setScore((prev) => prev + points);
    if (points > 0) {
      toast({
        title: "Points Earned!",
        description: `You earned ${points} points!`,
        duration: 2000,
      });
    }
  };

  const handleLevelComplete = () => {
    setCurrentLevel((prev) => prev + 1);
    toast({
      title: "Level Complete!",
      description: "Get ready for the next challenge!",
      duration: 3000,
    });
  };

  return (
    <GameLayout>
      <div className="max-w-6xl mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-4 flex items-center gap-3">
            <Brain className="w-10 h-10 text-game-accent" />
            Cerebro Challenge
          </h1>
          <p className="text-white/80">Train your brain with exciting cognitive challenges!</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="bg-game-surface backdrop-blur-sm rounded-2xl p-6 mb-8">
              <CognitiveChallenge
                level={currentLevel}
                onScore={handleScoreUpdate}
                onLevelComplete={handleLevelComplete}
              />
            </div>
          </div>

          <div className="space-y-8">
            <GameStats score={score} level={currentLevel} />
            <GameInstructions />
          </div>
        </div>
      </div>
    </GameLayout>
  );
};

export default CerebroChallenge;