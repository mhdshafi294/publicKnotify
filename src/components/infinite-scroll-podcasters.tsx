"use client";

import { getPodcastersAction } from "@/app/actions/podcasterActions";
import Loader from "@/components/ui/loader";
import { useIntersectionObserver } from "@/hooks/useIntersectionObserver";
import { PodcastersResponse } from "@/types/podcaster";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { PodcasterCard } from "./podcaster-card";

const InfiniteScrollPodcasters = ({
  initialData,
  search,
  type,
}: {
  initialData: PodcastersResponse | undefined;
  search?: string;
  type: string;
}) => {
  const [isHydrated, setIsHydrated] = useState(false);
  useEffect(() => {
    if (!isHydrated) setIsHydrated(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
      if (lastPage?.pagination.next_page_url) {
        return lastPage?.pagination.current_page + 1;
      } else {
        return undefined;
      }
    },
    initialPageParam: 1,
    initialData: {
      pages: [initialData],
      pageParams: [1],
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
      <ul className="w-full grid grid-cols-3 md:grid-cols-5 lg:grid-cols-7 gap-0">
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
