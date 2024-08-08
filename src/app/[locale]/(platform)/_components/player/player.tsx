"use client";
import {
  getPodcastDetailsAction,
  savePlaybackAction,
} from "@/app/actions/podcastActions";
import { Button } from "@/components/ui/button";
import Loader from "@/components/ui/loader";
import { Skeleton } from "@/components/ui/skeleton";
import { Slider } from "@/components/ui/slider";
import { cn } from "@/lib/utils";
import { usePathname } from "@/navigation";
import usePlayerStore from "@/store/use-player-store";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Pause, Play, RotateCcw, RotateCw, Volume2, X } from "lucide-react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { ElementRef, Fragment, useEffect, useRef, useState } from "react";

const Player = () => {
  const podcastId = usePlayerStore((state) => state.podcastId);
  const setPodcastId = usePlayerStore((state) => state.setPodcastId);
  const isPlaying = usePlayerStore((state) => state.isRunning);
  const setIsPlaying = usePlayerStore((state) => state.setIsRunning);
  const toggleRunning = usePlayerStore((state) => state.toggleRunning);
  const duration = usePlayerStore((state) => state.duration);
  const currentTime = usePlayerStore((state) => state.currentTime);
  const setDuration = usePlayerStore((state) => state.setDuration);
  const setCurrentTime = usePlayerStore((state) => state.setCurrentTime);

  const { data: session } = useSession();
  const [volume, setVolume] = useState(1);
  const [sliderValue, setSliderValue] = useState([0]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const pathname = usePathname();
  const ref = useRef<ElementRef<"audio">>(null);

  const { data, isPending, isError } = useQuery({
    queryKey: ["podcast", podcastId],
    enabled: !!podcastId && !!session?.user?.type,
    queryFn: () =>
      getPodcastDetailsAction({
        type: session?.user?.type!,
        id: podcastId?.toString()!,
      }),
  });

  useEffect(() => {
    if (ref.current) {
      ref.current.volume = volume;
    }
  }, [volume]);

  useEffect(() => {
    const audioElement = ref.current;
    if (data && !isPending && !isError) {
      if (audioElement) {
        const handleCanPlayThrough = () => {
          setIsLoaded(true);
          setIsLoading(false);
          audioElement.play();
          setIsPlaying(true);
        };

        audioElement.addEventListener("canplaythrough", handleCanPlayThrough);
        audioElement.addEventListener("timeupdate", () =>
          setCurrentTime(audioElement.currentTime)
        );
        audioElement.addEventListener("loadeddata", () =>
          setDuration(audioElement.duration)
        );

        return () => {
          audioElement.removeEventListener(
            "canplaythrough",
            handleCanPlayThrough
          );
        };
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, isError, isPending]);

  useEffect(() => {
    setSliderValue([currentTime]);
  }, [currentTime]);

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (isPlaying && ref.current) {
      interval = setInterval(() => {
        if (ref.current) {
          setCurrentTime(ref.current.currentTime);
        }
      }, 1000); // Update currentTime every second
    } else if (!isPlaying && interval) {
      clearInterval(interval);
    }
    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [isPlaying]);

  const {
    data: savePlaybackActionData,
    mutate: server_savePlaybackAction,
    isPending: isSavePending,
  } = useMutation({
    mutationFn: savePlaybackAction,
    onSuccess: () => {},
    onError: () => {},
  });

  const togglePlayPause = async () => {
    const formData = new FormData();
    formData.append("current_position", currentTime.toString());
    formData.append("total_time", duration.toString());
    if (isLoading) return;

    setIsLoading(true);
    toggleRunning();
    if (ref.current) {
      if (!isPlaying) {
        try {
          await ref.current.play();
          setIsPlaying(true);
        } catch (error) {
          console.error("Error playing the audio:", error);
        }
      } else {
        ref.current.pause();
        setIsPlaying(false);
        try {
          server_savePlaybackAction({
            type: session?.user?.type!,
            id: podcastId?.toString()!,
            current_position: parseInt(currentTime.toString()),
            total_time: parseInt(duration.toString()),
          });
        } catch (error) {
          console.error("Error saving the playback:", error);
        }
      }
    }
    setIsLoading(false);
  };

  useEffect(() => {
    if (ref.current) {
      if (!isPlaying) {
        ref.current.pause();
      } else {
        ref.current.play();
      }
    }
  }, [isPlaying]);

  const handleTimeChange = (value: number[]) => {
    setSliderValue(value);
    if (ref.current) {
      ref.current.currentTime = value[0];
      setCurrentTime(value[0]);
    }
  };

  const skipTime = (seconds: number) => {
    if (ref.current) {
      const newTime = Math.min(
        Math.max(ref.current.currentTime + seconds, 0),
        duration
      );
      ref.current.currentTime = newTime;
      setCurrentTime(newTime);
      setSliderValue([newTime]);
    }
  };

  const formatTime = (time: number) => {
    const hours = Math.floor(time / 3600);
    const minutes = Math.floor((time % 3600) / 60);
    const seconds = Math.floor(time % 60);
    return `${
      hours === 0 ? "" : hours.toString().padStart(2, "0") + ":"
    }${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}`;
  };

  // Reset states when podcastId changes
  useEffect(() => {
    setCurrentTime(0);
    setDuration(0);
    setSliderValue([0]);
    setIsLoaded(false);
    setIsPlaying(false);
    if (ref.current) {
      ref.current.currentTime = 0;
      ref.current.pause();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [podcastId]);

  return (
    <Fragment>
      {/* <div className={cn("h-px w-full", podcastId ? "pb-24" : "pb-0")} /> */}
      <footer
        className={cn(
<<<<<<< HEAD
          "sticky transition-transform duration-300 ease-out bottom-0 p-2 gap-4 left-0 flex justify-between items-center h-20 bg-secondary w-full z-[999]",
          podcastId ? "translate-y-0" : "translate-y-full fixed"
=======
          "fixed transition-transform duration-300 ease-out bottom-0 p-2 gap-4 left-0 flex justify-between items-center h-20 bg-secondary w-full z-[999]",
          podcastId ? "translate-y-0" : "translate-y-full"
>>>>>>> 7c36c71289ecff8927e5f7aeb76e57dde086ecfa
        )}
      >
        {!isError && !isPending && data ? (
          <div className="hidden lg:flex justify-start items-center h-full gap-2">
            <div className="h-full">
              <Image
                className="object-cover w-full h-full max-w-[64px] max-h-[64px] bg-indigo-500 rounded"
                width={64}
                height={64}
                src={data.thumbnail}
                alt={data.name}
              />
            </div>
            <div>
              <h2 className="text-foreground lg:text-lg capitalize font-bold ">
                {data.name}
              </h2>
              <p className="text-foreground/20 capitalize text-sm">
                {data.podcaster.full_name}
              </p>
            </div>
            <audio ref={ref} src={data.podcast}></audio>
          </div>
        ) : (
          <div className="hidden lg:flex justify-start items-center h-full gap-2">
            <Skeleton className="size-[64px]" />
            <div className=" ms-1 space-y-2">
              <Skeleton className="w-[150px] h-3" />
              <Skeleton className="w-[100px] h-1.5" />
            </div>
          </div>
        )}

        <div className="h-full w-full lg:w-2/5 gap-1 max-w-screen-md flex flex-col justify-center items-center">
          <div className="flex w-full justify-between lg:justify-center items-center gap-2">
            {!isError && !isPending && data ? (
              <div className=" flex lg:hidden justify-start items-center max-h-10 gap-2">
                <div className="h-full">
                  <Image
                    className="object-cover size-10 bg-indigo-500 rounded"
                    width={64}
                    height={64}
                    src={data.thumbnail}
                    alt={data.name}
                  />
                </div>
                <div>
                  <h2 className="text-foreground text-xs capitalize font-bold text-ellipsis">
                    {data.name}
                  </h2>
                  <p className="text-foreground/20 capitalize text-xs">
                    {data.podcaster.full_name}
                  </p>
                </div>
                <audio ref={ref} src={data.podcast}></audio>
              </div>
            ) : (
              <div className="flex lg:hidden justify-start items-center h-full gap-2">
                <Skeleton className="size-[64px]" />
                <div className=" ms-1 space-y-2">
                  <Skeleton className="w-[150px] h-3" />
                  <Skeleton className="w-[100px] h-1.5" />
                </div>
              </div>
            )}
            <Button
              variant="ghost"
              size="icon"
              disabled={isPending || isError}
              onClick={() => skipTime(-10)}
              className="relative hover:bg-transparent hover:text-foreground/80"
            >
              <span className="text-[7px] lg:text-[10px] absolute top-1/2 start-1/2 rtl:translate-x-1/2 -translate-x-1/2 -translate-y-1/2">
                10
              </span>
              <RotateCcw
                className="size-6 lg:size-7 rtl:rotate-180"
                strokeWidth={1.2}
              />
            </Button>
            <Button
              onClick={togglePlayPause}
              variant="ghost"
              size="icon"
              disabled={isPending || isError || !isLoaded || isLoading}
              className="bg-foreground hover:scale-105 transition-all size-10 text-background flex justify-center items-center rounded-full"
            >
              {isLoading ? (
                <Loader className="fill-background" />
              ) : isPlaying ? (
                <Pause className="fill-background size-5" />
              ) : (
                <Play className="fill-background size-5" />
              )}
            </Button>
            <Button
              variant="ghost"
              size="icon"
              disabled={isPending || isError}
              onClick={() => skipTime(10)}
              className="relative hover:bg-transparent hover:text-foreground/80"
            >
              <span className="text-[7px] lg:text-[10px] absolute top-1/2 start-1/2 rtl:translate-x-1/2 -translate-x-1/2 -translate-y-1/2">
                10
              </span>
              <RotateCw
                className="size-6 lg:size-7 rtl:rotate-180"
                strokeWidth={1.2}
              />
            </Button>
          </div>
          <div className="w-full flex gap-3 justify-center items-center">
            <span className="text-xs">{formatTime(currentTime)}</span>
            <Slider
              className="w-full"
              max={duration}
              step={1}
              disabled={isPending || isError}
              value={sliderValue}
              onValueChange={handleTimeChange}
            />
            <span className="text-xs">{formatTime(duration)}</span>
          </div>
        </div>
        <div className="flex justify-start items-center">
          <div className="lg:flex gap-2 justify-start items-center hidden">
            <Volume2 />
            <Slider
              className="w-32"
              max={1}
              step={0.01}
              value={[volume]}
              onValueChange={(value) => setVolume(value[0])}
            />
          </div>
          {!pathname.includes("/podcast/") ? (
            <Button
              variant="ghost"
              size="icon"
              onClick={() => {
                try {
                  server_savePlaybackAction({
                    type: session?.user?.type!,
                    id: podcastId?.toString()!,
                    current_position: parseInt(currentTime.toString()),
                    total_time: parseInt(duration.toString()),
                  });
                } catch (error) {
                  console.error("Error saving the playback:", error);
                }
                setPodcastId(null);
              }}
              className="hover:bg-transparent hover:text-foreground/80 max-lg:size-3 max-lg:-translate-y-[200%]"
            >
              <X />
            </Button>
          ) : null}
        </div>
      </footer>
    </Fragment>
  );
};

export default Player;
