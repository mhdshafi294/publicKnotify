import { useState } from "react";
import { SelfStory } from "@/types/stories";
import { Eye, X } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

interface StoryViewersProps {
  story: SelfStory;
}

const StoryViewers: React.FC<StoryViewersProps> = ({ story }) => {
  const [isViewAllOpen, setIsViewAllOpen] = useState(false);
  const maxVisibleViewers = 5;

  return (
    <>
      <button
        className="absolute bottom-16 left-4 flex items-center bg-black/50 rounded-full px-3 py-1"
        onClick={() => setIsViewAllOpen(true)}
      >
        <Eye className="w-4 h-4 text-white mr-2" />
        <span className="text-white text-sm mr-2">{story.viewers_count}</span>
        <div className="flex -space-x-2 overflow-hidden">
          {story.viewers.slice(0, maxVisibleViewers).map((viewer) => (
            <TooltipProvider key={viewer.id}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Avatar className="w-6 h-6 border-2 border-white">
                    <AvatarImage src={viewer.image} alt={viewer.name} />
                    <AvatarFallback>{viewer.name[0]}</AvatarFallback>
                  </Avatar>
                </TooltipTrigger>
                <TooltipContent>
                  <p>{viewer.name}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          ))}
          {story.viewers.length > maxVisibleViewers && (
            <div className="w-6 h-6 rounded-full bg-gray-500 flex items-center justify-center text-white text-xs cursor-pointer">
              +{story.viewers.length - maxVisibleViewers}
            </div>
          )}
        </div>
      </button>

      <div
        className={cn(
          "fixed inset-y-0 right-0 w-full sm:w-96 bg-black/80 rounded-r-2xl data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:slide-out-to-right-0 data-[state=open]:slide-in-from-right-0  duration-300 ease-in-out",
          isViewAllOpen
            ? "opacity-100 translate-x-full"
            : "opacity-0 translate-x-0"
        )}
      >
        <div className="flex flex-col h-full">
          <div className="flex justify-between items-center p-4 border-b border-gray-700">
            <h2 className="text-white text-lg font-semibold">Viewers</h2>
            <button
              onClick={() => setIsViewAllOpen(false)}
              className="text-white hover:text-gray-300"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
          <div className="flex-grow overflow-y-auto">
            {story.viewers.map((viewer) => (
              <div
                key={viewer.id}
                className="flex items-center p-4 border-b border-gray-700"
              >
                <Avatar className="w-10 h-10 mr-3">
                  <AvatarImage
                    src={viewer.image}
                    alt={viewer.name}
                    className="object-cover"
                  />
                  <AvatarFallback>{viewer.name[0]}</AvatarFallback>
                </Avatar>
                <div className="flex flex-col">
                  <span className="text-white font-medium">{viewer.name}</span>
                  <span className="text-gray-400 text-sm">{viewer.type}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default StoryViewers;
