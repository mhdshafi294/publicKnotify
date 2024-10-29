import { SelfStory, Story } from "@/types/stories";

interface StoryProgressProps {
  stories: SelfStory[] | Story[];
  currentIndex: number;
  progress: number;
  onStoryChange: (index: number) => void;
  onProgressStart?: () => void;
}

/**
 * StoryProgress Component
 * Displays a progress bar for stories, where each story is represented by a segment.
 * The current story's segment shows its progress, while completed stories are fully filled.
 *
 * @param {StoryProgressProps} props - The component props.
 * @param {Array<SelfStory | Story>} props.stories - Array of story objects to represent in the progress bar.
 * @param {number} props.currentIndex - Index of the currently displayed story.
 * @param {number} props.progress - Progress percentage of the current story (0-100).
 * @param {(index: number) => void} props.onStoryChange - Callback triggered when a segment is clicked, with the segment index as argument.
 * @param {() => void} [props.onProgressStart] - Optional callback triggered when a story segment is clicked, used to initiate the progress animation.
 *
 * @returns {JSX.Element} The rendered StoryProgress component.
 *
 * @example
 * <StoryProgress
 *   stories={storiesArray}
 *   currentIndex={2}
 *   progress={60}
 *   onStoryChange={(index) => handleStoryChange(index)}
 *   onProgressStart={() => handleProgressStart()}
 * />
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
            if (onProgressStart) onProgressStart();
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
