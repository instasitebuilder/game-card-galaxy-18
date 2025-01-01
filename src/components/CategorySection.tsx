import React from "react";
import GameCard from "./GameCard";

interface CategorySectionProps {
  title: string;
  games: string[];
}

const CategorySection = ({ title, games }: CategorySectionProps) => {
  return (
    <section className="mb-16 animate-fade-in">
      <h2 className="mb-8 text-3xl font-bold text-white/90 pb-4 flex items-center gap-3">
        <span className="w-2 h-8 bg-game-accent rounded-full"></span>
        {title}
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {games.map((game) => (
          <GameCard key={game} title={game} />
        ))}
      </div>
    </section>
  );
};

export default CategorySection;