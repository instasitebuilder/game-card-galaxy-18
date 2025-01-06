import React from "react";

interface MemoryMatchProps {
  level: number;
  onScore: (points: number) => void;
  onComplete: () => void;
}

const MemoryMatch = ({ level, onScore, onComplete }: MemoryMatchProps) => {
  return (
    <div className="text-white">
      Memory Match Challenge - Coming Soon
    </div>
  );
};

export default MemoryMatch;