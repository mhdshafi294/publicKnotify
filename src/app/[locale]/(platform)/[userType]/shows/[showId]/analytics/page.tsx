import React from "react";
import AnalyticsSidebar from "./_components/analytics-sidebar";
import DashboardAnalyticsSection from "../_components/dashboard-analytics-section";
import AnalyticsMainContent from "./_components/analytics-main-content";

const ShowAnalyticsPage = ({
  params,
  searchParams,
}: {
  params: { userType: string; showId: string };
  searchParams: { [key: string]: string | string[] | undefined };
}) => {
  return (
    <div className="flex flex-1 flex-col items-start justify-start gap-6 w-full">
      <div className="flex-1 h-full flex flex-col lg:flex-row w-full">
        <AnalyticsSidebar params={params} searchParams={searchParams} />
        <AnalyticsMainContent params={params} searchParams={searchParams} />
      </div>
    </div>
  );
};

export default ShowAnalyticsPage;
