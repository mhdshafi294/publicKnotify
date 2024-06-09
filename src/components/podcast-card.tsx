import { Podcast } from "@/types/podcast";
import Image from "next/image";
import { Skeleton } from "./ui/skeleton";
import PodcastCardPlayButton from "./podcast-card-play-button";

import FavoritePopover from "./favorite-popover";

type PodCastCardProps = {
  podcast: Podcast;
};

export const PodcastCard: React.FC<PodCastCardProps> = ({ podcast }) => {
  return (
    <div className="w-full flex group transition-colors duration-300 hover:bg-secondary/50 p-3 flex-col gap-2 rounded-lg overflow-hidden">
      <div className="relative aspect-video rounded-lg">
        <Image
          src={podcast.thumbnail ? podcast.thumbnail : "/podcast-filler.webp"}
          alt={`${podcast.name} thumbnail`}
          fill
          sizes="100%"
          className="object-cover"
        />
        <PodcastCardPlayButton podcastId={podcast.id} type={podcast.type} />
      </div>
      <h3 className="font-bold text-sm text-wrap">{podcast.name}</h3>
      <div className="flex items-center justify-between">
        <p className="text-xs font-medium">{podcast.podcaster.full_name}</p>
        <FavoritePopover
          isFavorite={podcast.is_favorite}
          podcastId={podcast.id.toString()}
          favorite_Categories={podcast.favourites_category}
        />
      </div>
    </div>
  );
};

export const PodcastCardLoading = () => {
  return (
    <div className="w-full flex flex-col gap-2 rounded-lg overflow-hidden">
      <Skeleton className="relative aspect-video rounded-lg" />
      <Skeleton className="h-3 w-36" />
      <div className="flex items-center justify-between">
        <Skeleton className="h-3 w-12" />
        <Skeleton className="size-3" />
      </div>
    </div>
  );
};
