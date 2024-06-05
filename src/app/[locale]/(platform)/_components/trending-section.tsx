"use client";

import { getTrendingAction } from "@/app/actions/podcastActions";
import TriangleToLeft from "@/components/icons/triangle-to-left";
import TriangleToRight from "@/components/icons/triangle-to-right";
import PodcastCard from "@/components/podcast-card";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { Heart, HeartCrack, HeartHandshakeIcon, HeartOff } from "lucide-react";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import React, { useState } from "react";

const TrendingSection = ({
  params,
  searchParams,
}: {
  params: { userType: string };
  searchParams: { [key: string]: string | string[] | undefined };
}) => {
  const [page, setPage] = useState(1);

  const { isPending, isError, error, data, isFetching, isPlaceholderData } =
    useQuery({
      queryKey: ["projects", page],
      queryFn: () =>
        getTrendingAction({
          count: searchParams.count as string,
          search: searchParams.search as string,
          category_id: searchParams.category_id as string,
          page: page.toString(),
          type: params.userType as string,
        }),
      placeholderData: keepPreviousData,
    });

  if (isError) {
    console.log(error);
    return <div>Something went wrong. Please try again</div>;
  }

  if (isPending) {
    return <div>Loading...</div>;
  }

  if (isFetching) {
    return <div>Fetching...</div>;
  }

  return (
    <div className="w-full space-y-5">
      <Carousel opts={{ slidesToScroll: "auto" }} className="">
        <div className="flex justify-between items-center">
          <h2 className="font-bold text-2xl">Trending Podcasts</h2>
          <div className="flex relative justify-end items-center -translate-x-20">
            <CarouselPrevious />
            <CarouselNext />
          </div>
        </div>
        <CarouselContent className="w-full mt-5">
          {data?.podcasts.map((project) => (
            <CarouselItem
              key={project.id}
              className="basis-1/2 md:basis-1/4 xl:basis-1/6"
            >
              <PodcastCard
                thumbnail={project.thumbnail}
                name={project.name}
                podcaster_name={project.podcaster.full_name}
                isFavorite={project.isFavorite}
              />
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  );
};

export default TrendingSection;
