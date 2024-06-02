"use client";

import { useSession } from "next-auth/react";
import UserOptions from "./user-0ptions";

const MobileNavbar = () => {
  const { data: session, status } = useSession();

  return (
    <div className="flex md:hidden flex-row-reverse justify-end items-center h-full gap-6">
      <UserOptions />
    </div>
  );
};

export default MobileNavbar;
