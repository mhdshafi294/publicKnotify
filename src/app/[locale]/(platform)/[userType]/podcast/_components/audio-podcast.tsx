"use client";

import { FC, useEffect, useState } from "react"; // Core React imports
import Image from "next/image"; // External dependency

import usePlayerStore from "@/store/use-player-store"; // Internal store import
import { PodcastDetails } from "@/types/podcast"; // Internal type import

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
    <div className="bg-secondary w-full lg:w-9/12 mx-auto space-y-4 p-6 rounded-xl mb-5">
      <div className="mx-auto aspect-video relative">
        <Image
          width={1920}
          height={500}
          className="size-full object-cover rounded-lg"
          src={podcast.background}
          alt={podcast.name}
        />
      </div>
      <div className="space-y-2">
        <h1 className="text-3xl capitalize font-bold">{podcast.name}</h1>
        <p className="text-greeny capitalize">{podcast.podcaster.full_name}</p>
      </div>
    </div>
  );
};

export default AudioPodcast;
