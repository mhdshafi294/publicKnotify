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
 * StoryContent Component
 * Renders the content of a story depending on its type: video, image, or text.
 * - For a video story, it auto-plays with mute options.
 * - For an image story, it loads the image with a loading indicator.
 * - For a text story, it displays the description over a colored background.
 *
 * @param {StoryContentProps} props - The component props.
 * @param {Story | SelfStory} props.story - The story object containing content details.
 * @param {React.RefObject<HTMLVideoElement>} props.videoRef - Ref to the video element.
 * @param {boolean} props.isMuted - Whether the video should play muted.
 * @param {() => void} props.onVideoEnd - Callback triggered when the video ends.
 * @param {() => void} props.onVideoLoad - Callback triggered when the video metadata is loaded.
 * @param {(storyId: string) => void} props.markStoryRead - Callback to mark the story as read.
 * @returns {JSX.Element} Rendered StoryContent component.
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

  /**
   * Sets loading state to false and marks the story as read after the image loads.
   */
  const handleImageLoad = () => {
    setIsLoading(false);
    markStoryRead(story.id.toString());
  };

  /**
   * Marks the story as read when the video starts playing.
   */
  const handleVideoPlay = () => {
    if (story.type === "video") {
      markStoryRead(story.id.toString());
    }
  };

  // Render video content if story type is "video"
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
  }

  // Render image content with loading indicator if story type is "image"
  if (story.type === "image") {
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
  }

  // Render text content if story type is "text"
  return (
    <div
      className="flex items-center justify-center w-full h-full dark:bg-gray-800 rounded-xl"
      style={{
        background: story.color || "#000000",
        color: getContrastTextColor(story.color || "#000000"),
      }}
    >
      <p className="text-3xl font-medium text-center px-4">
        {story.description}
      </p>
    </div>
  );
};

export default StoryContent;
