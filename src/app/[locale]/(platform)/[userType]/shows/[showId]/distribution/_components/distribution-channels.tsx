"use client";

import React, { useEffect, useState } from "react";
import ChannelCard from "./channel-card";
import { useSession } from "next-auth/react";
import { useTranslations } from "next-intl";
import AppleIcon from "@/components/icons/apple-icon";
import SpotifyIcon from "@/components/icons/spotify-icon";
import YoutubeIcon from "@/components/icons/youtube-icon";
import AmazonIcon from "@/components/icons/amazon-icon";
import { useQuery } from "@tanstack/react-query";
import { getDistributionLinksAction } from "@/app/actions/podcastActions";
import { DistributionLinks } from "@/types/podcast";

type DistributionChannelsProps = {
  showId: string;
  rssUrl: string;
};

const DistributionChannels: React.FC<DistributionChannelsProps> = ({
  showId,
  rssUrl,
}) => {
  const t = useTranslations("Index");
  const { data: session } = useSession();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    if (!isMounted) setIsMounted(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const { data, isPending, isError } = useQuery({
    queryKey: ["distribution_links", showId],
    queryFn: () =>
      getDistributionLinksAction({
        type: "podcaster",
        playlist_id: showId,
      }),
    enabled: !!showId && isMounted,
  });

  console.log(showId, isMounted, data, isPending, isError);
  console.log(data?.links);
  console.log(data?.links.find((link) => link.type === "apple")?.url);

  return (
    <div className="flex flex-col gap-5">
      <ChannelCard
        playlist_id={showId}
        PlatfotmIcon={AppleIcon}
        title="platform.apple"
        type="apple"
        content={{
          header: t(
            "apple-podcasts-is-by-far-the-largest-directory-of-podcasts-and-getting-your-podcast-into-it-is-fairly-easy-youll-just-need-an-rss-feed-url-that-passes-their-validation-check"
          ),
          step1: t(
            "get-started-by-submitting-your-podcast-to-apple-podcasts-connect-if-youve-validated-your-feed-and-have-received-your-url-from-apple-proceed-to-step-2"
          ),
          submitLink:
            `${
              data?.links.find((link) => link.type === "apple")?.redirect_url
            }${rssUrl}` ||
            `https://podcastsconnect.apple.com/my-podcasts/new-feed?submitfeed=${rssUrl}`,
          link: data?.links.find((link) => link.type === "apple")?.url,
          step2: t(
            "once-youve-received-your-apple-podcasts-url-paste-it-in-the-field-below-well-display-a-link-to-your-show-on-apple-podcasts-on-your-audio-player-show-page-and-episode-pages"
          ),
        }}
      />
      <ChannelCard
        playlist_id={showId}
        PlatfotmIcon={SpotifyIcon}
        title="platform.spotify"
        type="spotify"
        content={{
          header: t(
            "spotify-is-a-digital-music-service-that-gives-you-access-to-millions-of-podcasts-and-songs"
          ),
          step1: t(
            "submit-your-podcast-to-spotify-and-get-your-show-url-your-podcast-should-appear-on-spotify-within-a-few-hours-of-submitting-your-rss-feed"
          ),
          submitLink:
            data?.links.find((link) => link.type === "spotify")?.redirect_url ||
            `https://podcasters.spotify.com`,
          link: data?.links.find((link) => link.type === "spotify")?.url,
          step2: t(
            "paste-your-spotify-url-well-display-a-link-on-your-audio-player-show-page-and-episode-pages"
          ),
        }}
      />
      <ChannelCard
        playlist_id={showId}
        PlatfotmIcon={YoutubeIcon}
        title="platform.youtube"
        type="youtube"
        content={{
          header: t(
            "you-can-distribute-your-audio-content-to-youtube-and-youtube-music-via-your-rss-feed-youtube-will-automatically-generate-videos-of-your-content-for-you-using-your-default-show-artwork-and-audio-we-support-16-9-images-in-your-show-settings-and-custom-artwork-for-each-episode"
          ),
          step1: "Import your podcast to YouTube and get your channel URL.",
          submitLink:
            data?.links.find((link) => link.type === "youtube")?.redirect_url ||
            `https://studio.youtube.com/?d=rsswd`,
          link: data?.links.find((link) => link.type === "youtube")?.url,
          step2: t(
            "paste-your-youtube-channel-url-well-display-a-link-on-your-audio-player-show-page-and-episode-pages"
          ),
        }}
      />

      <ChannelCard
        playlist_id={showId}
        PlatfotmIcon={AmazonIcon}
        title="platform.amazon"
        type="amazon"
        content={{
          header: "",
          step1: t(
            "add-your-podcast-to-their-combined-and-rapidly-growing-audience-of-55-million-customers"
          ),
          submitLink:
            data?.links.find((link) => link.type === "amazon")?.redirect_url ||
            `https://www.amazon.com/podcasters`,
          link: data?.links.find((link) => link.type === "amazon ")?.url,
          step2: t(
            "find-your-amazon-music-podcast-url-here-paste-your-amazon-music-url-and-well-display-a-link-on-your-audio-player-show-page-and-episode-pages"
          ),
        }}
      />
    </div>
  );
};

export default DistributionChannels;
