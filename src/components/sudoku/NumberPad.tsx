import React from "react";
import { Button } from "@/components/ui/button";

interface NumberPadProps {
  size: number;
  handleNumberInput: (number: number) => void;
}

const NumberPad = ({ size, handleNumberInput }: NumberPadProps) => {
  return (
    <div className="mt-6 max-w-md mx-auto">
      <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
        {Array.from({ length: size }, (_, i) => (
          <Button
            key={i + 1}
            onClick={() => handleNumberInput(i + 1)}
            variant="outline"
            className="aspect-square text-xl font-bold hover:bg-game-accent/20 border-2 border-game-secondary text-game-primary"
          >
            {i + 1}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default NumberPad;