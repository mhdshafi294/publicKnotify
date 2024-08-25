import React from "react";
import DashboardCardContainer from "../../_components/dashboard-card-container";
import MostViewsChart from "./most-views-chart";
import { Separator } from "@/components/ui/separator";
import ViewsChartCard from "./views-chart-card";
import {
  getShowStatisticsAction,
  getShowViewsStatisticsAction,
} from "@/app/actions/statisticsActions";
import { getTranslations } from "next-intl/server";

const DashboardAnalyticsSection = async ({
  params,
}: {
  params: { userType: string; showId: string };
}) => {
  const t = await getTranslations("Index");

  const showViews = await getShowViewsStatisticsAction({
    start_date: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
    end_date: new Date().toISOString(),
    show_id: params.showId,
    type: "podcaster",
  });

  const showStatistics = await getShowStatisticsAction({
    // start_date: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
    // end_date: new Date().toISOString(),
    show_id: params.showId,
    type: "podcaster",
  });

  return (
    <section className="flex flex-col lg:flex-row gap-8 lg:h-[358px] 2xl:h-[583px]">
      <ViewsChartCard
        title="Views last 7 days"
        value={showStatistics?.playlist_statistics?.last_7_days_views.toString()}
        params={params}
        link={{ name: t("view-analytics"), href: `${params.showId}/analytics` }}
        chart={<MostViewsChart showViews={showViews} />}
      />
      <DashboardCardContainer className="lg:w-56 lg:h-full flex lg:flex-col gap-3">
        <div className="w-full flex flex-col gap-1">
          <h2 className="text-sm font-bold opacity-50">
            {t("all_time_views")}
          </h2>
          <p className="font-bold text-xl">
            {showStatistics?.playlist_statistics?.total_views}
          </p>
        </div>
        <Separator className="w-full bg-border-secondary" />
        <div className="w-full flex flex-col gap-1">
          <h2 className="text-sm font-bold opacity-50">{t("top-country")}</h2>
          <p className="font-bold text-xl capitalize">netherlands</p>
        </div>
        <Separator className="w-full bg-border-secondary" />
        <div className="w-full flex flex-col gap-1">
          <h2 className="text-sm font-bold opacity-50">
            {t("most-popular-time")}
          </h2>
          <p className="font-bold text-xl">11am - 12pm</p>
        </div>
        <Separator className="w-full bg-border-secondary" />
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
