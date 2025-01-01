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
  };

  const defaultImage = "photo-1498050108023-c5249f4df085";
  const imageUrl = `https://source.unsplash.com/${gameImages[title] || defaultImage}/400x300`;

  const getGamePath = (gameTitle: string) => {
    const title = gameTitle.toLowerCase();
    if (title === "sudoku") return "/sudoku";
    if (title === "tetris") return "/tetris";
    if (title === "crossword puzzles") return "/crossword";
    return "#";
  };

  return (
    <Link
      to={getGamePath(title)}
      className="block group transition-all duration-300 hover:-translate-y-2 hover:shadow-xl"
    >
      <div className="relative overflow-hidden rounded-xl bg-game-surface/30 backdrop-blur-sm border border-game-accent/10 shadow-lg">
        <div className="absolute top-4 right-4 z-10 flex items-center gap-2 bg-black/50 rounded-full px-3 py-1">
          <Circle size={8} className="fill-green-500 text-green-500" />
          <span className="text-xs font-medium text-white">Online</span>
        </div>
        <div className="aspect-video w-full overflow-hidden">
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
            <Play size={16} />
            <span className="text-sm font-medium">Play Now</span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default GameCard;