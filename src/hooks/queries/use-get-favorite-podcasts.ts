import { getMyFavoritePodcastsAction } from "@/app/actions/podcastActions";
import { Podcast, PodcastsResponse } from "@/types/podcast";
import { Podcaster } from "@/types/podcaster";
import { useInfiniteQuery } from "@tanstack/react-query";

const useGetFavoritePodcasts = ({
  tab,
  favoriteCategoryId,
  initialData,
  type,
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
