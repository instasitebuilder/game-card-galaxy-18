import React, { useState, useEffect } from 'react';
import { CrosswordGrid } from '@/components/crossword/CrosswordGrid';
import { CluesList } from '@/components/crossword/CluesList';
import { GameControls } from '@/components/crossword/GameControls';
import { DifficultySelector } from '@/components/crossword/DifficultySelector';
import { Book, Trophy, HelpCircle } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { Progress } from '@/components/ui/progress';
import { type Clue, type Difficulty, type Direction } from '@/types/crossword';

const puzzles = {
  easy: {
    size: 5,
    clues: [
      {
        number: 1,
        text: "First word in many fairy tales",
        answer: "ONCE",
        direction: "across" as Direction,
        startRow: 0,
        startCol: 0,
      },
      {
        number: 2,
        text: "Opposite of night",
        answer: "DAY",
        direction: "down" as Direction,
        startRow: 0,
        startCol: 2,
      },
    ],
  },
  medium: {
    size: 7,
    clues: [
      {
        number: 1,
        text: "Capital of France",
        answer: "PARIS",
        direction: "across" as Direction,
        startRow: 0,
        startCol: 0,
      },
      {
        number: 2,
        text: "Planet nearest to the sun",
        answer: "MERCURY",
        direction: "down" as Direction,
        startRow: 0,
        startCol: 2,
      },
    ],
  },
  hard: {
    size: 10,
    clues: [
      {
        number: 1,
        text: "Largest living bird",
        answer: "OSTRICH",
        direction: "across" as Direction,
        startRow: 0,
        startCol: 0,
      },
      {
        number: 2,
        text: "Study of ancient writings",
        answer: "PALEOGRAPHY",
        direction: "down" as Direction,
        startRow: 0,
        startCol: 2,
      },
    ],
  },
};

const CrosswordGame = () => {
  const [difficulty, setDifficulty] = useState<Difficulty>('easy');
  const [selectedCell, setSelectedCell] = useState<{ row: number; col: number } | null>(null);
  const [selectedClue, setSelectedClue] = useState<Clue | null>(null);
  const [userAnswers, setUserAnswers] = useState<string[][]>([]);
  const [timer, setTimer] = useState(0);
  const [hintsRemaining, setHintsRemaining] = useState(3);
  const [score, setScore] = useState(0);
  const [progress, setProgress] = useState(0);

  const currentPuzzle = puzzles[difficulty];

  useEffect(() => {
    setUserAnswers(
      Array(currentPuzzle.size).fill(null).map(() => Array(currentPuzzle.size).fill(''))
    );
    setTimer(0);
    setHintsRemaining(3);
    setScore(0);
    setProgress(0);
  }, [difficulty]);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((prev) => prev + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleCellSelect = (row: number, col: number) => {
    setSelectedCell({ row, col });
    const clue = currentPuzzle.clues.find(
      (c) => 
        (c.direction === 'across' && c.startRow === row && col >= c.startCol && col < c.startCol + c.answer.length) ||
        (c.direction === 'down' && c.startCol === col && row >= c.startRow && row < c.startRow + c.answer.length)
    );
    if (clue) {
      setSelectedClue(clue);
    }
  };

  const handleInput = (row: number, col: number, value: string) => {
    const newAnswers = [...userAnswers];
    newAnswers[row][col] = value.toUpperCase();
    setUserAnswers(newAnswers);
    updateProgress(newAnswers);
  };

  const updateProgress = (answers: string[][]) => {
    let correct = 0;
    let total = 0;

    currentPuzzle.clues.forEach((clue) => {
      const answer = clue.answer.split('');
      answer.forEach((letter, index) => {
        total++;
        const row = clue.direction === 'across' ? clue.startRow : clue.startRow + index;
        const col = clue.direction === 'across' ? clue.startCol + index : clue.startCol;
        if (answers[row][col] === letter) {
          correct++;
        }
      });
    });

    setProgress((correct / total) * 100);
  };

  const useHint = () => {
    if (hintsRemaining > 0 && selectedCell) {
      const { row, col } = selectedCell;
      const clue = currentPuzzle.clues.find(
        (c) => 
          (c.direction === 'across' && c.startRow === row && col >= c.startCol && col < c.startCol + c.answer.length) ||
          (c.direction === 'down' && c.startCol === col && row >= c.startRow && row < c.startRow + c.answer.length)
      );

      if (clue) {
        const newAnswers = [...userAnswers];
        if (clue.direction === 'across') {
          for (let i = 0; i < clue.answer.length; i++) {
            newAnswers[clue.startRow][clue.startCol + i] = clue.answer[i];
          }
        } else {
          for (let i = 0; i < clue.answer.length; i++) {
            newAnswers[clue.startRow + i][clue.startCol] = clue.answer[i];
          }
        }
        setUserAnswers(newAnswers);
        setHintsRemaining(prev => prev - 1);
        setScore(prev => Math.max(0, prev - 50));
        updateProgress(newAnswers);
        toast({
          title: "Hint Used!",
          description: `Complete word filled in. ${hintsRemaining - 1} hints remaining.`,
        });
      }
    } else {
      toast({
        title: "No Hints Available",
        description: "You've used all your hints for this puzzle.",
        variant: "destructive",
      });
    }
  };

  const checkPuzzle = () => {
    let isCorrect = true;
    currentPuzzle.clues.forEach((clue) => {
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
      const timeBonus = Math.max(0, 1000 - timer * 2);
      const hintPenalty = (3 - hintsRemaining) * 50;
      const finalScore = timeBonus - hintPenalty;
      setScore(finalScore);

      toast({
        title: "Congratulations! 🎉",
        description: `You've completed the puzzle! Final score: ${finalScore} points`,
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
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center gap-3">
            <Book className="w-8 h-8 text-game-accent" />
            <h1 className="text-3xl md:text-4xl font-bold text-white">Crossword Puzzle</h1>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Trophy className="w-6 h-6 text-game-accent" />
              <span className="text-white/80 text-sm">Score: {score}</span>
            </div>
            <button
              onClick={useHint}
              className="flex items-center gap-2 px-3 py-1 bg-game-accent/20 rounded-full hover:bg-game-accent/30 transition-colors"
            >
              <HelpCircle className="w-4 h-4 text-game-accent" />
              <span className="text-white/80 text-sm">{hintsRemaining} Hints</span>
            </button>
          </div>
        </div>

        <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
          <DifficultySelector
            difficulty={difficulty}
            onSelect={setDifficulty}
          />
          <div className="mt-4">
            <div className="flex items-center gap-4 text-white/80 text-sm mb-2">
              <span>Progress:</span>
              <span>{Math.round(progress)}%</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <GameControls timer={timer} onCheck={checkPuzzle} />
            <CrosswordGrid
              size={currentPuzzle.size}
              clues={currentPuzzle.clues}
              selectedCell={selectedCell}
              userAnswers={userAnswers}
              onCellSelect={handleCellSelect}
              onInput={handleInput}
            />
          </div>
          <div>
            <CluesList
              clues={currentPuzzle.clues}
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
