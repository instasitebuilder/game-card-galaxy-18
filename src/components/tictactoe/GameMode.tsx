import React from "react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Users2, User } from "lucide-react";

interface GameModeProps {
  onSelectMode: (mode: "single" | "multi" | null) => void;
}

export const GameMode = ({ onSelectMode }: GameModeProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col items-center gap-4"
    >
      <p className="text-lg text-game-accent mb-4">
        Select Game Mode
      </p>
      <div className="flex gap-4">
        <Button
          onClick={() => onSelectMode("single")}
          className="bg-game-secondary hover:bg-game-primary text-white px-8 py-6 text-lg"
        >
          <User className="mr-2" />
          Single Player
        </Button>
        <Button
          onClick={() => onSelectMode("multi")}
          className="bg-game-secondary hover:bg-game-primary text-white px-8 py-6 text-lg"
        >
          <Users2 className="mr-2" />
          Two Players
        </Button>
      </div>
    </motion.div>
  );
};