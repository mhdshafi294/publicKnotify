import React from "react";
import DashboardAnalyticsSection from "../../_components/dashboard-analytics-section";
import ViewsChartCard from "../../_components/views-chart-card";
import MostViewsChart from "../../_components/most-views-chart";
import DashboardCardContainer from "../../../_components/dashboard-card-container";
import AnalyticsHeader from "./analytics-header";
import LastFiveFirstSevenDaysChartCard from "./last5-first7days-chart-card";
import LastFiveFirstSevenDaysChart from "./last5-first7days-chart";

const AnalyticsMainContent = ({
  params,
  searchParams,
}: {
  params: { userType: string; showId: string };
  searchParams: { [key: string]: string | string[] | undefined };
}) => {
  return (
    <main className="bg-background w-full flex-1 py-16 px-8 xl:px-16 flex flex-col gap-8">
      <header className="w-full space-y-2 mb-12">
        <h1 className="text-4xl font-bold">Analytics Overview</h1>
        <p className="opacity-75 w-1/3">
          The Audience Overview has the at-a-glance analytics you need to start
          understanding your show’s performance.
        </p>
      </header>
      <AnalyticsHeader />
      <div className="w-full h-[637px]">
        <ViewsChartCard
          title="Views over time"
          value="2746"
          params={params}
          chart={<MostViewsChart />}
        />
      </div>
      <div className="w-full h-[637px]">
        <LastFiveFirstSevenDaysChartCard
          params={params}
          chart={<LastFiveFirstSevenDaysChart />}
        />
      </div>
    </main>
  );
};

export default AnalyticsMainContent;
