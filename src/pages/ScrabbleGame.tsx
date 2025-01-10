import React, { useState, useEffect } from 'react';
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Brain, Shuffle, RotateCcw, Forward, HelpCircle } from 'lucide-react';
import GameLayout from '@/components/layouts/GameLayout';
import AdSpace from '@/components/ads/AdSpace';

interface Tile {
  letter: string;
  value: number;
  id: string;
}

interface BoardCell {
  multiplier: string;
  tile: Tile | null;
}

const BOARD_SIZE = 15;
const INITIAL_TILES = 7;

const ScrabbleGame = () => {
  const { toast } = useToast();
  const [board, setBoard] = useState<BoardCell[][]>(initializeBoard());
  const [playerRack, setPlayerRack] = useState<Tile[]>([]);
  const [score, setScore] = useState({ player: 0, ai: 0 });
  const [difficulty, setDifficulty] = useState<'beginner' | 'intermediate' | 'expert'>('beginner');
  const [isPlayerTurn, setIsPlayerTurn] = useState(true);
  const [showInstructions, setShowInstructions] = useState(true);

  function initializeBoard(): BoardCell[][] {
    const board = Array(BOARD_SIZE).fill(null).map(() =>
      Array(BOARD_SIZE).fill(null).map(() => ({
        multiplier: 'normal',
        tile: null
      }))
    );

    const premiumSquares = [
      { row: 0, col: 0, type: 'TW' },
      { row: 0, col: 7, type: 'TW' },
      { row: 0, col: 14, type: 'TW' },
      { row: 7, col: 0, type: 'TW' },
      { row: 7, col: 14, type: 'TW' },
      { row: 14, col: 0, type: 'TW' },
      { row: 14, col: 7, type: 'TW' },
      { row: 14, col: 14, type: 'TW' }
    ];

    premiumSquares.forEach(({ row, col, type }) => {
      board[row][col].multiplier = type;
    });

    return board;
  }

  const generateTile = (): Tile => {
    const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const letter = letters[Math.floor(Math.random() * letters.length)];
    const values: { [key: string]: number } = {
      'A': 1, 'E': 1, 'I': 1, 'O': 1, 'U': 1, 'L': 1, 'N': 1, 'S': 1, 'T': 1, 'R': 1,
      'D': 2, 'G': 2,
      'B': 3, 'C': 3, 'M': 3, 'P': 3,
      'F': 4, 'H': 4, 'V': 4, 'W': 4, 'Y': 4,
      'K': 5,
      'J': 8, 'X': 8,
      'Q': 10, 'Z': 10
    };

    return {
      letter,
      value: values[letter] || 1,
      id: Math.random().toString(36).substr(2, 9)
    };
  };

  const placeTile = (row: number, col: number, tile: Tile) => {
    // Implement tile placement logic
  };

  const calculateScore = () => {
    // Implement score calculation logic
  };

  const handleTurnEnd = () => {
    // Implement turn end logic
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-game-primary via-[#6B46C1] to-game-secondary">
      <GameLayout>
        <div className="max-w-7xl mx-auto px-4 py-8">
          <AdSpace position="top" />
          
          <div className="mb-8 space-y-6">
            <h1 className="text-4xl font-bold text-white text-center">Scrabble Game</h1>
            
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
              <div className="flex items-center gap-2 mb-4">
                <HelpCircle className="w-5 h-5 text-game-accent" />
                <h2 className="text-xl font-semibold text-white">How to Play</h2>
              </div>
              
              <div className="space-y-4 text-white/80">
                <div>
                  <h3 className="font-semibold mb-2">Getting Started:</h3>
                  <p>1. Click "Draw Tile" to get your initial set of letters</p>
                  <p>2. Arrange letters on the board to form words</p>
                  <p>3. Submit your word to score points</p>
                </div>
                
                <div>
                  <h3 className="font-semibold mb-2">Objective:</h3>
                  <p>Create words and score the highest points possible using letter values and board multipliers</p>
                </div>
                
                <div>
                  <h3 className="font-semibold mb-2">How to Win:</h3>
                  <p>Reach 100 points before your opponent or achieve the highest score when all tiles are used</p>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-8">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
              <div className="grid grid-cols-15 gap-1">
                {board.map((row, rowIndex) => (
                  row.map((cell, colIndex) => (
                    <div 
                      key={`${rowIndex}-${colIndex}`} 
                      className={`w-12 h-12 border ${
                        cell.multiplier !== 'normal' 
                          ? 'bg-game-accent/20' 
                          : 'bg-white/5'
                      } rounded-lg flex items-center justify-center text-white font-bold`}
                    >
                      {cell.tile ? cell.tile.letter : ''}
                    </div>
                  ))
                ))}
              </div>
              
              <div className="mt-6 flex justify-center gap-4">
                <Button 
                  onClick={() => generateTile()}
                  className="bg-game-accent hover:bg-game-accent/90"
                >
                  Draw Tile
                </Button>
              </div>
            </div>
          </div>

          <AdSpace position="bottom" />
        </div>
      </GameLayout>
    </div>
  );
};

export default ScrabbleGame;
