import { getPlayListAction } from "@/app/actions/podcastActions";
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import { redirect } from "@/navigation";
import { PlaylistResponse } from "@/types/podcast";
import { getServerSession } from "next-auth";
import React from "react";
import DashboardMainContent from "./dashboard-main-content";
import DashboardSidebar from "./dashboard-sidebar";

type PodcasterDashboardProps = {
  params: { userType: string; showId: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

/**
 * The PodcasterDashboard component fetches and displays the podcaster's dashboard.
 * It shows the sidebar with show details and the main content with analytics and episodes.
 *
 * @param {PodcasterDashboardProps} props - The props for the component.
 * @param {Object} props.params - Route parameters, including user type and show ID.
 * @param {Object} props.searchParams - Query parameters passed in the URL.
 *
 * @returns {Promise<JSX.Element>} The rendered PodcasterDashboard component.
 */
const PodcasterDashboard: React.FC<PodcasterDashboardProps> = async ({
  params,
  searchParams,
}): Promise<JSX.Element | null> => {
  const session = await getServerSession(authOptions);

  if (session?.user?.type === "podcaster") {
    // Fetch playlist data for the podcaster
    const showData: PlaylistResponse = await getPlayListAction({
      id: params.showId,
      type: session.user.type,
    });

    return (
      <div className="flex-1 h-full flex flex-col xl:flex-row w-full">
        {/* Left Sidebar */}
        <DashboardSidebar
          imgSrc={
            showData?.playlist?.image
              ? showData.playlist.image
              : "/podcast-filler.webp"
          }
          title={showData?.playlist?.name}
          description={showData?.playlist?.description}
          episodesCount={showData?.playlist?.podcasts?.length || 0}
        />

        {/* Main Content */}
        <DashboardMainContent {...{ params, searchParams, showData }} />
      </div>
    );
  } else {
    // Redirect if the user is not a podcaster
    redirect("/");
    return null;
  }
};

export default PodcasterDashboard;
