import {
  ChevronLeft,
  ChevronRight,
  Pause,
  Play,
  Volume2,
  VolumeX,
} from "lucide-react";

interface StoryControlsProps {
  currentIndex: number;
  totalStories: number;
  isVideo: boolean;
  isPaused: boolean;
  isMuted: boolean;
  isMobile: boolean;
  onPrevious: () => void;
  onNext: () => void;
  onTogglePause: () => void;
  onToggleMute: () => void;
}

/**
 * StoryControls Component
 * Renders navigation and playback controls for stories, allowing users to move between stories,
 * play/pause videos, and mute/unmute sound if the story is a video.
 *
 * @param {StoryControlsProps} props - Component properties.
 * @param {number} props.currentIndex - Current story index in the story sequence.
 * @param {number} props.totalStories - Total number of stories in the sequence.
 * @param {boolean} props.isVideo - Indicates if the current story is a video.
 * @param {boolean} props.isPaused - Indicates if the story playback is paused.
 * @param {boolean} props.isMuted - Indicates if the video sound is muted.
 * @param {boolean} props.isMobile - If true, the component is displayed on a mobile device.
 * @param {() => void} props.onPrevious - Callback to go to the previous story.
 * @param {() => void} props.onNext - Callback to go to the next story.
 * @param {() => void} props.onTogglePause - Callback to toggle play/pause state.
 * @param {() => void} props.onToggleMute - Callback to toggle mute/unmute state.
 * @returns {JSX.Element} The rendered StoryControls component.
 *
 * @example
 * <StoryControls
 *   currentIndex={2}
 *   totalStories={5}
 *   isVideo={true}
 *   isPaused={false}
 *   isMuted={true}
 *   onPrevious={() => {}}
 *   onNext={() => {}}
 *   onTogglePause={() => {}}
 *   onToggleMute={() => {}}
 * />
 */
const StoryControls: React.FC<StoryControlsProps> = ({
  currentIndex,
  totalStories,
  isVideo,
  isPaused,
  isMuted,
  isMobile,
  onPrevious,
  onNext,
  onTogglePause,
  onToggleMute,
}) => {
  return (
    <>
      {/* Navigation controls */}
      {!isMobile && (
        <>
          <div className="absolute inset-y-0 left-0 flex items-center">
            <button
              onClick={onPrevious}
              className="p-2 bg-black/30 text-white rounded-r-full"
              disabled={currentIndex === 0}
              aria-label="Previous Story"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
          </div>
          <div className="absolute inset-y-0 right-0 flex items-center">
            <button
              onClick={onNext}
              className="p-2 bg-black/30 text-white rounded-l-full"
              disabled={currentIndex === totalStories - 1}
              aria-label="Next Story"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>
        </>
      )}

      {/* Playback controls */}
      <div className="absolute bottom-4 right-4 flex gap-2">
        {isVideo && (
          <button
            onClick={onToggleMute}
            className="p-2 bg-black/30 text-white rounded-full"
            aria-label={isMuted ? "Unmute" : "Mute"}
          >
            {isMuted ? (
              <VolumeX className="w-6 h-6" />
            ) : (
              <Volume2 className="w-6 h-6" />
            )}
          </button>
        )}
        <button
          onClick={onTogglePause}
          className="p-2 bg-black/30 text-white rounded-full"
          aria-label={isPaused ? "Play" : "Pause"}
        >
          {isPaused ? (
            <Play className="w-6 h-6" />
          ) : (
            <Pause className="w-6 h-6" />
          )}
        </button>
      </div>
    </>
  );
};

export default StoryControls;
