import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

interface QuickMathProps {
  level: number;
  onScore: (points: number) => void;
  onComplete: () => void;
}

const QuickMath = ({ level, onScore, onComplete }: QuickMathProps) => {
  const { toast } = useToast();
  const [problem, setProblem] = useState<string>("");
  const [answer, setAnswer] = useState<number>(0);
  const [options, setOptions] = useState<number[]>([]);
  const [problemCount, setProblemCount] = useState(0);

  const generateProblem = () => {
    const operations = ["+", "-", "*"];
    const operation = operations[Math.floor(Math.random() * operations.length)];
    let num1 = Math.floor(Math.random() * (10 * level)) + 1;
    let num2 = Math.floor(Math.random() * (5 * level)) + 1;

    let correctAnswer: number;
    switch (operation) {
      case "+":
        correctAnswer = num1 + num2;
        break;
      case "-":
        correctAnswer = num1 - num2;
        break;
      case "*":
        num1 = Math.floor(num1 / 2); // Make multiplication easier
        correctAnswer = num1 * num2;
        break;
      default:
        correctAnswer = num1 + num2;
    }

    setProblem(`${num1} ${operation} ${num2}`);
    setAnswer(correctAnswer);

    // Generate wrong answers
    const wrongAnswers = Array.from({ length: 3 }, () => {
      const offset = Math.floor(Math.random() * 5) + 1;
      return correctAnswer + (Math.random() < 0.5 ? offset : -offset);
    });

    setOptions([...wrongAnswers, correctAnswer].sort(() => Math.random() - 0.5));
  };

  useEffect(() => {
    generateProblem();
  }, [level]);

  const handleAnswer = (selectedAnswer: number) => {
    if (selectedAnswer === answer) {
      const score = 10 * level;
      onScore(score);
      toast({
        title: "Correct!",
        description: `You earned ${score} points!`,
      });

      if (problemCount + 1 >= 3) {
        onComplete();
      } else {
        setProblemCount(prev => prev + 1);
        generateProblem();
      }
    } else {
      toast({
        title: "Wrong answer!",
        description: "Try again!",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-game-surface p-6 rounded-lg">
        <div className="text-3xl font-bold text-white text-center mb-8">
          {problem} = ?
        </div>

        <div className="grid grid-cols-2 gap-4">
          {options.map((option, index) => (
            <Button
              key={index}
              onClick={() => handleAnswer(option)}
              className="text-xl py-6"
            >
              {option}
            </Button>
          ))}
        </div>

        <div className="mt-4 text-center text-white/60">
          Problem {problemCount + 1} of 3
        </div>
      </div>
    </div>
  );
};

export default QuickMath;