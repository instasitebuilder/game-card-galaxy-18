export interface LogicGate {
  id: string;
  type: "AND" | "OR" | "NOT" | "XOR";
  position: { x: number; y: number };
  inputs: boolean[];
  output: boolean;
}

export interface Connection {
  from: string;
  to: string;
}