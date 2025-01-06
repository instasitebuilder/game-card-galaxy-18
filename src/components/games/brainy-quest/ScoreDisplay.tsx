import React from "react";
import { Trophy, Star, Timer } from "lucide-react";

interface ScoreDisplayProps {
  score: number;
  level: number;
}

const ScoreDisplay: React.FC<ScoreDisplayProps> = ({ score, level }) => {
  return (
    <div className="bg-gradient-card backdrop-blur-sm rounded-xl p-6 border border-game-card-border">
      <div className="text-center mb-6">
        <h3 className="text-2xl font-bold text-white mb-2">Current Score</h3>
        <div className="text-4xl font-bold text-game-accent">{score}</div>
      </div>

      <div className="space-y-4">
        <div className="bg-game-surface rounded-lg p-4 flex items-center gap-3">
          <Trophy className="w-6 h-6 text-game-accent" />
          <div>
            <div className="text-sm text-white/70">Current Level</div>
            <div className="text-lg font-semibold text-white">{level}</div>
          </div>
        </div>

        <div className="bg-game-surface rounded-lg p-4">
          <h4 className="text-lg font-semibold text-white mb-2 flex items-center gap-2">
            <Star className="w-5 h-5 text-game-accent" />
            Level Progress
          </h4>
          <div className="w-full bg-game-primary rounded-full h-2">
            <div
              className="bg-game-accent h-2 rounded-full transition-all duration-300"
              style={{ width: `${(score % 100)}%` }}
            />
          </div>
          <div className="text-sm text-white/70 mt-2">
            {100 - (score % 100)} points to next level
          </div>
        </div>

        <div className="bg-game-surface rounded-lg p-4">
          <h4 className="text-lg font-semibold text-white mb-2 flex items-center gap-2">
            <Timer className="w-5 h-5 text-game-accent" />
            Time Remaining
          </h4>
          <div className="text-2xl font-bold text-white">2:00</div>
        </div>
      </div>
    </div>
  );
};

export default ScoreDisplay;