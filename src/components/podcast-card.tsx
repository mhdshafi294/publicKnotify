import { Podcast } from "@/types/podcast";
import { Heart } from "lucide-react";
import Image from "next/image";
import { Skeleton } from "./ui/skeleton";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import PodcastCardPlayButton from "./podcast-card-play-button";
import { Separator } from "./ui/separator";
import { ToggleGroup, ToggleGroupItem } from "./ui/toggle-group";
import { ScrollArea } from "./ui/scroll-area";

type PodCastCardProps = {
  podcast: Podcast;
};

export const PodcastCard: React.FC<PodCastCardProps> = async ({ podcast }) => {
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
        <Popover>
          <PopoverTrigger asChild>
            {podcast.is_favorite ? (
              <Heart
                size={20}
                fill="#004FFF"
                stroke="#004FFF"
                className="cursor-pointer hover:stroke-primary"
              />
            ) : (
              <Heart
                size={20}
                className="cursor-pointer hover:stroke-primary duration-300"
              />
            )}
          </PopoverTrigger>
          <PopoverContent>
            <p>Add to your Favorite lists</p>
            <Separator />
            <ScrollArea className="h-80">
              <ToggleGroup type="single">
                <ToggleGroupItem value="a">A</ToggleGroupItem>
                <ToggleGroupItem value="b">B</ToggleGroupItem>
                <ToggleGroupItem value="c">C</ToggleGroupItem>
              </ToggleGroup>
            </ScrollArea>
          </PopoverContent>
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
