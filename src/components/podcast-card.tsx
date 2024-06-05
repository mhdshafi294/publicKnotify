import Image from "next/image";
import React from "react";
import { Button } from "./ui/button";
import { Heart } from "lucide-react";
import { Skeleton } from "./ui/skeleton";

type PodCastCardProps = {
  thumbnail?: string;
  name?: string;
  podcaster_name: string;
  isFavorite: boolean;
};

export const PodcastCard: React.FC<PodCastCardProps> = ({
  thumbnail,
  name,
  podcaster_name,
  isFavorite,
}) => {
  return (
    <div className="w-full flex flex-col gap-2 rounded-lg overflow-hidden">
      <div className="relative aspect-video rounded-lg">
        <Image
          src={thumbnail ? thumbnail : "/podcast-filler.webp"}
          alt={`${name} thumbnail`}
          fill
          className="object-cover"
        />
      </div>
      <h3 className="font-bold text-sm text-wrap">{name}</h3>
      <div className="flex items-center justify-between">
        <p className="text-xs font-medium">{podcaster_name}</p>
        {isFavorite ? (
          <Button
            variant="outline"
            className="p-0 outline-none border-none h-fit hover:bg-transparent hover:text-primary"
          >
            <Heart size={20} fill="#004FFF" stroke="#004FFF" />
          </Button>
        ) : (
          <Button
            variant="outline"
            className="p-0 outline-none border-none h-fit hover:bg-transparent hover:text-primary"
          >
            <Heart size={20} />
          </Button>
        )}
      </div>
    </div>
  );
};

export const PodcastCardLoading = () => {
  return (
    <div className="w-full flex flex-col gap-2 rounded-lg overflow-hidden">
      <Skeleton className="relative aspect-video rounded-lg" />
      <Skeleton className="h-3 w-36" />
      <div className="flex items-center justify-between">
        <Skeleton className="h-3 w-12" />
        <Skeleton className="size-3" />
      </div>
    </div>
  );
};
