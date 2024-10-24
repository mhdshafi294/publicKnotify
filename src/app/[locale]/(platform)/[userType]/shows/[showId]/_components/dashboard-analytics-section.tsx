import {
  getShowMostPopularStatisticsAction,
  getShowStatisticsAction,
} from "@/app/actions/statisticsActions";
import { Separator } from "@/components/ui/separator";
import { formatTo12Hour } from "@/lib/utils";
import { getTranslations } from "next-intl/server";
import DashboardCardContainer from "../../_components/dashboard-card-container";
import AnalyticsEnableSwitch from "../analytics/_components/analytics-enable-switch";
import ViewsChartCard from "./views-chart-card";

type DashboardAnalyticsSectionProps = {
  params: { userType: string; showId: string };
};

/**
 * The DashboardAnalyticsSection component displays a section with key analytics metrics,
 * including views, top countries, and popular times for a show.
 *
 * @param {DashboardAnalyticsSectionProps} props - The props for the component.
 * @param {Object} props.params - Route parameters containing the user type and show ID.
 *
 * @returns {Promise<JSX.Element>} The rendered DashboardAnalyticsSection component.
 */
const DashboardAnalyticsSection = async ({
  params,
}: DashboardAnalyticsSectionProps): Promise<JSX.Element> => {
  const t = await getTranslations("Index");

  const showMostPopular = await getShowMostPopularStatisticsAction({
    show_id: params.showId,
    type: "podcaster",
  });

  // Fetch general show statistics
  const showStatistics = await getShowStatisticsAction({
    show_id: params.showId,
    type: "podcaster",
  });

  return (
    <section className="flex flex-col lg:flex-row gap-8 lg:h-[358px] 2xl:h-[583px]">
      {/* Views Chart Card */}
      <ViewsChartCard
        title={t("views-last-7-days")}
        value={showStatistics?.playlist_statistics?.last_7_days_views.toString()}
        showId={params.showId}
        userType="podcaster"
        link={{ name: t("view-analytics"), href: `${params.showId}/analytics` }}
        // chart={<MostViewsChart showViews={showViews} />}
        enabled={showStatistics?.enabled}
      />

      {/* Summary Card with Key Metrics */}
      <DashboardCardContainer className="lg:w-56 lg:h-full flex flex-col sm:flex-row lg:flex-col gap-3">
        <AnalyticsEnableSwitch
          className="ms-auto self-end"
          enabled={showStatistics?.enabled}
          statisticsType="most_popular"
        />
        <div className="w-full flex flex-col gap-1">
          <h2 className="text-sm font-bold opacity-70 dark:opacity-50">
            {t("all_time_views")}
          </h2>
          <p className="font-bold text-xl">
            {showStatistics?.playlist_statistics?.total_views}
          </p>
        </div>
        <Separator className="block sm:hidden lg:block w-full bg-border-secondary" />
        <div className="w-full flex flex-col gap-1">
          <h2 className="text-sm font-bold opacity-70 dark:opacity-50">
            {t("top-country")}
          </h2>
          <p className="font-bold text-xl capitalize">
            {showMostPopular?.top_country
              ? showMostPopular?.top_country?.country
              : "N/A"}
          </p>
        </div>
        <Separator className="block sm:hidden lg:block w-full bg-border-secondary" />
        <div className="w-full flex flex-col gap-1">
          <h2 className="text-sm font-bold opacity-70 dark:opacity-50">
            {t("most-popular-time")}
          </h2>
          <p className="font-bold text-xl">
            {showMostPopular?.most_popular_time
              ? formatTo12Hour(showMostPopular?.most_popular_time)
              : "N/A"}
          </p>
        </div>
        <Separator className="block sm:hidden lg:block w-full bg-border-secondary" />
        <div className="w-full flex flex-col gap-1">
          <h2 className="text-sm font-bold opacity-70 dark:opacity-50">
            {t("most-popular-day")}
          </h2>
          <p className="font-bold text-xl">
            {showMostPopular?.most_popular_day
              ? showMostPopular?.most_popular_day
              : "N/A"}
          </p>
        </div>
      </DashboardCardContainer>
    </section>
  );
};

export default DashboardAnalyticsSection;
