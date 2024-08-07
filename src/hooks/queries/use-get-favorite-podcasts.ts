"use client";

import { useInfiniteQuery } from "@tanstack/react-query";

import { getMyFavoritePodcastsAction } from "@/app/actions/podcastActions";
import { Podcast, PodcastsResponse } from "@/types/podcast";

/**
 * Custom hook to fetch favorite podcasts with infinite scrolling support.
 *
 * @param {Object} params - Parameters for fetching favorite podcasts.
 * @param {string} params.tab - Current active tab.
 * @param {string} params.favoriteCategoryId - ID of the favorite category.
 * @param {string} params.type - Type of the podcast.
 * @param {Podcast[]} [params.initialData] - Initial data for the podcasts.
 * @returns {InfiniteQueryObserverResult} Infinite query result.
 */
const useGetFavoritePodcasts = ({
  tab,
  favoriteCategoryId,
  type,
  initialData,
}: {
  tab: string;
  favoriteCategoryId?: string;
  type: string;
  initialData?: Podcast[];
}) => {
  return useInfiniteQuery({
    queryKey: ["favorite_podcasts", { favoriteCategoryId }],
    enabled: tab === "podcasts" && !!initialData,
    queryFn: async ({ pageParam = 1 }) => {
      const response: PodcastsResponse = await getMyFavoritePodcastsAction({
        type,
        category_id: favoriteCategoryId,
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
};

export default useGetFavoritePodcasts;
