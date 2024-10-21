import { SelfStory, Story } from "@/types/stories";

interface StoryProgressProps {
  stories: SelfStory[] | Story[];
  currentIndex: number;
  progress: number;
  onStoryChange: (index: number) => void;
  onProgressStart: () => void;
}

/**
 * StoryProgress
 *
 * Progress bar for stories, with each story represented as a
 * bar segment. The width of each segment is determined by the
 * `progress` prop, which is a number between 0 and 100. The
 * `onStoryChange` prop is called when a story segment is clicked,
 * with the index of the segment as an argument. The `onProgressStart`
 * prop is called when a story segment is clicked, and is used to
 * start the progress animation.
 *
 * @param stories - array of story objects
 * @param currentIndex - index of the currently displayed story
 * @param progress - progress of the current story as a number between 0 and 100
 * @param onStoryChange - callback when a story segment is clicked
 * @param onProgressStart - callback when a story segment is clicked
 */
const StoryProgress: React.FC<StoryProgressProps> = ({
  stories,
  currentIndex,
  progress,
  onStoryChange,
  onProgressStart,
}) => {
  return (
    <div className="flex w-full px-2 py-2 gap-1 bg-black/30 absolute top-0 left-0 right-0 z-10 rounded-t-lg">
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
