import React from "react";
import GameCard from "./GameCard";

interface CategorySectionProps {
  title: string;
  games: string[];
}

const CategorySection = ({ title, games }: CategorySectionProps) => {
  return (
    <section className="mb-16 animate-fade-in">
      <h2 className="mb-8 text-3xl font-bold text-white/90 border-b-2 border-game-accent/30 pb-4">
        {title}
      </h2>
      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {games.map((game) => (
          <GameCard key={game} title={game} />
        ))}
      </div>
    </section>
  );
};

export default CategorySection;