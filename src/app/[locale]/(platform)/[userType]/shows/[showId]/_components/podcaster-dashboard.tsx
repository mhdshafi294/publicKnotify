import React from "react";
import DashboardMainContent from "./dashboard-main-content";
import DashboardSidebar from "./dashboard-sidebar";
import { getPlayListAction } from "@/app/actions/podcastActions";
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import { getServerSession } from "next-auth";
import { PlaylistResponse } from "@/types/podcast";
import { redirect } from "@/navigation";
import { getShowViewsStatisticsAction } from "@/app/actions/statisticsActions";
import { ShowViewsStatistics } from "@/types/statistics";

const PodcasterDashboard = async ({
  params,
  searchParams,
}: {
  params: { userType: string; showId: string };
  searchParams: { [key: string]: string | string[] | undefined };
}) => {
  const session = await getServerSession(authOptions);

  if (session?.user?.type === "podcaster") {
    const showData = await getPlayListAction({
      id: params.showId,
      type: session?.user?.type!,
    });

    return (
      <div className="flex-1 h-full flex flex-col xl:flex-row w-full">
        {/* Left Sidebar */}
        <DashboardSidebar
          imgSrc={
            showData?.playlist?.image
              ? showData?.playlist?.image
              : "/podcast-filler.webp"
          }
          tile={showData?.playlist?.name}
          description={showData?.playlist?.description}
          episodesCount={showData?.playlist?.podcasts?.length}
        />
        {/* Main Content */}
        <DashboardMainContent {...{ params, searchParams, showData }} />
      </div>
    );
  } else {
    redirect("/");
  }
};

export default PodcasterDashboard;
