import Navbar from "@/app/[locale]/(platform)/_components/navbar/Navbar";
import Player from "./_components/player/player";

const PlatformLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="h-full min-h-screen w-full">
      <Navbar />
      {children}
      <Player />
    </div>
  );
};

export default PlatformLayout;
