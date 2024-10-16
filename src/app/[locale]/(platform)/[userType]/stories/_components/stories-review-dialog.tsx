"use client";

import { getSelfStoriesAction } from "@/app/actions/storyActions";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import useAddStoryDialogsStore from "@/store/use-add-story-dialogs-store";
import { useQuery } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { cn, getContrastTextColor } from "@/lib/utils";

interface Story {
  id: number;
  description: string;
  type: string;
  color: string;
  video: string;
  image: string;
  thumbnail: string;
  viewers_count: number;
  viewers: { id: number; name: string; type: string; image: string }[];
  created_at: string;
}

const STORY_DURATION = 5000; // 5 seconds per story

const StoriesReviewDialog = () => {
  const t = useTranslations("Index");
  const [currentStoryIndex, setCurrentStoryIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const progressIntervalRef = useRef<NodeJS.Timeout | null>(null);

  const isOpen = useAddStoryDialogsStore(
    (state) => state.isStoryReviewDialogOpen
  );
  const onOpenChange = useAddStoryDialogsStore(
    (state) => state.setIsStoryReviewDialogOpen
  );

  const { data } = useQuery({
    queryKey: ["self_stories"],
    queryFn: () =>
      getSelfStoriesAction({
        type: "podcaster",
      }),
    enabled: isOpen,
  });

  useEffect(() => {
    if (isOpen && data?.stories && data?.stories.length > 0) {
      startProgressTimer();
    }
    return () => {
      if (progressIntervalRef.current) {
        clearInterval(progressIntervalRef.current);
      }
    };
  }, [isOpen, data, currentStoryIndex]);

  const startProgressTimer = () => {
    setProgress(0);
    if (progressIntervalRef.current) {
      clearInterval(progressIntervalRef.current);
    }
    progressIntervalRef.current = setInterval(() => {
      setProgress((prevProgress) => {
        if (prevProgress >= 100) {
          clearInterval(progressIntervalRef.current!);
          moveToNextStory();
          return 0;
        }
        return prevProgress + (100 / STORY_DURATION) * 100; // Update every 100ms
      });
    }, 100);
  };

  const moveToNextStory = () => {
    if (data?.stories && currentStoryIndex < data?.stories.length - 1) {
      setCurrentStoryIndex(currentStoryIndex + 1);
      startProgressTimer();
    } else {
      onOpenChange(false);
      setCurrentStoryIndex(0);
    }
  };

  const renderStoryContent = (story: Story) => {
    switch (story.type) {
      case "image":
        return (
          <Image
            src={story.image}
            alt={story.description}
            layout="fill"
            className="object-contain"
          />
        );
      case "video":
        return (
          <video
            src={story.video}
            className="w-full h-full object-cover"
            autoPlay
            playsInline
            muted
          />
        );
      case "text":
        return (
          <div className="w-full h-full flex items-center justify-center p-4">
            <p
              style={{ color: getContrastTextColor(story.color || "#000000") }}
              className="text-white text-lg text-center"
            >
              {story.description}
            </p>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent
        style={{
          backgroundColor: data?.stories[currentStoryIndex]?.color,
          borderColor: data?.stories[currentStoryIndex]?.color,
        }}
        className={cn("p-0 max-w-md w-full h-[80vh] flex flex-col")}
      >
        {data?.stories && data?.stories.length > 0 && (
          <>
            <div className="flex w-full px-2 py-2 gap-1 bg-black/30">
              {data.stories.map((_, index) => (
                <div
                  key={index}
                  className="h-1 bg-white/30 flex-grow rounded-full overflow-hidden"
                >
                  <div
                    className="h-full bg-white transition-all duration-100 ease-linear"
                    style={{
                      width:
                        index === currentStoryIndex
                          ? `${progress}%`
                          : index < currentStoryIndex
                          ? "100%"
                          : "0%",
                    }}
                  />
                </div>
              ))}
            </div>
            <div className="relative flex-grow">
              {renderStoryContent(data.stories[currentStoryIndex])}
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default StoriesReviewDialog;
