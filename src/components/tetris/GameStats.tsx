import React from "react";
import { Trophy, Gauge, Layout, Timer } from "lucide-react";

interface GameStatsProps {
  score: number;
  level: number;
  lines: number;
  highScore?: number;
}

const GameStats = ({ score, level, lines, highScore = 0 }: GameStatsProps) => {
  return (
    <div className="bg-white/10 p-6 rounded-lg backdrop-blur-sm">
      <h3 className="text-lg font-semibold text-white/90 mb-4">Stats</h3>
      <div className="grid gap-4">
        <div className="flex items-center gap-3 text-white/70">
          <Trophy className="w-5 h-5 text-yellow-400" />
          <span>Score: {score}</span>
        </div>
        {highScore > 0 && (
          <div className="flex items-center gap-3 text-white/70">
            <Timer className="w-5 h-5 text-purple-400" />
            <span>High Score: {highScore}</span>
          </div>
        )}
        <div className="flex items-center gap-3 text-white/70">
          <Gauge className="w-5 h-5 text-green-400" />
          <span>Level: {level}</span>
        </div>
        <div className="flex items-center gap-3 text-white/70">
          <Layout className="w-5 h-5 text-blue-400" />
          <span>Lines: {lines}</span>
        </div>
      </div>
    </div>
  );
};

export default GameStats;