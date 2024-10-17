"use client";

import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import useAddStoryDialogsStore from "@/store/use-add-story-dialogs-store";
import { SelfStory, Story } from "@/types/stories";
import { useTranslations } from "next-intl";
import { useCallback, useEffect, useRef, useState } from "react";
import StoryContent from "./story-content";
import StoryControls from "./story-controls";
import StoryProgress from "./story-progress";
import StoryViewers from "./story-viewers";

const STORY_DURATION = 7000; // 7 seconds per story

type StoriesViewerDialogProps = {
  storyGroup: {
    podcaster: {
      id: number;
      name: string;
      image: string;
    };
    stories: (Story | SelfStory)[];
  };
  allStories: {
    podcaster: {
      id: number;
      name: string;
      image: string;
    };
    stories: (Story | SelfStory)[];
  }[];
  currentIndex: number;
  onIndexChange: (index: number) => void;
  onFinish: () => void;
};

const isSelfStory = (story: Story | SelfStory): story is SelfStory => {
  return "viewers_count" in story;
};

const StoriesViewerDialog: React.FC<StoriesViewerDialogProps> = ({
  storyGroup,
  allStories,
  currentIndex,
  onIndexChange,
  onFinish,
}) => {
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
  const touchStartY = useRef<number | null>(null);

  const {
    isStoryReviewDialogOpen: isOpen,
    setIsStoryReviewDialogOpen: onOpenChange,
  } = useAddStoryDialogsStore();

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
    if (isOpen && storyGroup.stories && storyGroup.stories.length > 0) {
      startProgressTimer();
    }
    return () => {
      if (progressIntervalRef.current) {
        clearInterval(progressIntervalRef.current);
      }
    };
  }, [isOpen, storyGroup, currentStoryIndex, isPaused]);

  const startProgressTimer = useCallback(() => {
    if (isPaused) return;

    setProgress(0);
    if (progressIntervalRef.current) {
      clearInterval(progressIntervalRef.current);
    }

    const currentStory = storyGroup.stories[currentStoryIndex];
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
  }, [storyGroup.stories, currentStoryIndex, isPaused]);

  const moveToNextStory = useCallback(() => {
    if (currentStoryIndex < storyGroup.stories.length - 1) {
      setCurrentStoryIndex(currentStoryIndex + 1);
      startProgressTimer();
    } else if (currentIndex < allStories.length - 1) {
      onIndexChange(currentIndex + 1);
      setCurrentStoryIndex(0);
    } else {
      onOpenChange(false);
      setCurrentStoryIndex(0);
      onFinish();
    }
  }, [
    currentStoryIndex,
    storyGroup.stories.length,
    currentIndex,
    allStories.length,
    onIndexChange,
    onOpenChange,
    onFinish,
    startProgressTimer,
  ]);

  const moveToPreviousStory = useCallback(() => {
    if (currentStoryIndex > 0) {
      setCurrentStoryIndex(currentStoryIndex - 1);
      startProgressTimer();
    } else if (currentIndex > 0) {
      onIndexChange(currentIndex - 1);
      setCurrentStoryIndex(allStories[currentIndex - 1].stories.length - 1);
    }
  }, [
    currentStoryIndex,
    currentIndex,
    onIndexChange,
    allStories,
    startProgressTimer,
  ]);

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
    touchStartY.current = e.touches[0].clientY;
  }, []);

  const handleTouchEnd = useCallback(
    (e: React.TouchEvent) => {
      if (touchStartX.current === null || touchStartY.current === null) return;

      const touchEndX = e.changedTouches[0].clientX;
      const touchEndY = e.changedTouches[0].clientY;
      const diffX = touchStartX.current - touchEndX;
      const diffY = touchStartY.current - touchEndY;

      // Check if the swipe is more horizontal than vertical
      if (Math.abs(diffX) > Math.abs(diffY)) {
        if (Math.abs(diffX) > 50) {
          // Threshold for swipe
          if (diffX > 0) {
            moveToNextStory();
          } else {
            moveToPreviousStory();
          }
        }
      }

      touchStartX.current = null;
      touchStartY.current = null;
    },
    [moveToNextStory, moveToPreviousStory]
  );

  if (!storyGroup.stories || storyGroup.stories.length === 0) {
    return null;
  }

  const currentStory = storyGroup.stories[currentStoryIndex];

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
          stories={storyGroup.stories as Story[]}
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
          {isSelfStory(currentStory) && <StoryViewers story={currentStory} />}
        </div>
        <StoryControls
          currentIndex={currentStoryIndex}
          totalStories={storyGroup.stories.length}
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

export default StoriesViewerDialog;
