"use client";

import { markStoryReadAction } from "@/app/actions/storiesActions";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import useAddStoryDialogsStore from "@/store/use-add-story-dialogs-store";
import { SelfStory, Story } from "@/types/stories";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import debounce from "lodash/debounce";
import { useSession } from "next-auth/react";
import { useTranslations } from "next-intl";
import React, {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import StoryContent from "./story-content";
import StoryControls from "./story-controls";
import StoryHeader from "./story-header";
import StoryProgress from "./story-progress";
import StoryViewers from "./story-viewers";

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
  fromProfile?: {
    isInProfile: boolean;
    stories: Story[];
    setStories: Dispatch<SetStateAction<Story[] | undefined>>;
  };
};

const isSelfStory = (story: Story | SelfStory): story is SelfStory => {
  return "viewers_count" in story;
};

const StoriesPlayerDialog: React.FC<StoriesViewerDialogProps> = ({
  storyGroup,
  allStories,
  currentIndex,
  initialStoryIndex,
  onIndexChange,
  onFinish,
  fromProfile,
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
  const storyStartTimeRef = useRef<number | null>(null);
  const markedAsReadRef = useRef<Set<string>>(new Set());
  const storyDurationRef = useRef<number>(STORY_DURATION);

  const { data: session } = useSession();
  const queryClient = useQueryClient();

  const {
    isStoryReviewDialogOpen: isOpen,
    setIsStoryReviewDialogOpen: onOpenChange,
  } = useAddStoryDialogsStore();

  const { mutate: server_markStoryRead } = useMutation({
    mutationFn: markStoryReadAction,
    onMutate: async (variables) => {
      if (markedAsReadRef.current.has(variables.id)) {
        return; // Skip if already marked as read
      }
      markedAsReadRef.current.add(variables.id);

      if (fromProfile && fromProfile.isInProfile) {
        fromProfile.setStories((prev) =>
          prev?.map((story) =>
            story.id.toString() === variables.id
              ? { ...story, is_viewd: true }
              : story
          )
        );
      } else {
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
      }
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
      if (
        session?.user?.type &&
        session?.user?.type !== "podcaster" &&
        !markedAsReadRef.current.has(storyId)
      ) {
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

  const startProgressTimer = useCallback(() => {
    if (isPaused) return;

    setProgress(0);
    if (progressIntervalRef.current) {
      clearInterval(progressIntervalRef.current);
    }

    const currentStory = storyGroup.stories[currentStoryIndex];
    storyDurationRef.current =
      currentStory?.type === "video"
        ? (videoRef.current?.duration || 25) * 1000
        : STORY_DURATION;

    storyStartTimeRef.current = Date.now();

    progressIntervalRef.current = setInterval(() => {
      const elapsedTime = Date.now() - (storyStartTimeRef.current || 0);
      const newProgress = (elapsedTime / storyDurationRef.current) * 100;

      if (newProgress >= 100) {
        clearInterval(progressIntervalRef.current!);
        moveToNextStory();
      } else {
        setProgress(newProgress);
      }
    }, 100);

    if (currentStory.type === "text" && !isSelfStory(currentStory)) {
      const markAsReadTimeout = setTimeout(() => {
        markStoryRead(currentStory.id.toString());
      }, 1000); // Increased to 1 second for better user experience

      return () => clearTimeout(markAsReadTimeout);
    }
  }, [isPaused, storyGroup.stories, currentStoryIndex, markStoryRead]);

  useEffect(() => {
    if (isOpen && storyGroup.stories && storyGroup.stories.length > 0) {
      startProgressTimer();
    }

    return () => {
      if (progressIntervalRef.current) {
        clearInterval(progressIntervalRef.current);
      }
    };
  }, [isOpen, storyGroup, currentStoryIndex, isPaused, startProgressTimer]);

  const moveToNextStory = useCallback(() => {
    if (currentStoryIndex < storyGroup.stories.length - 1) {
      setCurrentStoryIndex(currentStoryIndex + 1);
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
  ]);

  const moveToPreviousStory = useCallback(() => {
    if (currentStoryIndex > 0) {
      setCurrentStoryIndex(currentStoryIndex - 1);
    } else if (currentIndex > 0) {
      onIndexChange(currentIndex - 1);
      setCurrentStoryIndex(allStories[currentIndex - 1].stories.length - 1);
    }
  }, [currentStoryIndex, currentIndex, onIndexChange, allStories]);

  const togglePause = useCallback(() => {
    setIsPaused((prevIsPaused) => {
      if (prevIsPaused) {
        storyStartTimeRef.current =
          Date.now() - (storyStartTimeRef.current || 0);
        startProgressTimer();
        if (videoRef.current) {
          videoRef.current.play();
        }
      } else {
        if (progressIntervalRef.current) {
          clearInterval(progressIntervalRef.current);
          if (videoRef.current) {
            videoRef.current.pause();
          }
        }
      }
      return !prevIsPaused;
    });
  }, [startProgressTimer]);

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
          backgroundColor: currentStory?.color ? currentStory.color : "#000000",
          borderColor: currentStory?.color ? currentStory.color : "#000000",
        }}
        className={cn("p-0 max-w-md w-full h-[80vh] flex flex-col")}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <DialogTitle className="sr-only">Story Viewer</DialogTitle>

        <div className="relative flex-grow">
          <MemoizedStoryProgress
            stories={storyGroup.stories as Story[]}
            currentIndex={currentStoryIndex}
            progress={progress}
            onStoryChange={setCurrentStoryIndex}
          />
          <MemoizedStoryHeader
            podcaster={storyGroup.podcaster}
            createdAt={currentStory.created_at}
          />
          <MemoizedStoryContent
            story={currentStory}
            videoRef={videoRef}
            isMuted={isMuted}
            onVideoEnd={moveToNextStory}
            onVideoLoad={startProgressTimer}
            markStoryRead={markStoryRead}
          />
          {isSelfStory(currentStory) && <StoryViewers story={currentStory} />}
        </div>
        <MemoizedStoryControls
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

const MemoizedStoryProgress = React.memo(StoryProgress);
const MemoizedStoryHeader = React.memo(StoryHeader);
const MemoizedStoryContent = React.memo(StoryContent);
const MemoizedStoryControls = React.memo(StoryControls);

export default StoriesPlayerDialog;
