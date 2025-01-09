import React, { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { CircleDot, Hash, X, RotateCcw, Play, Pause, RefreshCw, Trophy } from "lucide-react";
import LogicGate from "@/components/logic-loop/LogicGate";
import Controls from "@/components/logic-loop/Controls";
import type { LogicGate as LogicGateType, Connection } from "@/components/logic-loop/types";

interface Challenge {
  id: number;
  name: string;
  description: string;
  targetOutput: boolean[];
  maxGates: number;
}

const challenges: Challenge[] = [
  {
    id: 1,
    name: "Basic AND",
    description: "Create a circuit that outputs 1 only when both inputs are 1",
    targetOutput: [false, false, false, true], // For input combinations: 00, 01, 10, 11
    maxGates: 1,
  },
  {
    id: 2,
    name: "NOT Gate Challenge",
    description: "Invert the input signal",
    targetOutput: [true, false], // For input: 0, 1
    maxGates: 1,
  },
  {
    id: 3,
    name: "OR Logic",
    description: "Output 1 if any input is 1",
    targetOutput: [false, true, true, true], // For input combinations: 00, 01, 10, 11
    maxGates: 1,
  },
];

const LogicLoop: React.FC = () => {
  const [gates, setGates] = useState<LogicGateType[]>([]);
  const [connections, setConnections] = useState<Connection[]>([]);
  const [selectedGate, setSelectedGate] = useState<string | null>(null);
  const [isSimulating, setIsSimulating] = useState(false);
  const [currentLevel, setCurrentLevel] = useState(0);
  const [score, setScore] = useState(0);
  const { toast } = useToast();

  const addGate = (type: LogicGateType["type"]) => {
    if (gates.length >= challenges[currentLevel].maxGates) {
      toast({
        title: "Gate Limit Reached",
        description: `You can only use ${challenges[currentLevel].maxGates} gates in this level`,
        variant: "destructive",
      });
      return;
    }

    const newGate: LogicGateType = {
      id: `gate-${Date.now()}`,
      type,
      position: { x: Math.random() * 400 + 100, y: Math.random() * 200 + 100 },
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

  const checkSolution = () => {
    const currentChallenge = challenges[currentLevel];
    const outputs = gates.map(gate => gate.output);
    
    const isCorrect = outputs.some(output => 
      currentChallenge.targetOutput.includes(output)
    );

    if (isCorrect) {
      const newScore = score + 100;
      setScore(newScore);
      toast({
        title: "Level Complete! 🎉",
        description: `You earned 100 points! Total score: ${newScore}`,
      });
      
      if (currentLevel < challenges.length - 1) {
        setCurrentLevel(prev => prev + 1);
      } else {
        toast({
          title: "Congratulations! 🏆",
          description: "You've completed all levels!",
        });
      }
    } else {
      toast({
        title: "Try Again",
        description: "Your circuit output doesn't match the target output",
        variant: "destructive",
      });
    }
  };

  const simulateCircuit = () => {
    setIsSimulating(true);
    const updatedGates = gates.map(gate => ({
      ...gate,
      output: calculateOutput(gate),
    }));
    setGates(updatedGates);
    checkSolution();
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
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <div className="flex justify-between items-center">
            <h1 className="text-4xl font-bold text-white mb-4">Logic Loop</h1>
            <div className="flex items-center gap-4">
              <div className="bg-gray-800 px-4 py-2 rounded-lg">
                <span className="text-white">Score: {score}</span>
              </div>
              <div className="bg-gray-800 px-4 py-2 rounded-lg">
                <span className="text-white">Level: {currentLevel + 1}</span>
              </div>
            </div>
          </div>

          {/* Current Challenge Info */}
          <div className="bg-gray-800/50 rounded-lg p-6 mb-8">
            <h2 className="text-2xl font-semibold text-white mb-2">
              {challenges[currentLevel].name}
            </h2>
            <p className="text-gray-300">
              {challenges[currentLevel].description}
            </p>
            <div className="mt-4 text-gray-300">
              <span className="font-semibold">Target Output: </span>
              {challenges[currentLevel].targetOutput.map((output, index) => (
                <span key={index} className="mx-1">
                  {output ? "1" : "0"}
                </span>
              ))}
            </div>
          </div>
          
          {/* How to Play Guide */}
          <div className="bg-black/20 rounded-lg p-6 mb-8 text-white/90">
            <h2 className="text-2xl font-semibold mb-4">How to Play</h2>
            <ul className="space-y-3 list-disc pl-6">
              <li>Click the gate buttons above to add logic gates to your circuit</li>
              <li>Each gate type performs a different logical operation:
                <ul className="pl-6 mt-2 space-y-2">
                  <li><CircleDot className="inline mr-2" /> AND gate: Output is 1 only if both inputs are 1</li>
                  <li><Hash className="inline mr-2" /> OR gate: Output is 1 if at least one input is 1</li>
                  <li><RotateCcw className="inline mr-2" /> NOT gate: Inverts the input (0 becomes 1, 1 becomes 0)</li>
                  <li><X className="inline mr-2" /> XOR gate: Output is 1 if inputs are different</li>
                </ul>
              </li>
              <li>Connect gates by:
                <ol className="pl-6 mt-2 space-y-2">
                  <li>1. Click on a source gate</li>
                  <li>2. Click on a target gate to create a connection</li>
                </ol>
              </li>
              <li>Use the controls below to:
                <ul className="pl-6 mt-2 space-y-2">
                  <li><Play className="inline mr-2" /> Simulate: Run your circuit</li>
                  <li><Pause className="inline mr-2" /> Pause: Pause the simulation</li>
                  <li><RefreshCw className="inline mr-2" /> Reset: Clear all outputs</li>
                </ul>
              </li>
            </ul>
          </div>

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
                className="flex items-center gap-2 bg-gray-700 px-4 py-2 rounded-lg text-white hover:bg-gray-600 transition-colors"
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

        <div className="bg-gray-800/30 p-8 rounded-xl border border-gray-700 min-h-[600px] relative">
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