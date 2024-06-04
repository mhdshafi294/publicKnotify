import Image from "next/image";
import React from "react";
import { Button } from "./ui/button";
import { Heart } from "lucide-react";

type PodCastCardProps = {
  thumbnail?: string;
  name?: string;
  podcaster_name: string;
  isFavorite: boolean;
};

const PodcastCard: React.FC<PodCastCardProps> = ({
  thumbnail,
  name,
  podcaster_name,
  isFavorite,
}) => {
  return (
    <div className="w-full flex flex-col gap-1 rounded-lg overflow-hidden">
      <div className="relative lg:h-36 aspect-square rounded-lg">
        <Image
          src={thumbnail ? thumbnail : ""}
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
            className="p-0 outline-none border-none h-fit"
          >
            <Heart size={20} fill="red" stroke="red" />
          </Button>
        ) : (
          <Button
            variant="outline"
            className="p-0 outline-none border-none h-fit"
          >
            <Heart size={20} />
          </Button>
        )}
      </div>
    </div>
  );
};

export default PodcastCard;
