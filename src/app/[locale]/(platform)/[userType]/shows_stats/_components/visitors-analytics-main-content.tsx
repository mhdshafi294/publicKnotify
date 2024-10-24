import { getShowStatisticsForVisitorsAction } from "@/app/actions/statisticsActions";
import { getTranslations } from "next-intl/server";
import ViewsChartCard from "../../shows/[showId]/_components/views-chart-card";
import AnalyticsHeader from "../../shows/[showId]/analytics/_components/analytics-header";
import AnalyticsYoutube from "../../shows/[showId]/analytics/_components/analytics-youtube";
import DownloadsMapCard from "../../shows/[showId]/analytics/_components/downloads-map-card";
import HourlyViewsChartCard from "../../shows/[showId]/analytics/_components/hourly-views-chart-card";
import LastFiveFirstSevenDaysChartCard from "../../shows/[showId]/analytics/_components/last5-first7days-chart-card";
import PlatformsTableCard from "../../shows/[showId]/analytics/_components/platforms-table-card";
import TopCountriesTable from "../../shows/[showId]/analytics/_components/top-countries-table";
import TopEpisodesTable from "../../shows/[showId]/analytics/_components/top-episodes-table-card";

const VisitorsAnalyticsMainContent = async ({
  podcasterId,
  showId,
  userType,
}: {
  podcasterId: string;
  showId: string;
  userType: string;
}): Promise<JSX.Element> => {
  const t = await getTranslations("Index");

  // Fetch show general statistics
  const showStatistics = await getShowStatisticsForVisitorsAction({
    show_id: showId,
    type: userType,
    podcaster_id: podcasterId,
  });

  return (
    <main className="bg-background w-full flex-1 py-16 px-8 xl:px-16 flex flex-col gap-8">
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
          enabled={showStatistics?.enabled}
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
        <TopEpisodesTable top_episodes={showStatistics.top_episodes} />
        <PlatformsTableCard
          showId={showId}
          userType={userType}
          enabled={showStatistics?.enabled}
        />
      </div>

      {/* hourly views Chart */}
      <div className="w-full lg:h-[637px]">
        <HourlyViewsChartCard
          showId={showId}
          userType={userType}
          enabled={showStatistics?.enabled}
        />
      </div>

      <div className="w-full lg:h-[637px]">
        <DownloadsMapCard
          showId={showId}
          userType={userType}
          enabled={showStatistics?.enabled}
        />
      </div>

      <div className="w-full ">
        <TopCountriesTable showId={showId} userType={userType} />
      </div>

      {/* YouTube Channel Analytics */}
      <AnalyticsYoutube
        youtube_channel={showStatistics.youtube_channel}
        enabled={showStatistics?.enabled}
      />
    </main>
  );
};

export default VisitorsAnalyticsMainContent;
