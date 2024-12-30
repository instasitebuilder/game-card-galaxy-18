import { useState, useCallback, useEffect } from 'react';
import { useToast } from '@/components/ui/use-toast';
import {
  BOARD_WIDTH,
  BOARD_HEIGHT,
  INITIAL_SPEED,
  TETROMINOS,
  checkCollision,
  mergeBoard,
  rotatePiece,
  clearLines,
  calculateScore,
  calculateLevel,
  calculateSpeed,
} from '@/utils/tetrisUtils';

export const useTetris = () => {
  const [board, setBoard] = useState<number[][]>(
    Array(BOARD_HEIGHT).fill(Array(BOARD_WIDTH).fill(0))
  );
  const [currentPiece, setCurrentPiece] = useState<{
    shape: number[][];
    position: { x: number; y: number };
    color: number;
  } | null>(null);
  const [nextPiece, setNextPiece] = useState<{
    shape: number[][];
    color: number;
  } | null>(null);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [lines, setLines] = useState(0);
  const [level, setLevel] = useState(1);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const { toast } = useToast();

  const generatePiece = useCallback(() => {
    const pieces = Object.keys(TETROMINOS);
    const randomPiece = pieces[Math.floor(Math.random() * pieces.length)] as keyof typeof TETROMINOS;
    const piece = TETROMINOS[randomPiece];
    
    return {
      shape: piece.shape,
      position: { x: Math.floor(BOARD_WIDTH / 2) - 1, y: 0 },
      color: piece.color,
    };
  }, []);

  const generateNextPiece = useCallback(() => {
    const pieces = Object.keys(TETROMINOS);
    const randomPiece = pieces[Math.floor(Math.random() * pieces.length)] as keyof typeof TETROMINOS;
    const piece = TETROMINOS[randomPiece];
    
    return {
      shape: piece.shape,
      color: piece.color,
    };
  }, []);

  const movePiece = useCallback(
    (direction: "left" | "right" | "down") => {
      if (!currentPiece || !isPlaying || isPaused) return false;

      const newPosition = { ...currentPiece.position };
      switch (direction) {
        case "left":
          newPosition.x -= 1;
          break;
        case "right":
          newPosition.x += 1;
          break;
        case "down":
          newPosition.y += 1;
          break;
      }

      const movedPiece = { ...currentPiece, position: newPosition };
      
      if (!checkCollision(movedPiece, board)) {
        setCurrentPiece(movedPiece);
        return true;
      }

      if (direction === "down") {
        // Merge the current piece with the board
        const newBoard = mergeBoard(board, currentPiece);
        const { newBoard: clearedBoard, linesCleared } = clearLines(newBoard);
        
        if (linesCleared > 0) {
          const newScore = score + calculateScore(linesCleared, level);
          const newLines = lines + linesCleared;
          const newLevel = calculateLevel(newLines);
          
          const messages = [
            "Great job! Keep going!",
            "Fantastic clear!",
            "You're on fire!",
            "Amazing play!"
          ];
          const randomMessage = messages[Math.floor(Math.random() * messages.length)];
          
          setScore(newScore);
          setHighScore(Math.max(highScore, newScore));
          setLines(newLines);
          setLevel(newLevel);
          
          toast({
            title: `${linesCleared} ${linesCleared === 1 ? 'Line' : 'Lines'} Cleared!`,
            description: randomMessage,
            duration: 2000,
          });

          // Special message for 4 lines (Tetris)
          if (linesCleared === 4) {
            toast({
              title: "TETRIS!",
              description: "Congratulations on the perfect clear!",
              duration: 3000,
            });
          }
        }
        
        setBoard(clearedBoard);
        
        // Set the next piece as current and generate a new next piece
        if (nextPiece) {
          setCurrentPiece({
            ...nextPiece,
            position: { x: Math.floor(BOARD_WIDTH / 2) - 1, y: 0 },
          });
          setNextPiece(generateNextPiece());
        }
        
        // Check if game over
        if (checkCollision({
          ...nextPiece!,
          position: { x: Math.floor(BOARD_WIDTH / 2) - 1, y: 0 },
        }, clearedBoard)) {
          setIsPlaying(false);
          toast({
            title: "Game Over!",
            description: `Final Score: ${score}${score > highScore ? ' - New High Score!' : ''}`,
            duration: 5000,
          });
          return false;
        }
      }
      return false;
    },
    [currentPiece, isPlaying, isPaused, board, generateNextPiece, nextPiece, score, highScore, level, lines, toast]
  );

  const hardDrop = useCallback(() => {
    if (!currentPiece || !isPlaying || isPaused) return;
    
    while (movePiece("down")) {
      // Keep moving down until collision
    }
  }, [currentPiece, isPlaying, isPaused, movePiece]);

  const rotatePieceHandler = useCallback(() => {
    if (!currentPiece || !isPlaying || isPaused) return;
    
    const rotated = rotatePiece(currentPiece);
    if (!checkCollision(rotated, board)) {
      setCurrentPiece(rotated);
    }
  }, [currentPiece, isPlaying, isPaused, board]);

  const resetGame = useCallback(() => {
    setBoard(Array(BOARD_HEIGHT).fill(Array(BOARD_WIDTH).fill(0)));
    setScore(0);
    setLines(0);
    setLevel(1);
    setIsPlaying(false);
    setIsPaused(false);
    setCurrentPiece(null);
    setNextPiece(null);
  }, []);

  const togglePlay = useCallback(() => {
    if (!isPlaying) {
      setCurrentPiece(generatePiece());
      setNextPiece(generateNextPiece());
      setIsPlaying(true);
      setIsPaused(false);
    } else {
      setIsPaused(!isPaused);
    }
  }, [isPlaying, isPaused, generatePiece, generateNextPiece]);

  // Game loop
  useEffect(() => {
    if (!isPlaying || isPaused) return;

    const speed = calculateSpeed(level);
    const gameLoop = setInterval(() => {
      movePiece("down");
    }, speed);

    return () => clearInterval(gameLoop);
  }, [isPlaying, isPaused, level, movePiece]);

  return {
    board: currentPiece ? mergeBoard(board, currentPiece) : board,
    nextPiece,
    score,
    highScore,
    lines,
    level,
    isPlaying,
    isPaused,
    movePiece,
    hardDrop,
    rotatePiece: rotatePieceHandler,
    resetGame,
    togglePlay,
  };
};
