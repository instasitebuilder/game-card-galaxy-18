import React from "react";

interface MazeGridProps {
  maze: string[][];
  playerPosition: { x: number; y: number };
}

const MazeGrid = ({ maze, playerPosition }: MazeGridProps) => {
  return (
    <div className="grid place-items-center mb-8">
      <div
        className="grid gap-0.5 bg-white/10 p-2 rounded-lg"
        style={{
          gridTemplateColumns: `repeat(${maze.length}, minmax(0, 1fr))`,
        }}
      >
        {maze.map((row, y) =>
          row.map((cell, x) => (
            <div
              key={`${x}-${y}`}
              className={`w-8 h-8 rounded-sm ${
                playerPosition.x === x && playerPosition.y === y
                  ? "bg-game-accent animate-pulse"
                  : cell === "wall"
                  ? "bg-gray-800"
                  : cell === "end"
                  ? "bg-green-500"
                  : cell === "start"
                  ? "bg-blue-500"
                  : "bg-white/20"
              }`}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default MazeGrid;