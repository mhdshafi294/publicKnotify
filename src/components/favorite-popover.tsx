"use client";
import React, { useState } from "react";
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
  getMyFavoriteCategoriesListAction,
} from "@/app/actions/podcastActions";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Category } from "@/types/podcast";
import { Button } from "@/components/ui/button";
import ButtonLoader from "@/components/ui/button-loader";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";

type FavoritePopoverProps = {
  isFavorite: boolean;
  triggerSize?: number;
  podcastId: string;
};

const FavoritePopover: React.FC<FavoritePopoverProps> = ({
  isFavorite: is_favorite,
  triggerSize = 20,
  podcastId,
}) => {
  const session = useSession();

  const [selectedItems, setSelectedItems] = useState<string[]>([]);

  const {
    data: categories,
    isPending: isCategoriesPending,
    isError,
  } = useQuery({
    queryKey: ["favorite_categories", session.data?.user?.id],
    queryFn: () =>
      getMyFavoriteCategoriesListAction({
        type: session?.data?.user?.type!,
      }),
  });

  const {
    data,
    mutate: server_AddToFavoriteAction,
    isPending: isAddFavoritePending,
  } = useMutation({
    mutationFn: AddToFavoriteAction,
    onSuccess: () => {
      toast.success("added successfully.");
    },
    onError: (error) => {
      console.log(error);
    },
  });

  const handleSubmit = async () => {
    server_AddToFavoriteAction({
      categories: selectedItems,
      podcastId,
      type: session?.data?.user?.type!,
    });
  };

  const queryClient = useQueryClient();
  const createNewCategory = (event: React.KeyboardEvent<HTMLInputElement>) => {
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
    }
  };

  const handleToggle = (item: string) => {
    setSelectedItems((prevSelectedItems) =>
      prevSelectedItems.includes(item)
        ? prevSelectedItems.filter((i) => i !== item)
        : [...prevSelectedItems, item]
    );
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        {is_favorite ? (
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
      <PopoverContent className="px-0">
        <p className="px-4 w-full text-sm">Add to favorite lists</p>
        <Separator className="mt-2 bg-slate-900" />
        <Input
          onKeyDown={createNewCategory}
          placeholder="Create new list, press ENTER to add"
          className="h-full bg-secondary/30 outline-none border-none focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-ring focus-visible:ring-offset-0 rounded-none"
        />
        <Separator className="mb-4 bg-slate-900" />
        <ScrollArea className="min-h-36 max-h-80 px-2">
          <ToggleGroup type="multiple" className="mt-2 flex-wrap" size={"sm"}>
            {isCategoriesPending ? (
              <div>Loading...</div>
            ) : isError ? (
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
                    ` h-7 bg-secondary/40 hover:bg-secondary/80 hover:text-white/80 data-[state=on]:bg-greeny_lighter data-[state=on]:hover:bg-greeny_lighter/75 data-[state=on]:text-background data-[state=on]:hover:text-background`
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
                >
                  Unfavourite
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

export default FavoritePopover;
