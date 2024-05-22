import React from "react";

import DesktopNavbar from "./DesktopNavbar";
import UserOptions from "./user-0ptions";

const Navbar = () => {
  return (
    <div className="inset-0 absolute h-[71px] w-full bg-[#302939] flex justify-between items-center px-8">
      <p className="font-bold text-3xl text-white">Knotify</p>
      <DesktopNavbar />
      <div className="flex md:hidden flex-row-reverse justify-end items-center h-full gap-6e">
        <UserOptions />
      </div>
    </div>
  );
};
export default Navbar;
