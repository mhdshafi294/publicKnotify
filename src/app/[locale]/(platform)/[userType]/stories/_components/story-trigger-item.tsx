"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import useAddStoryDialogsStore from "@/store/use-add-story-dialogs-store";
import { Story } from "@/types/stories";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

interface StoryTriggerItemProps {
  storyGroup: {
    podcaster: {
      id: number;
      name: string;
      image: string;
    };
    stories: Story[];
  };
  index: number;
  isActive: boolean;
  onActivate: (index: number, firstUnreadIndex: number) => void;
  onFinish: () => void;
}

const StoryTriggerItem: React.FC<StoryTriggerItemProps> = ({
  storyGroup,
  index,
  isActive,
  onActivate,
  onFinish,
}) => {
  const { setIsStoryReviewDialogOpen } = useAddStoryDialogsStore();
  const [firstUnreadIndex, setFirstUnreadIndex] = useState(0);
  const { theme } = useTheme();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    if (!isMounted) setIsMounted(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const unreadIndex = storyGroup.stories.findIndex(
      (story) => !story.is_viewd
    );
    setFirstUnreadIndex(unreadIndex === -1 ? 0 : unreadIndex);
  }, [storyGroup.stories]);

  const handleOpenStories = () => {
    onActivate(index, firstUnreadIndex);
    setIsStoryReviewDialogOpen(true);
  };

  const hasUnreadStories = storyGroup.stories.some((story) => !story.is_viewd);

  const segmentCount = Math.max(storyGroup.stories.length, 1);
  const segmentAngle = 360 / segmentCount;
  const gapAngle = 6; // 6 degrees gap between segments

  const createArcPath = (
    startAngle: number,
    endAngle: number,
    radius: number
  ) => {
    const start = polarToCartesian(50, 50, radius, endAngle - gapAngle / 2);
    const end = polarToCartesian(50, 50, radius, startAngle + gapAngle / 2);
    const largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1";
    return [
      "M",
      start.x,
      start.y,
      "A",
      radius,
      radius,
      0,
      largeArcFlag,
      0,
      end.x,
      end.y,
    ].join(" ");
  };

  const polarToCartesian = (
    centerX: number,
    centerY: number,
    radius: number,
    angleInDegrees: number
  ) => {
    const angleInRadians = ((angleInDegrees - 90) * Math.PI) / 180.0;
    return {
      x: centerX + radius * Math.cos(angleInRadians),
      y: centerY + radius * Math.sin(angleInRadians),
    };
  };

  if (!isMounted) return null; // Avoid rendering during SSR phase

  return (
    <button
      onClick={handleOpenStories}
      className="flex flex-col items-center space-y-2"
    >
      <div className="relative size-[4rem] lg:size-[6rem] flex justify-center items-center">
        <Avatar className="size-[3.6rem] lg:size-[5.5rem] border-2 border-transparent">
          <AvatarImage
            src={storyGroup.podcaster.image}
            alt={storyGroup.podcaster.name}
            className="object-cover"
          />
          <AvatarFallback className="uppercase bg-primary text-white text-2xl">
            {storyGroup.podcaster.name.slice(0, 2).toUpperCase()}
          </AvatarFallback>
        </Avatar>
        <svg
          className="absolute top-0 left-0 size-[4rem] lg:size-[6rem] stroke-[#8a8a8a]"
          viewBox="0 0 100 100"
        >
          {Array.from({ length: segmentCount }).map((_, i) => {
            const startAngle = i * segmentAngle;
            const endAngle = (i + 1) * segmentAngle;
            const story = storyGroup.stories[i];
            return (
              <path
                key={i}
                d={createArcPath(startAngle, endAngle, 48)}
                fill="none"
                stroke={
                  story && !story.is_viewd ? "hsl(var(--greeny))" : "#8a8a8a"
                }
                strokeWidth="2"
                strokeLinecap="round"
              />
            );
          })}
        </svg>
      </div>
      <span className="text-xs lg:text-sm font-medium truncate max-w-[80px]">
        {storyGroup.podcaster.name}
      </span>
    </button>
  );
};

export default StoryTriggerItem;
