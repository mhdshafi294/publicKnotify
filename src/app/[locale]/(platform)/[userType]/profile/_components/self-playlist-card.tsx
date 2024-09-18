import React from "react";
import Image from "next/image";

import PlayLarge from "@/components/icons/play-large";
import { cn } from "@/lib/utils";
import { Link } from "@/navigation";
import { Playlist } from "@/types/podcast";

/**
 * Component for displaying a playlist card in the user's profile.
 *
 * @param {object} props - Component props.
 * @param {Playlist} props.playlist - The playlist details.
 * @param {string} props.userType - The type of user (e.g., "podcaster").
 * @returns {JSX.Element} The rendered playlist card.
 */
const SelfPlaylistCard = ({
  playlist,
  userType,
}: {
  playlist: Playlist;
  userType: string;
}) => {
  return (
    <Link href={`/${userType}/playlist/${playlist.id}`} className="w-full">
      <div className="aspect-square rounded-lg relative">
        <Image
          src={playlist.image}
          alt={playlist.name}
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
      <p className="mt-2 font-bold line-clamp-1 opacity-70 dark:opacity-50 group-hover:opacity-100 capitalize">
        {playlist.name}
      </p>
      <p className="text-xs text-primary font-semibold opacity-75">
        {playlist.podcasts_count} Podcasts
      </p>
    </Link>
  );
};

export default SelfPlaylistCard;
