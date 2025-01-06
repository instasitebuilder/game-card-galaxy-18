import React from "react";
import { Trophy, Star, Zap } from "lucide-react";

interface GameStatsProps {
  score: number;
  level: number;
}

const GameStats = ({ score, level }: GameStatsProps) => {
  return (
    <div className="bg-game-surface backdrop-blur-sm rounded-2xl p-6">
      <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
        <Trophy className="w-5 h-5 text-game-accent" />
        Game Stats
      </h3>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-white/80">
            <Star className="w-4 h-4" />
            <span>Score</span>
          </div>
          <span className="text-xl font-bold text-white">{score}</span>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-white/80">
            <Zap className="w-4 h-4" />
            <span>Level</span>
          </div>
          <span className="text-xl font-bold text-white">{level}</span>
        </div>
      </div>
    </div>
  );
};

export default GameStats;