import React from "react";
import { CalendarDays } from "lucide-react";

const UPCOMING_GAMES = [
  {
    title: "Memory Match",
    releaseDate: "Coming Soon",
    description: "Test and improve your memory with this classic card matching game.",
  },
  {
    title: "Word Scramble",
    releaseDate: "In Development",
    description: "Unscramble letters to form words and expand your vocabulary.",
  },
  {
    title: "Math Challenge",
    releaseDate: "Planning Phase",
    description: "Sharpen your mathematical skills with engaging puzzles.",
  },
];

const FutureGames = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#2C3E50] via-[#3498DB] to-[#2980B9] p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-white mb-8 text-center">Upcoming Games</h1>
        <div className="grid gap-6">
          {UPCOMING_GAMES.map((game) => (
            <div key={game.title} className="bg-white/10 rounded-lg p-6 backdrop-blur-sm hover:bg-white/20 transition-colors">
              <div className="flex items-start justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-white mb-2">{game.title}</h2>
                  <p className="text-white/80 mb-4">{game.description}</p>
                </div>
                <div className="flex items-center text-white/60 text-sm">
                  <CalendarDays className="w-4 h-4 mr-2" />
                  {game.releaseDate}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FutureGames;