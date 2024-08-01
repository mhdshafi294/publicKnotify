"use client";
import React, { useEffect, useRef, useState } from "react";

import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { cn, getDistanceToNow } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { SelfPodcastDetails } from "@/types/podcast";
import { PlayIcon } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { buttonVariants } from "@/components/ui/button";
import ThumbnailsCover from "@/components/thumbnails-cover";
import Image from "next/image";

const InfiniteScrollPlaylistPodcasts = ({
  podcasts,
}: {
  podcasts: SelfPodcastDetails[];
}) => {
  const [isMounted, setIsMounted] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const current_podcast_id = searchParams.get("podcast_id") || "1";
  const [currentPodcastId, setCurrentPodcastId] =
    useState<string>(current_podcast_id);
  const initialRender = useRef(true);

  console.log(podcasts);

  useEffect(() => {
    if (!isMounted) {
      setIsMounted(true);
    }
  }, []);

  useEffect(() => {
    if (initialRender.current) {
      initialRender.current = false;
      return;
    }
    const params = new URLSearchParams(searchParams.toString());
    if (currentPodcastId) {
      params.set("podcast_id", currentPodcastId);
    } else {
      params.delete("podcast_id");
    }
    router.push(`?${params.toString()}`);
  }, [currentPodcastId]);

  return (
    <div
      className={cn(
        "flex flex-col gap-1 overflow-hidden w-full lg:w-[25dvw] lg:rounded-tr-3xl lg:absolute lg:bottom-0 lg:left-0 lg:bg-secondary lg:border lg:border-card-foreground/10 pt-10 lg:z-40"
      )}
    >
      <ThumbnailsCover title={"Podcasts"} className="hidden lg:flex" />
      <ul className="w-full py-3 pe-0">
        <ScrollArea className="w-full h-[calc(100vh-350px)] flex flex-col px-1">
          {/* loading spinner */}
          {podcasts.length === 0 ? (
            <p>No Podcasts in this Playlist yet</p>
          ) : (
            podcasts.map((podcast) => (
              <li
                key={podcast.id}
                onClick={() => setCurrentPodcastId(podcast.id.toString())}
                className={cn(
                  buttonVariants({ variant: "outline" }),
                  "w-full h-fit flex gap-1 items-center justify-start mt-3 border-none ps-1 py-2 group",
                  {
                    "bg-primary/50":
                      podcast.id === parseInt(current_podcast_id),
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
                <div className="">
                  <p className="text-sm font-bold capitalize">{podcast.name}</p>
                  <p className="text-xs opacity-50">
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
                      "opacity-100":
                        podcast.id === parseInt(current_podcast_id),
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

export default InfiniteScrollPlaylistPodcasts;
