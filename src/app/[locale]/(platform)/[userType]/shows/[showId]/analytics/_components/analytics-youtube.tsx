import { OctagonAlert } from "lucide-react";
import { useTranslations } from "next-intl";

import YoutubeIconWhite from "@/components/icons/youtube-icon-white";
import { EnabledStatistics, YoutubeChannel } from "@/types/statistics";
import DashboardCardContainer from "../../../_components/dashboard-card-container";
import AnalyticsEnableSwitch from "./analytics-enable-switch";

/**
 * The AnalyticsYoutube component displays an overview of YouTube analytics for the given show.
 *
 * It shows key metrics such as view count, subscriber count, hidden subscriber count, and video count.
 *
 * @param {Object} props - Component props.
 * @param {YoutubeChannel | null | undefined} props.youtube_channel - The YouTube channel analytics data.
 *
 * @returns {JSX.Element} The rendered AnalyticsYoutube component.
 */
const AnalyticsYoutube = ({
  youtube_channel,
  enabled,
}: {
  youtube_channel: YoutubeChannel | null | undefined;
  enabled: EnabledStatistics;
}): JSX.Element => {
  const t = useTranslations("Index");

  return (
    <DashboardCardContainer className="w-full flex flex-col gap-5">
      {/* Header */}
      <div className="w-full flex justify-between">
        <div className="flex flex-col gap-1">
          <h3 className="flex items-center gap-2 text-base font-bold uppercase">
            <YoutubeIconWhite />
            {t("youtube-analytics")}
          </h3>
          <p className="text-xs opacity-70">
            {t(
              "an-overview-of-your-youtube-chanel-performance-regarding-this-show"
            )}
          </p>
        </div>
        <AnalyticsEnableSwitch
          className="ms-auto self-end"
          enabled={enabled}
          statisticsType="youtube_channel"
        />
      </div>

      {/* YouTube Analytics Details */}
      <div className="w-full flex flex-col gap-5 sm:flex-row sm:gap-3">
        {/* All-time Views */}
        <div className="w-full flex flex-col gap-1 justify-between">
          <h2 className="text-base font-bold opacity-70 dark:opacity-50">
            {t("all-time-views")}
          </h2>
          <p className="font-bold text-xl">
            {youtube_channel?.viewCount ? (
              youtube_channel.viewCount
            ) : (
              <span className="text-sm font-bold flex items-center">
                <OctagonAlert className="me-1 size-4" />
                {t("no-data")}
              </span>
            )}
          </p>
        </div>

        {/* Subscriber Count */}
        <div className="w-full flex flex-col gap-1 justify-between">
          <h2 className="text-base font-bold opacity-70 dark:opacity-50">
            {t("subscriber-count")}
          </h2>
          <p className="font-bold text-xl capitalize">
            {youtube_channel?.subscriberCount ? (
              youtube_channel.subscriberCount
            ) : (
              <span className="text-sm font-bold flex items-center">
                <OctagonAlert className="me-1 size-4" />
                {t("no-data")}
              </span>
            )}
          </p>
        </div>

        {/* Hidden Subscriber Count */}
        <div className="w-full flex flex-col gap-1 justify-between">
          <h2 className="text-base font-bold opacity-70 dark:opacity-50">
            {t("hidden-subscriber-count")}
          </h2>
          <p className="font-bold text-xl">
            {youtube_channel?.hiddenSubscriberCount ? (
              youtube_channel.hiddenSubscriberCount
            ) : (
              <span className="text-sm font-bold flex items-center">
                <OctagonAlert className="me-1 size-4" />
                {t("no-data")}
              </span>
            )}
          </p>
        </div>

        {/* Video Count */}
        <div className="w-full flex flex-col gap-1 justify-between">
          <h2 className="text-base font-bold opacity-70 dark:opacity-50">
            {t("video-count")}
          </h2>
          <p className="font-bold text-xl">
            {youtube_channel?.videoCount ? (
              youtube_channel.videoCount
            ) : (
              <span className="text-sm font-bold flex items-center">
                <OctagonAlert className="me-1 size-4" />
                {t("no-data")}
              </span>
            )}
          </p>
        </div>
      </div>
    </DashboardCardContainer>
  );
};

export default AnalyticsYoutube;
