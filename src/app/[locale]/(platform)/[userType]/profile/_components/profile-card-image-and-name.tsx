"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import useAddStoryDialogsStore from "@/store/use-add-story-dialogs-store";
import { Story } from "@/types/stories";
import { useEffect, useState } from "react";
import StoriesPlayerDialog from "../../stories/_components/stories-player-dialog";

interface ProfileCardImageAndNameProps {
  name: string;
  image: string;
  stories?: Story[];
}

const ProfileCardImageAndName: React.FC<ProfileCardImageAndNameProps> = ({
  name,
  image,
  stories = [],
}) => {
  const [firstUnreadIndex, setFirstUnreadIndex] = useState(0);
  const { setIsStoryReviewDialogOpen } = useAddStoryDialogsStore();
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  useEffect(() => {
    const unreadIndex = stories.findIndex((story) => !story.is_viewd);
    setFirstUnreadIndex(unreadIndex === -1 ? 0 : unreadIndex);
  }, [stories]);

  const handleOpenStories = () => {
    if (stories.length > 0) {
      setIsDialogOpen(true);
      setIsStoryReviewDialogOpen(true);
    }
  };

  const handleCloseStories = () => {
    setIsDialogOpen(false);
    setIsStoryReviewDialogOpen(false);
  };

  const hasUnreadStories = stories.some((story) => !story.is_viewd);

  const segmentCount = Math.max(stories.length, 1);
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

  return (
    <>
      <div className="flex flex-col items-center">
        <div
          className="relative cursor-pointer  size-[7.7rem] flex justify-center items-center"
          onClick={handleOpenStories}
        >
          <Avatar className={cn("size-28", { "border-4": !stories })}>
            <AvatarImage
              src={image}
              alt={`${name} profile picture`}
              className="object-cover"
            />
            <AvatarFallback className="uppercase text-black text-3xl">
              {name?.slice(0, 2)}
            </AvatarFallback>
          </Avatar>
          {stories.length > 0 && (
            <svg
              className="absolute top-0 left-0 w-full h-full"
              viewBox="0 0 100 100"
            >
              {Array.from({ length: segmentCount }).map((_, i) => {
                const startAngle = i * segmentAngle;
                const endAngle = (i + 1) * segmentAngle;
                const story = stories[i];
                return (
                  <path
                    key={i}
                    d={createArcPath(startAngle, endAngle, 48)}
                    fill="none"
                    stroke={
                      story && !story.is_viewd
                        ? "hsl(var(--greeny))"
                        : "#8a8a8a"
                    }
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                );
              })}
            </svg>
          )}
        </div>
        <h1 className="text-2xl font-semibold text-center mt-2">{name}</h1>
      </div>
      {isDialogOpen && stories.length > 0 && (
        <StoriesPlayerDialog
          storyGroup={{
            podcaster: { id: 0, name, image },
            stories,
          }}
          allStories={[{ podcaster: { id: 0, name, image }, stories }]}
          currentIndex={0}
          initialStoryIndex={firstUnreadIndex}
          onIndexChange={() => {}}
          onFinish={handleCloseStories}
        />
      )}
    </>
  );
};

export default ProfileCardImageAndName;
