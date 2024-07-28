"use client";

import React, { useEffect } from "react";
import { useIntersectionObserver } from "@/hooks/use-intersection-observer";
import { useInfiniteQuery } from "@tanstack/react-query";
import Loader from "@/components/ui/loader";
import { Podcaster, PodcastersResponse } from "@/types/podcaster";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { getDirection } from "@/lib/utils";
import { useLocale } from "next-intl";
import { useSession } from "next-auth/react";

import { PodcasterCard } from "./podcaster-card";
import { Link } from "@/navigation";
import { SquareArrowOutUpRightIcon } from "lucide-react";
import { getPodcastersAction } from "@/app/actions/podcasterActions";

const InfiniteScrollPodcasterersCarousel = ({
  initialData,
  // search,
  type,
}: {
  initialData: Podcaster[] | undefined;
  // search?: string;
  type: string;
}) => {
  const locale = useLocale();
  const direction = getDirection(locale);
  const { isIntersecting, ref } = useIntersectionObserver({
    threshold: 0,
  });
  const { data: session } = useSession();

  const {
    isError,
    error,
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ["trending_podcasters", { type }],
    queryFn: async ({ pageParam = 1 }) => {
      const response: PodcastersResponse = await getPodcastersAction({
        type,
        // search,
        page: pageParam.toString(),
      });
      return {
        podcasters: response.podcasters,
        pagination: {
          ...response.pagination,
          next_page_url: response.pagination.next_page_url,
          prev_page_url: response.pagination.prev_page_url,
        },
      };
    },
    getNextPageParam: (lastPage) => {
      return lastPage.pagination.next_page_url
        ? lastPage.pagination.current_page + 1
        : undefined;
    },
    initialPageParam: 1,
    initialData: () => {
      if (initialData) {
        return {
          pages: [
            {
              podcasters: initialData || [],
              pagination: {
                current_page: 1,
                first_page_url: "",
                last_page_url: "",
                next_page_url:
                  initialData && initialData.length > 0 ? "" : null,
                per_page: 10,
                prev_page_url: null,
                total: initialData ? initialData.length : 0,
              },
            },
          ],
          pageParams: [1],
        };
      }
    },
  });

  useEffect(() => {
    if (!isFetchingNextPage && hasNextPage && isIntersecting) {
      fetchNextPage();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isFetchingNextPage, hasNextPage, isIntersecting]);

  return (
    <Carousel opts={{ slidesToScroll: "auto", direction }} className="w-full">
      <div className="flex justify-between items-center">
        <h2 className="font-bold text-2xl">Podcasters</h2>
        <div className="flex relative justify-end items-center">
          {/* <CarouselPrevious />
          <CarouselNext /> */}
          <Link
            href={`${type}/podcaster`}
            className="flex gap-2 items-center text-card-foreground/50 hover:text-card-foreground/100 duration-200"
          >
            <p className="font-semibold ">View All</p>
            <SquareArrowOutUpRightIcon size={14} className="" />
          </Link>
        </div>
      </div>
      <CarouselContent className="w-full mt-5 ms-0 min-h-56">
        {data?.pages[0].podcasters.length === 0 ? (
          <p className="text-lg my-auto opacity-50 italic ">
            No podcasters yet
          </p>
        ) : (
          data?.pages.map((page) =>
            page.podcasters.map((podcaster) => (
              <CarouselItem
                key={podcaster.id}
                className="basis-1/2 md:basis-1/4 lg:basis-1/4 xl:basis-1/5 ps-0"
              >
                <PodcasterCard podcaster={podcaster} />
              </CarouselItem>
            ))
          )
        )}
        {
          <CarouselItem
            ref={ref}
            className="basis-1/2 md:basis-1/3 lg:basis-1/12 ps-0 flex justify-center items-center"
          >
            {isFetchingNextPage && (
              <Loader className="size-9" variant={"infinity"} />
            )}
            <span className="sr-only">Loading...</span>
          </CarouselItem>
        }
      </CarouselContent>
    </Carousel>
  );
};

export default InfiniteScrollPodcasterersCarousel;
