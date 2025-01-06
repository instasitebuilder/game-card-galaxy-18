import React from 'react';
import { Info } from 'lucide-react';

interface GameInstructionsProps {
  gameType: 'match3' | 'jigsaw' | 'sliding' | 'logic';
}

const GameInstructions = ({ gameType }: GameInstructionsProps) => {
  const instructions = {
    match3: [
      "Click on a gem to select it",
      "Click on an adjacent gem to swap positions",
      "Match 3 or more gems of the same color",
      "Create combinations to score more points",
      "Try to get the highest score possible!"
    ],
    jigsaw: [
      "Drag puzzle pieces using your mouse/finger",
      "Position pieces in their correct locations",
      "Pieces will snap into place when close to their target",
      "Complete the image to win",
      "Try to solve it in the shortest time possible"
    ],
    sliding: [
      "Click on tiles adjacent to the empty space to move them",
      "Arrange the numbers in ascending order",
      "The empty space should be in the bottom right",
      "Plan your moves carefully",
      "Try to solve with minimum moves"
    ],
    logic: [
      "Click cells to fill or clear them",
      "Numbers show how many cells should be filled in each row/column",
      "Use logic to determine which cells should be filled",
      "Avoid guessing - use the hints provided",
      "Complete the pattern to win"
    ]
  };

  return (
    <div className="bg-game-surface/30 backdrop-blur-sm rounded-xl p-6 mb-8">
      <div className="flex items-center gap-2 mb-4">
        <Info className="w-5 h-5 text-game-accent" />
        <h3 className="text-xl font-semibold text-white">How to Play</h3>
      </div>
      <ul className="space-y-2">
        {instructions[gameType].map((instruction, index) => (
          <li key={index} className="text-white/80 flex items-center gap-2">
            <span className="w-1.5 h-1.5 bg-game-accent rounded-full" />
            {instruction}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default GameInstructions;