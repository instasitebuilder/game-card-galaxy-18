import React from 'react';
import { Button } from "@/components/ui/button";
import { ArrowLeftRight } from 'lucide-react';

interface GameControlsProps {
  onMove: (sourcePeg: number, targetPeg: number) => void;
  isGameStarted: boolean;
}

const GameControls = ({ onMove, isGameStarted }: GameControlsProps) => {
  if (!isGameStarted) return null;

  return (
    <div className="bg-white/10 p-6 rounded-lg backdrop-blur-sm mb-6">
      <h3 className="text-lg font-semibold text-white/90 mb-4">Move Discs</h3>
      <div className="grid grid-cols-3 gap-4">
        <Button
          onClick={() => onMove(0, 1)}
          className="bg-game-accent/20 hover:bg-game-accent/30 text-white"
          disabled={!isGameStarted}
        >
          <ArrowLeftRight className="w-4 h-4 mr-2" />
          A → B
        </Button>
        <Button
          onClick={() => onMove(0, 2)}
          className="bg-game-accent/20 hover:bg-game-accent/30 text-white"
          disabled={!isGameStarted}
        >
          <ArrowLeftRight className="w-4 h-4 mr-2" />
          A → C
        </Button>
        <Button
          onClick={() => onMove(1, 2)}
          className="bg-game-accent/20 hover:bg-game-accent/30 text-white"
          disabled={!isGameStarted}
        >
          <ArrowLeftRight className="w-4 h-4 mr-2" />
          B → C
        </Button>
        <Button
          onClick={() => onMove(1, 0)}
          className="bg-game-accent/20 hover:bg-game-accent/30 text-white"
          disabled={!isGameStarted}
        >
          <ArrowLeftRight className="w-4 h-4 mr-2" />
          B → A
        </Button>
        <Button
          onClick={() => onMove(2, 0)}
          className="bg-game-accent/20 hover:bg-game-accent/30 text-white"
          disabled={!isGameStarted}
        >
          <ArrowLeftRight className="w-4 h-4 mr-2" />
          C → A
        </Button>
        <Button
          onClick={() => onMove(2, 1)}
          className="bg-game-accent/20 hover:bg-game-accent/30 text-white"
          disabled={!isGameStarted}
        >
          <ArrowLeftRight className="w-4 h-4 mr-2" />
          C → B
        </Button>
      </div>
    </div>
  );
};

export default GameControls;