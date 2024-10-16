import Image from "next/image";
import { SelfStory } from "@/types/stories";
import { getContrastTextColor } from "@/lib/utils";

interface StoryContentProps {
  story: SelfStory;
  videoRef: React.RefObject<HTMLVideoElement>;
  isMuted: boolean;
  onVideoEnd: () => void;
  onVideoLoad: () => void;
}

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