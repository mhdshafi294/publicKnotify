import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { formatDistanceToNow } from "date-fns";

interface StoryHeaderProps {
  podcaster: {
    id: number;
    name: string;
    image: string;
  };
  createdAt: string;
}

/**
 * StoryHeader Component
 * Displays the header for a story, including the podcaster's avatar, name,
 * and the time since the story was created.
 *
 * @param {StoryHeaderProps} props - Component properties.
 * @param {{ id: number; name: string; image: string }} props.podcaster - Podcaster details.
 * @param {string} props.createdAt - Creation timestamp of the story.
 * @returns {JSX.Element} The rendered StoryHeader component.
 *
 * @example
 * <StoryHeader
 *   podcaster={{ id: 1, name: "Podcaster Name", image: "/path/to/image.jpg" }}
 *   createdAt="2023-09-01T12:34:56Z"
 * />
 */
const StoryHeader: React.FC<StoryHeaderProps> = ({ podcaster, createdAt }) => {
  return (
    <div className="absolute top-5 left-0 right-0 z-10 flex items-center p-4 bg-gradient-to-b from-black/20 to-transparent">
      <Avatar className="w-10 h-10 mr-3">
        <AvatarImage
          src={podcaster.image}
          alt={podcaster.name}
          className="object-cover"
        />
        <AvatarFallback className="uppercase text-black">
          {podcaster.name.slice(0, 2).toUpperCase()}
        </AvatarFallback>
      </Avatar>
      <div className="flex flex-col">
        <span className="text-sm font-semibold text-white">
          {podcaster.name}
        </span>
        <span className="text-xs text-white/70">
          {formatDistanceToNow(new Date(createdAt), { addSuffix: true })}
        </span>
      </div>
    </div>
  );
};

export default StoryHeader;
