"use client";
import React, { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { BadgeInfoIcon, Heart } from "lucide-react";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useSession } from "next-auth/react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  AddToFavoriteAction,
  RemoveFromFavoriteAction,
} from "@/app/actions/podcasterActions";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Category, Favourite_Category } from "@/types/podcast";
import { Button } from "@/components/ui/button";
import ButtonLoader from "@/components/ui/button-loader";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";
import { getMyFavoriteCategoriesListAction } from "@/app/actions/podcastActions";

type PodcasterFavoritePopoverProps = {
  isFavorite: boolean;
  triggerSize?: number;
  podcasterId: string;
  favorited_Categories: Favourite_Category[];
};

const PodcasterFavoritePopover: React.FC<PodcasterFavoritePopoverProps> = ({
  isFavorite: is_favorite,
  triggerSize = 20,
  podcasterId,
  favorited_Categories,
}) => {
  const session = useSession();
  const queryClient = useQueryClient();

  const favorite_Categories_names = favorited_Categories.map(
    (category) => category.name
  );

  const [isFavorite, setIsFavorite] = useState(is_favorite);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedItems, setSelectedItems] = useState<string[]>(
    favorite_Categories_names
  );

  const {
    data: categories,
    isPending: isCategoriesPending,
    isError: isCategoriesError,
  } = useQuery({
    queryKey: ["favorite_categories", session.data?.user?.id],
    queryFn: () =>
      getMyFavoriteCategoriesListAction({
        type: session?.data?.user?.type!,
      }),
  });

  const {
    data: addToFavoriteResponse,
    mutate: server_AddToFavoriteAction,
    isPending: isAddFavoritePending,
  } = useMutation({
    mutationFn: AddToFavoriteAction,
    onSuccess: () => {
      toast.success("added successfully.");
      setIsFavorite(true);
      setIsOpen(false);
    },
    onError: (error) => {
      console.log(error);
    },
  });

  const {
    data: removeFromFavoriteResponse,
    mutate: server_RemoveFromFavoriteAction,
    isPending: isRemoveFavoritePending,
  } = useMutation({
    mutationFn: RemoveFromFavoriteAction,
    onSuccess: () => {
      toast.success("Unfavorited successfully.");
      setSelectedItems([]);
      setIsFavorite(false);
      setIsOpen(false);
    },
    onError: (error) => {
      console.log(error);
      toast.error("Something went wrong.please try again.");
    },
  });

  const createNewCategory = (event: React.KeyboardEvent<HTMLInputElement>) => {
    event.stopPropagation();
    if (event.key === "Enter") {
      const createdCategory = event.currentTarget.value;
      queryClient.setQueryData(
        ["favorite_categories", session.data?.user?.id],
        (old: Category[]) => {
          if (!old.find((category) => category.name === createdCategory)) {
            return [
              ...old,
              {
                id: 999,
                name: createdCategory,
                created_at: new Date().getDay().toString(),
              },
            ];
          } else {
            return old;
          }
        }
      );

      setSelectedItems((prevSelectedItems) => {
        if (!prevSelectedItems.includes(createdCategory)) {
          return [...prevSelectedItems, createdCategory];
        } else {
          return prevSelectedItems;
        }
      });

      event.currentTarget.value = "";
    } else if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
      event.stopPropagation();
      setIsOpen(false);
    } else {
      return;
    }
  };

  const handleToggle = (item: string) => {
    setSelectedItems((prevSelectedItems) =>
      prevSelectedItems.includes(item)
        ? prevSelectedItems.filter((i) => i !== item)
        : [...prevSelectedItems, item]
    );
  };

  const handleSubmit = async () => {
    server_AddToFavoriteAction({
      categories: selectedItems,
      podcasterId,
      type: session?.data?.user?.type!,
    });
  };

  const handleUnFavorite = async () => {
    server_RemoveFromFavoriteAction({
      podcasterId,
      type: session?.data?.user?.type!,
    });
  };

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        {isFavorite ? (
          <Heart
            size={triggerSize}
            fill="#004FFF"
            stroke="#004FFF"
            className="cursor-pointer hover:stroke-primary duration-300"
          />
        ) : (
          <Heart
            size={triggerSize}
            className="cursor-pointer hover:stroke-primary duration-300"
          />
        )}
      </PopoverTrigger>
      <PopoverContent
        className="px-0"
        onOpenAutoFocus={(e) => {
          e.preventDefault();
          e.stopPropagation();
        }}
        onKeyDown={(e) => {
          e.stopPropagation();
          if (e.key === "Escape") {
            setIsOpen(false);
          }
        }}
        forceMount
      >
        <p className="px-4 w-full text-sm">Add to favorite lists</p>
        <Separator className="mt-2 bg-slate-900" />
        <Input
          onFocus={(e) => e.stopPropagation()}
          onKeyDown={createNewCategory}
          type="text"
          placeholder="Create new list, press ENTER to add"
          className="h-full bg-secondary/30 outline-none border-none focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-ring focus-visible:ring-offset-0 rounded-none"
        />
        <Separator className="mb-4 bg-slate-900" />
        <ScrollArea className="min-h-36 max-h-80 px-2">
          <ToggleGroup type="multiple" className="mt-2 flex-wrap" size={"sm"}>
            {isCategoriesPending ? (
              <div>Loading...</div>
            ) : isCategoriesError ? (
              <div>Error</div>
            ) : (
              categories.map((category, index) => (
                <ToggleGroupItem
                  key={index}
                  value={category.name}
                  onClick={() => handleToggle(category.name)}
                  data-state={
                    selectedItems.includes(category.name) ? "on" : "off"
                  }
                  className={cn(
                    ` h-7 bg-secondary/40 hover:bg-secondary/80 hover:text-white/80 data-[state=on]:bg-greeny_lighter data-[state=on]:hover:bg-greeny_lighter/75 data-[state=on]:text-background data-[state=on]:hover:text-background data-[state=on]:font-semibold`
                  )}
                >
                  <span>{category.name}</span>
                </ToggleGroupItem>
              ))
            )}
          </ToggleGroup>
        </ScrollArea>
        <div className="flex flex-row-reverse gap-2 justify-end w-full px-4 ">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="default"
                  size="sm"
                  className="font-semibold h-7 w-full"
                  onClick={handleSubmit}
                >
                  {isAddFavoritePending ? <ButtonLoader /> : "Save"}
                </Button>
              </TooltipTrigger>
              <TooltipContent
                side="bottom"
                className="max-w-40 flex flex-col items-center gap-1"
              >
                <div>
                  <BadgeInfoIcon size={16} />
                </div>
                <p className="text-center">
                  Add this podcast to the selected favorites lists
                </p>
              </TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="destructive"
                  size="sm"
                  className="font-semibold h-7 w-full"
                  onClick={handleUnFavorite}
                >
                  {isRemoveFavoritePending ? <ButtonLoader /> : "Unfavourite"}
                </Button>
              </TooltipTrigger>
              <TooltipContent
                side="bottom"
                className="max-w-40 flex flex-col items-center gap-1"
              >
                <div>
                  <BadgeInfoIcon size={16} />
                </div>
                <p className="text-center">
                  This would remove this podcast from all of your favorite lists
                </p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default PodcasterFavoritePopover;
