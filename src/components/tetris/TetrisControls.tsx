import React from "react";
import { ArrowDown, ArrowLeft, ArrowRight, RotateCw } from "lucide-react";

const TetrisControls = () => {
  return (
    <div className="bg-white/10 p-6 rounded-lg backdrop-blur-sm">
      <h3 className="text-lg font-semibold text-white/90 mb-4">Controls</h3>
      <div className="grid gap-4 text-white/70">
        <div className="flex items-center gap-2">
          <ArrowLeft className="w-5 h-5" />
          <span>Move Left</span>
        </div>
        <div className="flex items-center gap-2">
          <ArrowRight className="w-5 h-5" />
          <span>Move Right</span>
        </div>
        <div className="flex items-center gap-2">
          <ArrowDown className="w-5 h-5" />
          <span>Move Down</span>
        </div>
        <div className="flex items-center gap-2">
          <RotateCw className="w-5 h-5" />
          <span>Rotate</span>
        </div>
      </div>
    </div>
  );
};

export default TetrisControls;