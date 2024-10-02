import React from "react";

import DashboardCardContainer from "../../_components/dashboard-card-container";

import MainFeed from "./_components/main-feed";
import { getTranslations } from "next-intl/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import {
  createShowRssAction,
  getDistributionLinksAction,
  getRssAction,
} from "@/app/actions/podcastActions";
import { redirect } from "@/navigation";
import ChannelCard from "./_components/channel-card";

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

  if (rssUrl.length > 0) {
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

        {/* Social Platforms */}
        <div className="flex flex-col gap-5">
          <ChannelCard
            playlist_id={params?.showId!}
            icon="/icons/Apple-Podcasts.svg"
            title="platform.apple"
            type="apple"
            content={{
              header: t(
                "apple-podcasts-is-by-far-the-largest-directory-of-podcasts-and-getting-your-podcast-into-it-is-fairly-easy-youll-just-need-an-rss-feed-url-that-passes-their-validation-check"
              ),
              step1: t(
                "get-started-by-submitting-your-podcast-to-apple-podcasts-connect-if-youve-validated-your-feed-and-have-received-your-url-from-apple-proceed-to-step-2"
              ),
              submitLink: `https://podcastsconnect.apple.com/my-podcasts/new-feed?submitfeed=${rssUrl}`,
              link: distributionLinks.find((link) => link.type === "apple")
                ?.url,
              step2: t(
                "once-youve-received-your-apple-podcasts-url-paste-it-in-the-field-below-well-display-a-link-to-your-show-on-apple-podcasts-on-your-audio-player-show-page-and-episode-pages"
              ),
            }}
          />
          <ChannelCard
            playlist_id={params?.showId!}
            icon="/icons/Spotify.svg"
            title="platform.spotify"
            type="spotify"
            content={{
              header: t(
                "spotify-is-a-digital-music-service-that-gives-you-access-to-millions-of-podcasts-and-songs"
              ),
              step1: t(
                "submit-your-podcast-to-spotify-and-get-your-show-url-your-podcast-should-appear-on-spotify-within-a-few-hours-of-submitting-your-rss-feed"
              ),
              submitLink: `https://podcasters.spotify.com`,
              link: distributionLinks.find((link) => link.type === "spotify")
                ?.url,
              step2: t(
                "paste-your-spotify-url-well-display-a-link-on-your-audio-player-show-page-and-episode-pages"
              ),
            }}
          />
          <ChannelCard
            playlist_id={params?.showId!}
            icon="/icons/YouTube.svg"
            title="platform.youtube"
            type="youtube"
            content={{
              header: t(
                "you-can-distribute-your-audio-content-to-youtube-and-youtube-music-via-your-rss-feed-youtube-will-automatically-generate-videos-of-your-content-for-you-using-your-default-show-artwork-and-audio-we-support-16-9-images-in-your-show-settings-and-custom-artwork-for-each-episode"
              ),
              step1: "Import your podcast to YouTube and get your channel URL.",
              submitLink: `https://studio.youtube.com/?d=rsswd`,
              link: distributionLinks.find((link) => link.type === "youtube")
                ?.url,
              step2: t(
                "paste-your-youtube-channel-url-well-display-a-link-on-your-audio-player-show-page-and-episode-pages"
              ),
            }}
          />

          <ChannelCard
            playlist_id={params?.showId!}
            icon="/icons/Amazon.svg"
            title="platform.amazon"
            type="amazon"
            content={{
              header: "",
              step1: t(
                "add-your-podcast-to-their-combined-and-rapidly-growing-audience-of-55-million-customers"
              ),
              submitLink: `https://www.amazon.com/podcasters`,
              link: distributionLinks.find((link) => link.type === "amazon ")
                ?.url,
              step2: t(
                "find-your-amazon-music-podcast-url-here-paste-your-amazon-music-url-and-well-display-a-link-on-your-audio-player-show-page-and-episode-pages"
              ),
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default DistributionPage;
