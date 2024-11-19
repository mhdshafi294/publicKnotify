"use client";

import Image from "next/image";
import React, { useState } from "react";
import { useSession } from "next-auth/react";

import { Link } from "@/navigation";
import { removeFromFavoriteAction } from "@/app/actions/podcasterActions";
import { cn } from "@/lib/utils";
import { Podcaster } from "@/types/podcaster";
import PodcasterFavoritePopover from "./podcaster-favorite-popover";
import { Skeleton } from "./ui/skeleton";
import UnfavoriteButton from "./unfavorite-button";
import { Card, CardContent } from "./ui/card";

type PodCasterCard2Props = {
  podcaster: Podcaster;
  className?: string;
  contentRatio?: string;
};

export const PodcasterCard2: React.FC<PodCasterCard2Props> = ({
  podcaster,
  className,
  contentRatio,
}) => {
  const [isFavorite, setIsFavorite] = useState(podcaster.is_favorite);
  const [selectedItems, setSelectedItems] = useState<string[]>(
    podcaster.favourite_categories.map((category) => category.name)
  );
  const { data: session } = useSession();

  return (
    <Card
      className={cn(
        "relative overflow-hidden rounded-none lg:max-h-[305px]",
        className
      )}
    >
      <Link
        passHref
        href={`/${session?.user?.type}/profile/podcaster/${podcaster.id}`}
        className="lg:max-h-[305px]"
      >
        <CardContent className={cn("p-0", contentRatio)}>
          <Image
            src={podcaster.image ? podcaster.image : "/podcaster-filler.webp"}
            alt={podcaster.full_name}
            className="object-cover"
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/60 to-transparent">
            <div className="text-white">
              <div className="font-medium">{podcaster.full_name}</div>
              <div className="text-xs opacity-90">
                {podcaster.categories.map((category) => (
                  <span key={category.id} className="mr-2">
                    {category.name}
                  </span>
                ))}
              </div>
            </div>
          </div>
          <div className="absolute top-2 right-2">
            {isFavorite ? (
              <UnfavoriteButton
                id={podcaster.id.toString()}
                setIsFavorite={setIsFavorite}
                setSelectedItems={setSelectedItems}
                removeFromFavoriteAction={removeFromFavoriteAction}
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
        </CardContent>
      </Link>
    </Card>
  );
};
