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
  "Coming Soon": [
    "Jigsaw Puzzles",
    "Rubik's Cube",
  ],
};

const Index = () => {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-game-background">
        <AppSidebar />
        <main className="flex-1">
          <div className="min-h-screen bg-gradient-to-br from-game-background via-game-primary to-game-secondary relative">
            <div 
              className="absolute inset-0 opacity-20"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='30' height='30' viewBox='0 0 30 30' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='1.22676' cy='1.22676' r='1.22676' fill='rgba(255,255,255,0.07)'/%3E%3C/svg%3E")`,
                backgroundSize: '30px 30px'
              }}
            />
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-game-background/50 to-game-background pointer-events-none" />
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
        </main>
      </div>
    </SidebarProvider>
  );
};

export default Index;