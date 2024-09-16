import React from "react";
import DashboardCardContainer from "../../_components/dashboard-card-container";
import MostViewsChart from "./most-views-chart";
import { Separator } from "@/components/ui/separator";
import ViewsChartCard from "./views-chart-card";
import {
  getShowMostPopularStatisticsAction,
  getShowStatisticsAction,
  getShowViewsStatisticsAction,
} from "@/app/actions/statisticsActions";
import { getTranslations } from "next-intl/server";

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

  // Fetch show views statistics for the last 7 days
  const showViews = await getShowViewsStatisticsAction({
    start_date: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
    end_date: new Date().toISOString(),
    show_id: params.showId,
    type: "podcaster",
  });

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
        params={params}
        link={{ name: t("view-analytics"), href: `${params.showId}/analytics` }}
        chart={<MostViewsChart showViews={showViews} />}
      />

      {/* Summary Card with Key Metrics */}
      <DashboardCardContainer className="lg:w-56 lg:h-full flex flex-col sm:flex-row lg:flex-col gap-3">
        <div className="w-full flex flex-col gap-1">
          <h2 className="text-sm font-bold opacity-50">
            {t("all_time_views")}
          </h2>
          <p className="font-bold text-xl">
            {showStatistics?.playlist_statistics?.total_views}
          </p>
        </div>
        <Separator className="block sm:hidden lg:block w-full bg-border-secondary" />
        <div className="w-full flex flex-col gap-1">
          <h2 className="text-sm font-bold opacity-50">{t("top-country")}</h2>
          <p className="font-bold text-xl capitalize">Netherlands</p>
        </div>
        <Separator className="block sm:hidden lg:block w-full bg-border-secondary" />
        <div className="w-full flex flex-col gap-1">
          <h2 className="text-sm font-bold opacity-50">
            {t("most-popular-time")}
          </h2>
          <p className="font-bold text-xl">11am - 12pm</p>
        </div>
        <Separator className="block sm:hidden lg:block w-full bg-border-secondary" />
        <div className="w-full flex flex-col gap-1">
          <h2 className="text-sm font-bold opacity-50">
            {t("most-popular-day")}
          </h2>
          <p className="font-bold text-xl">Sunday</p>
        </div>
      </DashboardCardContainer>
    </section>
  );
};

export default DashboardAnalyticsSection;
