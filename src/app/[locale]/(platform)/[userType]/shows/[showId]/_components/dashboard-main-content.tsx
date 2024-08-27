import React from "react";
import DashboardAnalyticsSection from "./dashboard-analytics-section";
import DashboardHeaderSection from "./dashboard-header-section";
import LastEpisodeCard from "./last-episode-card";
import { PlaylistResponse } from "@/types/podcast";

type DashboardMainContentProps = {
  params: { userType: string; showId: string };
  searchParams: { [key: string]: string | string[] | undefined };
  showData: PlaylistResponse;
};

/**
 * The DashboardMainContent component renders the main content for the dashboard, including
 * header sections, analytics, and the last episode card.
 *
 * @param {DashboardMainContentProps} props - The props for the component.
 * @param {Object} props.params - Route parameters, including user type and show ID.
 * @param {Object} props.searchParams - Query parameters passed in the URL.
 * @param {PlaylistResponse} props.showData - Data related to the current show, including episodes and playlists.
 *
 * @returns {JSX.Element} The rendered DashboardMainContent component.
 */
const DashboardMainContent: React.FC<DashboardMainContentProps> = ({
  params,
  searchParams,
  showData,
}) => {
  return (
    <main className="bg-background w-full flex-1 py-16 px-8 xl:px-16 flex flex-col gap-8">
      {/* Header Section */}
      <DashboardHeaderSection params={params} showData={showData} />

      {/* Analytics Section */}
      <DashboardAnalyticsSection params={params} />

      {/* Last Episode Card */}
      {showData.playlist?.podcasts.length > 0 ? (
        <LastEpisodeCard
          imgSrc="/podcast-filler.webp"
          title={showData.playlist.podcasts[0].name}
          showId={params.showId}
          episodeId={showData.playlist.podcasts[0].id.toString()}
          publishDate={showData.playlist.podcasts[0].publishing_date}
        />
      ) : null}
    </main>
  );
};

export default DashboardMainContent;
