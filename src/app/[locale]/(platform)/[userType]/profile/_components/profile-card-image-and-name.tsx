"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useProfileStories } from "@/hooks/stories/use-profile-stories";
import { cn } from "@/lib/utils";
import { Story } from "@/types/stories";
import StoriesPlayerDialog from "../../stories/_components/stories-player-dialog";

interface ProfileCardImageAndNameProps {
  name: string;
  image: string;
  isSelfProfile: boolean;
  stories?: Story[];
}

/**
 * ProfileCardImageAndName Component
 * Displays a user's profile picture, name, and a circular story indicator.
 * If stories are available, it shows the story viewer dialog on click.
 *
 * @param {ProfileCardImageAndNameProps} props - Component properties.
 * @param {string} props.name - Name of the profile owner.
 * @param {string} props.image - Profile image URL.
 * @param {boolean} props.isSelfProfile - Indicates if this is the user's own profile.
 * @param {Story[]} [props.stories] - Array of stories associated with the profile.
 * @returns {JSX.Element} The rendered ProfileCardImageAndName component.
 */
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
  const gapAngle = stories && stories?.length > 1 ? 6 : 1; // 6 degrees gap between segments

  /**
   * Creates an SVG arc path for each story segment in the circular story indicator.
   *
   * @param {number} startAngle - Starting angle of the segment.
   * @param {number} endAngle - Ending angle of the segment.
   * @param {number} radius - Radius of the circular path.
   * @returns {string} - The SVG path data for the arc.
   */
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

  /**
   * Converts polar coordinates to Cartesian coordinates for creating SVG arcs.
   *
   * @param {number} centerX - X center of the circle.
   * @param {number} centerY - Y center of the circle.
   * @param {number} radius - Radius of the circle.
   * @param {number} angleInDegrees - Angle in degrees.
   * @returns {{x: number, y: number}} - Cartesian coordinates.
   */
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
          className="relative cursor-pointer size-[7.7rem] flex justify-center items-center"
          onClick={handleOpenStories}
        >
          <Avatar className={cn("size-[6.7rem]", { "border-4": !stories })}>
            <AvatarImage
              src={image}
              alt={`${name} profile picture`}
              className="object-cover"
            />
            <AvatarFallback className="uppercase text-black text-3xl">
              {name?.slice(0, 2)}
            </AvatarFallback>
          </Avatar>
          {stories?.length || storyGroup?.stories?.length ? (
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
                    strokeWidth="3"
                    strokeLinecap="round"
                  />
                );
              })}
            </svg>
          ) : null}
        </div>
        <h1 className="text-2xl font-semibold text-center mt-2">{name}</h1>
      </div>

      {isDialogOpen && (stories?.length || storyGroup?.stories?.length) ? (
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
