import React from "react";
import ViewsChartCard from "../../_components/views-chart-card";
import MostViewsChart from "../../_components/most-views-chart";
import AnalyticsHeader from "./analytics-header";
import LastFiveFirstSevenDaysChartCard from "./last5-first7days-chart-card";
import LastFiveFirstSevenDaysChart from "./last5-first7days-chart";
import AnalyticsYoutube from "./analytics-youtube";
import {
  getShowStatisticsAction,
  getShowViewsStatisticsAction,
} from "@/app/actions/statisticsActions";
import { getTranslations } from "next-intl/server";

/**
 * The AnalyticsMainContent component is responsible for rendering the main content of the analytics page.
 *
 * It displays various statistics about a show, including views over time, performance of the latest episodes,
 * and YouTube channel analytics if applicable.
 *
 * @param {Object} props - Component props.
 * @param {Object} props.params - Route parameters containing user type and show ID.
 * @param {Object} props.searchParams - Query string parameters for filtering or additional actions.
 *
 * @returns {Promise<JSX.Element>} The rendered AnalyticsMainContent component.
 */
const AnalyticsMainContent = async ({
  params,
  searchParams,
}: {
  params: { userType: string; showId: string };
  searchParams: { [key: string]: string | string[] | undefined };
}): Promise<JSX.Element> => {
  const t = await getTranslations("Index");

  // Fetch show views statistics
  const showViews = await getShowViewsStatisticsAction({
    start_date: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
    end_date: new Date().toISOString(),
    show_id: params.showId,
    type: "podcaster",
  });

  // Fetch show general statistics
  const showStatistics = await getShowStatisticsAction({
    show_id: params.showId,
    type: "podcaster",
  });

  return (
    <main className="bg-background w-full flex-1 py-16 px-8 xl:px-16 flex flex-col gap-8">
      <header className="w-full space-y-2 mb-12">
        <h1 className="text-4xl font-bold">{t("analytics-overview")}</h1>
        <p className="opacity-75 w-1/3">
          {t(
            "the-audience-overview-has-the-at-a-glance-analytics-you-need-to-start-understanding-your-shows-performance"
          )}
          .
        </p>
      </header>
      {/* Overview Header */}
      <AnalyticsHeader showStatistics={showStatistics} />

      {/* All Time Views Chart */}
      <div className="w-full h-[637px]">
        <ViewsChartCard
          title={t("all_time_views")}
          value={showStatistics?.playlist_statistics?.total_views.toString()}
          params={params}
          chart={<MostViewsChart showViews={showViews} />}
        />
      </div>

      {/* Performance of Last Five Episodes in First Seven Days */}
      <div className="w-full h-[637px]">
        <LastFiveFirstSevenDaysChartCard
          params={params}
          five_latest_episodes={showStatistics.five_latest_episodes}
          chart={
            <LastFiveFirstSevenDaysChart
              five_latest_episodes={showStatistics.five_latest_episodes}
            />
          }
        />
      </div>
      {/* YouTube Channel Analytics */}
      <AnalyticsYoutube youtube_channel={showStatistics.youtube_channel} />
    </main>
  );
};

export default AnalyticsMainContent;
