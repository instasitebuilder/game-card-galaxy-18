import React, { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { CircleDot, Hash, X, RotateCcw, Play, Pause, RefreshCw } from "lucide-react";
import LogicGate from "@/components/logic-loop/LogicGate";
import Controls from "@/components/logic-loop/Controls";
import type { LogicGate as LogicGateType, Connection } from "@/components/logic-loop/types";

const LogicLoop: React.FC = () => {
  const [gates, setGates] = useState<LogicGateType[]>([]);
  const [connections, setConnections] = useState<Connection[]>([]);
  const [selectedGate, setSelectedGate] = useState<string | null>(null);
  const [isSimulating, setIsSimulating] = useState(false);
  const { toast } = useToast();

  const addGate = (type: LogicGateType["type"]) => {
    const newGate: LogicGateType = {
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

  const calculateOutput = (gate: LogicGateType): boolean => {
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
          
          <div className="flex gap-4 mb-8">
            {[
              { type: "AND", icon: CircleDot },
              { type: "OR", icon: Hash },
              { type: "NOT", icon: RotateCcw },
              { type: "XOR", icon: X },
            ].map((gate) => (
              <button
                key={gate.type}
                onClick={() => addGate(gate.type as LogicGateType["type"])}
                className="flex items-center gap-2 bg-game-accent px-4 py-2 rounded-lg text-white hover:bg-game-accent/90 transition-colors"
              >
                <gate.icon size={20} />
                Add {gate.type} Gate
              </button>
            ))}
          </div>

          <Controls
            onSimulate={simulateCircuit}
            onPause={() => setIsSimulating(false)}
            onReset={resetCircuit}
            isSimulating={isSimulating}
          />
        </div>

        <div className="bg-game-surface p-8 rounded-xl border border-game-card-border min-h-[600px] relative">
          {gates.map((gate) => (
            <LogicGate
              key={gate.id}
              {...gate}
              onClick={handleGateClick}
              isSelected={selectedGate === gate.id}
            />
          ))}

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