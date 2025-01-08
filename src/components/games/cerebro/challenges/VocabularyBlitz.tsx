import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

interface VocabularyBlitzProps {
  level: number;
  onScore: (points: number) => void;
  onComplete: () => void;
}

const WORD_LISTS = {
  1: ["CAT", "DOG", "RAT", "BAT"],
  2: ["BEAR", "LION", "WOLF", "DEER"],
  3: ["TIGER", "ZEBRA", "PANDA", "KOALA"],
  4: ["MONKEY", "GIRAFFE", "ELEPHANT"],
  5: ["PENGUIN", "DOLPHIN", "OCTOPUS"],
};

const VocabularyBlitz = ({ level, onScore, onComplete }: VocabularyBlitzProps) => {
  const { toast } = useToast();
  const [letters, setLetters] = useState<string[]>([]);
  const [selectedLetters, setSelectedLetters] = useState<string[]>([]);
  const [possibleWords, setPossibleWords] = useState<string[]>([]);
  const [foundWords, setFoundWords] = useState<string[]>([]);

  useEffect(() => {
    const words = WORD_LISTS[level as keyof typeof WORD_LISTS] || WORD_LISTS[1];
    setPossibleWords(words);
    
    // Create letter pool from words
    const letterPool = words.join("").split("");
    const shuffledLetters = letterPool
      .sort(() => Math.random() - 0.5)
      .slice(0, Math.min(12, letterPool.length));
    
    setLetters(shuffledLetters);
    setSelectedLetters([]);
    setFoundWords([]);
  }, [level]);

  const handleLetterClick = (letter: string, index: number) => {
    const newSelected = [...selectedLetters, letter];
    setSelectedLetters(newSelected);
    
    const word = newSelected.join("");
    if (possibleWords.includes(word)) {
      if (!foundWords.includes(word)) {
        const score = word.length * 10;
        onScore(score);
        setFoundWords([...foundWords, word]);
        toast({
          title: "Word found!",
          description: `You earned ${score} points!`,
        });
        
        if (foundWords.length + 1 === possibleWords.length) {
          onComplete();
        }
      }
      setSelectedLetters([]);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap gap-2 mb-4">
        {foundWords.map((word, index) => (
          <span
            key={index}
            className="bg-game-accent/20 text-white px-3 py-1 rounded"
          >
            {word}
          </span>
        ))}
      </div>

      <div className="text-center mb-4">
        <div className="text-2xl font-bold text-white mb-2">
          {selectedLetters.join("")}
        </div>
        <div className="text-white/60">
          Found {foundWords.length} of {possibleWords.length} words
        </div>
      </div>

      <div className="grid grid-cols-4 gap-4 max-w-md mx-auto">
        {letters.map((letter, index) => (
          <Button
            key={index}
            onClick={() => handleLetterClick(letter, index)}
            className="h-16 text-xl font-bold"
          >
            {letter}
          </Button>
        ))}
      </div>

      {selectedLetters.length > 0 && (
        <Button
          onClick={() => setSelectedLetters([])}
          variant="outline"
          className="w-full"
        >
          Clear Selection
        </Button>
      )}
    </div>
  );
};

export default VocabularyBlitz;