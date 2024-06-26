import React from "react";

import DesktopNavbar from "./DesktopNavbar";
import MobileNavbar from "./MobileNavbar";
import MaxWidthContainer from "@/components/ui/MaxWidthContainer";

const Navbar = () => {
  return (
    <div className="sticky top-0 left-0 h-[71px] w-full z-50 bg-secondary/80">
      <MaxWidthContainer className="h-full flex justify-between items-center">
        <p className="font-bold text-3xl text-white">Knotify</p>
        <DesktopNavbar />
        <MobileNavbar />
      </MaxWidthContainer>
    </div>
  );
};
export default Navbar;
