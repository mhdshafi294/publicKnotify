"use client";

import React from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";
import { Button } from "./ui/button";
import { BadgeInfoIcon, Heart } from "lucide-react";
import { useSession } from "next-auth/react";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { ApiResponse } from "@/types";

type UnfavoriteButtonProps = {
  triggerSize?: number;
  id: string;
  setIsFavorite: React.Dispatch<React.SetStateAction<boolean>>;
  setSelectedItems: React.Dispatch<React.SetStateAction<string[]>>;
  removeFromFavoriteAction: ({
    id,
    type,
  }: {
    id: string;
    type: string;
  }) => Promise<ApiResponse>;
};

const UnfavoriteButton: React.FC<UnfavoriteButtonProps> = ({
  triggerSize = 20,
  id,
  setIsFavorite,
  setSelectedItems,
  removeFromFavoriteAction,
}) => {
  const session = useSession();

  const {
    data: removeFromFavoriteResponse,
    mutate: server_RemoveFromFavoriteAction,
    isPending: isRemoveFavoritePending,
  } = useMutation({
    mutationFn: removeFromFavoriteAction,
    onSuccess: () => {
      toast.success("Unfavorited successfully.");
      setSelectedItems([]);
      setIsFavorite(false);
    },
    onError: (error) => {
      console.log(error);
      toast.error("Something went wrong.please try again.");
    },
  });

  const handleUnFavorite = async () => {
    server_RemoveFromFavoriteAction({
      id: id,
      type: session?.data?.user?.type!,
    });
  };
  return (
    <TooltipProvider>
      <Tooltip delayDuration={200}>
        <TooltipTrigger asChild>
          <Button
            asChild
            size="icon"
            className="size-fit bg-transparent hover:bg-transparent"
            onClick={handleUnFavorite}
          >
            <Heart
              size={triggerSize}
              fill="#004FFF"
              stroke="#004FFF"
              className="cursor-pointer hover:stroke-primary duration-300"
            />
          </Button>
        </TooltipTrigger>
        <TooltipContent
          side="top"
          className="max-w-40 flex flex-col items-center gap-1"
        >
          <div>
            <BadgeInfoIcon size={16} />
          </div>
          <p className="text-center">
            This would remove this item from all your favorite lists
          </p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default UnfavoriteButton;
