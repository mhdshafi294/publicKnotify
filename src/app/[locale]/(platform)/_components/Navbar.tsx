import React from "react";

import DesktopNavbar from "./DesktopNavbar";

const Navbar = () => {
  return (
    <div className="inset-0 absolute h-[71px] w-full bg-[#302939] flex justify-between items-center px-8">
      <p className="font-bold text-3xl text-white">Knotify</p>
      <DesktopNavbar />
    </div>
  );
};
export default Navbar;
