import React from "react";
import { Button } from "@/components/ui/button";

interface NumberPadProps {
  size: number;
  handleNumberInput: (number: number) => void;
}

const NumberPad = ({ size, handleNumberInput }: NumberPadProps) => {
  const getGridCols = () => {
    switch (size) {
      case 9:
        return "grid-cols-3 sm:grid-cols-5";
      case 6:
        return "grid-cols-3";
      default:
        return "grid-cols-2";
    }
  };

  return (
    <div className="mt-6 max-w-md mx-auto">
      <div className={`grid ${getGridCols()} gap-2`}>
        {Array.from({ length: size }, (_, i) => (
          <Button
            key={i + 1}
            onClick={() => handleNumberInput(i + 1)}
            variant="outline"
            className="aspect-square text-base sm:text-xl font-bold bg-white/10 hover:bg-game-accent/20 border-2 border-game-accent text-white"
          >
            {i + 1}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default NumberPad;