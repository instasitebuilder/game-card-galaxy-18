import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { GameBoard } from "@/components/tictactoe/GameBoard";
import { GameMode } from "@/components/tictactoe/GameMode";
import { useToast } from "@/hooks/use-toast";
import { motion } from "framer-motion";
import GameLayout from "@/components/layouts/GameLayout";
import AdSpace from "@/components/ads/AdSpace";
import { HelpCircle } from "lucide-react";

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
    <div className="min-h-screen bg-gradient-to-br from-game-primary via-[#6B46C1] to-game-secondary">
      <GameLayout>
        <div className="max-w-4xl mx-auto px-4 py-8">
          <AdSpace position="top" />

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-8"
          >
            <h1 className="text-4xl font-bold text-center text-white">
              Tic-Tac-Toe
            </h1>

            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
              <div className="flex items-center gap-2 mb-4">
                <HelpCircle className="w-5 h-5 text-game-accent" />
                <h2 className="text-xl font-semibold text-white">How to Play</h2>
              </div>
              
              <div className="space-y-4 text-white/80">
                <div>
                  <h3 className="font-semibold mb-2">Getting Started:</h3>
                  <p>1. Choose game mode (Single Player or Multiplayer)</p>
                  <p>2. Player X goes first</p>
                  <p>3. Click on any empty cell to place your mark</p>
                </div>
                
                <div>
                  <h3 className="font-semibold mb-2">Objective:</h3>
                  <p>Get three of your marks (X or O) in a row - horizontally, vertically, or diagonally</p>
                </div>
                
                <div>
                  <h3 className="font-semibold mb-2">How to Win:</h3>
                  <p>Be the first player to get 3 marks in a row</p>
                </div>
              </div>
            </div>

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
                    className="bg-game-accent hover:bg-game-accent/90 text-white"
                  >
                    Reset Game
                  </Button>
                </div>
              </div>
            )}
          </motion.div>

          <AdSpace position="bottom" />
        </div>
      </GameLayout>
    </div>
  );
};

export default TicTacToe;