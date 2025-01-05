import React from "react";
import CategorySection from "@/components/CategorySection";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import AdSpace from "@/components/ads/AdSpace";
import { ArrowRight, Sparkles, Brain, Trophy, Gamepad } from "lucide-react";
import { Link } from "react-router-dom";

const GAME_CATEGORIES = {
  "Featured Games": [
    "Tetris",
    "Sudoku",
    "Crossword Puzzles",
    "Tic Tac Toe",
    "Tower of Hanoi",
    "Jigsaw Puzzle",
    "Mind Maze"
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
            <AdSpace position="top" />
            
            <div className="mx-auto max-w-7xl p-8">
              {/* Hero Section */}
              <div className="text-center mb-16 space-y-8">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-game-surface backdrop-blur-sm border border-game-card-border mb-4">
                  <Sparkles className="w-4 h-4 text-game-accent" />
                  <span className="text-sm text-white/80">New Games Added Weekly</span>
                </div>
                
                <h1 className="text-7xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-game-accent via-game-secondary to-game-accent animate-float">
                  Brain Games
                </h1>
                
                <div className="flex justify-center gap-6 text-white/80">
                  <div className="flex items-center gap-2">
                    <Brain className="w-5 h-5 text-game-accent" />
                    <span>Enhance Cognitive Skills</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Trophy className="w-5 h-5 text-game-accent" />
                    <span>Compete Globally</span>
                  </div>
                </div>
                
                <p className="text-xl text-white/80 max-w-2xl mx-auto leading-relaxed">
                  Challenge your mind with our collection of puzzle games designed to enhance your cognitive abilities
                </p>
                
                <div className="flex justify-center gap-4">
                  <Link 
                    to="/future-games"
                    className="group px-8 py-3 bg-game-accent text-white rounded-full font-semibold hover:bg-game-accent/90 transition-colors duration-300 shadow-lg flex items-center gap-2"
                  >
                    <Gamepad className="w-4 h-4" />
                    Upcoming Games
                  </Link>
                  <Link
                    to="/about" 
                    className="px-8 py-3 bg-white/10 text-white rounded-full font-semibold hover:bg-white/20 transition-colors duration-300 backdrop-blur-sm border border-white/10"
                  >
                    Learn More
                  </Link>
                </div>
              </div>

              {/* Featured Stats */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
                {[
                  { label: "Active Players", value: "10K+" },
                  { label: "Games Available", value: "15+" },
                  { label: "Daily Challenges", value: "5" }
                ].map((stat, index) => (
                  <div 
                    key={index}
                    className="bg-gradient-card backdrop-blur-sm border border-game-card-border rounded-2xl p-6 text-center"
                  >
                    <div className="text-3xl font-bold text-game-accent mb-2">{stat.value}</div>
                    <div className="text-white/80">{stat.label}</div>
                  </div>
                ))}
              </div>

              {/* Games Grid */}
              {Object.entries(GAME_CATEGORIES).map(([category, games]) => (
                <CategorySection key={category} title={category} games={games} />
              ))}
            </div>
            
            <AdSpace position="bottom" />
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default Index;