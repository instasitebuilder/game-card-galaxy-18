import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Brain, Trophy, Gamepad, Sparkles, Users, Timer, Star, Gift } from "lucide-react";
import { Button } from "@/components/ui/button";
import CategorySection from "@/components/CategorySection";
import AdSpace from "@/components/ads/AdSpace";
import MainLayout from "@/components/layouts/MainLayout";

const FEATURED_MODES = [
  {
    title: "Daily Challenge",
    icon: <Timer className="w-6 h-6 text-game-accent" />,
    description: "New puzzles every day to keep your mind sharp",
    link: "/daily-challenge",
    image: "https://example.com/daily-challenge.jpg"
  },
  {
    title: "Multiplayer Arena",
    icon: <Users className="w-6 h-6 text-game-accent" />,
    description: "Challenge friends in real-time brain battles",
    link: "/multiplayer",
    image: "https://example.com/multiplayer-arena.jpg"
  },
  {
    title: "Achievement Hunt",
    icon: <Trophy className="w-6 h-6 text-game-accent" />,
    description: "Collect badges and climb the leaderboards",
    link: "/achievements",
    image: "https://example.com/achievement-hunt.jpg"
  }
];

const GAME_CATEGORIES = {
  "Featured Games": [
    { name: "Tetris", image: "https://example.com/tetris.jpg" },
    { name: "Sudoku", image: "https://example.com/sudoku.jpg" },
    { name: "Crossword Puzzles", image: "https://example.com/crossword.jpg" },
    { name: "Tic Tac Toe", image: "https://example.com/tic-tac-toe.jpg" },
    { name: "Tower of Hanoi", image: "https://example.com/tower-of-hanoi.jpg" },
    { name: "Jigsaw Puzzle", image: "https://example.com/jigsaw.jpg" },
    { name: "Mind Maze", image: "https://example.com/mind-maze.jpg" }
  ],
  "Brain Training": [
    { name: "Cerebro Challenge", image: "https://example.com/cerebro-challenge.jpg" },
    { name: "Brainy Quest", image: "https://example.com/brainy-quest.jpg" },
    { name: "Puzzle Fusion", image: "https://example.com/puzzle-fusion.jpg" },
    { name: "Logic Loop", image: "https://example.com/logic-loop.jpg" }
  ]
};

const Index = () => {
  return (
    <MainLayout>
      <div className="relative">
        <AdSpace position="top" />
        
        <div className="mx-auto max-w-7xl p-8">
          {/* Hero Section */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-16 space-y-8"
          >
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-game-surface backdrop-blur-sm border border-game-card-border mb-4"
            >
              <Sparkles className="w-4 h-4 text-game-accent" />
              <span className="text-sm text-white/80">Unleash Your Inner Genius!</span>
            </motion.div>
            
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-7xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-game-accent via-game-secondary to-game-accent animate-float"
            >
              Mind Marvels
            </motion.h1>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="flex justify-center gap-6 text-white/80"
            >
              <div className="flex items-center gap-2">
                <Brain className="w-5 h-5 text-game-accent" />
                <span>Train Your Brain</span>
              </div>
              <div className="flex items-center gap-2">
                <Trophy className="w-5 h-5 text-game-accent" />
                <span>Earn Rewards</span>
              </div>
              <div className="flex items-center gap-2">
                <Star className="w-5 h-5 text-game-accent" />
                <span>Daily Challenges</span>
              </div>
            </motion.div>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-xl text-white/80 max-w-2xl mx-auto leading-relaxed"
            >
              Challenge your mind with our collection of brain-training games designed to enhance your cognitive abilities while having fun!
            </motion.p>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="flex justify-center gap-4"
            >
              <Link 
                to="/cerebro-challenge"
                className="group px-8 py-3 bg-game-accent text-white rounded-full font-semibold hover:bg-game-accent/90 transition-colors duration-300 shadow-lg flex items-center gap-2"
              >
                <Brain className="w-4 h-4" />
                Start Training
              </Link>
              <Link
                to="/about" 
                className="px-8 py-3 bg-white/10 text-white rounded-full font-semibold hover:bg-white/20 transition-colors duration-300 backdrop-blur-sm border border-white/10"
              >
                Learn More
              </Link>
            </motion.div>
          </motion.div>

          {/* Featured Game Modes */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16"
          >
            {FEATURED_MODES.map((mode, index) => (
              <Link
                key={mode.title}
                to={mode.link}
                className="group relative overflow-hidden rounded-2xl bg-gradient-card backdrop-blur-sm border border-game-card-border p-6 hover:border-game-accent/50 transition-all duration-300"
              >
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-xl bg-game-surface">
                    {mode.icon}
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-2">{mode.title}</h3>
                    <p className="text-white/70">{mode.description}</p>
                  </div>
                </div>
                <img src={mode.image} alt={mode.title} className="w-full h-40 object-cover mt-4 rounded-lg" />
                <div className="absolute inset-0 bg-gradient-to-r from-game-accent/0 to-game-accent/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </Link>
            ))}
          </motion.div>

          {/* Game Categories */}
          {Object.entries(GAME_CATEGORIES).map(([category, games], index) => (
            <motion.div
              key={category}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 + index * 0.1 }}
            >
              <CategorySection 
                title={category} 
                games={games.map(game => ({
                  name: game.name,
                  image: game.image
                }))} 
              />
            </motion.div>
          ))}

          {/* Daily Rewards */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="mt-16 p-8 rounded-2xl bg-gradient-card backdrop-blur-sm border border-game-card-border"
          >
            <div className="flex items-center gap-4 mb-6">
              <Gift className="w-8 h-8 text-game-accent" />
              <h2 className="text-2xl font-bold text-white">Daily Rewards</h2>
            </div>
            <p className="text-white/80 mb-6">Complete daily challenges to earn special rewards and maintain your streak!</p>
            <Button className="bg-game-accent text-white hover:bg-game-accent/90">
              Claim Today's Reward
            </Button>
          </motion.div>
        </div>
        
        <AdSpace position="bottom" />
      </div>
    </MainLayout>
  );
};

export default Index;
