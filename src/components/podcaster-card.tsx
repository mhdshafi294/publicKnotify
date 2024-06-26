"use cllient";

import Image from "next/image";
import React, { useState } from "react";

import { Skeleton } from "./ui/skeleton";
import { Podcaster } from "@/types/podcaster";
import PodcasterFavoritePopover from "./podcaster-favorite-popover";
import UnfavoriteButton from "./unfavorite-button";
import { RemoveFromFavoriteAction } from "@/app/actions/podcasterActions";

type PodCasterCardProps = {
  podcaster: Podcaster;
};

export const PodcasterCard: React.FC<PodCasterCardProps> = ({ podcaster }) => {
  const [isFavorite, setIsFavorite] = useState(podcaster.is_favorite);
  const [selectedItems, setSelectedItems] = useState<string[]>(
    podcaster.favourite_categories.map((category) => category.name)
  );

  return (
    <div className="w-full flex flex-col gap-3 rounded-lg overflow-hidden">
      <div className="relative aspect-square rounded-lg">
        <Image
          src={podcaster.image ? podcaster.image : "/podcaster-filler.webp"}
          alt={`${podcaster.full_name} thumbnail`}
          fill
          className="object-cover rounded-lg"
        />
      </div>

      <div className="flex items-center justify-between">
        <h3 className="font-bold text-xs text-wrap capitalize">
          {podcaster.full_name}
        </h3>
        {isFavorite ? (
          <UnfavoriteButton
            id={podcaster.id.toString()}
            setIsFavorite={setIsFavorite}
            setSelectedItems={setSelectedItems}
            removeFromFavoriteAction={RemoveFromFavoriteAction}
          />
        ) : (
          <PodcasterFavoritePopover
            podcasterId={podcaster.id.toString()}
            isFavorite={isFavorite}
            setIsFavorite={setIsFavorite}
            selectedItems={selectedItems}
            setSelectedItems={setSelectedItems}
          />
        )}
      </div>
    </div>
  );
};

export const PodcasterCardLoading = () => {
  return (
    <div className="w-full flex flex-col gap-2 rounded-lg overflow-hidden">
      <Skeleton className="relative aspect-square rounded-lg" />
      <div className="flex items-center justify-between">
        <Skeleton className="h-3 w-16" />
        <Skeleton className="size-3" />
      </div>
    </div>
  );
};
