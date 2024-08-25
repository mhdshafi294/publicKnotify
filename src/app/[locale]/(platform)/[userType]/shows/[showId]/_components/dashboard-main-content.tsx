import React from "react";

import DashboardAnalyticsSection from "./dashboard-analytics-section";
import DashboardHeaderSection from "./dashboard-header-section";
import LastEpisodeCard from "./last-episode-card";
import { PlaylistResponse } from "@/types/podcast";
import { ShowViewsStatistics } from "@/types/statistics";

const DashboardMainContent = ({
  params,
  searchParams,
  showData,
}: {
  params: { userType: string; showId: string };
  searchParams: { [key: string]: string | string[] | undefined };
  showData: PlaylistResponse;
}) => {
  return (
    <main className="bg-background w-full flex-1 py-16 px-8 xl:px-16 flex flex-col gap-8">
      <DashboardHeaderSection params={params} showData={showData} />
      <DashboardAnalyticsSection params={params} />
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
