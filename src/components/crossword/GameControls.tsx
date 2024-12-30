import React from 'react';
import { Button } from '@/components/ui/button';
import { Check, Clock } from 'lucide-react';

interface GameControlsProps {
  timer: number;
  onCheck: () => void;
}

export const GameControls: React.FC<GameControlsProps> = ({ timer, onCheck }) => {
  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-white">
          <Clock className="w-5 h-5" />
          <span className="text-xl font-mono">{formatTime(timer)}</span>
        </div>
        <Button
          onClick={onCheck}
          className="bg-game-accent hover:bg-game-accent/80"
        >
          <Check className="w-4 h-4 mr-2" />
          Check Answers
        </Button>
      </div>
    </div>
  );
};