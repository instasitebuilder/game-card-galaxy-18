import React from "react";
import { Info, Brain, Timer, Puzzle, Zap, RotateCw } from "lucide-react";

const GameInstructions = () => {
  const instructions = [
    {
      title: "Memory Match",
      icon: Brain,
      description: "Remember and match patterns within the time limit",
    },
    {
      title: "Logic Puzzles",
      icon: Puzzle,
      description: "Solve riddles and logic-based challenges",
    },
    {
      title: "Vocabulary Blitz",
      icon: Timer,
      description: "Form words from jumbled letters quickly",
    },
    {
      title: "Quick Math",
      icon: Zap,
      description: "Solve arithmetic problems under pressure",
    },
    {
      title: "Spatial Reasoning",
      icon: RotateCw,
      description: "Solve visual and spatial puzzles",
    },
  ];

  return (
    <div className="bg-game-surface backdrop-blur-sm rounded-2xl p-6">
      <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
        <Info className="w-5 h-5 text-game-accent" />
        How to Play
      </h3>

      <div className="space-y-4">
        {instructions.map((instruction, index) => (
          <div key={index} className="flex gap-3">
            <instruction.icon className="w-5 h-5 text-game-accent shrink-0" />
            <div>
              <h4 className="font-semibold text-white mb-1">{instruction.title}</h4>
              <p className="text-sm text-white/70">{instruction.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GameInstructions;