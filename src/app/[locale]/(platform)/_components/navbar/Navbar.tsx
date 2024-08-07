"use client";

import MaxWidthContainer from "@/components/ui/MaxWidthContainer";
import { Link } from "@/navigation";
import DesktopNavbar from "./DesktopNavbar";
import MobileNavbar from "./MobileNavbar";
import { useTranslations } from "next-intl";

const Navbar = () => {
  const t = useTranslations("Index");

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
