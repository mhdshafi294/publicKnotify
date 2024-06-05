"use client";

import { getTrendingAction } from "@/app/actions/podcastActions";
import { getPodcastersAction } from "@/app/actions/podcasterActions";
import TriangleToLeft from "@/components/icons/triangle-to-left";
import TriangleToRight from "@/components/icons/triangle-to-right";
import PodcastCard from "@/components/podcast-card";
import PodcasterCard from "@/components/podcaster-card";
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

const PodcastersSection = ({
  params,
  searchParams,
}: {
  params: { userType: string };
  searchParams: { [key: string]: string | string[] | undefined };
}) => {
  const [page, setPage] = useState(1);

  const { isPending, isError, error, data, isFetching, isPlaceholderData } =
    useQuery({
      queryKey: ["podcasters", page],
      queryFn: () =>
        getPodcastersAction({
          count: searchParams.count as string,
          search: searchParams.search as string,
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

  console.log(data);
  return (
    <div className="w-full space-y-5">
      <Carousel opts={{ slidesToScroll: "auto" }} className="">
        <div className="flex justify-between items-center">
          <h2 className="font-bold text-2xl">Top 10 Podcasters</h2>
          <div className="flex relative justify-end items-center -translate-x-20">
            <CarouselPrevious />
            <CarouselNext onClick={() => setPage((prev) => prev + 1)} />
          </div>
        </div>
        <CarouselContent className="w-full mt-5">
          {data?.podcasters.map((podcaster) => (
            <CarouselItem
              key={podcaster.id}
              className="basis-1/3 md:basis-1/5 lg:basis-1/12"
            >
              <PodcasterCard
                full_name={podcaster.full_name}
                image={podcaster.image}
                is_favorite={podcaster.is_favorite}
              />
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  );
};

export default PodcastersSection;
