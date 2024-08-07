import React from "react";
import Navbar from "@/app/[locale]/(platform)/_components/navbar/Navbar";
import Player from "./_components/player/player";

type PlatformLayoutProps = {
  children: React.ReactNode;
};

/**
 * PlatformLayout Component
 * This layout component wraps around the platform-specific pages,
 * providing a consistent structure with a navbar at the top and
 * a player at the bottom.
 *
 * @param {React.ReactNode} children - The content to be rendered between the Navbar and Player components.
 */
const PlatformLayout: React.FC<PlatformLayoutProps> = ({ children }) => {
  return (
    <div className="h-full min-h-screen w-full flex flex-col">
      {/* Navbar component at the top */}
      <Navbar />

      {/* Main content passed as children */}
      {children}

      {/* Player component at the bottom */}
      <Player />
    </div>
  );
};

export default PlatformLayout;
