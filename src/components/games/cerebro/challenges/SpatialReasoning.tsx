import React from "react";

interface SpatialReasoningProps {
  level: number;
  onScore: (points: number) => void;
  onComplete: () => void;
}

const SpatialReasoning = ({ level, onScore, onComplete }: SpatialReasoningProps) => {
  return (
    <div className="text-white">
      Spatial Reasoning Challenge - Coming Soon
    </div>
  );
};

export default SpatialReasoning;