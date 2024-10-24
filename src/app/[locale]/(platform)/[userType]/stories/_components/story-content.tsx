import { getContrastTextColor } from "@/lib/utils";
import { Story, SelfStory } from "@/types/stories";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { Loader2 } from "lucide-react";

interface StoryContentProps {
  story: Story | SelfStory;
  videoRef: React.RefObject<HTMLVideoElement>;
  isMuted: boolean;
  onVideoEnd: () => void;
  onVideoLoad: () => void;
  markStoryRead: (storyId: string) => void;
}

/**
 * StoryContent component that renders the content of a story based on its type.
 * It renders a video if the story is a video, an image if it is an image, or a
 * text if it is a text.
 * @param {{ story: Story | SelfStory, videoRef: React.RefObject<HTMLVideoElement>, isMuted: boolean, onVideoEnd: () => void, onVideoLoad: () => void, markStoryRead: (storyId: string) => void }} props - The props for the component.
 * @param {Story | SelfStory} props.story - The story object that contains the content.
 * @param {React.RefObject<HTMLVideoElement>} props.videoRef - The ref of the video element.
 * @param {boolean} props.isMuted - Whether the video is muted or not.
 * @param {() => void} props.onVideoEnd - The callback when the video ends.
 * @param {() => void} props.onVideoLoad - The callback when the video is loaded.
 * @param {(storyId: string) => void} props.markStoryRead - The callback to mark the story as read.
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
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    if (story.type === "image" && imageRef.current) {
      const img = imageRef.current;
      if (img.complete) {
        handleImageLoad();
      } else {
        img.onload = handleImageLoad;
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [story]);

  const handleImageLoad = () => {
    setIsLoading(false);
    markStoryRead(story.id.toString());
  };

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
      <div className="relative w-full h-full">
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-transparent">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
          </div>
        )}
        <Image
          ref={imageRef}
          src={story.image}
          alt="Story"
          fill
          className={isLoading ? "opacity-0" : "opacity-100 object-contain"}
          onLoad={handleImageLoad}
        />
      </div>
    );
  } else {
    return (
      <div
        className="flex items-center justify-center w-full h-full dark:bg-gray-800 rounded-xl"
        style={{
          // background: story?.color ?? "#000000",
          background: story?.color ? story?.color : "#000000",
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
