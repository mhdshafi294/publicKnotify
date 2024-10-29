import { Fragment } from "react";

// Local actions and components
import { getShowStatisticsForVisitorsAction } from "@/app/actions/statisticsActions";
import AnalyticsHeader from "../../shows/[showId]/analytics/_components/analytics-header";
import AnalyticsYoutube from "../../shows/[showId]/analytics/_components/analytics-youtube";
import DownloadsMapCard from "../../shows/[showId]/analytics/_components/downloads-map-card";
import HourlyViewsChartCard from "../../shows/[showId]/analytics/_components/hourly-views-chart-card";
import PlatformsTableCard from "../../shows/[showId]/analytics/_components/platforms-table-card";
import TopCountriesTable from "../../shows/[showId]/analytics/_components/top-countries-table";
import TopEpisodesTable from "../../shows/[showId]/analytics/_components/top-episodes-table-card";
import MostPopularStatsCard from "./most-popular-stats-card";

// External libraries
import { getTranslations } from "next-intl/server";

/**
 * VisitorsAnalyticsMainContent Component
 *
 * Renders the main content for the visitors analytics page, displaying detailed analytics
 * about a show's audience, platform performance, hourly views, and more.
 *
 * @async
 * @param {Object} props - Component properties.
 * @param {string} props.podcasterId - The ID of the podcaster.
 * @param {string} props.showId - The ID of the show.
 * @param {string} props.userType - The type of the user.
 * @returns {Promise<JSX.Element>} The rendered VisitorsAnalyticsMainContent component.
 *
 * @example
 * <VisitorsAnalyticsMainContent podcasterId="123" showId="456" userType="company" />
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

  // Fetch show statistics only if showId is provided
  const showStatistics = showId
    ? await getShowStatisticsForVisitorsAction({
        show_id: showId,
        type: userType,
        podcaster_id: podcasterId,
      })
    : null;

  // Render content based on showStatistics
  const content = () => {
    if (!showId) {
      return (
        <div className="w-full flex flex-1 justify-center items-center p-5">
          <h2 className="text-muted-foreground italic text-2xl">
            {t("no-show-created-by-this-podcaster-yet")}
          </h2>
        </div>
      );
    }

    return (
      <Fragment>
        {/* Overview Header */}
        {showStatistics?.playlist_statistics && (
          <AnalyticsHeader
            showStatistics={showStatistics}
            userType={userType}
          />
        )}

        {/* Top Episodes and Platform Distribution */}
        {(showStatistics?.top_episodes || showStatistics?.platform) && (
          <div className="w-full flex flex-col lg:flex-row lg:justify-between gap-5 lg:h-[637px]">
            {showStatistics?.top_episodes && (
              <TopEpisodesTable
                top_episodes={showStatistics?.top_episodes}
                userType={userType}
              />
            )}
            {showStatistics?.platform && (
              <PlatformsTableCard
                showId={showId}
                userType={userType}
                visitorsData={showStatistics?.platform}
              />
            )}
          </div>
        )}

        {/* Most Popular Stats */}
        {showStatistics?.most_popular && (
          <MostPopularStatsCard showStatistics={showStatistics?.most_popular} />
        )}

        {/* Hourly Views Chart */}
        {showStatistics?.time && (
          <div className="w-full lg:h-[637px]">
            <HourlyViewsChartCard
              showId={showId}
              userType={userType}
              visitorData={showStatistics?.time}
            />
          </div>
        )}

        {/* Country-Based Analytics */}
        {showStatistics?.country && (
          <Fragment>
            <div className="w-full lg:h-[637px]">
              <DownloadsMapCard
                showId={showId}
                userType={userType}
                visitorData={showStatistics?.country}
              />
            </div>
            <div className="w-full">
              <TopCountriesTable
                showId={showId}
                userType={userType}
                visitorData={showStatistics?.country}
              />
            </div>
          </Fragment>
        )}

        {/* YouTube Channel Analytics */}
        {showStatistics?.youtube_channel && (
          <AnalyticsYoutube
            youtube_channel={showStatistics?.youtube_channel}
            userType={userType}
          />
        )}
      </Fragment>
    );
  };

  return (
    <main className="bg-background w-full flex-1 py-16 px-8 xl:px-16 flex flex-col gap-8">
      {/* Page Header */}
      <header className="w-full space-y-2 mb-12">
        <h1 className="text-4xl font-bold">{t("analytics-overview")}</h1>
        <p className="opacity-75 lg:w-1/3">
          {t(
            "the-audience-overview-has-the-at-a-glance-analytics-you-need-to-start-understanding-your-shows-performance"
          )}
          .
        </p>
      </header>

      {/* Render main analytics content */}
      {content()}
    </main>
  );
};

export default VisitorsAnalyticsMainContent;
