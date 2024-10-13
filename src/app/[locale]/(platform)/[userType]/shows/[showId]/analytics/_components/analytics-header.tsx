import React from "react";
import DashboardCardContainer from "../../../_components/dashboard-card-container";
import { ShowStatistics } from "@/types/statistics";
import { useTranslations } from "next-intl";
import AnalyticsEnableSwitch from "./analytics-enable-switch";

/**
 * The AnalyticsHeader component displays key statistics for a show in a summary view.
 *
 * It includes metrics such as all-time views, views today, views over the last 7 days, and unique listeners.
 *
 * @param {Object} props - Component props.
 * @param {ShowStatistics} props.showStatistics - The statistics data for the show.
 *
 * @returns {JSX.Element} The rendered AnalyticsHeader component.
 */
const AnalyticsHeader = ({
  showStatistics,
}: {
  showStatistics: ShowStatistics;
}): JSX.Element => {
  const t = useTranslations("Index");

  return (
    <DashboardCardContainer className="w-full flex flex-col sm:flex-row gap-5 sm:gap-3 relative pt-14 lg:pt-14">
      <div className="w-full flex flex-col gap-1 justify-between">
        <h2 className="text-base font-bold opacity-70 dark:opacity-50">
          {t("all_time_views")}
        </h2>
        <p className="font-bold text-xl">
          {showStatistics?.playlist_statistics?.total_views}
        </p>
      </div>
      <div className="w-full flex flex-col gap-1 justify-between">
        <h2 className="text-base font-bold opacity-70 dark:opacity-50">
          {t("views_today")}
        </h2>
        <p className="font-bold text-xl capitalize">
          {showStatistics?.playlist_statistics?.today_views}
        </p>
      </div>
      <div className="w-full flex flex-col gap-1 justify-between">
        <h2 className="text-base font-bold opacity-70 dark:opacity-50">
          {t("last_7_days_including_today")}
        </h2>
        <p className="font-bold text-xl">
          {showStatistics?.playlist_statistics?.last_7_days_views}
        </p>
      </div>
      <div className="w-full flex flex-col gap-1 justify-between">
        <h2 className="text-base font-bold opacity-70 dark:opacity-50">
          {t("previous_7_days")}
        </h2>
        <p className="font-bold text-xl">
          {showStatistics?.playlist_statistics?.previous_7_days_views}
        </p>
      </div>
      <div className="w-full flex flex-col gap-1 justify-between">
        <h2 className="text-base font-bold opacity-70 dark:opacity-50">
          {t("unique_listeners_last_7_days")}
        </h2>
        <p className="font-bold text-xl">
          {showStatistics?.playlist_statistics?.unique_listeners_last_7_days}
        </p>
      </div>
      <AnalyticsEnableSwitch
        className="ms-auto self-start absolute right-4 top-6"
        enabled={showStatistics?.enabled}
        statiscsType="playlist_statistics"
      />
    </DashboardCardContainer>
  );
};

export default AnalyticsHeader;
