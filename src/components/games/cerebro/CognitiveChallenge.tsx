import React, { useState, useEffect } from "react";
import { Puzzle, Brain, Timer } from "lucide-react";
import MemoryMatch from "./challenges/MemoryMatch";
import LogicPuzzle from "./challenges/LogicPuzzle";
import VocabularyBlitz from "./challenges/VocabularyBlitz";
import QuickMath from "./challenges/QuickMath";
import SpatialReasoning from "./challenges/SpatialReasoning";

interface CognitiveChallengeProps {
  level: number;
  onScore: (points: number) => void;
  onLevelComplete: () => void;
}

const challenges = [
  { type: "memory", component: MemoryMatch, icon: Brain },
  { type: "logic", component: LogicPuzzle, icon: Puzzle },
  { type: "vocabulary", component: VocabularyBlitz, icon: Timer },
  { type: "math", component: QuickMath, icon: Brain },
  { type: "spatial", component: SpatialReasoning, icon: Puzzle },
];

const CognitiveChallenge = ({ level, onScore, onLevelComplete }: CognitiveChallengeProps) => {
  const [currentChallenge, setCurrentChallenge] = useState(0);
  const [timeLeft, setTimeLeft] = useState(60);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [currentChallenge]);

  const Challenge = challenges[currentChallenge].component;
  const ChallengeIcon = challenges[currentChallenge].icon;

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <ChallengeIcon className="w-6 h-6 text-game-accent" />
          <h2 className="text-2xl font-bold text-white">
            {challenges[currentChallenge].type.charAt(0).toUpperCase() + 
             challenges[currentChallenge].type.slice(1)} Challenge
          </h2>
        </div>
        <div className="flex items-center gap-2 text-white/80">
          <Timer className="w-4 h-4" />
          <span>{timeLeft}s</span>
        </div>
      </div>

      <Challenge
        level={level}
        onScore={onScore}
        onComplete={() => {
          if (currentChallenge < challenges.length - 1) {
            setCurrentChallenge(prev => prev + 1);
            setTimeLeft(60);
          } else {
            onLevelComplete();
            setCurrentChallenge(0);
            setTimeLeft(60);
          }
        }}
      />
    </div>
  );
};

export default CognitiveChallenge;