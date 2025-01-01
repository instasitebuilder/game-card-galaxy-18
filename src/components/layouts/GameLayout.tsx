import React from "react";
import AdSpace from "@/components/ads/AdSpace";

interface GameLayoutProps {
  children: React.ReactNode;
}

const GameLayout = ({ children }: GameLayoutProps) => {
  return (
    <div className="min-h-screen bg-gradient-game p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        <AdSpace position="top" />
        
        <div className="relative">
          {/* Background pattern */}
          <div 
            className="absolute inset-0 opacity-20 pointer-events-none"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 30l15-15l15 15l-15 15l-15-15zm0 0l-15 15l-15-15l15-15l15 15z' fill='%23ffffff' fill-opacity='0.1'/%3E%3C/svg%3E")`,
              backgroundSize: '60px 60px'
            }}
          />
          
          <div className="relative">
            {children}
          </div>
        </div>
        
        <AdSpace position="bottom" />
      </div>
    </div>
  );
};

export default GameLayout;