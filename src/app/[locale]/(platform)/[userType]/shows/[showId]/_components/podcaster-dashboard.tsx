import React from "react";
import DashboardMainContent from "./dashboard-main-content";
import DashboardSidebar from "./dashboard-sidebar";
import { getPlayListAction } from "@/app/actions/podcastActions";
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import { getServerSession } from "next-auth";
import { PlaylistResponse } from "@/types/podcast";
import { redirect } from "@/navigation";

const PodcasterDashboard = async ({
  params,
  searchParams,
}: {
  params: { userType: string; showId: string };
  searchParams: { [key: string]: string | string[] | undefined };
}) => {
  let ShowData: PlaylistResponse;

  const session = await getServerSession(authOptions);

  if (session?.user?.type === "podcaster") {
    ShowData = await getPlayListAction({
      id: params.showId,
      type: session?.user?.type!,
    });
  } else {
    redirect("/");
  }

  return (
    <div className="flex-1 h-full flex flex-col xl:flex-row w-full">
      {/* Left Sidebar */}
      <DashboardSidebar
        imgSrc="/podcast-filler.webp"
        tile="First Show"
        description="lorem ipsum dolor sit amet consectetur adipiscing elit dolor sit amet consectetur adipiscing elit"
        episodesCount={10}
      />
      {/* Main Content */}
      <DashboardMainContent {...{ params, searchParams }} />
    </div>
  );
};

export default PodcasterDashboard;
