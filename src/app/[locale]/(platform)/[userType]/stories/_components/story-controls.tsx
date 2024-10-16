import { ChevronLeft, ChevronRight, Pause, Play, Volume2, VolumeX } from "lucide-react";

interface StoryControlsProps {
  currentIndex: number;
  totalStories: number;
  isVideo: boolean;
  isPaused: boolean;
  isMuted: boolean;
  onPrevious: () => void;
  onNext: () => void;
  onTogglePause: () => void;
  onToggleMute: () => void;
}

const StoryControls: React.FC<StoryControlsProps> = ({
  currentIndex,
  totalStories,
  isVideo,
  isPaused,
  isMuted,
  onPrevious,
  onNext,
  onTogglePause,
  onToggleMute,
}) => {
  return (
    <>
      <div className="absolute inset-y-0 left-0 flex items-center">
        <button
          onClick={onPrevious}
          className="p-2 bg-black/30 text-white rounded-r-full"
          disabled={currentIndex === 0}
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
      </div>
      <div className="absolute inset-y-0 right-0 flex items-center">
        
        <button
          onClick={onNext}
          className="p-2 bg-black/30 text-white rounded-l-full"
          disabled={currentIndex === totalStories - 1}
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      </div>
      <div className="absolute bottom-4 right-4 flex gap-2">
        {isVideo && (
          <button
            onClick={onToggleMute}
            className="p-2 bg-black/30 text-white rounded-full"
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