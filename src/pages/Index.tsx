import React from "react";
import CategorySection from "@/components/CategorySection";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";

const GAME_CATEGORIES = {
  "Featured Games": [
    "Tetris",
    "Sudoku",
    "Crossword Puzzles",
  ],
};

const Index = () => {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-gradient-game overflow-hidden">
        <AppSidebar />
        <main className="flex-1 relative">
          {/* Background pattern */}
          <div 
            className="absolute inset-0 opacity-20"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 30l15-15l15 15l-15 15l-15-15zm0 0l-15 15l-15-15l15-15l15 15z' fill='%23ffffff' fill-opacity='0.1'/%3E%3C/svg%3E")`,
              backgroundSize: '60px 60px'
            }}
          />
          
          <div className="relative">
            <div className="mx-auto max-w-7xl p-8">
              {/* Hero Section */}
              <div className="text-center mb-16 space-y-6">
                <h1 className="text-7xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-game-accent via-game-secondary to-game-accent animate-float">
                  Brain Games
                </h1>
                <p className="text-xl text-white/80 max-w-2xl mx-auto leading-relaxed">
                  Challenge your mind with our collection of puzzle games designed to enhance your cognitive abilities
                </p>
                <button className="px-8 py-3 bg-game-accent text-game-primary rounded-full font-semibold hover:bg-game-accent/90 transition-colors duration-300 shadow-lg">
                  Explore Games
                </button>
              </div>

              {/* Games Grid */}
              {Object.entries(GAME_CATEGORIES).map(([category, games]) => (
                <CategorySection key={category} title={category} games={games} />
              ))}
            </div>
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default Index;