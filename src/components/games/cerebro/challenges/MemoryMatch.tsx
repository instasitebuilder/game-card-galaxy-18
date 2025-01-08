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
  const [pattern, setPattern] = useState<number[]>([]);
  const [userPattern, setUserPattern] = useState<number[]>([]);
  const [isShowingPattern, setIsShowingPattern] = useState(true);
  const [gameStarted, setGameStarted] = useState(false);

  const generatePattern = () => {
    const length = Math.min(3 + level, 9);
    const newPattern = Array.from({ length }, () => Math.floor(Math.random() * 9));
    setPattern(newPattern);
    setUserPattern([]);
    setIsShowingPattern(true);
    setGameStarted(true);
  };

  useEffect(() => {
    if (isShowingPattern) {
      const timer = setTimeout(() => {
        setIsShowingPattern(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [isShowingPattern]);

  const handleNumberClick = (number: number) => {
    if (isShowingPattern || !gameStarted) return;

    const newUserPattern = [...userPattern, number];
    setUserPattern(newUserPattern);

    // Check if the number is correct
    if (newUserPattern[newUserPattern.length - 1] !== pattern[newUserPattern.length - 1]) {
      toast({
        title: "Wrong pattern!",
        description: "Try again!",
        variant: "destructive",
      });
      setGameStarted(false);
      return;
    }

    // Check if pattern is complete
    if (newUserPattern.length === pattern.length) {
      const score = pattern.length * 10;
      onScore(score);
      toast({
        title: "Perfect match!",
        description: `You earned ${score} points!`,
      });
      onComplete();
    }
  };

  return (
    <div className="space-y-6">
      {!gameStarted && (
        <Button onClick={generatePattern} className="w-full">
          Start Challenge
        </Button>
      )}

      <div className="grid grid-cols-3 gap-4 max-w-md mx-auto">
        {Array.from({ length: 9 }).map((_, index) => (
          <button
            key={index}
            onClick={() => handleNumberClick(index)}
            disabled={isShowingPattern || !gameStarted}
            className={`
              h-24 rounded-lg transition-all duration-300
              ${isShowingPattern && pattern.includes(index)
                ? "bg-game-accent"
                : "bg-game-surface hover:bg-game-accent/20"}
              ${userPattern.includes(index) ? "bg-game-accent/50" : ""}
              disabled:opacity-50
            `}
          />
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