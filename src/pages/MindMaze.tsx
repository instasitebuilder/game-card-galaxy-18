import React, { useState } from "react";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { Button } from "@/components/ui/button";
import { Trophy, Brain, Users, Sparkles } from "lucide-react";
import GameLayout from "@/components/layouts/GameLayout";

const difficultyLevels = [
  { name: "Beginner", color: "bg-green-500" },
  { name: "Advanced", color: "bg-yellow-500" },
  { name: "Master", color: "bg-red-500" },
];

const MindMaze = () => {
  const [selectedDifficulty, setSelectedDifficulty] = useState("Beginner");

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-gradient-game">
        <AppSidebar />
        <GameLayout>
          <div className="space-y-8">
            {/* Hero Section */}
            <div className="text-center space-y-4">
              <h1 className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
                Mind Maze
              </h1>
              <p className="text-lg text-white/80 max-w-2xl mx-auto">
                Challenge your cognitive skills with intricate mazes and brain-teasing puzzles
              </p>
            </div>

            {/* Features Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  icon: Brain,
                  title: "Brain Training",
                  description: "Enhance problem-solving and spatial awareness",
                },
                {
                  icon: Trophy,
                  title: "Achievements",
                  description: "Unlock rewards and track your progress",
                },
                {
                  icon: Users,
                  title: "Multiplayer",
                  description: "Compete or cooperate with other players",
                },
                {
                  icon: Sparkles,
                  title: "Power-ups",
                  description: "Gain special abilities and advantages",
                },
              ].map((feature, index) => (
                <div
                  key={index}
                  className="p-6 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-colors"
                >
                  <feature.icon className="w-8 h-8 text-game-accent mb-4" />
                  <h3 className="text-xl font-semibold text-white mb-2">{feature.title}</h3>
                  <p className="text-white/70">{feature.description}</p>
                </div>
              ))}
            </div>

            {/* Difficulty Selection */}
            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-8 border border-white/10">
              <h2 className="text-2xl font-semibold text-white mb-6">Select Difficulty</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {difficultyLevels.map((level) => (
                  <button
                    key={level.name}
                    onClick={() => setSelectedDifficulty(level.name)}
                    className={`p-4 rounded-lg border-2 transition-all ${
                      selectedDifficulty === level.name
                        ? "border-game-accent bg-white/10"
                        : "border-transparent bg-white/5 hover:bg-white/10"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-3 h-3 rounded-full ${level.color}`} />
                      <span className="text-white font-medium">{level.name}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Start Game Button */}
            <div className="text-center">
              <Button
                className="bg-game-accent hover:bg-game-accent/90 text-white px-8 py-6 text-lg rounded-full"
              >
                Start Game
              </Button>
            </div>

            {/* Game Preview */}
            <div className="relative rounded-xl overflow-hidden aspect-video bg-black/20 backdrop-blur-sm border border-white/10">
              <div className="absolute inset-0 flex items-center justify-center">
                <p className="text-white/60">Game preview coming soon...</p>
              </div>
            </div>
          </div>
        </GameLayout>
      </div>
    </SidebarProvider>
  );
};

export default MindMaze;