"use client";

import React, { useEffect, useState } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";

// Internal Imports
import { PodcastCard, PodcastCardLoading } from "@/components/podcast-card";
import Loader from "@/components/ui/loader";
import useGetFavoritePodcasts from "@/hooks/queries/use-get-favorite-podcasts";
import { useIntersectionObserver } from "@/hooks/use-intersection-observer";
import { Podcast } from "@/types/podcast";

// TypeScript Interface for Props
interface InfiniteScrollFavoritesPodcastsProps {
  initialData: Podcast[] | undefined;
  tab: string;
  favoriteCategoryId?: string;
  type: string;
}

/**
 * InfiniteScrollFavoritesPodcasts Component
 * Displays a list of favorite podcasts with infinite scrolling functionality.
 *
 * @param {Object} props - Component properties.
 * @param {Podcast[] | undefined} props.initialData - Initial podcast data to load.
 * @param {string} props.tab - The current tab indicating the type of favorites.
 * @param {string} [props.favoriteCategoryId] - Optional ID of the favorite category.
 * @param {string} props.type - Type of content (e.g., "podcasts").
 *
 * @returns {JSX.Element} The rendered component with a list of favorite podcasts.
 */
const InfiniteScrollFavoritesPodcasts: React.FC<
  InfiniteScrollFavoritesPodcastsProps
> = ({ initialData, tab, favoriteCategoryId, type }) => {
  // Set up intersection observer to detect when to load more data
  const { isIntersecting, ref } = useIntersectionObserver({
    threshold: 0,
  });

  // Hydration state to handle server-side rendering
  const [isHydrated, setIsHydrated] = useState(false);
  useEffect(() => {
    setIsHydrated(true);
  }, []);

  // Fetch favorite podcasts data using an infinite query
  const {
    isError: isFavoritePodcastsError,
    error: favoritePodcastsError,
    data: favoritePodcasts,
    fetchNextPage: fetchNextFavoritePodcasts,
    hasNextPage: hasNextFavoritePodcasts,
    isFetchingNextPage: isFetchingNextFavoritePodcasts,
  } = useGetFavoritePodcasts({
    tab,
    favoriteCategoryId,
    initialData: initialData as Podcast[],
    type,
  });

  // Fetch more data when the user scrolls to the bottom of the list
  useEffect(() => {
    if (
      !isFetchingNextFavoritePodcasts &&
      hasNextFavoritePodcasts &&
      isIntersecting
    ) {
      fetchNextFavoritePodcasts();
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isFetchingNextFavoritePodcasts, hasNextFavoritePodcasts, isIntersecting]);

  // Render loading spinner if the component is not yet hydrated
  if (!isHydrated) {
    return (
      <div className="w-full my-3 lg:my-1 flex items-center justify-center">
        <Loader className="size-9" />
        <span className="sr-only">Loading...</span>
      </div>
    );
  }

  return (
    <>
      <ul className="w-full flex flex-col lg:flex-row flex-wrap gap-5">
        {/* Show loading placeholders while fetching more data */}
        {isFetchingNextFavoritePodcasts &&
          Array(20)
            .fill(0)
            .map((_, index) => <PodcastCardLoading key={index} />)}

        {/* Render the list of favorite podcasts */}
        {favoritePodcasts?.pages.map((page) =>
          page.podcasts.map((podcast) => (
            <li key={podcast.id} className="w-full lg:max-w-80">
              <PodcastCard
                podcast={podcast}
                className="hover:bg-secondary/75 bg-secondary/50"
              />
            </li>
          ))
        )}
      </ul>
      {/* Loading spinner for fetching additional pages */}
      <div
        ref={ref}
        className="w-full my-3 lg:my-1 flex items-center justify-center"
      >
        {isFetchingNextFavoritePodcasts && <Loader className="size-9" />}
        <span className="sr-only">Loading...</span>
      </div>
    </>
  );
};

export default InfiniteScrollFavoritesPodcasts;
