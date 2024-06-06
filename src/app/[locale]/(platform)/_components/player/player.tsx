"use client";
import { getPodcasDataAction } from "@/app/actions/podcastActions";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { cn } from "@/lib/utils";
import usePlayerStore from "@/store/use-player-store";
import { useQuery } from "@tanstack/react-query";
import { Play, Pause, RotateCcw, RotateCw, Volume2, X } from "lucide-react";
import Image from "next/image";
import { ElementRef, Fragment, useEffect, useRef, useState } from "react";

const Player = () => {
  const podcastId = usePlayerStore((state) => state.podcastId);
  const setPodcastId = usePlayerStore((state) => state.setPodcastId);
  const ref = useRef<ElementRef<"audio">>(null);
  const { data, isPending, isError } = useQuery({
    queryKey: ["podcast", podcastId],
    enabled: !!podcastId,
    queryFn: () => getPodcasDataAction({ type: "user", id: podcastId! }),
  });
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(1);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [sliderValue, setSliderValue] = useState([0]);

  useEffect(() => {
    if (ref.current) {
      ref.current.volume = volume;
    }
  }, [volume]);

  useEffect(() => {
    const audioElement = ref.current;
    if (data && !isPending && !isError) {
      if (audioElement) {
        audioElement.play();
        setIsPlaying(true);
        const updateCurrentTime = () =>
          setCurrentTime(audioElement.currentTime);
        const setAudioData = () => {
          setDuration(audioElement.duration);
        };
        audioElement.addEventListener("timeupdate", updateCurrentTime);
        audioElement.addEventListener("loadeddata", setAudioData);
        return () => {
          audioElement.removeEventListener("timeupdate", updateCurrentTime);
          audioElement.removeEventListener("loadeddata", setAudioData);
        };
      }
    }
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

  const togglePlayPause = () => {
    if (ref.current) {
      if (isPlaying) {
        ref.current.pause();
      } else {
        ref.current.play();
      }
      setIsPlaying((prev) => !prev);
    }
  };

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
    return `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
  };

  return (
    <Fragment>
      <div className={cn("h-px w-full", podcastId ? "pb-24" : "pb-5")} />
      <footer
        className={cn(
          "fixed transition-transform duration-300 ease-out bottom-0 p-2 gap-4 left-0 flex justify-between items-center h-20 bg-secondary w-full",
          podcastId ? "translate-y-0" : "translate-y-full"
        )}
      >
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setPodcastId(null)}
          className="absolute end-0 top-0 hover:bg-transparent hover:text-foreground/80"
        >
          <X />
        </Button>
        {!isError && !isPending && data ? (
          <div className="flex justify-start items-center h-full gap-2">
            <div className="h-full">
              <Image
                className="object-cover w-full h-full bg-indigo-500 rounded"
                width={64}
                height={64}
                src={data.background}
                alt="test"
              />
            </div>
            <div>
              <h2 className="text-foreground text-lg capitalize font-bold">
                {data.name}
              </h2>
              <p className="text-foreground/20 capitalize text-sm">
                {data.podcaster.full_name}
              </p>
            </div>
            <audio ref={ref} src={data.podcast}></audio>
          </div>
        ) : null}

        <div className="h-full w-2/5 gap-1 max-w-screen-md flex flex-col justify-center items-center">
          <div className="flex justify-center items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => skipTime(-10)}
              className="relative hover:bg-transparent hover:text-foreground/80"
            >
              <span className="text-[10px] absolute top-1/2 start-1/2 rtl:translate-x-1/2 -translate-x-1/2 -translate-y-1/2">
                10
              </span>
              <RotateCcw className="size-7 rtl:rotate-180" strokeWidth={1.2} />
            </Button>
            <Button
              onClick={togglePlayPause}
              variant="ghost"
              size="icon"
              className="bg-foreground hover:scale-105 transition-all size-10 text-background flex justify-center items-center rounded-full"
            >
              {isPlaying ? (
                <Pause className="fill-background size-5" />
              ) : (
                <Play className="fill-background size-5" />
              )}
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => skipTime(10)}
              className="relative hover:bg-transparent hover:text-foreground/80"
            >
              <span className="text-[10px] absolute top-1/2 start-1/2 rtl:translate-x-1/2 -translate-x-1/2 -translate-y-1/2">
                10
              </span>
              <RotateCw className="size-7 rtl:rotate-180" strokeWidth={1.2} />
            </Button>
          </div>
          <div className="w-full flex gap-3 justify-center items-center">
            <span className="text-xs">{formatTime(currentTime)}</span>
            <Slider
              className="w-full"
              max={duration}
              step={1}
              value={sliderValue}
              onValueChange={handleTimeChange}
            />
            <span className="text-xs">{formatTime(duration)}</span>
          </div>
        </div>
        <div className="flex gap-2 justify-start items-center">
          <Volume2 />
          <Slider
            className="w-40"
            max={1}
            step={0.01}
            value={[volume]}
            onValueChange={(value) => setVolume(value[0])}
          />
        </div>
      </footer>
    </Fragment>
  );
};

export default Player;
