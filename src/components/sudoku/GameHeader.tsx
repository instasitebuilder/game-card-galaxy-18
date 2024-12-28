import React from "react";
import { Trophy, Timer } from "lucide-react";

interface GameHeaderProps {
  wrongAttempts: number;
  remainingTime: number;
}

const GameHeader = ({ wrongAttempts, remainingTime }: GameHeaderProps) => {
  return (
    <div className="flex flex-wrap items-center justify-between gap-4 bg-white/10 p-4 rounded-lg mb-6">
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2 bg-white/20 px-4 py-2 rounded-lg">
          <Timer className="w-5 h-5 text-game-accent" />
          <span className="text-lg font-bold text-white">
            {Math.floor(remainingTime / 60)}:{(remainingTime % 60).toString().padStart(2, '0')}
          </span>
        </div>
      </div>
      <div className="flex items-center gap-2 bg-white/20 px-4 py-2 rounded-lg">
        <Trophy className="w-5 h-5 text-red-400" />
        <span className="text-lg font-bold text-white">
          Mistakes: {wrongAttempts}/5
        </span>
      </div>
    </div>
  );
};

export default GameHeader;