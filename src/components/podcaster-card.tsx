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
    <div className="w-full flex flex-col gap-1 rounded-lg overflow-hidden">
      <div className="relative lg:h-36 aspect-square rounded-lg">
        <Image
          src={image ? image : "/podcaster-filler.webp"}
          alt={`${name} thumbnail`}
          fill
          className="object-cover"
        />
      </div>
      <h3 className="font-bold text-sm text-wrap">{full_name}</h3>
      <div className="flex items-center justify-between">
        <p className="text-xs font-medium">{full_name}</p>
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

export const PodcasterCardLoading = () => {
  return (
    <div className="w-full flex flex-col gap-2 rounded-lg overflow-hidden">
      <Skeleton className="relative lg:h-36 aspect-square rounded-lg" />
      <Skeleton className="h-3 w-10" />
      <div className="flex items-center justify-between">
        <Skeleton className="h-3 w-16" />
        <Skeleton className="size-3" />
      </div>
    </div>
  );
};
