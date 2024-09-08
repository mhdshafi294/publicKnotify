import React from "react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import DashboardCardContainer from "../../_components/dashboard-card-container";
import { SquareArrowOutUpRightIcon } from "lucide-react";

type SocialCardProps = {
  icon: string;
  title: string;
};

/**
 * The SocialCard component displays a distribution platform with its icon and title.
 * It includes a clickable icon that indicates a redirect action.
 *
 * @param {SocialCardProps} props - The props for the component.
 * @param {string} props.icon - The source URL for the platform icon.
 * @param {string} props.title - The title of the platform.
 *
 * @returns {JSX.Element} The rendered SocialCard component.
 */
const SocialCard: React.FC<SocialCardProps> = ({ icon, title }) => {
  const t = useTranslations("Index");

  return (
    <DashboardCardContainer className="rounded-none bg-transparent px-8 py-4">
      <div className="flex justify-between items-center gap-4">
        <div className="flex items-center gap-2">
          <Image
            src={icon}
            alt={`${title} icon`}
            height={48}
            width={48}
            className="size-12 object-cover"
          />
          <p>{t(title)}</p>
        </div>
        <div>
          <SquareArrowOutUpRightIcon
            size={16}
            className="text-card-foreground/70"
          />
        </div>
      </div>
    </DashboardCardContainer>
  );
};

/**
 * The DistributionPage component renders the show distribution settings,
 * including the main distribution channels and RSS feed instructions.
 *
 * @returns {JSX.Element} The rendered DistributionPage component.
 */
const DistributionPage: React.FC = () => {
  const t = useTranslations("Index");

  return (
    <div className="flex flex-col items-center w-full flex-1 lg:min-h-[calc(100vh-72px)] relative h-full justify-between p-4 sm:p-6 md:p-8 gap-4">
      <div className="flex flex-col w-full gap-8 max-w-[800px]">
        <h1 className="text-3xl font-bold">{t("show-distribution")}</h1>

        {/* RSS Feed Section */}
        <div className="flex flex-col">
          <h2 className="text-xl font-bold">{t("RSS Feed")}</h2>
          <div className="text-sm">
            <span className="opacity-70">
              {t("To access your RSS feed, please")}
            </span>{" "}
            <span className="font-semibold">{t("select a plan")}</span>
          </div>
        </div>

        {/* Main Distribution Channels Section */}
        <div className="flex flex-col">
          <h2 className="text-xl font-bold">
            {t("main-distribution-channels")}
          </h2>
          <p className="text-sm opacity-70">
            {t("main-distribution-channels-description-1")}
          </p>
        </div>

        {/* Distribution Settings Tip */}
        <DashboardCardContainer className="relative">
          <div className="text-sm">
            <span className="opacity-70">
              {t("main-distribution-channels-description-2")}
            </span>{" "}
            <span className="font-semibold">{t("show settings")}</span>
          </div>
          <div className="absolute -top-3 start-8 rounded-full p-1 border-greeny_lighter bg-greeny_lighter/50">
            <p className="text-xs">{t("Verification Tip")}</p>
          </div>
        </DashboardCardContainer>

        {/* Social Platforms */}
        <div className="flex flex-col gap-4">
          <SocialCard icon="/icons/YouTube.svg" title="platform.youtube" />
          <SocialCard icon="/icons/Spotify.svg" title="platform.spotify" />
          <SocialCard icon="/icons/Instagram.svg" title="platform.instagram" />
          <SocialCard icon="/icons/ivoox.svg" title="platform.ivoox" />
          <SocialCard icon="/icons/Apple-Podcasts.svg" title="platform.apple" />
          <SocialCard
            icon="/icons/Google-Podcasts.svg"
            title="platform.google"
          />
        </div>
      </div>
    </div>
  );
};

export default DistributionPage;
