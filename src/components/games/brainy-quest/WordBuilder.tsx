import React, { useState, useEffect } from "react";
import { Shuffle, Send } from "lucide-react";

interface WordBuilderProps {
  onWordSubmit: (word: string, score: number) => void;
}

const WordBuilder: React.FC<WordBuilderProps> = ({ onWordSubmit }) => {
  const [availableLetters, setAvailableLetters] = useState<string[]>([]);
  const [selectedLetters, setSelectedLetters] = useState<string[]>([]);
  const [letterWeights, setLetterWeights] = useState<Record<string, number>>({});

  useEffect(() => {
    generateNewLetters();
  }, []);

  const generateNewLetters = () => {
    const vowels = "AEIOU".split("");
    const consonants = "BCDFGHJKLMNPQRSTVWXYZ".split("");
    const newLetters: string[] = [];
    const newWeights: Record<string, number> = {};

    // Add 3 vowels and 7 consonants
    for (let i = 0; i < 3; i++) {
      const randomVowel = vowels[Math.floor(Math.random() * vowels.length)];
      newLetters.push(randomVowel);
      newWeights[randomVowel] = Math.floor(Math.random() * 10) + 1;
    }

    for (let i = 0; i < 7; i++) {
      const randomConsonant = consonants[Math.floor(Math.random() * consonants.length)];
      newLetters.push(randomConsonant);
      newWeights[randomConsonant] = Math.floor(Math.random() * 10) + 1;
    }

    setAvailableLetters(newLetters.sort(() => Math.random() - 0.5));
    setLetterWeights(newWeights);
  };

  const handleLetterClick = (letter: string, isSelected: boolean) => {
    if (isSelected) {
      setSelectedLetters(selectedLetters.filter((l) => l !== letter));
      setAvailableLetters([...availableLetters, letter]);
    } else {
      setSelectedLetters([...selectedLetters, letter]);
      setAvailableLetters(availableLetters.filter((l) => l !== letter));
    }
  };

  const calculateWordScore = (word: string): number => {
    return word
      .split("")
      .reduce((score, letter) => score + (letterWeights[letter] || 0), 0);
  };

  const handleSubmit = () => {
    const word = selectedLetters.join("");
    if (word.length < 3) {
      return;
    }
    const wordScore = calculateWordScore(word);
    onWordSubmit(word, wordScore);
    setSelectedLetters([]);
    generateNewLetters();
  };

  return (
    <div className="bg-gradient-card backdrop-blur-sm rounded-xl p-6 border border-game-card-border">
      <div className="mb-8">
        <h3 className="text-xl font-semibold text-white mb-4">Selected Letters</h3>
        <div className="flex flex-wrap gap-2 min-h-16 p-4 bg-game-surface rounded-lg border border-game-card-border">
          {selectedLetters.map((letter, index) => (
            <button
              key={`selected-${index}`}
              onClick={() => handleLetterClick(letter, true)}
              className="w-12 h-12 flex items-center justify-center bg-game-accent text-white rounded-lg font-bold text-xl hover:bg-game-accent/80 transition-colors relative"
            >
              {letter}
              <span className="absolute -top-2 -right-2 text-xs bg-white text-game-primary rounded-full w-5 h-5 flex items-center justify-center">
                {letterWeights[letter]}
              </span>
            </button>
          ))}
        </div>
      </div>

      <div className="mb-8">
        <h3 className="text-xl font-semibold text-white mb-4">Available Letters</h3>
        <div className="flex flex-wrap gap-2">
          {availableLetters.map((letter, index) => (
            <button
              key={`available-${index}`}
              onClick={() => handleLetterClick(letter, false)}
              className="w-12 h-12 flex items-center justify-center bg-game-surface text-white rounded-lg font-bold text-xl hover:bg-game-surface/80 transition-colors relative"
            >
              {letter}
              <span className="absolute -top-2 -right-2 text-xs bg-white text-game-primary rounded-full w-5 h-5 flex items-center justify-center">
                {letterWeights[letter]}
              </span>
            </button>
          ))}
        </div>
      </div>

      <div className="flex gap-4">
        <button
          onClick={generateNewLetters}
          className="flex-1 flex items-center justify-center gap-2 bg-game-surface text-white py-3 rounded-lg hover:bg-game-surface/80 transition-colors"
        >
          <Shuffle className="w-5 h-5" />
          Shuffle Letters
        </button>
        <button
          onClick={handleSubmit}
          disabled={selectedLetters.length < 3}
          className="flex-1 flex items-center justify-center gap-2 bg-game-accent text-white py-3 rounded-lg hover:bg-game-accent/80 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Send className="w-5 h-5" />
          Submit Word
        </button>
      </div>
    </div>
  );
};

export default WordBuilder;