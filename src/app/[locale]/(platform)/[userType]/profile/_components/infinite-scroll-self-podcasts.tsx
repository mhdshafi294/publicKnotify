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
import { getDirection } from "@/lib/utils";
import { useLocale } from "next-intl";
import { useSession } from "next-auth/react";
import SelfPodcastCard from "./self-podcast-card";

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
  const { data: session } = useSession();

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
        <h2 className="font-bold text-2xl">Podcasts</h2>
        <div className="flex relative justify-end items-center end-[50px]">
          <CarouselPrevious />
          <CarouselNext />
        </div>
      </div>
      <CarouselContent className="w-full mt-5 ms-0 min-h-56">
        {data?.pages[0].podcasts.length === 0 ? (
          <p className="text-lg my-auto opacity-50 italic ">No podcasts yet</p>
        ) : (
          data?.pages.map((page) =>
            page.podcasts.map((podcast) => (
              <CarouselItem
                key={podcast.id}
                className="basis-1/2 md:basis-1/4 lg:basis-1/4 xl:basis-1/5 ps-0 group"
              >
                <SelfPodcastCard podcast={podcast} userType={type} />
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

export default InfiniteScrollSelfPodcasts;
