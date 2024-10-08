"use client";

import React, { useEffect, useRef, useState } from "react"; // Core React imports

import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"; // Internal component imports
import { cn, getDirection, getDistanceToNow } from "@/lib/utils"; // Internal utility functions
import { useRouter } from "next/navigation"; // External dependency for navigation
import { SelfPodcastDetails } from "@/types/podcast"; // Internal type definitions
import { PlayIcon } from "lucide-react"; // External dependency for icons
import { useSearchParams } from "next/navigation"; // External dependency for URL search params
import { buttonVariants } from "@/components/ui/button"; // Internal button styles
import ThumbnailsCover from "@/components/thumbnails-cover"; // Internal component for thumbnails
import Image from "next/image"; // External dependency for images
import { useLocale, useTranslations } from "next-intl"; // External dependencies for internationalization

/**
 * SideScrollPlaylistPodcasts Component
 *
 * This component displays a scrollable list of podcasts within a playlist. It allows users to
 * select a podcast, which updates the URL to reflect the selected podcast. It also handles
 * layout adjustments based on the locale direction.
 *
 * @param {Object} props - Component properties.
 * @param {SelfPodcastDetails[]} props.podcasts - Array of podcasts to display in the playlist.
 * @param {string} props.playlistName - The name of the playlist.
 * @returns {JSX.Element} The rendered component with a side-scrolling list of podcasts.
 */
const SideScrollPlaylistPodcasts = ({
  podcasts,
  playlistName,
}: {
  podcasts: SelfPodcastDetails[];
  playlistName: string;
}) => {
  const [isMounted, setIsMounted] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentPodcastId =
    searchParams.get("podcast_id") || podcasts[0]?.id.toString();
  const [selectedPodcastId, setSelectedPodcastId] =
    useState<string>(currentPodcastId);
  const initialRender = useRef(true);

  useEffect(() => {
    if (!isMounted) {
      setIsMounted(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (initialRender.current) {
      initialRender.current = false;
      return;
    }
    const params = new URLSearchParams(searchParams.toString());
    params.set("podcast_id", selectedPodcastId);
    router.push(`?${params.toString()}`);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedPodcastId]);

  const locale = useLocale();
  const dir = getDirection(locale);
  const t = useTranslations("Index");

  return (
    <div
      className={cn(
        "flex flex-col gap-1 overflow-hidden w-full lg:w-[20dvw] lg:absolute lg:bottom-0 lg:left-0 lg:bg-card-secondary lg:border lg:border-card-foreground/10 pt-10 lg:z-40",
        { "lg:rounded-tr-3xl": dir === "ltr" },
        { "lg:rounded-tl-3xl": dir === "rtl" }
      )}
    >
      <ThumbnailsCover title={playlistName} className="hidden lg:flex" />
      <h2 className="text-2xl font-bold lg:hidden text-center capitalize">
        {playlistName}
      </h2>
      <ul className="w-full py-3 pe-0">
        <ScrollArea
          className="w-full h-[calc(100vh-350px)] flex flex-col px-1"
          dir={dir}
        >
          {podcasts.length === 0 ? (
            <p>{t("noPodcastsInPlaylist")}</p>
          ) : (
            podcasts.map((podcast) => (
              <li
                key={podcast.id}
                onClick={() => setSelectedPodcastId(podcast.id.toString())}
                className={cn(
                  buttonVariants({ variant: "outline" }),
                  "w-full h-fit flex gap-1 items-center justify-start mt-3 border-none ps-1 py-2 group cursor-default",
                  {
                    "bg-primary/20 dark:bg-primary/50":
                      podcast.id === parseInt(currentPodcastId),
                  }
                )}
              >
                <p>{podcast.order}</p>
                <div className="aspect-video relative h-16 shrink-0">
                  <Image
                    alt="podcast-cover"
                    src={podcast.thumbnail}
                    fill
                    className="object-cover rounded-md"
                  />
                </div>
                <div>
                  <p className="text-sm font-bold capitalize">{podcast.name}</p>
                  <p className="text-xs opacity-70 dark:opacity-50">
                    {getDistanceToNow(
                      podcast.publishing_date,
                      podcast.publishing_time
                    )}
                  </p>
                </div>
                <PlayIcon
                  className={cn(
                    "w-5 h-5 opacity-0 ms-auto group-hover:opacity-100",
                    {
                      "opacity-100": podcast.id === parseInt(currentPodcastId),
                    }
                  )}
                />
              </li>
            ))
          )}
          <ScrollBar />
        </ScrollArea>
      </ul>
    </div>
  );
};

export default SideScrollPlaylistPodcasts;
