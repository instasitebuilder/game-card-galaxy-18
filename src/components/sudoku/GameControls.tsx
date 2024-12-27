import React from "react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RefreshCw } from "lucide-react";

interface GameControlsProps {
  size: number;
  onSizeChange: (value: string) => void;
  onNewGame: () => void;
}

const GameControls = ({ size, onSizeChange, onNewGame }: GameControlsProps) => {
  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-6">
      <Select value={size.toString()} onValueChange={onSizeChange}>
        <SelectTrigger className="w-32 bg-white border-2 border-game-secondary text-game-primary">
          <SelectValue placeholder="Size" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="4">4x4</SelectItem>
          <SelectItem value="9">9x9</SelectItem>
        </SelectContent>
      </Select>
      <Button
        onClick={onNewGame}
        variant="outline"
        className="bg-white hover:bg-game-accent/20 border-2 border-game-secondary text-game-primary"
      >
        <RefreshCw className="mr-2 h-4 w-4" />
        New Game
      </Button>
    </div>
  );
};

export default GameControls;