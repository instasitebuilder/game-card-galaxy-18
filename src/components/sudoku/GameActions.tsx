import React from "react";
import { Button } from "@/components/ui/button";
import { RefreshCw, Lightbulb } from "lucide-react";

interface GameActionsProps {
  onNewGame: () => void;
  onHint: () => void;
}

const GameActions = ({ onNewGame, onHint }: GameActionsProps) => {
  return (
    <div className="flex flex-wrap justify-center gap-4 bg-white/10 p-4 rounded-lg mb-6">
      <Button
        onClick={onNewGame}
        variant="outline"
        className="bg-white/10 hover:bg-game-accent/20 border-2 border-game-accent text-white"
      >
        <RefreshCw className="mr-2 h-4 w-4" />
        New Game
      </Button>
      <Button
        onClick={onHint}
        variant="outline"
        className="bg-white/10 hover:bg-game-accent/20 border-2 border-game-accent text-white"
      >
        <Lightbulb className="mr-2 h-4 w-4" />
        Hint
      </Button>
    </div>
  );
};

export default GameActions;