import React, { useState, useEffect } from 'react';
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { 
  Brain, 
  Shuffle, 
  RotateCcw, 
  Forward, 
  HelpCircle 
} from 'lucide-react';
import GameLayout from '@/components/layouts/GameLayout';

interface Tile {
  letter: string;
  value: number;
  id: string;
}

interface BoardCell {
  multiplier: 'normal' | 'DL' | 'TL' | 'DW' | 'TW';
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

  // Initialize game board with premium squares
  function initializeBoard(): BoardCell[][] {
    const board = Array(BOARD_SIZE).fill(null).map(() =>
      Array(BOARD_SIZE).fill(null).map(() => ({
        multiplier: 'normal' as const,
        tile: null
      }))
    );

    // Add premium squares (this is a simplified version)
    const premiumSquares = [
      { row: 0, col: 0, type: 'TW' as const },
      { row: 0, col: 7, type: 'TW' as const },
      { row: 0, col: 14, type: 'TW' as const },
      { row: 7, col: 0, type: 'TW' as const },
      { row: 7, col: 14, type: 'TW' as const },
      { row: 14, col: 0, type: 'TW' as const },
      { row: 14, col: 7, type: 'TW' as const },
      { row: 14, col: 14, type: 'TW' as const },
    ] as const;

    premiumSquares.forEach(({ row, col, type }) => {
      board[row][col].multiplier = type;
    });

    return board;
  }

  // Generate a random tile
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
      value: values[letter],
      id: Math.random().toString(36).substr(2, 9)
    };
  };

  // Fill player's rack with tiles
  useEffect(() => {
    const newTiles = Array(INITIAL_TILES).fill(null).map(generateTile);
    setPlayerRack(newTiles);
  }, []);

  const handleTileDrop = (row: number, col: number, tile: Tile) => {
    if (!isPlayerTurn || board[row][col].tile) {
      return;
    }

    const newBoard = [...board];
    newBoard[row][col].tile = tile;
    setBoard(newBoard);

    // Remove tile from player's rack
    setPlayerRack(prev => prev.filter(t => t.id !== tile.id));

    // Add new tile to rack
    setPlayerRack(prev => [...prev, generateTile()]);

    // Switch turns
    setIsPlayerTurn(false);
    setTimeout(aiTurn, 1000);
  };

  const aiTurn = () => {
    // Simple AI implementation - places a random tile in the first available spot
    const availableSpots = [];
    for (let i = 0; i < BOARD_SIZE; i++) {
      for (let j = 0; j < BOARD_SIZE; j++) {
        if (!board[i][j].tile) {
          availableSpots.push({ row: i, col: j });
        }
      }
    }

    if (availableSpots.length > 0) {
      const spot = availableSpots[Math.floor(Math.random() * availableSpots.length)];
      const tile = generateTile();
      const newBoard = [...board];
      newBoard[spot.row][spot.col].tile = tile;
      setBoard(newBoard);
      setScore(prev => ({ ...prev, ai: prev.ai + tile.value }));
    }

    setIsPlayerTurn(true);
  };

  const shuffleRack = () => {
    setPlayerRack(prev => [...prev].sort(() => Math.random() - 0.5));
    toast({
      title: "Rack Shuffled",
      description: "Your tiles have been randomly rearranged.",
    });
  };

  return (
    <GameLayout>
      <div className="min-h-screen bg-gradient-to-br from-amber-100 to-amber-200 p-8">
        <div className="max-w-7xl mx-auto space-y-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Brain className="w-8 h-8 text-amber-600" />
              <h1 className="text-3xl font-bold text-amber-900">Scrabble</h1>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-amber-800">
                <span className="font-bold">Player:</span> {score.player}
              </div>
              <div className="text-amber-800">
                <span className="font-bold">AI:</span> {score.ai}
              </div>
            </div>
          </div>

          {/* Game Board */}
          <div className="grid grid-cols-15 gap-1 bg-amber-300 p-4 rounded-lg shadow-xl">
            {board.map((row, rowIndex) => (
              row.map((cell, colIndex) => (
                <div
                  key={`${rowIndex}-${colIndex}`}
                  className={`
                    w-12 h-12 flex items-center justify-center rounded
                    ${cell.multiplier === 'TW' ? 'bg-red-500' :
                      cell.multiplier === 'DW' ? 'bg-pink-400' :
                      cell.multiplier === 'TL' ? 'bg-blue-500' :
                      cell.multiplier === 'DL' ? 'bg-blue-300' :
                      'bg-amber-100'}
                    ${!cell.tile && 'hover:bg-amber-50 cursor-pointer'}
                    transition-colors duration-200
                  `}
                  onDragOver={(e) => e.preventDefault()}
                  onDrop={(e) => {
                    e.preventDefault();
                    const tileId = e.dataTransfer.getData('text/plain');
                    const tile = playerRack.find(t => t.id === tileId);
                    if (tile) {
                      handleTileDrop(rowIndex, colIndex, tile);
                    }
                  }}
                >
                  {cell.tile ? (
                    <div className="bg-amber-50 w-10 h-10 rounded flex items-center justify-center font-bold text-amber-900 shadow">
                      {cell.tile.letter}
                      <sub className="text-xs">{cell.tile.value}</sub>
                    </div>
                  ) : (
                    <span className="text-xs text-white font-medium">
                      {cell.multiplier !== 'normal' && cell.multiplier}
                    </span>
                  )}
                </div>
              ))
            ))}
          </div>

          {/* Player's Rack */}
          <div className="flex justify-center gap-4 items-center bg-amber-800 p-4 rounded-lg">
            <div className="flex gap-2">
              {playerRack.map((tile) => (
                <div
                  key={tile.id}
                  draggable
                  onDragStart={(e) => {
                    e.dataTransfer.setData('text/plain', tile.id);
                  }}
                  className="bg-amber-50 w-12 h-12 rounded-lg flex items-center justify-center font-bold text-amber-900 shadow-lg cursor-move hover:scale-105 transition-transform"
                >
                  {tile.letter}
                  <sub className="text-xs">{tile.value}</sub>
                </div>
              ))}
            </div>
            
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="icon"
                onClick={shuffleRack}
                className="bg-amber-700 hover:bg-amber-600 text-white"
              >
                <Shuffle className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                onClick={() => {
                  setIsPlayerTurn(false);
                  setTimeout(aiTurn, 1000);
                  toast({
                    title: "Turn Skipped",
                    description: "You've passed your turn to the AI.",
                  });
                }}
                className="bg-amber-700 hover:bg-amber-600 text-white"
              >
                <Forward className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </GameLayout>
  );
};

export default ScrabbleGame;
