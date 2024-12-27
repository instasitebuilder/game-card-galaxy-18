import React from "react";

interface AdSpaceProps {
  position: "top" | "bottom" | "sidebar";
}

const AdSpace = ({ position }: AdSpaceProps) => {
  const getPositionClasses = () => {
    switch (position) {
      case "top":
      case "bottom":
        return "w-full h-24 my-4";
      case "sidebar":
        return "w-64 h-full";
      default:
        return "";
    }
  };

  return (
    <div
      className={`bg-white/10 rounded-lg flex items-center justify-center border-2 border-dashed border-game-accent/30 ${getPositionClasses()}`}
    >
      <p className="text-white/50">Advertisement Space</p>
    </div>
  );
};

export default AdSpace;