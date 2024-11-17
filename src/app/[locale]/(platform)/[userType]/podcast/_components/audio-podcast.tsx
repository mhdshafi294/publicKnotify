"use client";

import { FC, useEffect, useState } from "react"; // Core React imports
import Image from "next/image"; // External dependency

import usePlayerStore from "@/store/use-player-store"; // Internal store import
import { PodcastDetails } from "@/types/podcast"; // Internal type import
import { Badge } from "@/components/ui/badge";
import { Link } from "@/navigation";

// Props interface for AudioPodcast
interface PropsType {
  podcast: PodcastDetails;
}

/**
 * AudioPodcast Component
 *
 * This component displays details of an audio podcast, including the background image,
 * podcast name, and podcaster's full name. It also manages the state for playing the podcast
 * using a player store.
 *
 * @param {Object} props - Component properties.
 * @param {PodcastDetails} props.podcast - The details of the podcast to display.
 * @returns {JSX.Element} The rendered component with podcast details.
 */
const AudioPodcast: FC<PropsType> = ({ podcast }) => {
  const [isMounted, setIsMounted] = useState(false);
  const setPodcastId = usePlayerStore((state) => state.setPodcastId);
  const setIsRunning = usePlayerStore((state) => state.setIsRunning);

  useEffect(() => {
    if (!isMounted) {
      setIsMounted(true);
    }
  }, [isMounted]);

  useEffect(() => {
    setPodcastId(podcast.id);
    setIsRunning(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [podcast.id]);

  return (
    <div className="bg-card-secondary space-y-4 py-6 pt-0 px-0 rounded-xl mb-5 w-full">
      <div className="mx-auto aspect-video relative">
        <Image
          width={1920}
          height={500}
          className="size-full object-cover rounded-t-lg"
          src={podcast.background || "/podcast-filler.webp"}
          alt={podcast.name}
        />
      </div>
      <div className="flex justify-between items-center px-6">
        <div className="space-y-2">
          <div className="flex items-end gap-5 w-full">
            <h1 className="text-2xl md:text-3xl capitalize font-bold">
              {podcast.name}
            </h1>
            <div className="flex justify-start items-center flex-wrap gap-1">
              {podcast.hashTags.map((tag) => (
                <Badge
                  className="bg-greeny/20 text-greeny hover:bg-greeny/30 hover:text-greeny cursor-default"
                  key={tag.id}
                >
                  #{tag.name}
                </Badge>
              ))}
            </div>
          </div>
          <Link
            href={`/podcaster/profile/${podcast.podcaster.id}`}
            className="inline-block text-greeny/90 font-bold capitalize hover:underline"
          >
            {podcast.podcaster.full_name}
          </Link>

          <p className="text-sm opacity-70">{podcast.summary}</p>
          <p className="text-xs opacity-70 dark:opacity-50">
            {podcast.created_at.split(" ")[0]}
          </p>
        </div>
      </div>
    </div>
  );
};

export default AudioPodcast;
