import React from "react";

import DesktopNavbar from "./DesktopNavbar";
import MobileNavbar from "./MobileNavbar";
import MaxWidthContainer from "@/components/ui/MaxWidthContainer";
import { Link } from "@/navigation";

const Navbar = () => {
  return (
    <div className="sticky top-0 left-0 h-[71px] w-full z-50 bg-secondary">
      <MaxWidthContainer className="h-full flex justify-between items-center">
        <Link href="/" className="font-bold text-3xl text-white">
          Knotify
        </Link>
        <DesktopNavbar />
        <MobileNavbar />
      </MaxWidthContainer>
    </div>
  );
};
export default Navbar;
