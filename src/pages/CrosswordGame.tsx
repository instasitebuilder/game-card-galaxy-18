import React, { useState, useEffect } from 'react';
import { CrosswordGrid } from '@/components/crossword/CrosswordGrid';
import { CluesList } from '@/components/crossword/CluesList';
import { GameControls } from '@/components/crossword/GameControls';
import { Book, Trophy } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';

interface Clue {
  number: number;
  text: string;
  answer: string;
  direction: 'across' | 'down';
  startRow: number;
  startCol: number;
}

const samplePuzzle = {
  size: 5,
  clues: [
    {
      number: 1,
      text: "First word in many fairy tales",
      answer: "ONCE",
      direction: "across",
      startRow: 0,
      startCol: 0,
    },
    {
      number: 2,
      text: "Opposite of night",
      answer: "DAY",
      direction: "down",
      startRow: 0,
      startCol: 2,
    },
  ] as Clue[],
};

const CrosswordGame = () => {
  const [selectedCell, setSelectedCell] = useState<{ row: number; col: number } | null>(null);
  const [selectedClue, setSelectedClue] = useState<Clue | null>(null);
  const [userAnswers, setUserAnswers] = useState<string[][]>(
    Array(samplePuzzle.size).fill(null).map(() => Array(samplePuzzle.size).fill(''))
  );
  const [timer, setTimer] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((prev) => prev + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleCellSelect = (row: number, col: number) => {
    setSelectedCell({ row, col });
  };

  const handleInput = (row: number, col: number, value: string) => {
    const newAnswers = [...userAnswers];
    newAnswers[row][col] = value.toUpperCase();
    setUserAnswers(newAnswers);
  };

  const checkPuzzle = () => {
    let isCorrect = true;
    samplePuzzle.clues.forEach((clue) => {
      const answer = clue.answer.split('');
      answer.forEach((letter, index) => {
        const row = clue.direction === 'across' ? clue.startRow : clue.startRow + index;
        const col = clue.direction === 'across' ? clue.startCol + index : clue.startCol;
        if (userAnswers[row][col] !== letter) {
          isCorrect = false;
        }
      });
    });

    if (isCorrect) {
      toast({
        title: "Congratulations! 🎉",
        description: "You've successfully completed the puzzle!",
      });
    } else {
      toast({
        title: "Keep trying! 💪",
        description: "Some answers are incorrect.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-game-background via-game-primary to-game-secondary p-4 md:p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Book className="w-8 h-8 text-game-accent" />
            <h1 className="text-3xl md:text-4xl font-bold text-white">Crossword Puzzle</h1>
          </div>
          <div className="flex items-center gap-2">
            <Trophy className="w-6 h-6 text-game-accent" />
            <span className="text-white/80 text-sm">Best Time: 05:23</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <GameControls timer={timer} onCheck={checkPuzzle} />
            <CrosswordGrid
              size={samplePuzzle.size}
              clues={samplePuzzle.clues}
              selectedCell={selectedCell}
              userAnswers={userAnswers}
              onCellSelect={handleCellSelect}
              onInput={handleInput}
            />
          </div>
          <div>
            <CluesList
              clues={samplePuzzle.clues}
              selectedClue={selectedClue}
              onClueSelect={(clue) => {
                setSelectedCell({ row: clue.startRow, col: clue.startCol });
                setSelectedClue(clue);
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CrosswordGame;