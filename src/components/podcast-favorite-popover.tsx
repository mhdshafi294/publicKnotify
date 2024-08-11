"use client";
import React, { useEffect, useState } from "react";
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
  addToFavoriteAction,
  getMyFavoriteCategoriesListAction,
  removeFromFavoriteAction,
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
import { useTranslations } from "next-intl";

type PodcastFavoritePopoverProps = {
  podcastId: string;
  triggerSize?: number;
  isFavorite: boolean;
  setIsFavorite: React.Dispatch<React.SetStateAction<boolean>>;
  selectedItems: string[];
  setSelectedItems: React.Dispatch<React.SetStateAction<string[]>>;
};

const PodcastFavoritePopover: React.FC<PodcastFavoritePopoverProps> = ({
  triggerSize = 20,
  podcastId,
  isFavorite,
  setIsFavorite,
  selectedItems,
  setSelectedItems,
}) => {
  const session = useSession();
  const queryClient = useQueryClient();
  const t = useTranslations("Index");

  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    if (!isMounted) setIsMounted(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [isOpen, setIsOpen] = useState(false);

  const {
    data: categories,
    isPending: isCategoriesPending,
    isError: isCategoriesError,
  } = useQuery({
    queryKey: ["favorite_categories", session?.data?.user?.id],
    queryFn: () =>
      getMyFavoriteCategoriesListAction({
        type: session?.data?.user?.type!,
      }),
    enabled: !!session?.data?.user?.type,
  });

  const {
    data: addToFavoriteResponse,
    mutate: server_AddToFavoriteAction,
    isPending: isAddFavoritePending,
  } = useMutation({
    mutationFn: addToFavoriteAction,
    onSuccess: () => {
      toast.success(t("addedSuccessfully"));
      setIsFavorite(true);
      setIsOpen(false);
    },
    onError: (error) => {
      console.log(error);
    },
  });

  const createNewCategory = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (
      event.key === "Enter" ||
      (event.key === " " && event.currentTarget.value.trim() !== "")
    ) {
      const createdCategory = event.currentTarget.value.trim();
      // console.log(createdCategory);
      queryClient.setQueryData(
        ["favorite_categories", session.data?.user?.id],
        (old: Category[]) => {
          if (!old.find((category) => category.name === createdCategory)) {
            return [
              ...old,
              {
                id: old.length > 0 ? old[old.length - 1].id + 1 : 1,
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
    } else return;
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
      id: podcastId,
      type: session?.data?.user?.type!,
    });
  };

  if (!isMounted) return null;

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger onClick={(e) => e.stopPropagation()} asChild>
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
        onOpenAutoFocus={(e) => e.preventDefault()}
        forceMount
      >
        <p className="px-4 w-full text-sm">{t("addToFavoriteLists")}</p>
        <Separator className="mt-2 bg-slate-900" />
        <Input
          onKeyDown={createNewCategory}
          placeholder={t("newFavoriteList")}
          className="h-full bg-secondary/30 outline-none border-none focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-ring focus-visible:ring-offset-0 rounded-none"
        />
        <p className="py-2 px-3 text-xs opacity-50 font-light">
          {t("typeAndPressSpace")}
        </p>
        <Separator className="mb-4 bg-slate-900" />
        <ScrollArea className="min-h-36 max-h-80 px-2">
          <ToggleGroup type="multiple" className="mt-2 flex-wrap" size={"sm"}>
            {isCategoriesPending ? (
              <div>{t("loading")}</div>
            ) : isCategoriesError ? (
              <div>{t("somethingWentWrong")}</div>
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
                  {isAddFavoritePending ? <ButtonLoader /> : t("save")}
                </Button>
              </TooltipTrigger>
              <TooltipContent
                side="bottom"
                className="max-w-40 flex flex-col items-center gap-1"
              >
                <div>
                  <BadgeInfoIcon size={16} />
                </div>
                <p className="text-center">{t("addToFavoritesTooltip")}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default PodcastFavoritePopover;
