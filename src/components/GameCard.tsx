import React from "react";
import { Link } from "react-router-dom";
import { Play, Circle } from "lucide-react";

interface GameCardProps {
  title: string;
  image?: string;
}

const GameCard = ({ title }: GameCardProps) => {
  const gameImages: { [key: string]: string } = {
    "Sudoku": "photo-1488590528505-98d2b5aba4b",
    "Tetris": "photo-1486312338219-ce68d2c6f44d",
    "Crossword Puzzles": "photo-1518770660439-4636190af475",
    "Tic Tac Toe": "photo-1611996575749-79a3a250f948",
    "Tower of Hanoi": "photo-1509228468518-180dd4864904",
    "Jigsaw Puzzle": "photo-1494059980473-813e73ee784b",
  };

  const defaultImage = "photo-1498050108023-c5249f4df085";
  const imageUrl = `https://source.unsplash.com/${gameImages[title] || defaultImage}/400x300`;

  const getGamePath = (gameTitle: string) => {
    const title = gameTitle.toLowerCase().replace(/\s+/g, '-');
    return `/${title}`;
  };

  return (
    <Link
      to={getGamePath(title)}
      className="group relative block"
    >
      <div className="relative overflow-hidden rounded-2xl bg-gradient-card backdrop-blur-sm border border-game-card-border transition-all duration-300 group-hover:scale-[1.02] group-hover:shadow-2xl">
        <div className="absolute top-4 right-4 z-10 flex items-center gap-2 bg-black/30 backdrop-blur-sm rounded-full px-3 py-1">
          <Circle size={8} className="fill-green-500 text-green-500 animate-pulse" />
          <span className="text-xs font-medium text-white">Live</span>
        </div>
        
        <div className="aspect-[4/3] w-full overflow-hidden">
          <img
            src={imageUrl}
            alt={title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-game-primary/90 via-game-primary/50 to-transparent" />
        </div>
        
        <div className="absolute bottom-0 w-full p-6">
          <h3 className="text-2xl font-bold text-white mb-4">{title}</h3>
          <div className="flex items-center text-game-accent gap-2 group-hover:text-white transition-colors">
            <Play size={16} className="animate-pulse" />
            <span className="text-sm font-medium">Play Now</span>
          </div>
        </div>

        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-game-secondary/20 to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        <div className="absolute bottom-0 left-0 w-16 h-16 bg-gradient-to-tr from-game-accent/20 to-transparent rounded-tr-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>
    </Link>
  );
};

export default GameCard;