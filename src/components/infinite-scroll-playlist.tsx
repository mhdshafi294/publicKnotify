"use client";

import React, { useEffect, useState } from "react";
import { useIntersectionObserver } from "@/hooks/use-intersection-observer";
import { useInfiniteQuery } from "@tanstack/react-query";
import Loader from "@/components/ui/loader";
import PlaylistCard from "./playlist-card";
import { Playlist, PlaylistsResponse } from "@/types/podcast";
import { getPlayListsAction } from "@/app/actions/podcastActions";

const InfiniteScrollPlaylist = ({
  initialData,
  search,
  type,
}: {
  initialData: Playlist[] | undefined;
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
    queryKey: ["playlists", { type, search }],
    queryFn: async ({ pageParam = 1 }) => {
      const response: PlaylistsResponse = await getPlayListsAction({
        type,
        search,
        page: pageParam.toString(),
      });
      return {
        playlists: response.playlists,
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
              playlists: initialData || [],
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
    console.log(isIntersecting, "isIntersecting");
    console.log(hasNextPage, "hasNextPage");
    if (!isFetchingNextPage && hasNextPage && isIntersecting) {
      console.log(true);
      fetchNextPage();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isFetchingNextPage, hasNextPage, isIntersecting]);

  return (
    <>
      <ul className="w-full grid grid-cols-2 md:grid-cols-3 lg:grid-cols-7 gap-5">
        {data?.pages.map((page) =>
          page?.playlists.map((playlist) => (
            <li key={playlist?.id}>
              <PlaylistCard playlist={playlist} userType={type} />
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

export default InfiniteScrollPlaylist;
