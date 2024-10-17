import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { StoriesResponse } from "@/types/stories";
import useAddStoryDialogsStore from "@/store/use-add-story-dialogs-store";

interface StoryTriggerItemProps {
  storyGroup: StoriesResponse["stories"][0];
  index: number;
  isActive: boolean;
  onActivate: (index: number) => void;
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

  const handleOpenStories = () => {
    onActivate(index);
    setIsStoryReviewDialogOpen(true);
  };

  return (
    <button
      onClick={handleOpenStories}
      className="flex flex-col items-center space-y-2"
    >
      <Avatar
        className={`w-16 h-16 border-2 ${
          isActive ? "border-primary" : "border-gray-300"
        }`}
      >
        <AvatarImage
          src={storyGroup.podcaster.image}
          alt={storyGroup.podcaster.name}
          className="object-cover"
        />
        <AvatarFallback>{storyGroup.podcaster.name[0]}</AvatarFallback>
      </Avatar>
      <span className="text-sm font-medium truncate max-w-[80px]">
        {storyGroup.podcaster.name}
      </span>
    </button>
  );
};

export default StoryTriggerItem;
