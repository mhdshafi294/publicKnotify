import { Podcast } from "@/types/podcast";
import { Heart } from "lucide-react";
import Image from "next/image";
import { Button } from "./ui/button";
import { Skeleton } from "./ui/skeleton";
import PodcastCardPlayButton from "./podcast-card-play-button";

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
        <PodcastCardPlayButton podcastId={podcast.id} type={podcast.type}/>
      </div>
      <h3 className="font-bold text-sm text-wrap">{podcast.name}</h3>
      <div className="flex items-center justify-between">
        <p className="text-xs font-medium">{podcast.podcaster.full_name}</p>
        {podcast.is_favorite ? (
          <Button
            variant="outline"
            className="p-0 outline-none border-none h-fit hover:bg-transparent hover:text-primary"
          >
            <Heart size={20} fill="#004FFF" stroke="#004FFF" />
          </Button>
        ) : (
          <Button
            variant="outline"
            className="p-0 outline-none border-none h-fit hover:bg-transparent hover:text-primary"
          >
            <Heart size={20} />
          </Button>
        )}
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
