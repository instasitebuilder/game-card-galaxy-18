import React from "react";
import { Link } from "react-router-dom";

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

  return (
    <Link
      to={getGamePath(title)}
      className="block group"
    >
      <div className="relative overflow-hidden rounded-lg shadow-lg transition-all duration-300 hover:shadow-xl bg-white/10 backdrop-blur-sm animate-card-hover">
        <div className="aspect-video w-full overflow-hidden">
          <img
            src={imageUrl}
            alt={title}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
          />
        </div>
        <div className="p-4">
          <h3 className="text-lg font-semibold text-white/90 mb-2">{title}</h3>
          <p className="text-white/70 text-sm">
            Challenge your mind with {title.toLowerCase()}
          </p>
        </div>
      </div>
    </Link>
  );
};

export default GameCard;