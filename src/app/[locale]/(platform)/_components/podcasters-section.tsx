"use client";

import { getPodcastersAction } from "@/app/actions/podcasterActions";
import {
  PodcasterCard,
  PodcasterCardLoading,
} from "@/components/podcaster-card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import React, { useState } from "react";

const PodcastersSection = ({
  params,
  searchParams,
}: {
  params: { userType: string };
  searchParams: { [key: string]: string | string[] | undefined };
}) => {
  const [page, setPage] = useState(1);

  const { isPending, isError, error, data, isPlaceholderData } = useQuery({
    queryKey: ["podcasters", page],
    queryFn: () =>
      getPodcastersAction({
        count: "10",
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

  return (
    <div className="w-full space-y-5">
      <Carousel opts={{ slidesToScroll: "auto" }} className="">
        <div className="flex justify-between items-center">
          <h2 className="font-bold text-2xl">Top 10 Podcasters</h2>
          {/* <div className="flex relative justify-end items-center -translate-x-20">
            <CarouselPrevious />
            <CarouselNext />
          </div> */}
        </div>
        <CarouselContent className="w-full mt-5">
          {isPending ? (
            Array(10)
              .fill(0)
              .map((_, index) => (
                <CarouselItem
                  key={index}
                  className="basis-1/3 md:basis-1/5 lg:basis-[10%]"
                >
                  <PodcasterCardLoading />
                </CarouselItem>
              ))
          ) : data?.podcasters.length === 0 ? (
            <p>No podcasters to load</p>
          ) : (
            data?.podcasters.map((podcaster) => (
              <CarouselItem
                key={podcaster.id}
                className="basis-1/3 md:basis-1/5 lg:basis-[10%]"
              >
                <PodcasterCard
                  full_name={podcaster.full_name}
                  image={podcaster.image}
                  is_favorite={podcaster.is_favorite}
                />
              </CarouselItem>
            ))
          )}
        </CarouselContent>
      </Carousel>
    </div>
  );
};

export default PodcastersSection;
