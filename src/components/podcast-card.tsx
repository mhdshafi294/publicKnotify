"use cllient";

import { removeFromFavoriteAction } from "@/app/actions/podcastActions";
import { cn } from "@/lib/utils";
import { Link, useRouter } from "@/navigation";
import { Podcast } from "@/types/podcast";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useEffect, useState } from "react";
import PodcastCardPlayButton from "./podcast-card-play-button";
import PodcastFavoritePopover from "./podcast-favorite-popover";
import { Skeleton } from "./ui/skeleton";
import UnfavoriteButton from "./unfavorite-button";

type PodCastCardProps = {
  podcast: Podcast;
  className?: string;
};

export const PodcastCard: React.FC<PodCastCardProps> = ({
  podcast,
  className,
}) => {
  const router = useRouter();
  const { data: user } = useSession();
  const [isFavorite, setIsFavorite] = useState(podcast.is_favorite);
  const [selectedItems, setSelectedItems] = useState<string[]>(
    podcast.favourite_categories.map((category) => category.name)
  );
  const [isHydrated, setIsHydrated] = useState(false);
  useEffect(() => {
    if (!isHydrated) setIsHydrated(true);
  }, []);

  return (
    <div
      // onClick={() => router.push(`/${user?.user?.type}/podcast/${podcast.id}`)}
      // role="button"
      tabIndex={0}
      className={cn(
        "w-full flex group transition-colors group duration-300 hover:bg-secondary/50 rounded-lg p-3 flex-col gap-2 overflow-hidden",
        className
      )}
    >
      <div className="relative aspect-video rounded-lg">
        <Image
          src={podcast.thumbnail ? podcast.thumbnail : "/podcast-filler.webp"}
          alt={`${podcast.name} thumbnail`}
          fill
          priority
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover rounded cursor-pointer"
          onClick={() =>
            router.push(`/${user?.user?.type}/podcast/${podcast.id}`)
          }
        />
        <PodcastCardPlayButton podcastId={podcast.id} type={podcast.type} />
      </div>
      <div className="flex items-end justify-between ">
        <div>
          <Link passHref href={`/${user?.user?.type}/podcast/${podcast.id}`}>
            <h3 className="font-bold text-sm text-wrap">{podcast.name}</h3>
          </Link>
          <p className="text-xs font-medium">{podcast.podcaster.full_name}</p>
        </div>
        {isFavorite ? (
          <UnfavoriteButton
            id={podcast.id.toString()}
            setIsFavorite={setIsFavorite}
            setSelectedItems={setSelectedItems}
            removeFromFavoriteAction={removeFromFavoriteAction}
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
