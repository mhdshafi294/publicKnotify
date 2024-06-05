import Image from "next/image";
import React from "react";
import { Button } from "./ui/button";
import { Heart } from "lucide-react";
import { Skeleton } from "./ui/skeleton";

type PodCasterCardProps = {
  full_name?: string;
  image?: string;
  is_favorite: boolean;
};

export const PodcasterCard: React.FC<PodCasterCardProps> = ({
  full_name,
  image,
  is_favorite: isFavorite,
}) => {
  return (
    <div className="w-full flex flex-col gap-3 rounded-lg overflow-hidden">
      <div className="relative aspect-square rounded-lg">
        <Image
          src={image ? image : "/podcaster-filler.webp"}
          alt={`${full_name} thumbnail`}
          fill
          className="object-cover rounded-lgn "
        />
      </div>

      <div className="flex items-center justify-between">
        <h3 className="font-bold text-xs text-wrap capitalize">{full_name}</h3>
        {isFavorite ? (
          <Button
            variant="outline"
            className="p-0 outline-none border-none h-fit hover:bg-transparent hover:text-primary"
          >
            <Heart size={16} fill="#004FFF" stroke="#004FFF" />
          </Button>
        ) : (
          <Button
            variant="outline"
            className="p-0 outline-none border-none h-fit hover:bg-transparent hover:text-primary"
          >
            <Heart size={16} />
          </Button>
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
