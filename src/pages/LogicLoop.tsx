import React, { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { And, Or, X, RotateCcw, Play, Pause, RefreshCw } from "lucide-react";

interface LogicGate {
  id: string;
  type: "AND" | "OR" | "NOT" | "XOR";
  position: { x: number; y: number };
  inputs: boolean[];
  output: boolean;
}

interface Connection {
  from: string;
  to: string;
}

const LogicLoop: React.FC = () => {
  const [gates, setGates] = useState<LogicGate[]>([]);
  const [connections, setConnections] = useState<Connection[]>([]);
  const [selectedGate, setSelectedGate] = useState<string | null>(null);
  const [isSimulating, setIsSimulating] = useState(false);
  const { toast } = useToast();

  const addGate = (type: LogicGate["type"]) => {
    const newGate: LogicGate = {
      id: `gate-${Date.now()}`,
      type,
      position: { x: 100, y: 100 },
      inputs: type === "NOT" ? [false] : [false, false],
      output: false,
    };
    setGates([...gates, newGate]);
  };

  const handleGateClick = (gateId: string) => {
    if (selectedGate === null) {
      setSelectedGate(gateId);
    } else if (selectedGate !== gateId) {
      // Create connection
      const newConnection: Connection = {
        from: selectedGate,
        to: gateId,
      };
      setConnections([...connections, newConnection]);
      setSelectedGate(null);
      
      toast({
        title: "Connection Created",
        description: "Gates connected successfully!",
        duration: 2000,
      });
    }
  };

  const calculateOutput = (gate: LogicGate): boolean => {
    switch (gate.type) {
      case "AND":
        return gate.inputs[0] && gate.inputs[1];
      case "OR":
        return gate.inputs[0] || gate.inputs[1];
      case "NOT":
        return !gate.inputs[0];
      case "XOR":
        return gate.inputs[0] !== gate.inputs[1];
      default:
        return false;
    }
  };

  const simulateCircuit = () => {
    setIsSimulating(true);
    const updatedGates = gates.map(gate => ({
      ...gate,
      output: calculateOutput(gate),
    }));
    setGates(updatedGates);
  };

  const resetCircuit = () => {
    setIsSimulating(false);
    setGates(gates.map(gate => ({
      ...gate,
      inputs: gate.type === "NOT" ? [false] : [false, false],
      output: false,
    })));
  };

  return (
    <div className="min-h-screen bg-gradient-game p-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-4">Logic Loop</h1>
          <p className="text-white/80 mb-6">
            Create logical circuits by connecting gates and solving puzzles.
          </p>
          
          {/* Controls */}
          <div className="flex gap-4 mb-8">
            <button
              onClick={() => addGate("AND")}
              className="flex items-center gap-2 bg-game-accent px-4 py-2 rounded-lg text-white hover:bg-game-accent/90 transition-colors"
            >
              <And size={20} />
              Add AND Gate
            </button>
            <button
              onClick={() => addGate("OR")}
              className="flex items-center gap-2 bg-game-accent px-4 py-2 rounded-lg text-white hover:bg-game-accent/90 transition-colors"
            >
              <Or size={20} />
              Add OR Gate
            </button>
            <button
              onClick={() => addGate("NOT")}
              className="flex items-center gap-2 bg-game-accent px-4 py-2 rounded-lg text-white hover:bg-game-accent/90 transition-colors"
            >
              <RotateCcw size={20} />
              Add NOT Gate
            </button>
            <button
              onClick={() => addGate("XOR")}
              className="flex items-center gap-2 bg-game-accent px-4 py-2 rounded-lg text-white hover:bg-game-accent/90 transition-colors"
            >
              <X size={20} />
              Add XOR Gate
            </button>
          </div>

          {/* Simulation Controls */}
          <div className="flex gap-4 mb-8">
            <button
              onClick={simulateCircuit}
              disabled={isSimulating}
              className="flex items-center gap-2 bg-green-600 px-4 py-2 rounded-lg text-white hover:bg-green-700 transition-colors disabled:opacity-50"
            >
              <Play size={20} />
              Simulate
            </button>
            <button
              onClick={() => setIsSimulating(false)}
              disabled={!isSimulating}
              className="flex items-center gap-2 bg-yellow-600 px-4 py-2 rounded-lg text-white hover:bg-yellow-700 transition-colors disabled:opacity-50"
            >
              <Pause size={20} />
              Pause
            </button>
            <button
              onClick={resetCircuit}
              className="flex items-center gap-2 bg-red-600 px-4 py-2 rounded-lg text-white hover:bg-red-700 transition-colors"
            >
              <RefreshCw size={20} />
              Reset
            </button>
          </div>
        </div>

        {/* Game Board */}
        <div className="bg-game-surface p-8 rounded-xl border border-game-card-border min-h-[600px] relative">
          {/* Gates */}
          {gates.map((gate) => (
            <div
              key={gate.id}
              onClick={() => handleGateClick(gate.id)}
              className={`absolute p-4 bg-game-accent rounded-lg cursor-pointer transform transition-transform hover:scale-105 ${
                selectedGate === gate.id ? "ring-2 ring-white" : ""
              }`}
              style={{
                left: gate.position.x,
                top: gate.position.y,
              }}
            >
              <div className="text-white font-bold">{gate.type}</div>
              <div className="text-white/80 text-sm">
                Output: {gate.output ? "1" : "0"}
              </div>
            </div>
          ))}

          {/* Connections */}
          {connections.map((conn, index) => {
            const fromGate = gates.find(g => g.id === conn.from);
            const toGate = gates.find(g => g.id === conn.to);
            if (!fromGate || !toGate) return null;

            return (
              <svg
                key={index}
                className="absolute inset-0 pointer-events-none"
                style={{ zIndex: -1 }}
              >
                <line
                  x1={fromGate.position.x + 50}
                  y1={fromGate.position.y + 25}
                  x2={toGate.position.x + 50}
                  y2={toGate.position.y + 25}
                  stroke="white"
                  strokeWidth="2"
                />
              </svg>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default LogicLoop;