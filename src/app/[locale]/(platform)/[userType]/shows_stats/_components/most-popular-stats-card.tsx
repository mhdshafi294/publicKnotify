import React from "react";

// Local components
import DashboardCardContainer from "../../shows/_components/dashboard-card-container";

// Types and utility functions
import { MostPopular } from "@/types/statistics";
import { formatTo12Hour } from "@/lib/utils";
import { getTranslations } from "next-intl/server";

/**
 * MostPopularStatsCard Component
 *
 * Displays key metrics about a show's popularity statistics including total views,
 * top-viewing country, most popular viewing time, and day.
 *
 * @param {Object} props - The component's properties.
 * @param {MostPopular} props.showStatistics - The statistics data of the show's popularity.
 *
 * @returns {Promise<JSX.Element>} A promise resolving to the rendered MostPopularStatsCard component.
 *
 * @example
 * <MostPopularStatsCard showStatistics={showStatistics} />
 */
const MostPopularStatsCard = async ({
  showStatistics,
}: {
  showStatistics: MostPopular;
}) => {
  // Fetch translations for internationalization
  const t = await getTranslations("Index");

  return (
    <DashboardCardContainer className="flex gap-3">
      {/* Display All-Time Views */}
      <div className="w-full flex flex-col gap-1">
        <h2 className="text-sm font-bold opacity-70 dark:opacity-50">
          {t("all_time_views")}
        </h2>
        <p className="font-bold text-xl">
          {showStatistics?.all_time_views ?? "N/A"}
        </p>
      </div>

      {/* Display Top Country */}
      <div className="w-full flex flex-col gap-1">
        <h2 className="text-sm font-bold opacity-70 dark:opacity-50">
          {t("top-country")}
        </h2>
        <p className="font-bold text-xl capitalize">
          {showStatistics?.top_country?.country ?? "N/A"}
        </p>
      </div>

      {/* Display Most Popular Time */}
      <div className="w-full flex flex-col gap-1">
        <h2 className="text-sm font-bold opacity-70 dark:opacity-50">
          {t("most-popular-time")}
        </h2>
        <p className="font-bold text-xl">
          {showStatistics?.most_popular_time
            ? formatTo12Hour(showStatistics.most_popular_time)
            : "N/A"}
        </p>
      </div>

      {/* Display Most Popular Day */}
      <div className="w-full flex flex-col gap-1">
        <h2 className="text-sm font-bold opacity-70 dark:opacity-50">
          {t("most-popular-day")}
        </h2>
        <p className="font-bold text-xl">
          {showStatistics?.most_popular_day ?? "N/A"}
        </p>
      </div>
    </DashboardCardContainer>
  );
};

export default MostPopularStatsCard;
