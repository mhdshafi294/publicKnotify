import { getServerSession } from "next-auth";
import Image from "next/image";

import { getPlayListsAction } from "@/app/actions/podcastActions";
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import MaxWidthContainer from "@/components/ui/MaxWidthContainer";
import { Link } from "@/navigation";
import { PlaylistsResponse } from "@/types/podcast";
import SelfStoriesDialogsContainer from "../../[userType]/stories/_components/self-stories-dialogs-container";
import DesktopNavbar from "./DesktopNavbar";
import MobileNavbar from "./MobileNavbar";
import PodcasterShow from "./podcaster-show";

/**
 * The Navbar component is responsible for rendering the top navigation bar for the application.
 *
 * It includes both the desktop and mobile versions of the navbar and conditionally renders
 * podcaster-specific content based on the user's session.
 *
 * @returns {Promise<JSX.Element>} The rendered Navbar component.
 */
const Navbar = async (): Promise<JSX.Element> => {
  const session = await getServerSession(authOptions);
  let playlistData: PlaylistsResponse | undefined;

  // Fetch playlists if the user is a podcaster
  if (session && session.user.type === "podcaster") {
    playlistData = await getPlayListsAction({ type: "podcaster" });
    // console.log(playlistData.message, "<<<<<<<<playlistData.message");
    // console.log(
    //   playlistData.message === "Unauthenticated.",
    //   "<<<<<<<<playlistData.message trueee"
    // );
    // if (playlistData.message === "Unauthenticated.") {
    //   redirect("/sign-in");
    // }
  }

  return (
    <div className="sticky top-0 left-0 h-[71px] w-full z-50 bg-accent dark:bg-secondary">
      <MaxWidthContainer className="h-full flex justify-between items-center">
        <div className="flex justify-start items-center gap-2">
          {/* Logo and Home Link */}
          <Link href="/" className="font-bold text-3xl text-white">
            <Image
              src="/KnotifyLogo.svg"
              alt="Knotify logo"
              width={94.9}
              height={27.3}
            />
          </Link>
          {/* Podcaster-specific content */}
          {session && session.user.type === "podcaster" ? (
            <PodcasterShow playlists={playlistData?.playlists!} />
          ) : null}
        </div>
        {/* Desktop Navbar */}
        <DesktopNavbar playlists={playlistData?.playlists!} />
        {/* Mobile Navbar */}
        <MobileNavbar playlists={playlistData?.playlists!} />
        {/* Story Upload Dialogs Form Container */}
        {session && session.user.type === "podcaster" ? (
          <SelfStoriesDialogsContainer />
        ) : null}
      </MaxWidthContainer>
    </div>
  );
};

export default Navbar;
