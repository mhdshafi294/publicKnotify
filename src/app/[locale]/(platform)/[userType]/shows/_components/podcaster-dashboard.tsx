import React from "react";
import DashboardMediumCard from "./dashboard-medium-card";
import DashboardMainContent from "./dashboard-main-content";
import DashboardSidebar from "./dashboard-sidebar";

const PodcasterDashboard = () => {
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
      <DashboardMainContent />
    </div>
  );
};

export default PodcasterDashboard;
