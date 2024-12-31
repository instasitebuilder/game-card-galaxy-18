import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { GameBoard } from "@/components/tictactoe/GameBoard";
import { GameMode } from "@/components/tictactoe/GameMode";
import { useToast } from "@/hooks/use-toast";
import { motion } from "framer-motion";

type Player = "X" | "O";
type GameState = "selecting" | "playing" | "finished";
type Mode = "single" | "multi" | null;

const TicTacToe = () => {
  const [gameState, setGameState] = useState<GameState>("selecting");
  const [mode, setMode] = useState<Mode>(null);
  const [currentPlayer, setCurrentPlayer] = useState<Player>("X");
  const [board, setBoard] = useState<(Player | null)[]>(Array(9).fill(null));
  const [winner, setWinner] = useState<Player | "tie" | null>(null);
  const { toast } = useToast();

  const checkWinner = (squares: (Player | null)[]) => {
    const lines = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
      [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
      [0, 4, 8], [2, 4, 6] // Diagonals
    ];

    for (const [a, b, c] of lines) {
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }

    if (squares.every(square => square !== null)) {
      return "tie";
    }

    return null;
  };

  const handleCellClick = (index: number) => {
    if (board[index] || winner) return;

    const newBoard = [...board];
    newBoard[index] = currentPlayer;
    setBoard(newBoard);

    const gameWinner = checkWinner(newBoard);
    if (gameWinner) {
      setWinner(gameWinner);
      setGameState("finished");
      toast({
        title: gameWinner === "tie" ? "It's a Tie!" : `Player ${gameWinner} Wins!`,
        description: "Click reset to play again",
      });
    } else {
      setCurrentPlayer(currentPlayer === "X" ? "O" : "X");
    }
  };

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setCurrentPlayer("X");
    setWinner(null);
    setGameState("playing");
  };

  const startGame = (selectedMode: Mode) => {
    setMode(selectedMode);
    setGameState("playing");
    resetGame();
  };

  return (
    <div className="min-h-screen bg-game-background p-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-2xl mx-auto"
      >
        <h1 className="text-4xl font-bold text-center mb-8 text-white">
          Tic-Tac-Toe
        </h1>

        {gameState === "selecting" && (
          <GameMode onSelectMode={startGame} />
        )}

        {gameState !== "selecting" && (
          <div className="space-y-6">
            <div className="text-center text-xl text-game-accent mb-4">
              {!winner && `Player ${currentPlayer}'s Turn`}
              {winner && (winner === "tie" ? "It's a Tie!" : `Player ${winner} Wins!`)}
            </div>

            <GameBoard
              board={board}
              onCellClick={handleCellClick}
              winner={winner}
            />

            <div className="flex justify-center mt-6">
              <Button
                onClick={resetGame}
                className="bg-game-secondary hover:bg-game-primary text-white"
              >
                Reset Game
              </Button>
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default TicTacToe;