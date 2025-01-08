import React from "react";
import { Play, Pause, RefreshCw } from "lucide-react";

interface ControlsProps {
  onSimulate: () => void;
  onPause: () => void;
  onReset: () => void;
  isSimulating: boolean;
}

const Controls: React.FC<ControlsProps> = ({
  onSimulate,
  onPause,
  onReset,
  isSimulating,
}) => {
  return (
    <div className="flex gap-4 mb-8">
      <button
        onClick={onSimulate}
        disabled={isSimulating}
        className="flex items-center gap-2 bg-green-600 px-4 py-2 rounded-lg text-white hover:bg-green-700 transition-colors disabled:opacity-50"
      >
        <Play size={20} />
        Simulate
      </button>
      <button
        onClick={onPause}
        disabled={!isSimulating}
        className="flex items-center gap-2 bg-yellow-600 px-4 py-2 rounded-lg text-white hover:bg-yellow-700 transition-colors disabled:opacity-50"
      >
        <Pause size={20} />
        Pause
      </button>
      <button
        onClick={onReset}
        className="flex items-center gap-2 bg-red-600 px-4 py-2 rounded-lg text-white hover:bg-red-700 transition-colors"
      >
        <RefreshCw size={20} />
        Reset
      </button>
    </div>
  );
};

export default Controls;