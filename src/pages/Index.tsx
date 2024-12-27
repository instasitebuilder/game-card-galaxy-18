import React from "react";
import CategorySection from "@/components/CategorySection";

const GAME_CATEGORIES = {
  "Classic Puzzle Games": [
    "Tetris",
    "Sudoku",
    "Crossword Puzzles",
    "Jigsaw Puzzles",
    "Rubik's Cube",
  ],
  "Digital Puzzle Games": [
    "Candy Crush Saga",
    "Bejeweled",
    "Cut the Rope",
    "Monument Valley",
    "2048",
    "The Room",
  ],
  "Adventure Puzzle Games": [
    "The Witness",
    "Grim Fandango",
    "Professor Layton",
    "Myst",
    "Unravel",
    "INSIDE",
  ],
  "Brain Training and Logic Games": [
    "Lumosity",
    "Brain Age",
    "Peak",
    "Flow Free",
    "Threes!",
  ],
  "Multiplayer and Social Puzzle Games": [
    "Words With Friends",
    "Pictoword",
    "UNO",
    "Trivia Crack",
    "Scrabble GO",
  ],
  "Puzzle-Platformer Games": [
    "Fez",
    "Celeste",
    "Thomas Was Alone",
    "Braid",
    "Ori and the Blind Forest",
  ],
  "Physics-Based Puzzle Games": [
    "World of Goo",
    "Bridge Constructor",
    "Angry Birds",
    "Fantastic Contraption",
    "Human: Fall Flat",
  ],
  "Innovative or VR Puzzle Games": [
    "Superhot",
    "Keep Talking and Nobody Explodes",
    "Tetris Effect",
    "Astro Bot: Rescue Mission",
    "Half-Life: Alyx",
  ],
};

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-game-primary to-game-secondary p-6">
      <div className="mx-auto max-w-7xl">
        <h1 className="mb-12 text-center text-4xl font-bold text-white">
          Puzzle Games Collection
        </h1>
        {Object.entries(GAME_CATEGORIES).map(([category, games]) => (
          <CategorySection key={category} title={category} games={games} />
        ))}
      </div>
    </div>
  );
};

export default Index;