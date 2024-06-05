"use client";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { cn } from "@/lib/utils";
import usePlayerStore from "@/store/use-player-store";
import { Play, RotateCcw, RotateCw, Volume2, X } from "lucide-react";
import Image from "next/image";
import { Fragment } from "react";

const Player = () => {
  const podcastId = usePlayerStore((state) => state.podcastId);
  const setPodcastId = usePlayerStore((state) => state.setPodcastId);
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
        <div className="flex justify-start items-center h-full gap-2">
          <div className="h-full">
            <Image
              className="object-contain h-full bg-indigo-500 rounded"
              width={64}
              height={64}
              src="/logo.svg"
              alt="test"
            />
          </div>
          <div>
            <h2 className="text-foreground text-lg capitalize font-bold">
              podcast name
            </h2>
            <p className="text-foreground/20 capitalize text-sm">
              podcaster name
            </p>
          </div>
        </div>
        <div className="h-full w-2/5 gap-1 max-w-screen-md flex flex-col justify-center items-center">
          <div className="flex justify-center items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              className="relative hover:bg-transparent hover:text-foreground/80"
            >
              <span className="text-[10px] absolute top-1/2 start-1/2 rtl:translate-x-1/2 -translate-x-1/2 -translate-y-1/2">
                10
              </span>
              <RotateCcw className="size-7 rtl:rotate-180" strokeWidth={1.2} />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="bg-foreground hover:scale-105 transition-all size-10 text-background flex justify-center items-center rounded-full"
            >
              <Play className="fill-background size-5" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="relative hover:bg-transparent hover:text-foreground/80"
            >
              <span className="text-[10px] absolute top-1/2 start-1/2 rtl:translate-x-1/2 -translate-x-1/2 -translate-y-1/2">
                10
              </span>
              <RotateCw className="size-7 rtl:rotate-180" strokeWidth={1.2} />
            </Button>
          </div>
          <div className="w-full flex gap-3 justify-center items-center">
            <span className="text-xs">00:00:00</span>
            <Slider className="w-full" max={100} step={1} />
            <span className="text-xs">00:00:00</span>
          </div>
        </div>
        <div className="flex gap-2 justify-start items-center">
          <Volume2 />
          <div className="h-1 w-40 bg-red-500"></div>
        </div>
      </footer>
    </Fragment>
  );
};

export default Player;
