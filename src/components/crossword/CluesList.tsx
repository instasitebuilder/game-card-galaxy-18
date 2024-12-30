import React from 'react';

interface Clue {
  number: number;
  text: string;
  direction: 'across' | 'down';
  startRow: number;
  startCol: number;
  answer: string; // Added answer property to match the type in CrosswordGame
}

interface CluesListProps {
  clues: Clue[];
  selectedClue: Clue | null;
  onClueSelect: (clue: Clue) => void;
}

export const CluesList: React.FC<CluesListProps> = ({ clues, selectedClue, onClueSelect }) => {
  const acrossClues = clues.filter((clue) => clue.direction === 'across');
  const downClues = clues.filter((clue) => clue.direction === 'down');

  return (
    <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 space-y-6">
      <div>
        <h3 className="text-xl font-semibold text-white mb-4">Across</h3>
        <div className="space-y-2">
          {acrossClues.map((clue) => (
            <button
              key={`across-${clue.number}`}
              onClick={() => onClueSelect(clue)}
              className={`w-full text-left p-2 rounded transition-colors ${
                selectedClue?.number === clue.number && selectedClue?.direction === 'across'
                  ? 'bg-game-accent/20 text-white'
                  : 'text-white/70 hover:bg-white/5'
              }`}
            >
              <span className="font-semibold">{clue.number}.</span> {clue.text}
            </button>
          ))}
        </div>
      </div>
      <div>
        <h3 className="text-xl font-semibold text-white mb-4">Down</h3>
        <div className="space-y-2">
          {downClues.map((clue) => (
            <button
              key={`down-${clue.number}`}
              onClick={() => onClueSelect(clue)}
              className={`w-full text-left p-2 rounded transition-colors ${
                selectedClue?.number === clue.number && selectedClue?.direction === 'down'
                  ? 'bg-game-accent/20 text-white'
                  : 'text-white/70 hover:bg-white/5'
              }`}
            >
              <span className="font-semibold">{clue.number}.</span> {clue.text}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};