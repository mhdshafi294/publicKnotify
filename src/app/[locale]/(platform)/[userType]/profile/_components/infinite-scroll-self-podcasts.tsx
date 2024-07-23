"use client";

import React, { useEffect } from "react";
import { useIntersectionObserver } from "@/hooks/use-intersection-observer";
import { useInfiniteQuery } from "@tanstack/react-query";
import Loader from "@/components/ui/loader";
import { getSelfPodcastsAction } from "@/app/actions/podcastActions";
import {
  SelfPodcastDetails,
  SelfPodcastsDetailsResponse,
} from "@/types/podcast";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { PodcastCard, PodcastCardLoading } from "@/components/podcast-card";
import { getDirection } from "@/lib/utils";
import { useLocale } from "next-intl";

const InfiniteScrollSelfPodcasts = ({
  initialData,
  search,
  type,
}: {
  initialData: SelfPodcastDetails[] | undefined;
  search?: string;
  type: string;
}) => {
  const locale = useLocale();
  const direction = getDirection(locale);
  const { isIntersecting, ref } = useIntersectionObserver({
    threshold: 0,
  });

  const {
    isError,
    error,
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ["profile_self_podcasts", { type, search }],
    queryFn: async ({ pageParam = 1 }) => {
      const response: SelfPodcastsDetailsResponse = await getSelfPodcastsAction(
        {
          type,
          search,
          page: pageParam.toString(),
        }
      );
      return {
        podcasts: response.podcasts,
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
              podcasts: initialData || [],
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
        <h2 className="font-bold text-2xl">Trending Podcasts</h2>
        <div className="flex relative justify-end items-center end-[80px]">
          <CarouselPrevious />
          <CarouselNext />
        </div>
      </div>
      <CarouselContent className="w-full mt-5 ms-0">
        {data?.pages[0].podcasts.length === 0 ? (
          <p>No podcasts to load</p>
        ) : (
          data?.pages.map((page) =>
            page.podcasts.map((podcast) => (
              <CarouselItem
                key={podcast.id}
                className="basis-1/2 md:basis-1/4 lg:basis-1/5 ps-0"
              >
                <div className="w-[100px] h-[100px] bg-cyan-700 rounded-lg ">
                  {podcast.id}
                </div>
              </CarouselItem>
            ))
          )
        )}
        {
          <div
            ref={ref}
            className="col-span-1 mt-1 flex items-center justify-center sm:col-span-2 md:col-span-3 lg:col-span-4"
          >
            {isFetchingNextPage && <Loader className="size-9" />}
            <span className="sr-only">Loading...</span>
          </div>
        }
      </CarouselContent>
    </Carousel>
    // <>
    //   <ul className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
    //     {data?.pages.map((page) =>
    //       page?.podcasts.map((request) => <li key={request?.id}></li>)
    //     )}
    //   </ul>
    //   {/* loading spinner */}
    //   <div
    //     ref={ref}
    //     className="col-span-1 mt-1 flex items-center justify-center sm:col-span-2 md:col-span-3 lg:col-span-4"
    //   >
    //     {isFetchingNextPage && <Loader className="size-9" />}
    //     <span className="sr-only">Loading...</span>
    //   </div>
    // </>
  );
};

export default InfiniteScrollSelfPodcasts;
