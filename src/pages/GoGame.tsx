import React, { useState, useCallback } from "react";
import { toast } from "@/hooks/use-toast";
import GoBoard from "@/components/go/GoBoard";
import GameControls from "@/components/go/GameControls";
import ScoreDisplay from "@/components/go/ScoreDisplay";
import GameLayout from "@/components/layouts/GameLayout";

type Stone = "black" | "white" | null;
type BoardSize = 9 | 13 | 19;
type Difficulty = "beginner" | "intermediate" | "expert";

const GoGame = () => {
  const [boardSize, setBoardSize] = useState<BoardSize>(19);
  const [difficulty, setDifficulty] = useState<Difficulty>("beginner");
  const [currentPlayer, setCurrentPlayer] = useState<"black" | "white">("black");
  const [stones, setStones] = useState<Stone[][]>(
    Array(boardSize)
      .fill(null)
      .map(() => Array(boardSize).fill(null))
  );
  const [lastMove, setLastMove] = useState<{ row: number; col: number } | null>(
    null
  );
  const [moveHistory, setMoveHistory] = useState<
    { row: number; col: number; player: "black" | "white" }[]
  >([]);

  // Placeholder scores for demonstration
  const [blackScore, setBlackScore] = useState(0);
  const [whiteScore, setWhiteScore] = useState(0);
  const [capturedByBlack, setCapturedByBlack] = useState(0);
  const [capturedByWhite, setCapturedByWhite] = useState(0);

  const handleIntersectionClick = useCallback(
    (row: number, col: number) => {
      if (stones[row][col] !== null) {
        toast({
          title: "Invalid Move",
          description: "This intersection is already occupied",
          variant: "destructive",
        });
        return;
      }

      const newStones = stones.map((r) => [...r]);
      newStones[row][col] = currentPlayer;
      setStones(newStones);
      setLastMove({ row, col });
      setMoveHistory([...moveHistory, { row, col, player: currentPlayer }]);
      setCurrentPlayer(currentPlayer === "black" ? "white" : "black");

      // Simulate AI move after a delay
      if (currentPlayer === "black") {
        setTimeout(() => {
          makeAIMove(newStones);
        }, 1000);
      }
    },
    [stones, currentPlayer, moveHistory]
  );

  const makeAIMove = (currentStones: Stone[][]) => {
    // Simple AI implementation for demonstration
    // In a real implementation, this would use more sophisticated algorithms
    const emptySpots: { row: number; col: number }[] = [];
    currentStones.forEach((row, rowIndex) => {
      row.forEach((stone, colIndex) => {
        if (stone === null) {
          emptySpots.push({ row: rowIndex, col: colIndex });
        }
      });
    });

    if (emptySpots.length > 0) {
      const randomSpot =
        emptySpots[Math.floor(Math.random() * emptySpots.length)];
      const newStones = currentStones.map((r) => [...r]);
      newStones[randomSpot.row][randomSpot.col] = "white";
      setStones(newStones);
      setLastMove(randomSpot);
      setMoveHistory([
        ...moveHistory,
        { row: randomSpot.row, col: randomSpot.col, player: "white" },
      ]);
      setCurrentPlayer("black");
    }
  };

  const handleUndo = () => {
    if (moveHistory.length === 0) return;

    const newHistory = [...moveHistory];
    const lastTwoMoves = newHistory.splice(-2);
    setMoveHistory(newHistory);

    const newStones = stones.map((row) => [...row]);
    lastTwoMoves.forEach((move) => {
      newStones[move.row][move.col] = null;
    });

    setStones(newStones);
    setLastMove(
      newHistory.length > 0
        ? {
            row: newHistory[newHistory.length - 1].row,
            col: newHistory[newHistory.length - 1].col,
          }
        : null
    );
  };

  const handlePass = () => {
    setCurrentPlayer(currentPlayer === "black" ? "white" : "black");
    toast({
      title: `${currentPlayer === "black" ? "Black" : "White"} passed`,
    });
  };

  const handleResign = () => {
    toast({
      title: "Game Over",
      description: `${
        currentPlayer === "black" ? "Black" : "White"
      } resigned. ${
        currentPlayer === "black" ? "White" : "Black"
      } wins!`,
    });
  };

  const handleBoardSizeChange = (newSize: BoardSize) => {
    setBoardSize(newSize);
    setStones(
      Array(newSize)
        .fill(null)
        .map(() => Array(newSize).fill(null))
    );
    setMoveHistory([]);
    setLastMove(null);
    setCurrentPlayer("black");
  };

  const handleDifficultyChange = (newDifficulty: Difficulty) => {
    setDifficulty(newDifficulty);
    toast({
      title: "Difficulty Changed",
      description: `AI difficulty set to ${newDifficulty}`,
    });
  };

  return (
    <GameLayout>
      <div className="max-w-7xl mx-auto p-8">
        <h1 className="text-4xl font-bold text-white mb-8 text-center">Go Game</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-8">
          <div className="space-y-8">
            <GoBoard
              size={boardSize}
              stones={stones}
              onIntersectionClick={handleIntersectionClick}
              lastMove={lastMove}
            />
            
            <GameControls
              onBoardSizeChange={handleBoardSizeChange}
              onDifficultyChange={handleDifficultyChange}
              onUndo={handleUndo}
              onPass={handlePass}
              onResign={handleResign}
              selectedSize={boardSize}
              selectedDifficulty={difficulty}
              canUndo={moveHistory.length >= 2}
            />
          </div>

          <div className="w-80 space-y-8">
            <ScoreDisplay
              blackScore={blackScore}
              whiteScore={whiteScore}
              capturedByBlack={capturedByBlack}
              capturedByWhite={capturedByWhite}
              currentPlayer={currentPlayer}
            />
          </div>
        </div>
      </div>
    </GameLayout>
  );
};

export default GoGame;