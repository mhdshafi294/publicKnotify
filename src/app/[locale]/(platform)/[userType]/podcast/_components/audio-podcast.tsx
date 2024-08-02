"use client";
import usePlayerStore from "@/store/use-player-store";
import { PodcastDetails } from "@/types/podcast";
import Image from "next/image";
import { FC, useEffect, useState } from "react";

type PropsType = {
  podcast: PodcastDetails;
};
const AudioPodcast: FC<PropsType> = ({ podcast }) => {
  const [isMounted, setIsMounted] = useState(false);
  const setPodcastId = usePlayerStore((state) => state.setPodcastId);
  const setIsRunning = usePlayerStore((state) => state.setIsRunning);

  useEffect(() => {
    if (!isMounted) {
      setIsMounted(true);
    }
  }, []);

  useEffect(() => {
    setPodcastId(podcast.id);
    setIsRunning(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setPodcastId(podcast.id);
    setIsRunning(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [podcast.id]);

  return (
    <div className="bg-secondary w-full lg:w-10/12 mx-auto space-y-4 p-6 rounded-xl">
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
