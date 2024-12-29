import React from "react";
import { Link } from "react-router-dom";
import { Play, Circle, Star } from "lucide-react";

interface GameCardProps {
  title: string;
  image?: string;
}

const GameCard = ({ title }: GameCardProps) => {
  // Map game titles to their respective images
  const gameImages: { [key: string]: string } = {
    "Sudoku": "photo-1488590528505-98d2b5aba4b",
    "Tetris": "photo-1486312338219-ce68d2c6f44d",
    "Crossword Puzzles": "photo-1518770660439-4636190af475",
    "Jigsaw Puzzles": "photo-1581091226825-a6a2a5aee158",
    "Rubik's Cube": "photo-1487058792275-0ad4aaf24ca7",
  };

  const defaultImage = "photo-1498050108023-c5249f4df085";
  const imageUrl = `https://source.unsplash.com/${gameImages[title] || defaultImage}/400x300`;

  const getGamePath = (gameTitle: string) => {
    const title = gameTitle.toLowerCase();
    if (title === "sudoku") return "/sudoku";
    if (title === "tetris") return "/tetris";
    return "#";
  };

  const isAvailable = ["Sudoku", "Tetris"].includes(title);
  const rating = 4.5;
  const reviews = Math.floor(Math.random() * 90000) + 10000;
  const downloads = Math.floor(Math.random() * 900000) + 100000;

  return (
    <Link
      to={getGamePath(title)}
      className={`block group transition-transform duration-300 hover:-translate-y-2 ${
        !isAvailable && "cursor-not-allowed opacity-70"
      }`}
    >
      <div className="relative overflow-hidden rounded-xl shadow-lg bg-white/5 backdrop-blur-sm border border-white/10">
        <div className="absolute top-4 right-4 z-10 flex items-center gap-2 bg-black/50 rounded-full px-3 py-1">
          <Circle
            size={8}
            className={`${isAvailable ? "fill-green-500 text-green-500" : "fill-gray-500 text-gray-500"}`}
          />
          <span className="text-xs font-medium text-white">
            {isAvailable ? "Online" : "Coming Soon"}
          </span>
        </div>
        <div className="aspect-video w-full overflow-hidden">
          <img
            src={imageUrl}
            alt={title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent" />
        </div>
        <div className="absolute bottom-0 w-full p-6">
          <h3 className="text-2xl font-bold text-white mb-2">{title}</h3>
          <div className="flex items-center gap-2 mb-3">
            <div className="flex items-center gap-1">
              <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
              <span className="text-white font-medium">{rating}</span>
            </div>
            <span className="text-white/60 text-sm">
              {(reviews / 1000).toFixed(0)}K Reviews
            </span>
            <span className="text-white/60 text-sm ml-auto">
              {(downloads / 1000).toFixed(0)}K Downloads
            </span>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex gap-2 text-xs text-white/60">
              <span className="px-2 py-1 rounded-full bg-white/10">Puzzle</span>
              <span className="px-2 py-1 rounded-full bg-white/10">Brain Training</span>
            </div>
            {isAvailable && (
              <div className="flex items-center text-game-accent gap-2">
                <Play size={16} />
                <span className="text-sm font-medium">Play Now</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default GameCard;