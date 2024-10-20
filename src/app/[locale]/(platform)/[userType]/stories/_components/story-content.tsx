import { getContrastTextColor } from "@/lib/utils";
import { Story, SelfStory } from "@/types/stories";
import Image from "next/image";
import { useEffect, useRef } from "react";

interface StoryContentProps {
  story: Story | SelfStory;
  videoRef: React.RefObject<HTMLVideoElement>;
  isMuted: boolean;
  onVideoEnd: () => void;
  onVideoLoad: () => void;
  markStoryRead: (storyId: string) => void;
}

/**
 * A component that renders the content of a story.
 *
 * @param {Story | SelfStory} story - The story object.
 * @param {React.RefObject<HTMLVideoElement>} videoRef - A reference to the video element.
 * @param {boolean} isMuted - Whether the video is muted or not.
 * @param {() => void} onVideoEnd - A callback that is called when the video ends.
 * @param {() => void} onVideoLoad - A callback that is called when the video is loaded.
 * @param {(storyId: string) => void} markStoryRead - A callback that marks a story as read.
 *
 * @returns {JSX.Element} The rendered StoryContent component.
 */
const StoryContent: React.FC<StoryContentProps> = ({
  story,
  videoRef,
  isMuted,
  onVideoEnd,
  onVideoLoad,
  markStoryRead,
}) => {
  const imageRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    if (story.type === "image" && imageRef.current) {
      const img = imageRef.current;
      if (img.complete) {
        markStoryRead(story.id.toString());
      } else {
        img.onload = () => markStoryRead(story.id.toString());
      }
    }
  }, [story, markStoryRead]);

  const handleVideoPlay = () => {
    if (story.type === "video") {
      markStoryRead(story.id.toString());
    }
  };

  if (story.type === "video") {
    return (
      <video
        ref={videoRef}
        src={story.video}
        className="w-full h-full object-contain"
        autoPlay
        playsInline
        muted={isMuted}
        onEnded={onVideoEnd}
        onLoadedMetadata={onVideoLoad}
        onPlay={handleVideoPlay}
      />
    );
  } else if (story.type === "image") {
    return (
      <Image
        ref={imageRef}
        src={story.image}
        alt="Story"
        layout="fill"
        objectFit="contain"
      />
    );
  } else {
    return (
      <div
        className="flex items-center justify-center w-full h-full  dark:bg-gray-800"
        style={{
          background: story.color,
          color: getContrastTextColor(story.color || "#000000"),
        }}
      >
        <p className="text-3xl font-medium text-center px-4">
          {story.description}
        </p>
      </div>
    );
  }
};

export default StoryContent;
