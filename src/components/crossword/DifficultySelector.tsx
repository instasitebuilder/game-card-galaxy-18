import React from 'react';
import { Button } from '@/components/ui/button';

interface DifficultySelectorProps {
  difficulty: 'easy' | 'medium' | 'hard';
  onSelect: (difficulty: 'easy' | 'medium' | 'hard') => void;
}

export const DifficultySelector: React.FC<DifficultySelectorProps> = ({
  difficulty,
  onSelect,
}) => {
  return (
    <div className="flex flex-wrap gap-4">
      <Button
        onClick={() => onSelect('easy')}
        variant={difficulty === 'easy' ? 'default' : 'outline'}
        className={`${
          difficulty === 'easy'
            ? 'bg-game-accent hover:bg-game-accent/80'
            : 'bg-white/5 hover:bg-white/10'
        }`}
      >
        Easy
      </Button>
      <Button
        onClick={() => onSelect('medium')}
        variant={difficulty === 'medium' ? 'default' : 'outline'}
        className={`${
          difficulty === 'medium'
            ? 'bg-game-accent hover:bg-game-accent/80'
            : 'bg-white/5 hover:bg-white/10'
        }`}
      >
        Medium
      </Button>
      <Button
        onClick={() => onSelect('hard')}
        variant={difficulty === 'hard' ? 'default' : 'outline'}
        className={`${
          difficulty === 'hard'
            ? 'bg-game-accent hover:bg-game-accent/80'
            : 'bg-white/5 hover:bg-white/10'
        }`}
      >
        Hard
      </Button>
    </div>
  );
};