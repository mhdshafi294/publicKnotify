import React from "react";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Heart } from "lucide-react";

type FavoritePopoverProps = {
  is_favorite: boolean;
  triggerSize: number;
};

const FavoritePopover: React.FC<FavoritePopoverProps> = () => {
  return (
    <Popoverr>
          <PopoverTrigger asChild>
            {podcast.isFavorite ? (
              <Heart size={20} fill="#004FFF" stroke="#004FFF" />
            ) : (
              <Heart size={20} />
            )}
          </PopoverTrigger>
          <PopoverContent></PopoverContent>
        </Popover>
  );
};

export default FavoritePopover;
