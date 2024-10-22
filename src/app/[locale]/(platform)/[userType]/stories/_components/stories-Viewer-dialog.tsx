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
import { markStoryReadAction } from "@/app/actions/storiesActions";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import debounce from "lodash/debounce";
import StoryHeader from "./story-header";

const STORY_DURATION = 10000; // 10 seconds per story

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
  initialStoryIndex: number;
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
  initialStoryIndex,
  onIndexChange,
  onFinish,
}) => {
  const t = useTranslations("Index");
  const [currentStoryIndex, setCurrentStoryIndex] = useState(initialStoryIndex);
  const [progress, setProgress] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const progressIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const touchStartX = useRef<number | null>(null);
  const touchStartY = useRef<number | null>(null);

  const { data: session } = useSession();
  const queryClient = useQueryClient();

  const {
    isStoryReviewDialogOpen: isOpen,
    setIsStoryReviewDialogOpen: onOpenChange,
  } = useAddStoryDialogsStore();

  const { mutate: server_markStoryRead } = useMutation({
    mutationFn: markStoryReadAction,
    onMutate: async (variables) => {
      await queryClient.cancelQueries({ queryKey: ["trending_stories"] });

      const previousStories = queryClient.getQueryData([
        "trending_stories",
        { type: session?.user?.type },
      ]);

      queryClient.setQueryData(
        ["trending_stories", { type: session?.user?.type }],
        (old: any) => {
          return {
            ...old,
            pages: old.pages.map((page: any) => ({
              ...page,
              stories: page.stories.map((storyGroup: any) => ({
                ...storyGroup,
                stories: storyGroup.stories.map((story: Story) =>
                  story.id.toString() === variables.id
                    ? { ...story, is_viewd: true }
                    : story
                ),
              })),
            })),
          };
        }
      );

      return { previousStories };
    },
    onError: (err, variables, context) => {
      queryClient.setQueryData(["trending_stories"], context?.previousStories);
      console.error("Failed to mark story as read:", err);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["trending_stories"] });
    },
  });

  const markStoryRead = useCallback(
    debounce((storyId: string) => {
      if (session?.user?.type && session?.user?.type !== "podcaster") {
        server_markStoryRead({ id: storyId, type: session.user.type });
      }
    }, 300),
    [server_markStoryRead, session?.user?.type]
  );

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
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

    if (currentStory.type === "text" && !isSelfStory(currentStory)) {
      markStoryRead(currentStory.id.toString());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [storyGroup.stories, currentStoryIndex, isPaused, markStoryRead]);

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

      if (Math.abs(diffX) > Math.abs(diffY)) {
        if (Math.abs(diffX) > 50) {
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
        dir="ltr"
        dialogClose={false}
        ref={containerRef}
        style={{
          backgroundColor: currentStory.color ? currentStory.color : "#000000",
          borderColor: currentStory.color ? currentStory.color : "#000000",
        }}
        className={cn("p-0 max-w-md w-full h-[80vh] flex flex-col")}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <DialogTitle className="sr-only">Story Viewer</DialogTitle>

        <div className="relative flex-grow">
          <StoryProgress
            stories={storyGroup.stories as Story[]}
            currentIndex={currentStoryIndex}
            progress={progress}
            onStoryChange={setCurrentStoryIndex}
            onProgressStart={startProgressTimer}
          />
          <StoryHeader
            podcaster={storyGroup.podcaster}
            createdAt={currentStory.created_at}
          />
          <StoryContent
            story={currentStory}
            videoRef={videoRef}
            isMuted={isMuted}
            onVideoEnd={moveToNextStory}
            onVideoLoad={startProgressTimer}
            markStoryRead={markStoryRead}
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
