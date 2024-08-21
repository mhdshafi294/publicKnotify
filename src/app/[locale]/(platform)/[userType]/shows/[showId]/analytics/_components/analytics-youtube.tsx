import React from "react";
import DashboardCardContainer from "../../../_components/dashboard-card-container";
import YoutubeIconWhite from "@/components/icons/youtube-icon-white";

const AnalyticsYoutube = () => {
  return (
    <DashboardCardContainer className="w-full flex flex-col gap-5">
      <div className="flex flex-col gap-1">
        <h3 className="flex items-center gap-2 text-base font-bold uppercase ">
          <YoutubeIconWhite />
          YouTube Analytics
        </h3>
        <p className="text-xs opacity-70">
          An overview of your YouTube chanel performance regarding this show.
        </p>
      </div>
      <div className="w-full flex gap-3">
        <div className="w-full flex flex-col gap-1">
          <h2 className="text-base font-bold opacity-50">All-Time Views</h2>
          <p className="font-bold text-xl">500</p>
        </div>
        <div className="w-full flex flex-col gap-1">
          <h2 className="text-base font-bold opacity-50">Downloads Today</h2>
          <p className="font-bold text-xl capitalize">25</p>
        </div>
        <div className="w-full flex flex-col gap-1">
          <h2 className="text-base font-bold opacity-50">
            Last 7 Days (Including Today)
          </h2>
          <p className="font-bold text-xl">100</p>
        </div>
        <div className="w-full flex flex-col gap-1">
          <h2 className="text-base font-bold opacity-50">Previous 7 Days</h2>
          <p className="font-bold text-xl">92</p>
        </div>
        <div className="w-full flex flex-col gap-1">
          <h2 className="text-base font-bold opacity-50">
            Unique Listeners Last 7 Days
          </h2>
          <p className="font-bold text-xl">11</p>
        </div>
      </div>
    </DashboardCardContainer>
  );
};

export default AnalyticsYoutube;