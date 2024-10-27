import React from "react";
import DashboardCardContainer from "../../shows/_components/dashboard-card-container";
import { MostPopular } from "@/types/statistics";
import { formatTo12Hour } from "@/lib/utils";
import { getTranslations } from "next-intl/server";

const MostPopularStatsCard = async ({
  showStatistics,
}: {
  showStatistics: MostPopular;
}) => {
  const t = await getTranslations("Index");

  return (
    <DashboardCardContainer className="flex gap-3">
      <div className="w-full flex flex-col gap-1">
        <h2 className="text-sm font-bold opacity-70 dark:opacity-50">
          {t("all_time_views")}
        </h2>
        <p className="font-bold text-xl">{showStatistics?.all_time_views}</p>
      </div>
      <div className="w-full flex flex-col gap-1">
        <h2 className="text-sm font-bold opacity-70 dark:opacity-50">
          {t("top-country")}
        </h2>
        <p className="font-bold text-xl capitalize">
          {showStatistics?.top_country
            ? showStatistics?.top_country?.country
            : "N/A"}
        </p>
      </div>
      <div className="w-full flex flex-col gap-1">
        <h2 className="text-sm font-bold opacity-70 dark:opacity-50">
          {t("most-popular-time")}
        </h2>
        <p className="font-bold text-xl">
          {showStatistics?.most_popular_time
            ? formatTo12Hour(showStatistics?.most_popular_time)
            : "N/A"}
        </p>
      </div>
      <div className="w-full flex flex-col gap-1">
        <h2 className="text-sm font-bold opacity-70 dark:opacity-50">
          {t("most-popular-day")}
        </h2>
        <p className="font-bold text-xl">
          {showStatistics?.most_popular_day
            ? showStatistics?.most_popular_day
            : "N/A"}
        </p>
      </div>
    </DashboardCardContainer>
  );
};

export default MostPopularStatsCard;
