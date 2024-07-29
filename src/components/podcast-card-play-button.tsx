"use client";

import { Pause, Play } from "lucide-react";
import { Button } from "./ui/button";
import usePlayerStore from "@/store/use-player-store";

type PropsType = {
  type: "audio" | "video";
  podcastId: number;
};

const PodcastCardPlayButton: React.FC<PropsType> = ({ podcastId, type }) => {
  const setPodcastId = usePlayerStore((state) => state.setPodcastId);
  const selectedPodcastId = usePlayerStore((state) => state.podcastId);
  const isRunning = usePlayerStore((state) => state.isRunning);
  const setIsRunning = usePlayerStore((state) => state.setIsRunning);
  return (
    <Button
      size="icon"
      onClick={(e) => {
        e.stopPropagation();
        if (type === "audio") {
          if (podcastId === selectedPodcastId) {
            setIsRunning(!isRunning);
          } else {
            setIsRunning(true);
            setPodcastId(podcastId);
          }
        }
      }}
      className="absolute shadow group-focus: rounded-full opacity-0 group-hover:opacity-100 group-focus:opacity-100 focus-visible:opacity-100 translate-y-4 transition-all duration-300 group-hover:translate-y-0 group-focus:translate-y-0 focus-visible:translate-y-0 bottom-4 end-4"
    >
      {selectedPodcastId === podcastId ? (
        isRunning ? (
          <Pause className="size-5 fill-foreground" />
        ) : (
          <Play className="size-5 fill-foreground" />
        )
      ) : (
        <Play className="size-5 fill-foreground" />
      )}
    </Button>
  );
};

export default PodcastCardPlayButton;
