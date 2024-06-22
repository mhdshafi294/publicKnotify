"use cllient";

import { Podcast } from "@/types/podcast";
import Image from "next/image";

import { Skeleton } from "./ui/skeleton";
import PodcastCardPlayButton from "./podcast-card-play-button";
import PodcastFavoritePopover from "./podcast-favorite-popover";
import { RemoveFromFavoriteAction } from "@/app/actions/podcastActions";
import { useState } from "react";
import UnfavoriteButton from "./unfavorite-button";

type PodCastCardProps = {
  podcast: Podcast;
};

export const PodcastCard: React.FC<PodCastCardProps> = ({ podcast }) => {
  const [isFavorite, setIsFavorite] = useState(podcast.is_favorite);
  const [selectedItems, setSelectedItems] = useState<string[]>(
    podcast.favourite_categories.map((category) => category.name)
  );

  return (
    <div className="w-full flex group transition-colors duration-300 hover:bg-secondary/50 rounded-lg p-3 flex-col gap-2 overflow-hidden">
      <div className="relative aspect-video rounded-lg">
        <Image
          src={podcast.thumbnail ? podcast.thumbnail : "/podcast-filler.webp"}
          alt={`${podcast.name} thumbnail`}
          fill
          sizes="100%"
          className="object-cover rounded"
        />
        <PodcastCardPlayButton podcastId={podcast.id} type={podcast.type} />
      </div>
      <div className="flex items-end justify-between ">
        <div>
          <h3 className="font-bold text-sm text-wrap">{podcast.name}</h3>
          <p className="text-xs font-medium">{podcast.podcaster.full_name}</p>
        </div>
        {isFavorite ? (
          <UnfavoriteButton
            id={podcast.id.toString()}
            setIsFavorite={setIsFavorite}
            setSelectedItems={setSelectedItems}
            removeFromFavoriteAction={RemoveFromFavoriteAction}
            triggerSize={21}
          />
        ) : (
          <PodcastFavoritePopover
            podcastId={podcast.id.toString()}
            isFavorite={isFavorite}
            setIsFavorite={setIsFavorite}
            selectedItems={selectedItems}
            setSelectedItems={setSelectedItems}
            triggerSize={23}
          />
        )}
      </div>
    </div>
  );
};

export const PodcastCardLoading = () => {
  return (
    <div className="w-full flex flex-col gap-2 rounded-lg overflow-hidden p-3">
      <Skeleton className="relative aspect-video rounded-lg" />
      <Skeleton className="h-3 w-36" />
      <div className="flex items-center justify-between">
        <Skeleton className="h-3 w-12" />
        <Skeleton className="size-3" />
      </div>
    </div>
  );
};
