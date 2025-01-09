import React from "react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface GameControlsProps {
  onBoardSizeChange: (size: 9 | 13 | 19) => void;
  onDifficultyChange: (level: "beginner" | "intermediate" | "expert") => void;
  onUndo: () => void;
  onPass: () => void;
  onResign: () => void;
  selectedSize: 9 | 13 | 19;
  selectedDifficulty: "beginner" | "intermediate" | "expert";
  canUndo: boolean;
}

const GameControls: React.FC<GameControlsProps> = ({
  onBoardSizeChange,
  onDifficultyChange,
  onUndo,
  onPass,
  onResign,
  selectedSize,
  selectedDifficulty,
  canUndo,
}) => {
  return (
    <div className="flex flex-col gap-4 p-4 bg-white/5 rounded-lg backdrop-blur-sm">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="text-sm text-white/80">Board Size</label>
          <Select
            value={selectedSize.toString()}
            onValueChange={(value) =>
              onBoardSizeChange(parseInt(value) as 9 | 13 | 19)
            }
          >
            <SelectTrigger>
              <SelectValue placeholder="Select size" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="9">9x9 (Beginner)</SelectItem>
              <SelectItem value="13">13x13 (Intermediate)</SelectItem>
              <SelectItem value="19">19x19 (Traditional)</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <label className="text-sm text-white/80">AI Difficulty</label>
          <Select
            value={selectedDifficulty}
            onValueChange={(value) =>
              onDifficultyChange(value as "beginner" | "intermediate" | "expert")
            }
          >
            <SelectTrigger>
              <SelectValue placeholder="Select difficulty" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="beginner">Beginner</SelectItem>
              <SelectItem value="intermediate">Intermediate</SelectItem>
              <SelectItem value="expert">Expert</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="flex gap-2">
        <Button
          variant="outline"
          onClick={onUndo}
          disabled={!canUndo}
          className="flex-1"
        >
          Undo
        </Button>
        <Button
          variant="outline"
          onClick={onPass}
          className="flex-1"
        >
          Pass
        </Button>
        <Button
          variant="destructive"
          onClick={onResign}
          className="flex-1"
        >
          Resign
        </Button>
      </div>
    </div>
  );
};

export default GameControls;