import Image from "next/image";

import Navbar from "@/app/[locale]/(platform)/_components/navbar/Navbar";

const PlatformLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="h-full min-h-screen w-full">
      <Navbar />
      {children}
    </div>
  );
};

export default PlatformLayout;
