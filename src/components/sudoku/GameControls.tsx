import React from "react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { RefreshCw, Lightbulb, Clock } from "lucide-react";

interface GameControlsProps {
  size: number;
  onSizeChange: (value: string) => void;
  onNewGame: () => void;
  onHint: () => void;
  fixedTime: number;
  onFixedTimeChange: (time: number) => void;
  remainingTime: number;
  wrongAttempts: number;
}

const GameControls = ({
  size,
  onSizeChange,
  onNewGame,
  onHint,
  fixedTime,
  onFixedTimeChange,
  remainingTime,
  wrongAttempts,
}: GameControlsProps) => {
  return (
    <div className="flex flex-col gap-4 mb-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <Select value={size.toString()} onValueChange={onSizeChange}>
          <SelectTrigger className="w-32 bg-white border-2 border-game-secondary text-game-primary">
            <SelectValue placeholder="Size" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="4">4x4</SelectItem>
            <SelectItem value="6">6x6</SelectItem>
            <SelectItem value="9">9x9</SelectItem>
            <SelectItem value="12">12x12</SelectItem>
          </SelectContent>
        </Select>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <Clock className="w-5 h-5 text-game-primary" />
            <Input
              type="number"
              min="1"
              max="60"
              value={fixedTime}
              onChange={(e) => onFixedTimeChange(parseInt(e.target.value) || 1)}
              className="w-20 bg-white border-2 border-game-secondary text-game-primary"
              placeholder="Minutes"
            />
          </div>
          <div className="text-lg font-bold text-game-primary">
            Time: {Math.floor(remainingTime / 60)}:{(remainingTime % 60).toString().padStart(2, '0')}
          </div>
          <div className="text-lg font-bold text-red-500">
            Wrong: {wrongAttempts}/5
          </div>
        </div>
      </div>

      <div className="flex flex-wrap justify-center gap-4">
        <Button
          onClick={onNewGame}
          variant="outline"
          className="bg-white hover:bg-game-accent/20 border-2 border-game-secondary text-game-primary"
        >
          <RefreshCw className="mr-2 h-4 w-4" />
          New Game
        </Button>
        <Button
          onClick={onHint}
          variant="outline"
          className="bg-white hover:bg-game-accent/20 border-2 border-game-secondary text-game-primary"
        >
          <Lightbulb className="mr-2 h-4 w-4" />
          Hint
        </Button>
      </div>
    </div>
  );
};

export default GameControls;