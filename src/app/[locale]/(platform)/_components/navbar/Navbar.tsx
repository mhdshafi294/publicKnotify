import React from "react";

import DesktopNavbar from "./DesktopNavbar";
import MobileNavbar from "./MobileNavbar";

const Navbar = () => {
  return (
    <div className="inset-0 h-[71px] w-full bg-secondary flex justify-between items-center px-4 sm:px-6 lg:px-8 xl:px-20">
      <p className="font-bold text-3xl text-white">Knotify</p>
      <DesktopNavbar />
      <MobileNavbar />
    </div>
  );
};
export default Navbar;
