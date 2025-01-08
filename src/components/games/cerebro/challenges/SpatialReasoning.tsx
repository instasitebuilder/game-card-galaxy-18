import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

interface SpatialReasoningProps {
  level: number;
  onScore: (points: number) => void;
  onComplete: () => void;
}

const SpatialReasoning = ({ level, onScore, onComplete }: SpatialReasoningProps) => {
  const { toast } = useToast();
  const [pattern, setPattern] = useState<boolean[][]>([]);
  const [rotatedPattern, setRotatedPattern] = useState<boolean[][]>([]);
  const [options, setOptions] = useState<boolean[][][]>([]);
  const gridSize = Math.min(3 + Math.floor(level / 2), 6);

  const generatePattern = () => {
    // Create random pattern
    const newPattern: boolean[][] = Array.from({ length: gridSize }, () =>
      Array.from({ length: gridSize }, () => Math.random() < 0.5)
    );
    setPattern(newPattern);

    // Create rotated pattern (correct answer)
    const rotated = rotatePattern(newPattern);
    setRotatedPattern(rotated);

    // Generate wrong options
    const wrongOptions = Array.from({ length: 3 }, () =>
      generateWrongPattern(rotated, gridSize)
    );

    // Shuffle options
    setOptions([...wrongOptions, rotated].sort(() => Math.random() - 0.5));
  };

  const rotatePattern = (original: boolean[][]) => {
    const size = original.length;
    const rotated = Array.from({ length: size }, () =>
      Array.from({ length: size }, () => false)
    );

    for (let i = 0; i < size; i++) {
      for (let j = 0; j < size; j++) {
        rotated[j][size - 1 - i] = original[i][j];
      }
    }

    return rotated;
  };

  const generateWrongPattern = (correct: boolean[][], size: number) => {
    const wrong = Array.from({ length: size }, (_, i) =>
      Array.from({ length: size }, (_, j) => correct[i][j])
    );

    // Modify a few random cells
    for (let i = 0; i < 2; i++) {
      const x = Math.floor(Math.random() * size);
      const y = Math.floor(Math.random() * size);
      wrong[x][y] = !wrong[x][y];
    }

    return wrong;
  };

  useEffect(() => {
    generatePattern();
  }, [level]);

  const handleSelection = (selectedPattern: boolean[][]) => {
    const isCorrect = JSON.stringify(selectedPattern) === JSON.stringify(rotatedPattern);

    if (isCorrect) {
      const score = level * 20;
      onScore(score);
      toast({
        title: "Correct!",
        description: `You earned ${score} points!`,
      });
      onComplete();
    } else {
      toast({
        title: "Incorrect!",
        description: "Try again!",
        variant: "destructive",
      });
    }
  };

  const renderGrid = (grid: boolean[][]) => (
    <div 
      className="grid gap-1"
      style={{
        gridTemplateColumns: `repeat(${gridSize}, 1fr)`
      }}
    >
      {grid.flat().map((cell, index) => (
        <div
          key={index}
          className={`w-6 h-6 rounded ${
            cell ? "bg-game-accent" : "bg-game-surface"
          }`}
        />
      ))}
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="bg-game-surface p-6 rounded-lg">
        <div className="text-center mb-6">
          <h3 className="text-xl font-bold text-white mb-2">
            Which pattern shows the original rotated 90° clockwise?
          </h3>
          <div className="flex justify-center items-center gap-8">
            <div>
              <div className="text-white/60 mb-2">Original</div>
              {renderGrid(pattern)}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-6">
          {options.map((option, index) => (
            <Button
              key={index}
              onClick={() => handleSelection(option)}
              className="p-4 h-auto"
            >
              {renderGrid(option)}
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SpatialReasoning;