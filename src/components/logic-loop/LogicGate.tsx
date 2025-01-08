import React from "react";
import { CircleDot, Hash, X, RotateCcw } from "lucide-react";

interface LogicGateProps {
  id: string;
  type: "AND" | "OR" | "NOT" | "XOR";
  position: { x: number; y: number };
  inputs: boolean[];
  output: boolean;
  onClick: (id: string) => void;
  isSelected: boolean;
}

const LogicGate: React.FC<LogicGateProps> = ({
  id,
  type,
  position,
  inputs,
  output,
  onClick,
  isSelected,
}) => {
  const getGateIcon = () => {
    switch (type) {
      case "AND":
        return <CircleDot size={24} />; // Using CircleDot for AND gate
      case "OR":
        return <Hash size={24} />; // Using Hash for OR gate
      case "NOT":
        return <RotateCcw size={24} />;
      case "XOR":
        return <X size={24} />;
      default:
        return null;
    }
  };

  return (
    <div
      onClick={() => onClick(id)}
      className={`absolute p-4 bg-game-accent rounded-lg cursor-pointer transform transition-transform hover:scale-105 ${
        isSelected ? "ring-2 ring-white" : ""
      }`}
      style={{
        left: position.x,
        top: position.y,
      }}
    >
      <div className="text-white font-bold">{getGateIcon()}</div>
      <div className="text-white/80 text-sm mt-2">
        Output: {output ? "1" : "0"}
      </div>
    </div>
  );
};

export default LogicGate;