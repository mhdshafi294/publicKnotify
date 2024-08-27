import React from "react";
import DashboardCardContainer from "../../../_components/dashboard-card-container";
import { ShowStatistics, ShowViewsStatistics } from "@/types/statistics";
import { useTranslations } from "next-intl";

const AnalyticsHeader = ({
  showStatistics,
}: {
  showStatistics: ShowStatistics;
}) => {
  const t = useTranslations("Index");
  return (
    <DashboardCardContainer className="w-full flex gap-3">
      <div className="w-full flex flex-col gap-1 justify-between">
        <h2 className="text-base font-bold opacity-50">
          {t("all_time_views")}
        </h2>
        <p className="font-bold text-xl">
          {showStatistics?.playlist_statistics?.total_views}
        </p>
      </div>
      <div className="w-full flex flex-col gap-1 justify-between">
        <h2 className="text-base font-bold opacity-50">
          {t("views-today")}
        </h2>
        <p className="font-bold text-xl capitalize">
          {showStatistics?.playlist_statistics?.today_views}
        </p>
      </div>
      <div className="w-full flex flex-col gap-1 justify-between">
        <h2 className="text-base font-bold opacity-50">
          Last 7 Days (Including Today)
        </h2>
        <p className="font-bold text-xl">
          {showStatistics?.playlist_statistics?.last_7_days_views}
        </p>
      </div>
      <div className="w-full flex flex-col gap-1 justify-between">
        <h2 className="text-base font-bold opacity-50">Previous 7 Days</h2>
        <p className="font-bold text-xl">
          {showStatistics?.playlist_statistics?.previous_7_days_views}
        </p>
      </div>
      <div className="w-full flex flex-col gap-1 justify-between">
        <h2 className="text-base font-bold opacity-50">
          Unique Listeners Last 7 Days
        </h2>
        <p className="font-bold text-xl">
          {showStatistics?.playlist_statistics?.unique_listeners_last_7_days}
        </p>
      </div>
    </DashboardCardContainer>
  );
};

export default AnalyticsHeader;
