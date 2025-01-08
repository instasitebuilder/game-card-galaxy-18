import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

interface MemoryMatchProps {
  level: number;
  onScore: (points: number) => void;
  onComplete: () => void;
}

const MemoryMatch = ({ level, onScore, onComplete }: MemoryMatchProps) => {
  const { toast } = useToast();
  const [pattern, setPattern] = useState<boolean[][]>(Array(9).fill(Array(9).fill(false)));
  const [userPattern, setUserPattern] = useState<boolean[][]>(Array(9).fill(Array(9).fill(false)));
  const [isShowingPattern, setIsShowingPattern] = useState(true);
  const [gameStarted, setGameStarted] = useState(false);

  const generatePattern = () => {
    // Create a new pattern based on level difficulty
    const cellsToActivate = Math.min(3 + level * 2, 20);
    const newPattern = Array(9).fill(null).map(() => Array(9).fill(false));
    
    let activatedCells = 0;
    while (activatedCells < cellsToActivate) {
      const row = Math.floor(Math.random() * 9);
      const col = Math.floor(Math.random() * 9);
      if (!newPattern[row][col]) {
        newPattern[row][col] = true;
        activatedCells++;
      }
    }
    
    setPattern(newPattern);
    setUserPattern(Array(9).fill(null).map(() => Array(9).fill(false)));
    setIsShowingPattern(true);
    setGameStarted(true);
  };

  useEffect(() => {
    if (isShowingPattern) {
      const timer = setTimeout(() => {
        setIsShowingPattern(false);
      }, 3000 + (level * 500)); // More time for higher levels
      return () => clearTimeout(timer);
    }
  }, [isShowingPattern, level]);

  const handleCellClick = (row: number, col: number) => {
    if (isShowingPattern || !gameStarted) return;

    const newUserPattern = userPattern.map(r => [...r]);
    newUserPattern[row][col] = !newUserPattern[row][col];
    setUserPattern(newUserPattern);

    // Check if patterns match after each click
    const patternsMatch = checkPatterns(newUserPattern, pattern);
    if (patternsMatch) {
      const score = calculateScore(level, pattern);
      onScore(score);
      toast({
        title: "Perfect match!",
        description: `You earned ${score} points!`,
      });
      onComplete();
    }
  };

  const checkPatterns = (userPat: boolean[][], targetPat: boolean[][]) => {
    for (let i = 0; i < 9; i++) {
      for (let j = 0; j < 9; j++) {
        if (userPat[i][j] !== targetPat[i][j]) return false;
      }
    }
    return true;
  };

  const calculateScore = (currentLevel: number, targetPattern: boolean[][]) => {
    const activeCells = targetPattern.flat().filter(cell => cell).length;
    return activeCells * 10 * currentLevel;
  };

  return (
    <div className="space-y-6">
      {!gameStarted && (
        <Button onClick={generatePattern} className="w-full">
          Start Challenge
        </Button>
      )}

      <div className="grid grid-cols-9 gap-1 max-w-2xl mx-auto aspect-square">
        {Array(9).fill(null).map((_, row) => (
          Array(9).fill(null).map((_, col) => (
            <button
              key={`${row}-${col}`}
              onClick={() => handleCellClick(row, col)}
              disabled={isShowingPattern || !gameStarted}
              className={`
                aspect-square rounded-sm transition-all duration-300
                ${isShowingPattern && pattern[row][col]
                  ? "bg-game-accent"
                  : "bg-game-surface hover:bg-game-accent/20"}
                ${userPattern[row][col] ? "bg-game-accent/50" : ""}
                disabled:opacity-50
              `}
            />
          ))
        ))}
      </div>

      {isShowingPattern && gameStarted && (
        <div className="text-center text-white/80">
          Memorize the pattern...
        </div>
      )}

      {!isShowingPattern && gameStarted && (
        <div className="text-center text-white/80">
          Reproduce the pattern!
        </div>
      )}
    </div>
  );
};

export default MemoryMatch;