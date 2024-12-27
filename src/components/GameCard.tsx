import React from "react";
import { Button } from "./ui/button";
import { Play } from "lucide-react";

interface GameCardProps {
  title: string;
  image?: string;
}

const GameCard = ({ title, image }: GameCardProps) => {
  return (
    <div className="group relative overflow-hidden rounded-lg bg-white/10 p-4 transition-all duration-300 hover:bg-white/20 hover:shadow-xl">
      <div className="aspect-video w-full overflow-hidden rounded-lg bg-gray-100">
        <img
          src={image || "https://images.unsplash.com/photo-1498050108023-c5249f4df085"}
          alt={title}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
        />
      </div>
      <div className="mt-4 flex items-center justify-between">
        <h3 className="text-lg font-semibold text-white">{title}</h3>
        <Button
          size="sm"
          className="bg-game-secondary hover:bg-game-primary transition-colors duration-300"
        >
          <Play className="mr-2 h-4 w-4" />
          Play
        </Button>
      </div>
    </div>
  );
};

export default GameCard;