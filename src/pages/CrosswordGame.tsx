import React, { useState, useEffect } from 'react';
import { CrosswordGrid } from '@/components/crossword/CrosswordGrid';
import { CluesList } from '@/components/crossword/CluesList';
import { GameControls } from '@/components/crossword/GameControls';
import { DifficultySelector } from '@/components/crossword/DifficultySelector';
import { Book, Trophy, HelpCircle, Star } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { Progress } from '@/components/ui/progress';
import { type Clue, type Difficulty, type Direction } from '@/types/crossword';
import GameLayout from '@/components/layouts/GameLayout';
import { motion } from 'framer-motion';

const puzzles = {
  level1: {
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
      {
        number: 3,
        text: "Small flying insect",
        answer: "BEE",
        direction: "across" as Direction,
        startRow: 2,
        startCol: 1,
      },
    ],
  },
  level2: {
    size: 6,
    clues: [
      {
        number: 1,
        text: "Celestial body that orbits Earth",
        answer: "MOON",
        direction: "across" as Direction,
        startRow: 0,
        startCol: 1,
      },
      {
        number: 2,
        text: "Frozen precipitation",
        answer: "SNOW",
        direction: "down" as Direction,
        startRow: 0,
        startCol: 2,
      },
      {
        number: 3,
        text: "Large African cat",
        answer: "LION",
        direction: "across" as Direction,
        startRow: 3,
        startCol: 0,
      },
    ],
  },
  level3: {
    size: 7,
    clues: [
      {
        number: 1,
        text: "Capital of France",
        answer: "PARIS",
        direction: "across" as Direction,
        startRow: 0,
        startCol: 1,
      },
      {
        number: 2,
        text: "Closest planet to the Sun",
        answer: "MERCURY",
        direction: "down" as Direction,
        startRow: 0,
        startCol: 3,
      },
      {
        number: 3,
        text: "Ancient Greek marketplace",
        answer: "AGORA",
        direction: "across" as Direction,
        startRow: 4,
        startCol: 2,
      },
    ],
  },
  level4: {
    size: 8,
    clues: [
      {
        number: 1,
        text: "Study of ancient civilizations",
        answer: "HISTORY",
        direction: "across" as Direction,
        startRow: 0,
        startCol: 0,
      },
      {
        number: 2,
        text: "Process of converting food to energy",
        answer: "DIGEST",
        direction: "down" as Direction,
        startRow: 0,
        startCol: 3,
      },
      {
        number: 3,
        text: "Astronomical phenomenon",
        answer: "ECLIPSE",
        direction: "across" as Direction,
        startRow: 4,
        startCol: 1,
      },
    ],
  },
  level5: {
    size: 9,
    clues: [
      {
        number: 1,
        text: "Study of Earth's physical features",
        answer: "GEOLOGY",
        direction: "across" as Direction,
        startRow: 0,
        startCol: 1,
      },
      {
        number: 2,
        text: "Fear of enclosed spaces",
        answer: "CLAUSTROPHOBIA",
        direction: "down" as Direction,
        startRow: 0,
        startCol: 4,
      },
      {
        number: 3,
        text: "Branch of mathematics dealing with shapes",
        answer: "GEOMETRY",
        direction: "across" as Direction,
        startRow: 5,
        startCol: 2,
      },
    ],
  },
  level6: {
    size: 10,
    clues: [
      {
        number: 1,
        text: "Study of microscopic life",
        answer: "MICROBIOLOGY",
        direction: "across" as Direction,
        startRow: 0,
        startCol: 0,
      },
      {
        number: 2,
        text: "Process of cell division",
        answer: "MITOSIS",
        direction: "down" as Direction,
        startRow: 0,
        startCol: 5,
      },
      {
        number: 3,
        text: "Study of heredity",
        answer: "GENETICS",
        direction: "across" as Direction,
        startRow: 6,
        startCol: 2,
      },
    ],
  },
  level7: {
    size: 11,
    clues: [
      {
        number: 1,
        text: "Study of the atmosphere",
        answer: "METEOROLOGY",
        direction: "across" as Direction,
        startRow: 0,
        startCol: 0,
      },
      {
        number: 2,
        text: "Branch of physics dealing with motion",
        answer: "KINEMATICS",
        direction: "down" as Direction,
        startRow: 0,
        startCol: 6,
      },
      {
        number: 3,
        text: "Study of chemical reactions",
        answer: "BIOCHEMISTRY",
        direction: "across" as Direction,
        startRow: 7,
        startCol: 2,
      },
    ],
  },
  level8: {
    size: 12,
    clues: [
      {
        number: 1,
        text: "Study of the human mind and behavior",
        answer: "PSYCHOLOGY",
        direction: "across" as Direction,
        startRow: 0,
        startCol: 2,
      },
      {
        number: 2,
        text: "Branch of medicine dealing with heart",
        answer: "CARDIOLOGY",
        direction: "down" as Direction,
        startRow: 0,
        startCol: 7,
      },
      {
        number: 3,
        text: "Study of the nervous system",
        answer: "NEUROSCIENCE",
        direction: "across" as Direction,
        startRow: 8,
        startCol: 1,
      },
    ],
  },
  level9: {
    size: 13,
    clues: [
      {
        number: 1,
        text: "Study of the origin and structure of the universe",
        answer: "COSMOLOGY",
        direction: "across" as Direction,
        startRow: 0,
        startCol: 3,
      },
      {
        number: 2,
        text: "Study of prehistoric life through fossils",
        answer: "PALEONTOLOGY",
        direction: "down" as Direction,
        startRow: 0,
        startCol: 8,
      },
      {
        number: 3,
        text: "Branch of biology dealing with cells",
        answer: "CYTOLOGY",
        direction: "across" as Direction,
        startRow: 9,
        startCol: 2,
      },
    ],
  },
  level10: {
    size: 15,
    clues: [
      {
        number: 1,
        text: "Study of the properties and behavior of matter and energy",
        answer: "QUANTUMPHYSICS",
        direction: "across" as Direction,
        startRow: 0,
        startCol: 1,
      },
      {
        number: 2,
        text: "Study of the chemical processes in living organisms",
        answer: "BIOCHEMISTRY",
        direction: "down" as Direction,
        startRow: 0,
        startCol: 7,
      },
      {
        number: 3,
        text: "Study of the structure and properties of crystals",
        answer: "CRYSTALLOGRAPHY",
        direction: "across" as Direction,
        startRow: 10,
        startCol: 2,
      },
    ],
  },
} as const;

const CrosswordGame = () => {
  const [difficulty, setDifficulty] = useState<Difficulty>("level1");
  const [selectedCell, setSelectedCell] = useState<{ row: number; col: number } | null>(null);
  const [selectedClue, setSelectedClue] = useState<Clue | null>(null);
  const [userAnswers, setUserAnswers] = useState<string[][]>([]);
  const [timer, setTimer] = useState(0);
  const [hintsRemaining, setHintsRemaining] = useState(3);
  const [score, setScore] = useState(0);
  const [progress, setProgress] = useState(0);
  const [streak, setStreak] = useState(0);

  const currentPuzzle = puzzles[difficulty];

  useEffect(() => {
    if (currentPuzzle) {
      setUserAnswers(
        Array(currentPuzzle.size).fill(null).map(() => Array(currentPuzzle.size).fill(''))
      );
      setTimer(0);
      setHintsRemaining(3);
      setScore(0);
      setProgress(0);
    }
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
        const index = clue.direction === 'across' ? col - clue.startCol : row - clue.startRow;
        newAnswers[row][col] = clue.answer[index];
        setUserAnswers(newAnswers);
        setHintsRemaining(prev => prev - 1);
        setScore(prev => Math.max(0, prev - 50));
        updateProgress(newAnswers);
        toast({
          title: "Hint Used!",
          description: `Letter revealed! ${hintsRemaining - 1} hints remaining.`,
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
      const streakBonus = streak * 100;
      const finalScore = timeBonus - hintPenalty + streakBonus;
      setScore(finalScore);
      setStreak(prev => prev + 1);

      toast({
        title: "Congratulations! 🎉",
        description: `Puzzle completed! Score: ${finalScore} points (${streak + 1} day streak!)`,
      });
    } else {
      toast({
        title: "Keep trying! 💪",
        description: "Some answers are incorrect.",
        variant: "destructive",
      });
      setStreak(0);
    }
  };

  return (
    <GameLayout>
      <div className="min-h-screen bg-gradient-to-br from-game-background via-game-primary to-game-secondary p-4 md:p-8">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between flex-wrap gap-4"
        >
          <div className="flex items-center gap-3">
            <Book className="w-8 h-8 text-game-accent" />
            <h1 className="text-3xl md:text-4xl font-bold text-white">Crossword Puzzle</h1>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Trophy className="w-6 h-6 text-game-accent" />
              <span className="text-white/80 text-sm">Score: {score}</span>
            </div>
            <div className="flex items-center gap-2">
              <Star className="w-6 h-6 text-game-accent" />
              <span className="text-white/80 text-sm">Streak: {streak}</span>
            </div>
            <button
              onClick={useHint}
              className="flex items-center gap-2 px-3 py-1 bg-game-accent/20 rounded-full hover:bg-game-accent/30 transition-colors"
            >
              <HelpCircle className="w-4 h-4 text-game-accent" />
              <span className="text-white/80 text-sm">{hintsRemaining} Hints</span>
            </button>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/10 backdrop-blur-sm rounded-lg p-4"
        >
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
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <GameControls timer={timer} onCheck={checkPuzzle} />
            {currentPuzzle && (
              <CrosswordGrid
                size={currentPuzzle.size}
                clues={currentPuzzle.clues}
                selectedCell={selectedCell}
                userAnswers={userAnswers}
                onCellSelect={handleCellSelect}
                onInput={handleInput}
              />
            )}
          </div>
          <div>
            {currentPuzzle && (
              <CluesList
                clues={currentPuzzle.clues}
                selectedClue={selectedClue}
                onClueSelect={(clue) => {
                  setSelectedCell({ row: clue.startRow, col: clue.startCol });
                  setSelectedClue(clue);
                }}
              />
            )}
          </div>
        </div>
      </div>
    </GameLayout>
  );
};

export default CrosswordGame;
