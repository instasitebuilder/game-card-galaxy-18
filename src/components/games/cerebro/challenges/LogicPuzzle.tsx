import React from "react";

interface LogicPuzzleProps {
  level: number;
  onScore: (points: number) => void;
  onComplete: () => void;
}

const LogicPuzzle = ({ level, onScore, onComplete }: LogicPuzzleProps) => {
  return (
    <div className="text-white">
      Logic Puzzle Challenge - Coming Soon
    </div>
  );
};

export default LogicPuzzle;