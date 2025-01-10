import React from 'react';
import GameCard from './GameCard';
import { cn } from '@/lib/utils';

export interface CategorySectionProps {
  title: string;
  games: string[];
  className?: string; // Added className to props
}

const CategorySection: React.FC<CategorySectionProps> = ({ title, games, className }) => {
  return (
    <section className={cn("space-y-4", className)}>
      <h2 className="text-2xl font-bold text-white">{title}</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {games.map((game) => (
          <GameCard key={game} gameTitle={game} />
        ))}
      </div>
    </section>
  );
};

export default CategorySection;