"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import useAddStoryDialogsStore from "@/store/use-add-story-dialogs-store";
import { Story } from "@/types/stories";
import StoriesPlayerDialog from "../../stories/_components/stories-player-dialog";
import { useProfileStories } from "@/hooks/stories/use-profile-stories";

interface ProfileCardImageAndNameProps {
  name: string;
  image: string;
  isSelfProfile: boolean;
  stories?: Story[];
}

const ProfileCardImageAndName: React.FC<ProfileCardImageAndNameProps> = ({
  name,
  image,
  isSelfProfile,
  stories: initStories,
}) => {
  const {
    stories,
    setStories,
    firstUnreadIndex,
    isDialogOpen,
    storyGroup,
    handleOpenStories,
    handleCloseStories,
  } = useProfileStories(isSelfProfile, initStories);

  const segmentCount = Math.max(
    stories?.length || 0,
    storyGroup?.stories?.length || 0,
    1
  );
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
          {(stories && stories?.length > 0) ||
          (storyGroup && storyGroup?.stories?.length > 0) ? (
            <svg
              className="absolute top-0 left-0 w-full h-full"
              viewBox="0 0 100 100"
            >
              {Array.from({ length: segmentCount }).map((_, i) => {
                const startAngle = i * segmentAngle;
                const endAngle = (i + 1) * segmentAngle;
                const story = stories ? stories[i] : storyGroup?.stories?.[i];
                return (
                  <path
                    key={i}
                    d={createArcPath(startAngle, endAngle, 48)}
                    fill="none"
                    stroke={
                      story && "is_viewd" in story && !story.is_viewd
                        ? "hsl(var(--greeny))"
                        : "#8a8a8a"
                    }
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                );
              })}
            </svg>
          ) : null}
        </div>
        <h1 className="text-2xl font-semibold text-center mt-2">{name}</h1>
      </div>
      {isDialogOpen &&
      ((stories && stories?.length > 0) ||
        (storyGroup && storyGroup?.stories?.length > 0)) ? (
        <StoriesPlayerDialog
          storyGroup={
            stories
              ? {
                  podcaster: { id: 0, name, image },
                  stories,
                }
              : storyGroup!
          }
          allStories={
            stories
              ? [{ podcaster: { id: 0, name, image }, stories }]
              : [storyGroup!]
          }
          currentIndex={0}
          initialStoryIndex={firstUnreadIndex}
          onIndexChange={() => {}}
          onFinish={handleCloseStories}
          fromProfile={
            stories
              ? {
                  isInProfile: true,
                  stories: stories,
                  setStories: setStories,
                }
              : undefined
          }
        />
      ) : null}
    </>
  );
};

export default ProfileCardImageAndName;
