import React from "react";

interface VocabularyBlitzProps {
  level: number;
  onScore: (points: number) => void;
  onComplete: () => void;
}

const VocabularyBlitz = ({ level, onScore, onComplete }: VocabularyBlitzProps) => {
  return (
    <div className="text-white">
      Vocabulary Blitz Challenge - Coming Soon
    </div>
  );
};

export default VocabularyBlitz;