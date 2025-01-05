import React from "react";
import { Button } from "@/components/ui/button";

interface DifficultySelectorProps {
  selectedDifficulty: string;
  onSelect: (difficulty: string) => void;
}

const DifficultySelector = ({ selectedDifficulty, onSelect }: DifficultySelectorProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
      {["Beginner", "Advanced", "Master"].map((level) => (
        <button
          key={level}
          onClick={() => onSelect(level)}
          className={`p-4 rounded-lg border-2 transition-all ${
            selectedDifficulty === level
              ? "border-game-accent bg-white/10"
              : "border-transparent bg-white/5 hover:bg-white/10"
          }`}
        >
          <span className="text-white font-medium">{level}</span>
        </button>
      ))}
    </div>
  );
};

export default DifficultySelector;