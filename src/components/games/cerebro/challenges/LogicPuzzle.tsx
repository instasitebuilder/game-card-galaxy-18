import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

interface LogicPuzzleProps {
  level: number;
  onScore: (points: number) => void;
  onComplete: () => void;
}

const LogicPuzzle = ({ level, onScore, onComplete }: LogicPuzzleProps) => {
  const { toast } = useToast();
  const [answer, setAnswer] = useState<number | null>(null);
  const [sequence, setSequence] = useState<number[]>([]);

  useEffect(() => {
    generatePuzzle();
  }, [level]);

  const generatePuzzle = () => {
    const length = Math.min(4 + level, 8);
    const start = Math.floor(Math.random() * 5) + 1;
    const step = Math.floor(Math.random() * 3) + 1;
    
    const newSequence = Array.from({ length }, (_, i) => start + (step * i));
    setSequence(newSequence);
    setAnswer(null);
  };

  const handleAnswer = (selectedAnswer: number) => {
    const correctAnswer = sequence[sequence.length - 1] + 
      (sequence[1] - sequence[0]);
    
    if (selectedAnswer === correctAnswer) {
      const score = level * 15;
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

  const possibleAnswers = answer === null ? 
    Array.from({ length: 4 }, (_, i) => {
      const correctAnswer = sequence[sequence.length - 1] + 
        (sequence[1] - sequence[0]);
      const offset = [-2, -1, 1, 2][i];
      return correctAnswer + offset;
    }).sort(() => Math.random() - 0.5) : [];

  return (
    <div className="space-y-6">
      <div className="bg-game-surface p-6 rounded-lg">
        <h3 className="text-xl font-bold text-white mb-4">
          What comes next in the sequence?
        </h3>
        <div className="flex items-center gap-4 justify-center text-2xl text-white mb-6">
          {sequence.map((num, index) => (
            <span key={index} className="bg-game-accent/20 p-2 rounded">
              {num}
            </span>
          ))}
          <span className="text-game-accent">?</span>
        </div>
        <div className="grid grid-cols-2 gap-4">
          {possibleAnswers.map((num) => (
            <Button
              key={num}
              onClick={() => handleAnswer(num)}
              className="text-lg py-6"
            >
              {num}
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LogicPuzzle;