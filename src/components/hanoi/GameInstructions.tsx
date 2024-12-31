import React from 'react';
import { Info } from 'lucide-react';

const GameInstructions = () => {
  return (
    <div className="bg-white/10 p-6 rounded-lg backdrop-blur-sm mb-6">
      <div className="flex items-center gap-2 mb-4">
        <Info className="w-5 h-5 text-game-accent" />
        <h3 className="text-lg font-semibold text-white/90">How to Play</h3>
      </div>
      <ul className="space-y-2 text-white/80">
        <li>• Click on a disc to select it (only top disc can be selected)</li>
        <li>• Click on another peg to move the selected disc</li>
        <li>• You cannot place a larger disc on top of a smaller one</li>
        <li>• Goal: Move all discs from the first peg to the last peg</li>
        <li>• Try to complete the puzzle in the minimum number of moves!</li>
      </ul>
    </div>
  );
};

export default GameInstructions;