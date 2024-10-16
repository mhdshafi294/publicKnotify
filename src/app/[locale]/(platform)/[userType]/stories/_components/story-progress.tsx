import { SelfStory } from "@/types/stories";

interface StoryProgressProps {
  stories: SelfStory[];
  currentIndex: number;
  progress: number;
  onStoryChange: (index: number) => void;
  onProgressStart: () => void;
}

const StoryProgress: React.FC<StoryProgressProps> = ({
  stories,
  currentIndex,
  progress,
  onStoryChange,
  onProgressStart,
}) => {
  return (
    <div className="flex w-full px-2 py-2 gap-1 bg-black/30">
      {stories.map((_, index) => (
        <div
          key={index}
          className="h-1 bg-white/30 flex-grow rounded-full overflow-hidden"
          onClick={() => {
            onStoryChange(index);
            onProgressStart();
          }}
        >
          <div
            className="h-full bg-white transition-all duration-100 ease-linear"
            style={{
              width:
                index === currentIndex
                  ? `${progress}%`
                  : index < currentIndex
                  ? "100%"
                  : "0%",
            }}
          />
        </div>
      ))}
    </div>
  );
};

export default StoryProgress;