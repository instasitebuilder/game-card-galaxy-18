import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { PlayCircle } from "lucide-react";

interface GameCardProps {
  title: string;
}

const GameCard = ({ title }: GameCardProps) => {
  const navigate = useNavigate();

  const handlePlay = () => {
    if (title === "Sudoku") {
      navigate("/sudoku");
    }
  };

  return (
    <div className="group relative overflow-hidden rounded-lg bg-white/10 p-6 hover:bg-white/20 transition-colors">
      <div className="mb-4">
        <h3 className="text-xl font-semibold text-white/90">{title}</h3>
      </div>
      <Button
        onClick={handlePlay}
        className="w-full bg-game-accent text-game-primary hover:bg-game-accent/90"
      >
        <PlayCircle className="mr-2" />
        Play Now
      </Button>
    </div>
  );
};

export default GameCard;