"use client";

import React, { useEffect, useState } from "react";
import { useIntersectionObserver } from "@/hooks/use-intersection-observer";
import { useInfiniteQuery } from "@tanstack/react-query";
import Loader from "@/components/ui/loader";
import { Podcaster, PodcastersResponse } from "@/types/podcaster";
import { PodcasterCard } from "./podcaster-card";
import { getPodcastersAction } from "@/app/actions/podcasterActions";

const InfiniteScrollPodcasters = ({
  initialData,
  search,
  type,
}: {
  initialData: Podcaster[] | undefined;
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
    queryKey: ["trending_podcasters", { type, search }],
    queryFn: async ({ pageParam = 1 }) => {
      const response: PodcastersResponse = await getPodcastersAction({
        type,
        search,
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
    // console.log(isIntersecting, "isIntersecting");
    // console.log(hasNextPage, "hasNextPage");
    if (!isFetchingNextPage && hasNextPage && isIntersecting) {
      console.log(true);
      fetchNextPage();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isFetchingNextPage, hasNextPage, isIntersecting]);

  return (
    <>
      <ul className="w-full grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
        {data?.pages.map((page) =>
          page?.podcasters.map((podcaster) => (
            <li key={podcaster?.id}>
              <PodcasterCard podcaster={podcaster} />
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

export default InfiniteScrollPodcasters;
