import { Podcast } from "@/types/podcast";
import { Heart } from "lucide-react";
import Image from "next/image";
import { Button } from "./ui/button";
import { Skeleton } from "./ui/skeleton";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";

type PodCastCardProps = {
  podcast: Podcast;
};

export const PodcastCard: React.FC<PodCastCardProps> = ({ podcast }) => {
  return (
    <div className="w-full flex flex-col gap-2 rounded-lg overflow-hidden">
      <div className="relative aspect-video rounded-lg">
        <Image
          src={podcast.thumbnail ? podcast.thumbnail : "/podcast-filler.webp"}
          alt={`${podcast.name} thumbnail`}
          fill
          sizes="100%"
          className="object-cover"
        />
      </div>
      <h3 className="font-bold text-sm text-wrap">{podcast.name}</h3>
      <div className="flex items-center justify-between">
        <p className="text-xs font-medium">{podcast.podcaster.full_name}</p>
        <Popover>
          <PopoverTrigger asChild>
            {podcast.isFavorite ? (
              <Heart size={20} fill="#004FFF" stroke="#004FFF" />
            ) : (
              <Heart size={20} />
            )}
          </PopoverTrigger>
          <PopoverContent></PopoverContent>
        </Popover>
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
