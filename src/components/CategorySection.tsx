import React from "react";
import GameCard from "./GameCard";

interface CategorySectionProps {
  title: string;
  games: string[];
}

const CategorySection = ({ title, games }: CategorySectionProps) => {
  return (
    <section className="mb-12">
      <h2 className="mb-6 text-2xl font-bold text-white/90 border-b border-game-accent/20 pb-2">
        {title}
      </h2>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {games.map((game) => (
          <GameCard key={game} title={game} />
        ))}
      </div>
    </section>
  );
};

export default CategorySection;