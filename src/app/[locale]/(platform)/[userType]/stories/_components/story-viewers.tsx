import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { SelfStory } from "@/types/stories";
import { Eye, X } from "lucide-react";
import { useTranslations } from "next-intl";
import { Fragment, useState } from "react";

interface StoryViewersProps {
  story: SelfStory;
}

/**
 * The StoryViewers component renders a button that displays the number of
 * viewers for a story, and a dropdown menu that shows all the viewers. When
 * the button is clicked or touched, it toggles the visibility of the dropdown menu.
 *
 * @param {{ story: SelfStory }} props - The props for the component.
 * @param {SelfStory} props.story - The story object that contains the viewers.
 *
 * @example
 **/
const StoryViewers: React.FC<StoryViewersProps> = ({ story }) => {
  const [isViewAllOpen, setIsViewAllOpen] = useState(false);
  const maxVisibleViewers = 5;
  const t = useTranslations("Index");

  const handleViewersTap = (e: React.MouseEvent | React.TouchEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsViewAllOpen((prev) => !prev);
  };

  return (
    <Fragment>
      <button
        className="absolute z-10 bottom-16 left-4 flex items-center bg-black/50 rounded-full px-3 py-1 cursor-pointer"
        onClick={handleViewersTap}
        onTouchEnd={handleViewersTap}
      >
        <Eye className="w-4 h-4 text-white mr-2" />
        <span className="text-white text-sm mr-2">{story.viewers_count}</span>
        <div className="flex -space-x-2 overflow-hidden">
          {story.viewers.slice(0, maxVisibleViewers).map((viewer) => (
            <TooltipProvider key={viewer.id}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Avatar className="w-6 h-6 border-2 border-white">
                    <AvatarImage
                      src={viewer.image}
                      alt={viewer.name}
                      className="object-cover"
                    />
                    <AvatarFallback className="uppercase text-black text-3xl">
                      {viewer.name.slice(0, 2).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                </TooltipTrigger>
                <TooltipContent>
                  <p>{viewer.name}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          ))}
          {story.viewers.length > maxVisibleViewers && (
            <div className="w-6 h-6 rounded-full bg-gray-500 flex items-center justify-center text-white text-xs">
              +{story.viewers.length - maxVisibleViewers}
            </div>
          )}
        </div>
      </button>

      <div
        className={cn(
          "fixed inset-y-0 right-0 w-full sm:w-96 bg-black/95 rounded-t-lg lg:rounded-none lg:rounded-r-2xl data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:slide-out-to-right-0 data-[state=open]:slide-in-from-right-0 duration-200 md:duration-300 ease-in-out lg:translate-x-full z-20",
          isViewAllOpen
            ? "opacity-100 lg:translate-y-0 z-20"
            : "opacity-0 translate-y-full"
        )}
      >
        <div className="flex flex-col h-full">
          <div className="flex justify-between items-center p-4 border-b border-gray-700">
            <h2 className="text-white text-lg font-semibold">{t("viewers")}</h2>
            <button
              onClick={handleViewersTap}
              onTouchEnd={handleViewersTap}
              className="text-white hover:text-gray-300 cursor-pointer"
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
                  <AvatarFallback className="uppercase text-black text-3xl">
                    {viewer.name.slice(0, 2).toUpperCase()}
                  </AvatarFallback>
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
    </Fragment>
  );
};

export default StoryViewers;
