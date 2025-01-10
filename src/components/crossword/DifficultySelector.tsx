import React from 'react';
import { Button } from '@/components/ui/button';
import { type Difficulty } from '@/types/crossword';

interface DifficultySelectorProps {
  difficulty: Difficulty;
  onSelect: (difficulty: Difficulty) => void;
}

export const DifficultySelector: React.FC<DifficultySelectorProps> = ({
  difficulty,
  onSelect,
}) => {
  const levels = Array.from({ length: 10 }, (_, i) => `level${i + 1}` as Difficulty);

  return (
    <div className="flex flex-wrap gap-4">
      {levels.map((level) => (
        <Button
          key={level}
          onClick={() => onSelect(level)}
          variant={difficulty === level ? 'default' : 'outline'}
          className={`${
            difficulty === level
              ? 'bg-game-accent hover:bg-game-accent/80'
              : 'bg-white/5 hover:bg-white/10'
          }`}
        >
          Level {level.replace('level', '')}
        </Button>
      ))}
    </div>
  );
};