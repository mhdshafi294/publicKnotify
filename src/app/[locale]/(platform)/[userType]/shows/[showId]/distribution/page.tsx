import DashboardCardContainer from "../../_components/dashboard-card-container";

import {
  createShowRssAction,
  getDistributionLinksAction,
  getRssAction,
} from "@/app/actions/podcastActions";
import { authOptions } from "@/app/api/auth/[...nextauth]/auth-options";
import { redirect } from "@/navigation";
import { getServerSession } from "next-auth";
import { getTranslations } from "next-intl/server";
import DistributionChannels from "./_components/distribution-channels";
import MainFeed from "./_components/main-feed";

/**
 * The DistributionPage component renders the show distribution settings,
 * including the main distribution channels and RSS feed instructions.
 *
 * @returns {JSX.Element} The rendered DistributionPage component.
 */
const DistributionPage = async ({
  params,
  searchParams,
}: {
  params: { showId: string };
  searchParams: { [searchParam: string]: string | string[] | undefined };
}) => {
  const t = await getTranslations("Index");

  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/sign-in");
  }

  if (session?.user?.type !== "podcaster") {
    redirect("/");
  }

  const rssResponse = await getRssAction({
    type: session?.user?.type!,
    showId: params?.showId!,
  });

  let rssUrl = rssResponse.rss;

  if (rssUrl.length === 0) {
    const newRss = await createShowRssAction({
      type: session?.user?.type!,
      showId: params?.showId!,
    });
    rssUrl = newRss.rss;
  }

  const distributionLinksResponse = await getDistributionLinksAction({
    type: session?.user?.type!,
    playlist_id: params?.showId!,
  });

  const distributionLinks = distributionLinksResponse?.links;

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

        {/* Main Feed Section */}
        <MainFeed rssUrl={rssUrl} />

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
          <div className="absolute -top-3 start-8 rounded-full py-1 px-2 border-greeny_lighter bg-greeny_lighter/50">
            <p className="text-xs">{t("Verification Tip")}</p>
          </div>
        </DashboardCardContainer>

        {/* Distribution Channels */}
        <DistributionChannels showId={params?.showId!} rssUrl={rssUrl} />
      </div>
    </div>
  );
};

export default DistributionPage;
