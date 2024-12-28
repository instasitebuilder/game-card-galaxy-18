import React from "react";
import { Settings, Timer } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";

interface GameSettingsProps {
  size: number;
  onSizeChange: (value: string) => void;
  fixedTime: number;
  onFixedTimeChange: (time: number) => void;
}

const GameSettings = ({ size, onSizeChange, fixedTime, onFixedTimeChange }: GameSettingsProps) => {
  return (
    <div className="flex flex-wrap items-center gap-4 bg-white/10 p-4 rounded-lg mb-6">
      <div className="flex items-center gap-2">
        <Settings className="w-5 h-5 text-game-accent" />
        <span className="text-white font-medium">Game Settings</span>
      </div>
      
      <Select value={size.toString()} onValueChange={onSizeChange}>
        <SelectTrigger className="w-32 bg-white/10 border-game-accent text-white">
          <SelectValue placeholder="Size" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="4">4x4</SelectItem>
          <SelectItem value="6">6x6</SelectItem>
          <SelectItem value="9">9x9</SelectItem>
        </SelectContent>
      </Select>

      <div className="flex items-center gap-2">
        <Timer className="w-5 h-5 text-game-accent" />
        <Input
          type="number"
          min="1"
          max="60"
          value={fixedTime}
          onChange={(e) => onFixedTimeChange(parseInt(e.target.value) || 1)}
          className="w-20 bg-white/10 border-game-accent text-white"
          placeholder="Minutes"
        />
      </div>
    </div>
  );
};

export default GameSettings;