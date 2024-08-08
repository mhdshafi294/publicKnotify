"use client";

import { useInfiniteQuery } from "@tanstack/react-query";

import { getMyFavoritePodcastersAction } from "@/app/actions/podcasterActions";
import { Podcaster, PodcastersResponse } from "@/types/podcaster";

/**
 * Custom hook to fetch favorite podcasters with infinite scrolling support.
 *
 * @param {Object} params - Parameters for fetching favorite podcasters.
 * @param {string} params.tab - Current active tab.
 * @param {string} params.favoriteCategoryId - ID of the favorite category.
 * @param {string} params.type - Type of the podcaster.
 * @param {Podcaster[]} [params.initialData] - Initial data for the podcasters.
 * @returns {InfiniteQueryObserverResult} Infinite query result.
 */
const useGetFavoritePodcasters = ({
  tab,
  favoriteCategoryId,
  type,
  initialData,
}: {
  tab: string;
  favoriteCategoryId?: string;
  type: string;
  initialData?: Podcaster[];
}) => {
  return useInfiniteQuery({
    queryKey: ["favorite_podcasters", { favoriteCategoryId }],
    enabled: tab === "podcasts" && !!initialData,
    queryFn: async ({ pageParam = 1 }) => {
      const response: PodcastersResponse = await getMyFavoritePodcastersAction({
        type,
        category_id: favoriteCategoryId,
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
};

export default useGetFavoritePodcasters;
