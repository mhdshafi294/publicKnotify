import PlayLarge from "@/components/icons/play-large";
import { cn, getDistanceToNow } from "@/lib/utils";
import { Link } from "@/navigation";
import { SelfPodcastDetails } from "@/types/podcast";
import Image from "next/image";
import React from "react";

const SelfPodcastCard = ({
  podcast,
  userType,
}: {
  podcast: SelfPodcastDetails;
  userType: string;
}) => {
  return (
    <Link href={`/${userType}/podcast/${podcast.id}`} className="w-full ">
      <div className="size-44 rounded-lg relative">
        <Image
          src={podcast.thumbnail}
          alt={podcast.name}
          className="object-cover rounded-lg"
          fill
        />
        <div className="absolute inset-0 bg-black/20" />
        <PlayLarge
          className={cn(
            "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-50 group-hover:opacity-100 duration-200"
          )}
        />
        {podcast.id}
      </div>
      <p className="mt-2 font-bold line-clamp-1 opacity-50 group-hover:opacity-100">
        {podcast.name}
      </p>
      <p className="text-xs text-primary font-semibold opacity-75">
        {getDistanceToNow(podcast.publishing_date, podcast.publishing_time)}
      </p>
    </Link>
  );
};

export default SelfPodcastCard;
