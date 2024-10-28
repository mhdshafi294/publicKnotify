import { getShowStatisticsForVisitorsAction } from "@/app/actions/statisticsActions";
import { getTranslations } from "next-intl/server";
import { Fragment } from "react";
import AnalyticsHeader from "../../shows/[showId]/analytics/_components/analytics-header";
import AnalyticsYoutube from "../../shows/[showId]/analytics/_components/analytics-youtube";
import DownloadsMapCard from "../../shows/[showId]/analytics/_components/downloads-map-card";
import HourlyViewsChartCard from "../../shows/[showId]/analytics/_components/hourly-views-chart-card";
import PlatformsTableCard from "../../shows/[showId]/analytics/_components/platforms-table-card";
import TopCountriesTable from "../../shows/[showId]/analytics/_components/top-countries-table";
import TopEpisodesTable from "../../shows/[showId]/analytics/_components/top-episodes-table-card";
import MostPopularStatsCard from "./most-popular-stats-card";

/**
 * The VisitorsAnalyticsMainContent component is responsible for rendering the main content of the visitors analytics page.
 *
 * It displays key statistics about a show, including views over time, performance of the latest episodes,
 * and YouTube channel analytics if applicable.
 *
 * @param {Object} props - Component props.
 * @param {string} props.podcasterId - Podcaster ID.
 * @param {string} props.showId - Show ID.
 * @param {string} props.userType - User type.
 *
 * @returns {Promise<JSX.Element>} The rendered VisitorsAnalyticsMainContent component.
 */
const VisitorsAnalyticsMainContent = async ({
  podcasterId,
  showId,
  userType,
}: {
  podcasterId: string;
  showId?: string;
  userType: string;
}): Promise<JSX.Element> => {
  const t = await getTranslations("Index");

  let content: () => JSX.Element | undefined;

  if (showId) {
    const showStatistics = await getShowStatisticsForVisitorsAction({
      show_id: showId,
      type: userType,
      podcaster_id: podcasterId,
    });

    content = () => (
      <Fragment>
        {/* Overview Header */}
        {showStatistics?.playlist_statistics ? (
          <AnalyticsHeader
            showStatistics={showStatistics}
            userType={userType}
          />
        ) : null}

        {/*  Charts */}
        {showStatistics?.top_episodes || showStatistics?.platform ? (
          <div className="w-full flex flex-col lg:flex-row lg:justify-between gap-5 lg:h-[637px]">
            {showStatistics?.top_episodes ? (
              <TopEpisodesTable
                top_episodes={showStatistics?.top_episodes}
                userType={userType}
              />
            ) : null}
            {showStatistics?.platform ? (
              <PlatformsTableCard
                showId={showId}
                userType={userType}
                visitorsData={showStatistics?.platform}
              />
            ) : null}
          </div>
        ) : null}

        {showStatistics?.most_popular ? (
          <MostPopularStatsCard showStatistics={showStatistics?.most_popular} />
        ) : null}

        {/* hourly views Chart */}
        {showStatistics.time ? (
          <div className="w-full lg:h-[637px]">
            <HourlyViewsChartCard
              showId={showId}
              userType={userType}
              visitorData={showStatistics.time}
            />
          </div>
        ) : null}

        {showStatistics.country ? (
          <Fragment>
            <div className="w-full lg:h-[637px]">
              <DownloadsMapCard
                showId={showId}
                userType={userType}
                visitorData={showStatistics.country}
              />
            </div>
            <div className="w-full ">
              <TopCountriesTable
                showId={showId}
                userType={userType}
                visitorData={showStatistics.country}
              />
            </div>
          </Fragment>
        ) : null}

        {/* YouTube Channel Analytics */}
        {showStatistics?.youtube_channel ? (
          <AnalyticsYoutube
            youtube_channel={showStatistics?.youtube_channel}
            userType={userType}
          />
        ) : null}
      </Fragment>
    );
  } else {
    content = () => (
      <div className="w-full flex flex-1 justify-center items-center  p-5">
        <h2 className="text-muted-foreground italic text-2xl">
          {t("no-show-created-by-this-podcaster-yet")}
        </h2>
      </div>
    );
  }
  // Fetch show general statistics

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
      {content()}
    </main>
  );
};

export default VisitorsAnalyticsMainContent;
