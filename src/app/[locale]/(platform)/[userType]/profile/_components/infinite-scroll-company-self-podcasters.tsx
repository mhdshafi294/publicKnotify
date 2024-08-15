"use client";

import React, { useEffect } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useLocale, useTranslations } from "next-intl";

import { useIntersectionObserver } from "@/hooks/use-intersection-observer";
import Loader from "@/components/ui/loader";
import { Podcaster, PodcastersResponse } from "@/types/podcaster";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { getDirection } from "@/lib/utils";
import { getCompanySelfPodcastersAction } from "@/app/actions/podcasterActions";
import { PodcasterCard } from "@/components/podcaster-card";

/**
 * Component to display podcasters from a company in a carousel with infinite scrolling.
 *
 * @param {object} props - Component props.
 * @param {Podcaster[] | undefined} props.initialData - Initial podcaster data.
 * @param {string} props.type - Type of user or context for the podcaster.
 * @returns {JSX.Element} The rendered carousel of podcasters.
 */
const InfiniteScrollCompanySelfPodcasters = ({
  initialData,
  type,
}: {
  initialData: Podcaster[] | undefined;
  type: string;
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
    queryKey: ["profile_self_podcasters", { type }],
    queryFn: async ({ pageParam = 1 }) => {
      const response: PodcastersResponse = await getCompanySelfPodcastersAction(
        {
          type,
          page: pageParam.toString(),
        }
      );
      return {
        podcasters: response.podcasters,
        pagination: response.pagination,
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
                next_page_url: initialData.length > 0 ? "" : null,
                per_page: 10,
                prev_page_url: null,
                total: initialData.length,
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
    return <p className="text-red-500">{t("errorLoadingPodcasters")}</p>;
  }

  return (
    <Carousel opts={{ slidesToScroll: "auto", direction }} className="w-full">
      <div className="flex justify-between items-center">
        <h2 className="font-bold text-2xl">{t("podcasters")}</h2>
        <div className="flex relative justify-end items-center end-[50px]">
          <CarouselPrevious />
          <CarouselNext />
        </div>
      </div>
      <CarouselContent className="w-full mt-5 ms-0 min-h-56 gap-3">
        {data?.pages[0].podcasters.length === 0 ? (
          <p className="text-lg my-auto opacity-50 italic ">
            {t("noPodcastersYet")}
          </p>
        ) : (
          data?.pages.map((page) =>
            page.podcasters.map((podcaster) => (
              <CarouselItem
                key={podcaster.id}
                className="basis-1/2 md:basis-1/4 lg:basis-1/4 xl:basis-1/5 ps-0 group"
              >
                <PodcasterCard podcaster={podcaster} />
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

export default InfiniteScrollCompanySelfPodcasters;
