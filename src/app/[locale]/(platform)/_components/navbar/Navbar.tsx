import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import MaxWidthContainer from "@/components/ui/MaxWidthContainer";
import { Link } from "@/navigation";
import { getServerSession } from "next-auth";
import Image from "next/image";
import DesktopNavbar from "./DesktopNavbar";
import MobileNavbar from "./MobileNavbar";
import PodcasterShow from "./podcaster-show";

const Navbar = async () => {
  const session = await getServerSession(authOptions);
  return (
    <div className="sticky top-0 left-0 h-[71px] w-full z-50 bg-secondary">
      <MaxWidthContainer className="h-full flex justify-between items-center">
        <div className="flex justify-start items-center gap-2">
          <Link href="/" className="font-bold text-3xl text-white">
            <Image
              src="/KnotifyLogo.svg"
              alt="Knotify logo"
              width={73}
              height={21}
            />
          </Link>
          {session && session.user.type === "podcaster" ? (
            <PodcasterShow />
          ) : null}
        </div>
        <DesktopNavbar />
        <MobileNavbar />
      </MaxWidthContainer>
    </div>
  );
};
export default Navbar;
