"use client";

// External Imports
import { useEffect, useRef, useState, Fragment, ElementRef } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { Pause, Play, RotateCcw, RotateCw, Volume2, X } from "lucide-react";

// Internal Imports
import { Button } from "@/components/ui/button";
import Loader from "@/components/ui/loader";
import { Skeleton } from "@/components/ui/skeleton";
import { Slider } from "@/components/ui/slider";
import { cn } from "@/lib/utils";
import { usePathname } from "@/navigation";
import usePlayerStore from "@/store/use-player-store";
import {
  getPodcastDetailsAction,
  savePlaybackAction,
} from "@/app/actions/podcastActions";

/**
 * Player Component
 *
 * This component handles the podcast player functionality, including play/pause,
 * volume control, and saving playback progress to the server.
 */
const Player = () => {
  const podcastId = usePlayerStore((state) => state.podcastId); // Get podcast ID from the store
  const setPodcastId = usePlayerStore((state) => state.setPodcastId); // Set podcast ID in the store
  const isPlaying = usePlayerStore((state) => state.isRunning); // Get play/pause state from the store
  const setIsPlaying = usePlayerStore((state) => state.setIsRunning); // Set play/pause state in the store
  const toggleRunning = usePlayerStore((state) => state.toggleRunning); // Toggle play/pause state
  const duration = usePlayerStore((state) => state.duration); // Get duration of the podcast
  const currentTime = usePlayerStore((state) => state.currentTime); // Get current time of playback
  const setDuration = usePlayerStore((state) => state.setDuration); // Set duration in the store
  const setCurrentTime = usePlayerStore((state) => state.setCurrentTime); // Set current time in the store

  const { data: session } = useSession(); // Get session data using NextAuth
  const [volume, setVolume] = useState(1); // State for volume control
  const [sliderValue, setSliderValue] = useState([0]); // State for the slider value
  const [isLoaded, setIsLoaded] = useState(false); // State to check if the podcast is loaded
  const [isLoading, setIsLoading] = useState(false); // State to manage loading state
  const pathname = usePathname(); // Get current path
  const queryClient = useQueryClient(); // React Query Client

  const ref = useRef<ElementRef<"audio">>(null); // Ref for the audio element

  // Query to fetch podcast details
  const { data, isPending, isError } = useQuery({
    queryKey: ["podcast", podcastId],
    gcTime: 0,
    enabled: !!podcastId && !!session?.user?.type,
    queryFn: () =>
      getPodcastDetailsAction({
        type: session?.user?.type!,
        id: podcastId?.toString()!,
      }),
  });

  // Effect to set volume when it changes
  useEffect(() => {
    if (ref.current) {
      ref.current.volume = volume;
    }
  }, [volume, data]);

  // Effect to handle podcast loading and playback
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
        audioElement.addEventListener("loadeddata", () => {
          setDuration(audioElement.duration);
          audioElement.currentTime =
            data?.playback_position?.current_position || 0;
          setCurrentTime(data?.playback_position?.current_position || 0);
          setSliderValue([data?.playback_position?.current_position || 0]);
        });

        return () => {
          audioElement.removeEventListener(
            "canplaythrough",
            handleCanPlayThrough
          );
        };
      }
    }
  }, [data, isError, isPending, setCurrentTime, setDuration, setIsPlaying]);

  // Effect to update slider value when currentTime changes
  useEffect(() => {
    setSliderValue([currentTime]);
  }, [currentTime]);

  // Effect to manage playback progress update every second
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
  }, [isPlaying, setCurrentTime]);

  // Mutation to save playback progress to the server
  const { mutate: server_savePlaybackAction, isPending: isSavePending } =
    useMutation({
      mutationFn: savePlaybackAction,
      onSuccess: () => {},
      onError: () => {},
    });

  // Function to toggle play/pause
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

  // Effect to handle play/pause state change
  useEffect(() => {
    if (ref.current) {
      if (!isPlaying) {
        ref.current.pause();
      } else {
        ref.current.play();
      }
    }
  }, [isPlaying]);

  // Function to handle slider time change
  const handleTimeChange = (value: number[]) => {
    setSliderValue(value);
    if (ref.current) {
      ref.current.currentTime = value[0];
      setCurrentTime(value[0]);
    }
  };

  // Function to skip time by a specific number of seconds
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

  // Function to format time into HH:MM:SS format
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

  // Effect to reset states when podcastId changes
  useEffect(() => {
    setCurrentTime(0);
    setSliderValue([0]);
    setDuration(0);
    setIsLoaded(false);
    setIsPlaying(false);
    if (ref.current) {
      ref.current.currentTime = 0;
      ref.current.pause();
    }
  }, [podcastId, setCurrentTime, setDuration, setIsPlaying]);

  return (
    <Fragment>
      <footer
        className={cn(
          "sticky transition-transform duration-300 ease-out bottom-0 p-2 gap-4 left-0 flex justify-between items-center h-20 bg-[#1A1A1A] w-full z-[999]",
          podcastId ? "translate-y-0" : "translate-y-full fixed"
        )}
      >
        {/* Display podcast information if available */}
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
            {/* Display podcast information for smaller screens */}
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
            {/* Buttons for playback controls */}
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
          {/* Button to close the player */}
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
