import Image from "next/image";
import { SelfStory, Story } from "@/types/stories";
import { getContrastTextColor } from "@/lib/utils";

interface StoryContentProps {
  story: SelfStory | Story;
  videoRef: React.RefObject<HTMLVideoElement>;
  isMuted: boolean;
  onVideoEnd: () => void;
  onVideoLoad: () => void;
}

/**
 * A component that renders the content of a story, given its type.
 *
 * If the story type is "image", it renders an Image component with the story's image.
 * If the story type is "video", it renders a video element with the story's video.
 * If the story type is "text", it renders a div with the story's description.
 *
 * @param {StoryContentProps} props - The properties passed to the component.
 * @returns {JSX.Element} The rendered content of the story.
 */
const StoryContent: React.FC<StoryContentProps> = ({
  story,
  videoRef,
  isMuted,
  onVideoEnd,
  onVideoLoad,
}) => {
  switch (story.type) {
    case "image":
      return (
        <Image
          src={story.image}
          alt={story.description || "story image"}
          layout="fill"
          className="w-full h-auto object-contain"
        />
      );
    case "video":
      return (
        <div className="w-full h-full flex items-center justify-center py-4 relative">
          <video
            ref={videoRef}
            src={story.video}
            className="w-full h-auto object-contain"
            autoPlay
            playsInline
            muted={isMuted}
            onLoadedMetadata={onVideoLoad}
            onEnded={onVideoEnd}
          />
        </div>
      );
    case "text":
      return (
        <div className="w-full h-full flex items-center justify-center p-4">
          <p
            style={{ color: getContrastTextColor(story.color || "#000000") }}
            className="text-lg text-center"
          >
            {story.description}
          </p>
        </div>
      );
    default:
      return null;
  }
};

export default StoryContent;
