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
    <div className="min-h-screen bg-gradient-to-br from-game-background via-game-primary to-game-secondary relative">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=\"30\" height=\"30\" viewBox=\"0 0 30 30\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\"%3E%3Cpath d=\"M1.22676 0C1.91374 0 2.45351 0.539773 2.45351 1.22676C2.45351 1.91374 1.91374 2.45351 1.22676 2.45351C0.539773 2.45351 0 1.91374 0 1.22676C0 0.539773 0.539773 0 1.22676 0Z\" fill=\"rgba(255,255,255,0.07)\"%3E%3C/path%3E%3C/svg%3E')] opacity-20"></div>
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-game-background/50 to-game-background pointer-events-none"></div>
        <div className="mx-auto max-w-7xl p-8 relative z-10">
          <div className="text-center mb-16 animate-fade-in">
            <h1 className="text-6xl font-bold text-white mb-4 tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-game-accent via-white to-game-accent">
              Game Galaxy
            </h1>
            <p className="text-xl text-game-accent/90 max-w-2xl mx-auto">
              Challenge your mind with our collection of puzzle games designed to enhance your cognitive abilities
            </p>
          </div>
          {Object.entries(GAME_CATEGORIES).map(([category, games]) => (
            <CategorySection key={category} title={category} games={games} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Index;