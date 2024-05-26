import React from "react";

import DesktopNavbar from "./DesktopNavbar";
import MobileNavbar from "./MobileNavbar";

const Navbar = () => {
  return (
    <div className="inset-0 absolute h-[71px] w-full bg-[#302939] flex justify-between items-center px-8">
      <p className="font-bold text-3xl text-white">Knotify</p>
      <DesktopNavbar />
      <MobileNavbar />
    </div>
  );
};
export default Navbar;
