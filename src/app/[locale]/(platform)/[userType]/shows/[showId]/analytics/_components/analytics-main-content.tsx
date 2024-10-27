import { getShowStatisticsAction } from "@/app/actions/statisticsActions";
import { getTranslations } from "next-intl/server";
import ViewsChartCard from "../../_components/views-chart-card";
import AnalyticsHeader from "./analytics-header";
import AnalyticsYoutube from "./analytics-youtube";
import DownloadsMapCard from "./downloads-map-card";
import HourlyViewsChartCard from "./hourly-views-chart-card";
import LastFiveFirstSevenDaysChartCard from "./last5-first7days-chart-card";
import PlatformsTableCard from "./platforms-table-card";
import TopCountriesTable from "./top-countries-table";
import TopEpisodesTable from "./top-episodes-table-card";
import { StatsEnabledProvider } from "@/providers/stats-enabled-provider";

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
  showId,
  userType,
}: {
  showId: string;
  userType: string;
}): Promise<JSX.Element> => {
  const t = await getTranslations("Index");

  // Fetch show general statistics
  const showStatistics = await getShowStatisticsAction({
    show_id: showId,
    type: userType,
  });

  return (
    <main className="bg-background w-full flex-1 py-16 px-8 xl:px-16 flex flex-col gap-8">
      <StatsEnabledProvider enabled={showStatistics?.enabled}>
        <header className="w-full space-y-2 mb-12">
          <h1 className="text-4xl font-bold">{t("analytics-overview")}</h1>
          <p className="opacity-75 lg:w-1/3">
            {t(
              "the-audience-overview-has-the-at-a-glance-analytics-you-need-to-start-understanding-your-shows-performance"
            )}
            .
          </p>
        </header>
        {/* Overview Header */}
        <AnalyticsHeader showStatistics={showStatistics} />

        {/* All Time Views Chart */}
        <div className="w-full lg:h-[637px]">
          <ViewsChartCard
            title={t("all_time_views")}
            value={showStatistics?.playlist_statistics?.total_views.toString()}
            showId={showId}
            userType={userType}
          />
        </div>

        {/* Performance of Last Five Episodes in First Seven Days */}
        <div className="w-full h-fit">
          <LastFiveFirstSevenDaysChartCard
            five_latest_episodes={showStatistics.five_latest_episodes}
          />
        </div>

        {/*  Charts */}
        <div className="w-full flex flex-col lg:flex-row lg:justify-between gap-5 lg:h-[637px]">
          <TopEpisodesTable
            top_episodes={showStatistics.top_episodes}
            userType={userType}
          />
          <PlatformsTableCard showId={showId} userType={userType} />
        </div>

        {/* hourly views Chart */}
        <div className="w-full lg:h-[637px]">
          <HourlyViewsChartCard showId={showId} userType={userType} />
        </div>

        <div className="w-full lg:h-[637px]">
          <DownloadsMapCard showId={showId} userType={userType} />
        </div>

        <div className="w-full ">
          <TopCountriesTable showId={showId} userType={userType} />
        </div>

        {/* YouTube Channel Analytics */}
        <AnalyticsYoutube
          youtube_channel={showStatistics.youtube_channel}
          userType={userType}
        />
      </StatsEnabledProvider>
    </main>
  );
};

export default AnalyticsMainContent;
