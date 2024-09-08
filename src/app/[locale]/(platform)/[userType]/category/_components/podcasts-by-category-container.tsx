"use client";

// External Imports
import { useInfiniteQuery } from "@tanstack/react-query";
import { useEffect } from "react";

// Internal Imports
import { getTrendingAction } from "@/app/actions/podcastActions";
import { PodcastCard } from "@/components/podcast-card";
import Loader from "@/components/ui/loader";
import { useIntersectionObserver } from "@/hooks/useIntersectionObserver";
import { Podcast, PodcastsResponse } from "@/types/podcast";

/**
 * PodcastsByCategoryContainer Component
 * Fetches and displays a list of podcasts by category, with infinite scrolling.
 *
 * @param {Object} props - The component props.
 * @param {Podcast[]} props.initialData - Initial list of podcasts to display.
 * @param {string} props.type - The type of podcasts to fetch.
 * @param {string} props.categoryId - The ID of the category to filter podcasts by.
 *
 * @returns {JSX.Element} The podcasts list with infinite scrolling.
 */
const PodcastsByCategoryContainer = ({
  initialData,
  type,
  categoryId,
}: {
  initialData: Podcast[] | undefined;
  type: string;
  categoryId: string;
}) => {
  // Setup intersection observer to trigger loading more podcasts when the user scrolls to the bottom
  const { isIntersecting, ref } = useIntersectionObserver({
    threshold: 0,
  });

  // Use the useInfiniteQuery hook to fetch podcasts in pages, enabling infinite scrolling
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteQuery({
      queryKey: ["podcasts", categoryId], // Unique key for caching the query
      queryFn: async ({ pageParam = 1 }) => {
        // Fetch podcasts by category
        const response: PodcastsResponse = await getTrendingAction({
          page: pageParam.toString(),
          type: type,
          category_id: categoryId,
        });

        // Return the fetched data along with pagination info
        return {
          requests: response.podcasts,
          pagination: {
            ...response.pagination,
            next_page_url: response.pagination.next_page_url,
            prev_page_url: response.pagination.prev_page_url,
          },
        };
      },
      getNextPageParam: (lastPage) => {
        // Determine the next page to fetch based on the current pagination data
        return lastPage.pagination.next_page_url
          ? lastPage.pagination.current_page + 1
          : undefined;
      },
      initialPageParam: 1,
      initialData: () => {
        // Initialize the query with the initial data passed as props
        if (initialData) {
          return {
            pages: [
              {
                requests: initialData || [],
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

  // Effect to trigger loading more podcasts when the user scrolls to the bottom
  useEffect(() => {
    if (!isFetchingNextPage && hasNextPage && isIntersecting) {
      fetchNextPage(); // Fetch the next page of podcasts
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isFetchingNextPage, hasNextPage, isIntersecting]);

  return (
    <>
      {/* Display the list of podcasts */}
      <ul className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-5">
        {data?.pages.map((page) =>
          page?.requests.map((podcast) => (
            <li key={podcast?.id}>
              <PodcastCard podcast={podcast} />
            </li>
          ))
        )}
      </ul>

      {/* Loading spinner */}
      <div
        ref={ref} // The ref used for the intersection observer
        className="col-span-1 mt-1 flex items-center justify-center sm:col-span-2 md:col-span-3 lg:col-span-4 xl:col-span-5"
      >
        {isFetchingNextPage && <Loader className="size-9" />}{" "}
        {/* Show the loader if fetching */}
        <span className="sr-only">Loading...</span>
      </div>
    </>
  );
};

export default PodcastsByCategoryContainer;
