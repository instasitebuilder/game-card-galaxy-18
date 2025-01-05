import React from "react";
import { Button } from "@/components/ui/button";
import { ArrowUp, ArrowDown, ArrowLeft, ArrowRight } from "lucide-react";

interface MazeControlsProps {
  onMove: (direction: "up" | "down" | "left" | "right") => void;
}

const MazeControls = ({ onMove }: MazeControlsProps) => {
  return (
    <div className="grid grid-cols-3 gap-2 w-fit mx-auto">
      <div />
      <Button
        onClick={() => onMove("up")}
        className="bg-white/10 hover:bg-white/20"
      >
        <ArrowUp className="h-4 w-4" />
      </Button>
      <div />
      <Button
        onClick={() => onMove("left")}
        className="bg-white/10 hover:bg-white/20"
      >
        <ArrowLeft className="h-4 w-4" />
      </Button>
      <Button
        onClick={() => onMove("down")}
        className="bg-white/10 hover:bg-white/20"
      >
        <ArrowDown className="h-4 w-4" />
      </Button>
      <Button
        onClick={() => onMove("right")}
        className="bg-white/10 hover:bg-white/20"
      >
        <ArrowRight className="h-4 w-4" />
      </Button>
    </div>
  );
};

export default MazeControls;