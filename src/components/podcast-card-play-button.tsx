"use client";

import { Pause, Play } from "lucide-react";
import { Button } from "./ui/button";
import usePlayerStore from "@/store/use-player-store";
import { useMutation } from "@tanstack/react-query";
import { savePlaybackAction } from "@/app/actions/podcastActions";
import { useSession } from "next-auth/react";

type PropsType = {
  type: "audio" | "video";
  podcastId: number;
};

const PodcastCardPlayButton: React.FC<PropsType> = ({ podcastId, type }) => {
  const setPodcastId = usePlayerStore((state) => state.setPodcastId);
  const selectedPodcastId = usePlayerStore((state) => state.podcastId);
  const isRunning = usePlayerStore((state) => state.isRunning);
  const setIsRunning = usePlayerStore((state) => state.setIsRunning);
  const duration = usePlayerStore((state) => state.duration);
  const currentTime = usePlayerStore((state) => state.currentTime);
  const setDuration = usePlayerStore((state) => state.setDuration);
  const setCurrentTime = usePlayerStore((state) => state.setCurrentTime);

  const { data: session } = useSession();

  const {
    data: savePlaybackActionData,
    mutate: server_savePlaybackAction,
    isPending: isSavePending,
  } = useMutation({
    mutationFn: savePlaybackAction,
    onSuccess: () => {},
    onError: () => {},
  });

  return (
    <Button
      size="icon"
      onClick={(e) => {
        e.stopPropagation();
        if (type === "audio") {
          if (podcastId === selectedPodcastId) {
            setIsRunning(!isRunning);
          } else {
            try {
              server_savePlaybackAction({
                type: session?.user?.type!,
                id: podcastId?.toString()!,
                current_position: parseInt(currentTime.toString()),
                total_time: parseInt(duration.toString()),
              });
              setDuration(0);
              setCurrentTime(0);
            } catch (error) {
              console.error("Error saving the playback:", error);
            }
            setIsRunning(true);
            setPodcastId(podcastId);
          }
        }
      }}
      className="absolute shadow group-focus: rounded-full opacity-0 group-hover:opacity-100 group-focus:opacity-100 focus-visible:opacity-100 translate-y-4 transition-all duration-300 group-hover:translate-y-0 group-focus:translate-y-0 focus-visible:translate-y-0 bottom-16 end-6 z-20"
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
