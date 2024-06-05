"use client";

import { getTrendingAction } from "@/app/actions/podcastActions";
import TriangleToLeft from "@/components/icons/triangle-to-left";
import TriangleToRight from "@/components/icons/triangle-to-right";
import { PodcastCard, PodcastCardLoading } from "@/components/podcast-card";
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

<<<<<<< HEAD
  console.log(data);
=======
  if (isPending) {
    return <div>Loading...</div>;
  }

  if (isFetching) {
    return <div>Fetching...</div>;
  }

>>>>>>> 744113525169bb6d3e5a7d811a36c0c94e083477
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
          {isPending ? (
            Array(10)
              .fill(0)
              .map((_, index) => (
                <CarouselItem
                  key={index}
                  className="basis-1/2 md:basis-1/4 lg:basis-1/6"
                >
                  <PodcastCardLoading />
                </CarouselItem>
              ))
          ) : data?.podcasts.length === 0 ? (
            <p>No podcasts to load</p>
          ) : (
            data?.podcasts.map((podcast) => (
              <CarouselItem
                key={podcast.id}
                className="basis-1/2 md:basis-1/4 lg:basis-1/6"
              >
                <PodcastCard
                  thumbnail={podcast.thumbnail}
                  name={podcast.name}
                  podcaster_name={podcast.podcaster.full_name}
                  isFavorite={podcast.isFavorite}
                />
              </CarouselItem>
            ))
          )}
        </CarouselContent>
      </Carousel>
    </div>
  );
};

export default TrendingSection;
