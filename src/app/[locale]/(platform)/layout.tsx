import Image from "next/image";
import Navbar from "./_components/Navbar";

const PlatformLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="h-full min-h-screen w-full flex items-center justify-center">
      <Navbar />
      {children}
    </div>
  );
};

export default PlatformLayout;
