"use client";

import React, { useEffect } from "react";
import { useIntersectionObserver } from "@/hooks/useIntersectionObserver";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useLocale, useTranslations } from "next-intl";

import Loader from "@/components/ui/loader";
import { Podcast, PodcastsResponse } from "@/types/podcast";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { getDirection } from "@/lib/utils";
import { getCompanySelfPodcastsAction } from "@/app/actions/requestsActions";
import ProfilePodcastCard from "@/app/[locale]/(platform)/[userType]/profile/_components/profile-podcast-card";

/**
 * Component to display podcasts from a company in a carousel with infinite scrolling.
 *
 * @param {object} props - Component props.
 * @param {Podcast[] | undefined} props.initialData - Initial podcast data.
 * @param {string} props.type - Type of user or context for the podcast.
 * @param {string} props.podcasterId - The ID of the podcaster.
 * @returns {JSX.Element} The rendered carousel of podcasts.
 */
const InfiniteScrollSelfCompanyPodcasts = ({
  initialData,
  type,
  podcasterId,
}: {
  initialData: Podcast[] | undefined;
  type: string;
  podcasterId: string;
}) => {
  const locale = useLocale();
  const t = useTranslations("Index");
  const direction = getDirection(locale);
  const { isIntersecting, ref } = useIntersectionObserver({ threshold: 0 });

  const {
    isError,
    error,
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ["profile_self_podcasts", { type, podcasterId }],
    queryFn: async ({ pageParam = 1 }) => {
      const response: PodcastsResponse = await getCompanySelfPodcastsAction({
        type,
        page: pageParam.toString(),
      });
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

  if (isError) {
    return <p className="text-red-500">{t("errorLoadingPodcasts")}</p>;
  }

  return (
    <Carousel opts={{ slidesToScroll: "auto", direction }} className="w-full">
      <div className="flex justify-between items-center">
        <h2 className="font-bold text-2xl">{t("episodes")}</h2>
        <div className="flex relative justify-end items-center end-[50px]">
          <CarouselPrevious />
          <CarouselNext />
        </div>
      </div>
      <CarouselContent className="w-full mt-5 ms-0 min-h-56 gap-3">
        {data?.pages[0].podcasts.length === 0 ? (
          <p className="text-lg my-auto opacity-70 dark:opacity-50 italic ">
            {t("noPodcastsYet")}
          </p>
        ) : (
          data?.pages.map((page) =>
            page.podcasts.map((podcast) => (
              <CarouselItem
                key={podcast.id}
                className="basis-1/2 md:basis-1/4 lg:basis-1/4 xl:basis-1/5 ps-0 group"
              >
                <ProfilePodcastCard podcast={podcast} userType={type} />
              </CarouselItem>
            ))
          )
        )}
        <CarouselItem
          ref={ref}
          className="basis-1/2 md:basis-1/3 lg:basis-1/12 ps-0 flex justify-center items-center"
        >
          {isFetchingNextPage && (
            <Loader className="size-9" variant={"infinity"} />
          )}
          <span className="sr-only">{t("loading")}</span>
        </CarouselItem>
      </CarouselContent>
    </Carousel>
  );
};

export default InfiniteScrollSelfCompanyPodcasts;
