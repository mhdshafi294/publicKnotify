import React from "react";
import DashboardMainContent from "./dashboard-main-content";
import DashboardSidebar from "./dashboard-sidebar";

const PodcasterDashboard = ({
  params,
  searchParams,
}: {
  params: { userType: string; showId: string };
  searchParams: { [key: string]: string | string[] | undefined };
}) => {
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
