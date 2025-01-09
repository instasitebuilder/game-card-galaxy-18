import React from "react";

interface ScoreDisplayProps {
  blackScore: number;
  whiteScore: number;
  capturedByBlack: number;
  capturedByWhite: number;
  currentPlayer: "black" | "white";
}

const ScoreDisplay: React.FC<ScoreDisplayProps> = ({
  blackScore,
  whiteScore,
  capturedByBlack,
  capturedByWhite,
  currentPlayer,
}) => {
  return (
    <div className="grid grid-cols-2 gap-4 p-4 bg-white/5 rounded-lg backdrop-blur-sm">
      <div className={`p-4 rounded-lg ${currentPlayer === "black" ? "bg-black/20 ring-2 ring-white/20" : "bg-black/10"}`}>
        <h3 className="text-lg font-semibold text-white mb-2">Black</h3>
        <div className="space-y-1 text-white/80">
          <p>Territory: {blackScore}</p>
          <p>Captured: {capturedByBlack}</p>
          <p className="text-lg font-bold text-white">
            Total: {blackScore + capturedByBlack}
          </p>
        </div>
      </div>

      <div className={`p-4 rounded-lg ${currentPlayer === "white" ? "bg-white/20 ring-2 ring-white/20" : "bg-white/10"}`}>
        <h3 className="text-lg font-semibold text-white mb-2">White</h3>
        <div className="space-y-1 text-white/80">
          <p>Territory: {whiteScore}</p>
          <p>Captured: {capturedByWhite}</p>
          <p className="text-lg font-bold text-white">
            Total: {whiteScore + capturedByWhite}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ScoreDisplay;