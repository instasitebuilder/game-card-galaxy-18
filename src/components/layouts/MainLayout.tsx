import React from "react";
import GameNavigation from "../navigation/GameNavigation";

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout = ({ children }: MainLayoutProps) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-game-primary via-[#6B46C1] to-game-secondary">
      <GameNavigation />
      <main className="pl-64">
        {children}
      </main>
    </div>
  );
};

export default MainLayout;