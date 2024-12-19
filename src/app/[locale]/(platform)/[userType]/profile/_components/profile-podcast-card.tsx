"use client";

import PlayLarge from "@/components/icons/play-large";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";
import { Link } from "@/navigation";
import { Podcast } from "@/types/podcast";
import Image from "next/image";

/**
 * Component for displaying a podcast card on a user's profile.
 *
 * @param {object} props - Component props.
 * @param {Podcast} props.podcast - The podcast data to display.
 * @param {string} props.userType - The type of the user (e.g., "podcaster").
 * @returns {JSX.Element} The rendered component.
 */
const ProfilePodcastCard = ({
  podcast,
  userType,
}: {
  podcast: Podcast;
  userType: string;
}) => {
  // Calculate the playback progress as a percentage.
  const progress = podcast.playback_position
    ? Math.floor(
        (podcast.playback_position.current_position /
          podcast.playback_position.total_time) *
          100
      )
    : 0;

  return (
    <Link href={`/${userType}/podcast/${podcast?.id}`} className="w-full">
      <div className="aspect-square rounded-lg relative">
        {/* Conditional rendering to handle missing thumbnails */}
        <Image
          src={podcast.thumbnail || "/default-thumbnail.jpg"} // Fallback to a default image if thumbnail is missing
          alt={podcast.name}
          className="object-cover rounded-lg"
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        <div className="absolute inset-0 bg-black/20" />
        <PlayLarge
          className={cn(
            "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-70 dark:opacity-50 group-hover:opacity-100 duration-200"
          )}
        />
      </div>
      {/* Display the playback progress */}
      <Progress value={progress} className="w-full h-2 mt-1" />

      {/* Podcast name and type */}
      <p className="mt-2 font-bold line-clamp-1 opacity-70 dark:opacity-50 group-hover:opacity-100">
        {podcast.name}
      </p>
      <p className="text-xs text-primary font-semibold opacity-60 capitalize">
        {podcast.type}
      </p>
    </Link>
  );
};

export default ProfilePodcastCard;
