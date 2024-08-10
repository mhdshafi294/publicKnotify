"use client";

import React, { useEffect, useState } from "react";
import { useIntersectionObserver } from "@/hooks/use-intersection-observer";
import { useInfiniteQuery } from "@tanstack/react-query";
import Loader from "@/components/ui/loader";
import { getTrendingAction } from "@/app/actions/podcastActions";
import { Podcast, PodcastsResponse } from "@/types/podcast";
import { PodcastCard } from "./podcast-card";

const InfiniteScrollPodcasts = ({
  initialData,
  search,
  type,
}: {
  initialData: Podcast[] | undefined;
  search?: string;
  type: string;
}) => {
  const [isHydrated, setIsHydrated] = useState(false);
  useEffect(() => {
    if (!isHydrated) setIsHydrated(true);
  }, []);

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

  useEffect(() => {
    // console.log(isIntersecting, "isIntersecting");
    // console.log(hasNextPage, "hasNextPage");
    if (!isFetchingNextPage && hasNextPage && isIntersecting) {
      // console.log(true);
      fetchNextPage();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isFetchingNextPage, hasNextPage, isIntersecting]);

  return (
    <>
      <ul className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {data?.pages.map((page) =>
          page?.podcasts.map((podcast) => (
            <li key={podcast?.id}>
              <PodcastCard podcast={podcast} />
            </li>
          ))
        )}
      </ul>
      {/* loading spinner */}
      <div
        ref={ref}
        className="col-span-1 mt-1 flex items-center justify-center sm:col-span-2 md:col-span-3 lg:col-span-4"
      >
        {isFetchingNextPage && <Loader className="size-9" />}
        <span className="sr-only">Loading...</span>
      </div>
    </>
  );
};

export default InfiniteScrollPodcasts;
