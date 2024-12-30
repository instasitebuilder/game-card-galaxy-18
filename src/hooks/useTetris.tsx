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
} from '@/utils/tetrisUtils';

export const useTetris = (level: number) => {
  const [board, setBoard] = useState<number[][]>(
    Array(BOARD_HEIGHT).fill(Array(BOARD_WIDTH).fill(0))
  );
  const [currentPiece, setCurrentPiece] = useState<{
    shape: number[][];
    position: { x: number; y: number };
    color: number;
  } | null>(null);
  const [score, setScore] = useState(0);
  const [lines, setLines] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
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

  const movePiece = useCallback(
    (direction: "left" | "right" | "down") => {
      if (!currentPiece || !isPlaying) return false;

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
          setScore(prev => prev + (linesCleared * 100 * level));
          setLines(prev => prev + linesCleared);
          toast({
            title: `${linesCleared} ${linesCleared === 1 ? 'Line' : 'Lines'} Cleared!`,
            duration: 1000,
          });
        }
        
        setBoard(clearedBoard);
        const newPiece = generatePiece();
        
        // Check if game over
        if (checkCollision(newPiece, clearedBoard)) {
          setIsPlaying(false);
          toast({
            title: "Game Over!",
            description: `Final Score: ${score}`,
            duration: 3000,
          });
          return false;
        }
        
        setCurrentPiece(newPiece);
      }
      return false;
    },
    [currentPiece, isPlaying, board, generatePiece, level, score, toast]
  );

  const rotatePieceHandler = useCallback(() => {
    if (!currentPiece || !isPlaying) return;
    
    const rotated = rotatePiece(currentPiece);
    if (!checkCollision(rotated, board)) {
      setCurrentPiece(rotated);
    }
  }, [currentPiece, isPlaying, board]);

  const resetGame = useCallback(() => {
    setBoard(Array(BOARD_HEIGHT).fill(Array(BOARD_WIDTH).fill(0)));
    setScore(0);
    setLines(0);
    setIsPlaying(false);
    setCurrentPiece(null);
  }, []);

  const togglePlay = useCallback(() => {
    if (!isPlaying) {
      setCurrentPiece(generatePiece());
    }
    setIsPlaying(!isPlaying);
  }, [isPlaying, generatePiece]);

  return {
    board: currentPiece ? mergeBoard(board, currentPiece) : board,
    score,
    lines,
    isPlaying,
    movePiece,
    rotatePiece: rotatePieceHandler,
    resetGame,
    togglePlay,
  };
};