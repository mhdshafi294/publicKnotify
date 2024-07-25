import PlayLarge from "@/components/icons/play-large";
import { Progress } from "@/components/ui/progress";
import { cn, getDistanceToNow } from "@/lib/utils";
import { Link } from "@/navigation";
import { Podcast, SelfPodcastDetails } from "@/types/podcast";
import Image from "next/image";
import React from "react";

const ProfilePodcastCard = ({
  podcast,
  userType,
}: {
  podcast: Podcast;
  userType: string;
}) => {
  const progress = podcast.playback_position
    ? Math.floor(
        (podcast.playback_position?.current_position /
          podcast.playback_position?.total_time) *
          100
      )
    : 0;

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
      <Progress value={progress} className="w-44 h-2 mt-1" />
      <p className="mt-2 font-bold line-clamp-1 opacity-50 group-hover:opacity-100">
        {podcast.name}
      </p>
      <p className="text-xs text-primary font-semibold opacity-60 capitalize">
        {podcast.type}
      </p>
    </Link>
  );
};

export default ProfilePodcastCard;
