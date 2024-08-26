import React from "react";
import DashboardCardContainer from "../../../_components/dashboard-card-container";
import YoutubeIconWhite from "@/components/icons/youtube-icon-white";
import { useTranslations } from "next-intl";

const AnalyticsYoutube = () => {
  const t = useTranslations("Index");

  return (
    <DashboardCardContainer className="w-full flex flex-col gap-5">
      <div className="flex flex-col gap-1">
        <h3 className="flex items-center gap-2 text-base font-bold uppercase ">
          <YoutubeIconWhite />
          {t("youtube-analytics")}
        </h3>
        <p className="text-xs opacity-70">
          {t(
            "an-overview-of-your-youtube-chanel-performance-regarding-this-show"
          )}
        </p>
      </div>
      <div className="w-full flex gap-3">
        <div className="w-full flex flex-col gap-1 justify-between">
          <h2 className="text-base font-bold opacity-50">
            {t("all-time-views")}
          </h2>
          <p className="font-bold text-xl">500</p>
        </div>
        <div className="w-full flex flex-col gap-1 justify-between">
          <h2 className="text-base font-bold opacity-50">
            {t("subscriber-count")}
          </h2>
          <p className="font-bold text-xl capitalize">25</p>
        </div>
        <div className="w-full flex flex-col gap-1 justify-between">
          <h2 className="text-base font-bold opacity-50">
            {t("hidden-subscriber-count")}
          </h2>
          <p className="font-bold text-xl">100</p>
        </div>
        <div className="w-full flex flex-col gap-1 justify-between">
          <h2 className="text-base font-bold opacity-50">{t("video-count")}</h2>
          <p className="font-bold text-xl">92</p>
        </div>
      </div>
    </DashboardCardContainer>
  );
};

export default AnalyticsYoutube;
