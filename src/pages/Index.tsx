import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Brain, Trophy, Gamepad, Sparkles, Users, Timer, Star, Gift } from "lucide-react";
import { Button } from "@/components/ui/button";
import CategorySection from "@/components/CategorySection";
import MainLayout from "@/components/layouts/MainLayout";

const FEATURED_MODES = [
  {
    title: "Daily Challenge",
    icon: <Timer className="w-8 h-8 text-game-accent" />,
    description: "New puzzles every day to keep your mind sharp",
    link: "/daily-challenge",
  },
  {
    title: "Multiplayer Arena",
    icon: <Users className="w-8 h-8 text-game-accent" />,
    description: "Challenge friends in real-time brain battles",
    link: "/multiplayer",
  },
  {
    title: "Achievement Hunt",
    icon: <Trophy className="w-8 h-8 text-game-accent" />,
    description: "Collect badges and climb the leaderboards",
    link: "/achievements",
  },
];

const GAME_CATEGORIES = {
  "Featured Games": [
    "Tetris",
    "Sudoku",
    "Crossword Puzzles",
    "Tic Tac Toe",
    "Tower of Hanoi",
    "Jigsaw Puzzle",
    "Mind Maze",
  ],
  "Brain Training": [
    "Cerebro Challenge",
    "Brainy Quest",
    "Puzzle Fusion",
    "Logic Loop",
  ],
};

const Index = () => {
  return (
    <MainLayout>
      <div className="relative bg-gradient-to-b from-gray-900 via-gray-800 to-black text-white">
        <div className="mx-auto max-w-7xl p-8">
          {/* Hero Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-16 space-y-8"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-3 px-5 py-2 rounded-full bg-gradient-to-r from-purple-600 via-blue-500 to-indigo-600 text-white shadow-lg"
            >
              <Sparkles className="w-5 h-5" />
              <span className="text-sm font-medium">Unleash Your Inner Genius!</span>
            </motion.div>

            <motion.h1
              className="text-7xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 animate-float"
            >
              Mind Marvels
            </motion.h1>

            <motion.p
              className="text-lg text-gray-300 max-w-3xl mx-auto leading-relaxed"
            >
              Challenge your mind with our collection of brain-training games designed to enhance your cognitive abilities while having fun!
            </motion.p>

            <motion.div className="flex justify-center gap-4 mt-4">
              <Link
                to="/cerebro-challenge"
                className="group px-8 py-3 bg-gradient-to-r from-green-400 to-blue-500 text-white rounded-full font-semibold shadow-md hover:shadow-lg hover:scale-105 transform transition-all"
              >
                <Brain className="w-5 h-5 mr-2" /> Start Training
              </Link>
              <Link
                to="/about"
                className="px-8 py-3 bg-gray-700 text-white rounded-full font-semibold border border-gray-600 hover:bg-gray-600 transition-colors"
              >
                Learn More
              </Link>
            </motion.div>
          </motion.div>

          {/* Featured Game Modes */}
          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {FEATURED_MODES.map((mode, index) => (
              <motion.div
                key={mode.title}
                className="group relative overflow-hidden rounded-2xl bg-gray-800 p-6 hover:bg-gradient-to-r from-blue-500 via-purple-600 to-indigo-500 transition-colors duration-300 shadow-lg"
              >
                <div className="flex items-start gap-4">
                  <div className="p-4 rounded-xl bg-gray-900">{mode.icon}</div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2 group-hover:text-white">
                      {mode.title}
                    </h3>
                    <p className="text-gray-400 group-hover:text-gray-200">
                      {mode.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Game Categories */}
          {Object.entries(GAME_CATEGORIES).map(([category, games], index) => (
            <CategorySection
              key={category}
              title={category}
              games={games}
              className="mt-12"
            />
          ))}

          {/* Daily Rewards */}
          <motion.div
            className="mt-16 p-8 rounded-2xl bg-gradient-to-br from-gray-800 to-gray-900 shadow-lg text-center"
          >
            <div className="flex items-center justify-center gap-4 mb-6">
              <Gift className="w-8 h-8 text-yellow-500" />
              <h2 className="text-2xl font-bold">Daily Rewards</h2>
            </div>
            <p className="text-gray-400 mb-6">
              Complete daily challenges to earn special rewards and maintain your streak!
            </p>
            <Button className="bg-yellow-500 text-black hover:bg-yellow-400 px-6 py-2 rounded-full font-semibold">
              Claim Today's Reward
            </Button>
          </motion.div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Index;
