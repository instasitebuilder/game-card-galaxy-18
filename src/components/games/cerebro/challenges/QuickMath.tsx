import React from "react";

interface QuickMathProps {
  level: number;
  onScore: (points: number) => void;
  onComplete: () => void;
}

const QuickMath = ({ level, onScore, onComplete }: QuickMathProps) => {
  return (
    <div className="text-white">
      Quick Math Challenge - Coming Soon
    </div>
  );
};

export default QuickMath;