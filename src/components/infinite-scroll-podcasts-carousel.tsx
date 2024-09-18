"use client";

// Global imports
import React, { useEffect } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useLocale, useTranslations } from "next-intl";
import { useSession } from "next-auth/react";
import { SquareArrowOutUpRightIcon } from "lucide-react";

// Local imports
import Loader from "@/components/ui/loader";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { useIntersectionObserver } from "@/hooks/useIntersectionObserver";
import { getTrendingAction } from "@/app/actions/podcastActions";
import { Podcast, PodcastsResponse } from "@/types/podcast";
import { getDirection } from "@/lib/utils";
import { PodcastCard } from "./podcast-card";
import { Link } from "@/navigation";

/**
 * InfiniteScrollPodcastsCarousel Component
 * Renders a carousel of podcasts with infinite scrolling.
 * Fetches and displays podcasts based on the search query and user type.
 *
 * @param {Object} props - The props object.
 * @param {Podcast[] | undefined} props.initialData - Initial podcast data.
 * @param {string} [props.search] - The search query.
 * @param {string} props.type - The type of the user or content.
 *
 * @returns {JSX.Element} The carousel of podcasts with infinite scroll.
 */
const InfiniteScrollPodcastsCarousel = ({
  initialData,
  search,
  type,
}: {
  initialData: Podcast[] | undefined;
  search?: string;
  type: string;
}) => {
  // Fetch locale and translations
  const locale = useLocale();
  const t = useTranslations("Index");
  const direction = getDirection(locale);

  // Intersection observer to detect when to fetch the next page
  const { isIntersecting, ref } = useIntersectionObserver({
    threshold: 0,
  });

  // Session management
  const { data: session } = useSession();

  // Infinite query for fetching podcasts
  const {
    isError,
    error,
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ["trending_podcasts", { type, search }],
    queryFn: async ({ pageParam = 1 }) => {
      const response: PodcastsResponse = await getTrendingAction({
        type,
        search,
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

  // Fetch next page when intersection is detected and more pages are available
  useEffect(() => {
    if (!isFetchingNextPage && hasNextPage && isIntersecting) {
      fetchNextPage();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isFetchingNextPage, hasNextPage, isIntersecting]);

  return (
    <Carousel opts={{ slidesToScroll: "auto", direction }} className="w-full">
      <div className="flex justify-between items-center">
        <h2 className="font-bold text-2xl">{t("podcasts")}</h2>
        <div className="flex relative justify-end items-center">
          {/* Link to view all podcasts */}
          <Link
            href={{
              pathname: `${type}/podcast`,
              query: { search },
            }}
            className="flex gap-2 items-center text-card-foreground/50 hover:text-card-foreground/100 duration-200"
          >
            <p className="font-semibold">{t("viewAll")}</p>
            <SquareArrowOutUpRightIcon size={14} />
          </Link>
        </div>
      </div>
      <CarouselContent className="w-full mt-5 ms-0 min-h-56 gap-3">
        {data?.pages[0].podcasts.length === 0 ? (
          <p className="text-lg my-auto opacity-70 dark:opacity-50 italic">
            {t("noPodcastsYet")}
          </p>
        ) : (
          data?.pages.map((page) =>
            page.podcasts.map((podcast) => (
              <CarouselItem
                key={podcast.id}
                className="basis-1/2 md:basis-1/4 lg:basis-1/4 xl:basis-1/5 ps-0"
              >
                <PodcastCard podcast={podcast} />
              </CarouselItem>
            ))
          )
        )}
        {/* Loader for fetching next page */}
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

export default InfiniteScrollPodcastsCarousel;
