import React from "react";

import DashboardAnalyticsSection from "./dashboard-analytics-section";
import DashboardHeaderSection from "./dashboard-header-section";
import LastEpisodeCard from "./last-episode-card";

const DashboardMainContent = ({
  params,
  searchParams,
}: {
  params: { userType: string; showId: string };
  searchParams: { [key: string]: string | string[] | undefined };
}) => {
  return (
    <main className="bg-background w-full flex-1 py-16 px-8 xl:px-16 flex flex-col gap-8">
      <DashboardHeaderSection />
      <DashboardAnalyticsSection params={params} />
      <LastEpisodeCard
        imgSrc="/podcast-filler.webp"
        title="Episode Title"
        showId={"1"}
        episodeId={"1"}
        publishDate={"2024-08-11"}
      />
    </main>
  );
};

export default DashboardMainContent;
