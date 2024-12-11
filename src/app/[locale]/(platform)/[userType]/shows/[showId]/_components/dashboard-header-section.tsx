import React from "react";
import DashboardMediumCard from "./dashboard-medium-card";
import { PlaylistResponse } from "@/types/podcast";
import { useTranslations } from "next-intl";

type DashboardHeaderSectionProps = {
  showData: PlaylistResponse;
  params: { userType: string; showId: string };
};

/**
 * The DashboardHeaderSection component renders a grid of medium-sized cards that provide
 * quick actions and information related to the show, such as publishing an episode,
 * viewing episodes, and submitting the show for distribution.
 *
 * @param {DashboardHeaderSectionProps} props - The props for the component.
 * @param {PlaylistResponse} props.showData - Data about the current playlist, including episode count.
 * @param {Object} props.params - Route parameters, including user type and show ID.
 *
 * @returns {JSX.Element} The rendered DashboardHeaderSection component.
 */
const DashboardHeaderSection: React.FC<DashboardHeaderSectionProps> = ({
  showData,
  params,
}) => {
  const t = useTranslations("Index");

  return (
    <section className="w-full grid grid-rows-3 2xl:grid-rows-1 2xl:grid-cols-3 gap-8">
      <DashboardMediumCard
        imageSrc="/podcast-filler.webp"
        title={t("publish-episode")}
        description={t("publish-episode-description")}
        linkName={t("add-episode")}
        linkHref={`/podcaster/shows/${params.showId}/publish`}
        done={showData?.playlist?.podcasts_count > 0}
      />
      <DashboardMediumCard
        imageSrc="/podcaster-filler.webp"
        title={t("show-episodes")}
        description={t("show-episodes-description")}
        linkName={t("view-episodes")}
        linkHref={`/podcaster/shows/${params.showId}/episodes`}
      />
      <DashboardMediumCard
        imageSrc="/playlist-filler.webp"
        title={t("submit-show")}
        description={t("submit-show-description")}
        linkName={t("show-distribution")}
        linkHref={`/podcaster/shows/${params.showId}/distribution`}
      />
    </section>
  );
};

export default DashboardHeaderSection;
