import Navbar from "@/app/[locale]/(platform)/_components/navbar/Navbar";
import { getProfileAction } from "@/app/actions/profileActions";
import { authOptions } from "@/app/api/auth/[...nextauth]/auth-options";
import { redirect } from "@/navigation";
import { getServerSession } from "next-auth";
import React from "react";
import Player from "./_components/player/player";

type PlatformLayoutProps = {
  children: React.ReactNode;
};

/**
 * PlatformLayout Component
 * This layout component wraps around the platform-specific pages,
 * providing a consistent structure with a navbar at the top and
 * a player at the bottom.
 *
 * @param {React.ReactNode} children - The content to be rendered between the Navbar and Player components.
 */
const PlatformLayout: React.FC<PlatformLayoutProps> = async ({ children }) => {
  // Fetch the current session using NextAuth's getServerSession
  const session = await getServerSession(authOptions);

  if (!session || session.expires) {
    redirect("/sign-in");
  }

  try {
    const profileResponse = await getProfileAction({
      type: session?.user?.type!,
    });

    // console.log(profileResponse.user, "<<<<profileResponse.message");

    if (
      profileResponse.message === "Unauthenticated." ||
      !profileResponse.user
    ) {
      redirect("/sign-in");
    }
  } catch (error) {
    console.log(error);
    redirect("/sign-in");
  }

  // If a session exists, redirect the user to their respective type page
  return (
    <div className="h-full min-h-[100dvh] w-full max-w-[100vw] flex flex-col justify-between ">
      {/* Navbar component at the top */}
      <Navbar />

      {/* Main content passed as children */}
      {children}

      {/* Player component at the bottom */}
      <Player />
    </div>
  );
};

export default PlatformLayout;
