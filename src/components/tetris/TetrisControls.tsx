import React from "react";
import { ArrowDown, ArrowLeft, ArrowRight, RotateCw, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";

interface TetrisControlsProps {
  onMove?: (direction: "left" | "right" | "down") => void;
  onRotate?: () => void;
  onHardDrop?: () => void;
}

const TetrisControls = ({ onMove, onRotate, onHardDrop }: TetrisControlsProps) => {
  const handleButtonClick = (action: "left" | "right" | "down" | "rotate" | "hardDrop") => {
    switch (action) {
      case "left":
      case "right":
      case "down":
        onMove?.(action);
        break;
      case "rotate":
        onRotate?.();
        break;
      case "hardDrop":
        onHardDrop?.();
        break;
    }
  };

  return (
    <div className="bg-white/10 p-6 rounded-lg backdrop-blur-sm">
      <h3 className="text-lg font-semibold text-white/90 mb-4">Controls</h3>
      
      <div className="grid gap-4">
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2 text-white/70">
            <ArrowLeft className="w-5 h-5 text-blue-400" />
            <span>← Left Arrow: Move Left</span>
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="text-blue-400 hover:bg-blue-400/20 transition-colors active:scale-95 transform"
            onClick={() => handleButtonClick("left")}
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
        </div>

        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2 text-white/70">
            <ArrowRight className="w-5 h-5 text-blue-400" />
            <span>→ Right Arrow: Move Right</span>
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="text-blue-400 hover:bg-blue-400/20 transition-colors active:scale-95 transform"
            onClick={() => handleButtonClick("right")}
          >
            <ArrowRight className="w-5 h-5" />
          </Button>
        </div>

        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2 text-white/70">
            <ArrowDown className="w-5 h-5 text-blue-400" />
            <span>↓ Down Arrow: Soft Drop</span>
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="text-blue-400 hover:bg-blue-400/20 transition-colors active:scale-95 transform"
            onClick={() => handleButtonClick("down")}
          >
            <ArrowDown className="w-5 h-5" />
          </Button>
        </div>

        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2 text-white/70">
            <ChevronDown className="w-5 h-5 text-blue-400" />
            <span>Space: Hard Drop</span>
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="text-blue-400 hover:bg-blue-400/20 transition-colors active:scale-95 transform"
            onClick={() => handleButtonClick("hardDrop")}
          >
            <ChevronDown className="w-5 h-5" />
          </Button>
        </div>

        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2 text-white/70">
            <RotateCw className="w-5 h-5 text-blue-400" />
            <span>↑ Up Arrow: Rotate</span>
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="text-blue-400 hover:bg-blue-400/20 transition-colors active:scale-95 transform"
            onClick={() => handleButtonClick("rotate")}
          >
            <RotateCw className="w-5 h-5" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default TetrisControls;