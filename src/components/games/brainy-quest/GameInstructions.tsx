import React from "react";
import { X, Brain, Trophy, Timer, Book } from "lucide-react";

interface GameInstructionsProps {
  onClose: () => void;
}

const GameInstructions: React.FC<GameInstructionsProps> = ({ onClose }) => {
  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-gradient-card backdrop-blur-sm rounded-xl p-6 border border-game-card-border max-w-2xl w-full max-h-[80vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-white flex items-center gap-2">
            <Brain className="w-6 h-6 text-game-accent" />
            How to Play Brainy Quest
          </h2>
          <button
            onClick={onClose}
            className="text-white/70 hover:text-white transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="space-y-6">
          <div className="space-y-2">
            <h3 className="text-xl font-semibold text-white flex items-center gap-2">
              <Book className="w-5 h-5 text-game-accent" />
              Basic Rules
            </h3>
            <ul className="list-disc list-inside text-white/80 space-y-2">
              <li>Form words using the available letters</li>
              <li>Each letter has a score value (1-10)</li>
              <li>Words must be at least 3 letters long</li>
              <li>Submit words to earn points</li>
            </ul>
          </div>

          <div className="space-y-2">
            <h3 className="text-xl font-semibold text-white flex items-center gap-2">
              <Trophy className="w-5 h-5 text-game-accent" />
              Scoring System
            </h3>
            <ul className="list-disc list-inside text-white/80 space-y-2">
              <li>Letter scores are shown in the top-right corner of each letter</li>
              <li>Word score is the sum of all letter scores used</li>
              <li>Longer words typically earn more points</li>
              <li>Reach 100 points to advance to the next level</li>
            </ul>
          </div>

          <div className="space-y-2">
            <h3 className="text-xl font-semibold text-white flex items-center gap-2">
              <Timer className="w-5 h-5 text-game-accent" />
              Game Progression
            </h3>
            <ul className="list-disc list-inside text-white/80 space-y-2">
              <li>Each level becomes progressively more challenging</li>
              <li>Higher levels introduce special bonus letters</li>
              <li>Time limit adds excitement and challenge</li>
              <li>Track your progress in the score display</li>
            </ul>
          </div>

          <div className="mt-6 p-4 bg-game-surface rounded-lg">
            <p className="text-white/90 text-sm">
              Tip: Use the shuffle button to get new letters if you're stuck, but choose
              wisely as each shuffle affects your time!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GameInstructions;