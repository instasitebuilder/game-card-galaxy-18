import React from "react";
import CategorySection from "@/components/CategorySection";

const GAME_CATEGORIES = {
  "Featured Games": [
    "Tetris",
    "Sudoku",
  ],
  "Coming Soon": [
    "Crossword Puzzles",
    "Jigsaw Puzzles",
    "Rubik's Cube",
  ],
};

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-game-primary via-game-secondary to-game-accent p-8">
      <div className="mx-auto max-w-7xl">
        <div className="text-center mb-16 animate-fade-in">
          <h1 className="text-5xl font-bold text-white mb-4 tracking-tight">
            Game Galaxy
          </h1>
          <p className="text-xl text-white/80">
            Challenge your mind with our collection of puzzle games
          </p>
        </div>
        {Object.entries(GAME_CATEGORIES).map(([category, games]) => (
          <CategorySection key={category} title={category} games={games} />
        ))}
      </div>
    </div>
  );
};

export default Index;