"use client";

import { getSelfStoriesAction } from "@/app/actions/storyActions";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import useAddStoryDialogsStore from "@/store/use-add-story-dialogs-store";
import { useQuery } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import { useCallback, useEffect, useRef, useState } from "react";
import StoryContent from "./story-content";
import StoryControls from "./story-controls";
import StoryProgress from "./story-progress";
import StoryViewers from "./story-viewers";

const STORY_DURATION = 7000; // 7 seconds per story

const StoriesReviewDialog = () => {
  const t = useTranslations("Index");
  const [currentStoryIndex, setCurrentStoryIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const progressIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const touchStartX = useRef<number | null>(null);

  const {
    isStoryReviewDialogOpen: isOpen,
    setIsStoryReviewDialogOpen: onOpenChange,
  } = useAddStoryDialogsStore();

  const { data } = useQuery({
    queryKey: ["self_stories"],
    queryFn: () =>
      getSelfStoriesAction({
        type: "podcaster",
      }),
    enabled: isOpen,
  });

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 640);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    if (isOpen && data?.stories && data?.stories.length > 0) {
      startProgressTimer();
    }
    return () => {
      if (progressIntervalRef.current) {
        clearInterval(progressIntervalRef.current);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen, data, currentStoryIndex, isPaused]);

  const startProgressTimer = useCallback(() => {
    if (isPaused) return;

    setProgress(0);
    if (progressIntervalRef.current) {
      clearInterval(progressIntervalRef.current);
    }

    const currentStory = data?.stories[currentStoryIndex];
    const duration =
      currentStory?.type === "video"
        ? (videoRef.current?.duration || 25) * 1000
        : STORY_DURATION;

    progressIntervalRef.current = setInterval(() => {
      setProgress((prevProgress) => {
        if (prevProgress >= 100) {
          clearInterval(progressIntervalRef.current!);
          moveToNextStory();
          return 0;
        }
        return prevProgress + (100 / duration) * 100; // Update every 100ms
      });
    }, 100);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data?.stories, currentStoryIndex, isPaused]);

  const moveToNextStory = useCallback(() => {
    if (data?.stories && currentStoryIndex < data?.stories.length - 1) {
      setCurrentStoryIndex(currentStoryIndex + 1);
      startProgressTimer();
    } else {
      onOpenChange(false);
      setCurrentStoryIndex(0);
    }
  }, [data?.stories, currentStoryIndex, onOpenChange, startProgressTimer]);

  const moveToPreviousStory = useCallback(() => {
    if (currentStoryIndex > 0) {
      setCurrentStoryIndex(currentStoryIndex - 1);
      startProgressTimer();
    }
  }, [currentStoryIndex, startProgressTimer]);

  const togglePause = useCallback(() => {
    setIsPaused(!isPaused);
    if (!isPaused) {
      clearInterval(progressIntervalRef.current!);
      if (videoRef.current) {
        videoRef.current.pause();
      }
    } else {
      startProgressTimer();
      if (videoRef.current) {
        videoRef.current.play();
      }
    }
  }, [isPaused, startProgressTimer]);

  const toggleMute = useCallback(() => {
    setIsMuted(!isMuted);
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
    }
  }, [isMuted]);

  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  }, []);

  const handleTouchEnd = useCallback(
    (e: React.TouchEvent) => {
      if (touchStartX.current === null) return;

      const touchEndX = e.changedTouches[0].clientX;
      const diff = touchStartX.current - touchEndX;

      if (Math.abs(diff) > 50) {
        // Threshold for swipe
        if (diff > 0) {
          moveToNextStory();
        } else {
          moveToPreviousStory();
        }
      }

      touchStartX.current = null;
    },
    [moveToNextStory, moveToPreviousStory]
  );

  if (!data?.stories || data.stories.length === 0) {
    return null;
  }

  const currentStory = data.stories[currentStoryIndex];

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent
        dialogClose={false}
        ref={containerRef}
        style={{
          backgroundColor: currentStory.color,
          borderColor: currentStory.color,
        }}
        className={cn("p-0 max-w-md w-full h-[80vh] flex flex-col")}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <DialogTitle className="sr-only">Story Viewer</DialogTitle>
        <StoryProgress
          stories={data.stories}
          currentIndex={currentStoryIndex}
          progress={progress}
          onStoryChange={setCurrentStoryIndex}
          onProgressStart={startProgressTimer}
        />
        <div className="relative flex-grow">
          <StoryContent
            story={currentStory}
            videoRef={videoRef}
            isMuted={isMuted}
            onVideoEnd={moveToNextStory}
            onVideoLoad={startProgressTimer}
          />
          <StoryViewers story={currentStory} />
        </div>
        <StoryControls
          currentIndex={currentStoryIndex}
          totalStories={data.stories.length}
          isVideo={currentStory.type === "video"}
          isPaused={isPaused}
          isMuted={isMuted}
          onPrevious={moveToPreviousStory}
          onNext={moveToNextStory}
          onTogglePause={togglePause}
          onToggleMute={toggleMute}
          isMobile={isMobile}
        />
      </DialogContent>
    </Dialog>
  );
};

export default StoriesReviewDialog;
