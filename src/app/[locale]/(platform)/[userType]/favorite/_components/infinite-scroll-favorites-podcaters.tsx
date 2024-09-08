"use client";

import React, { useEffect, useState } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";

// Internal Imports
import { PodcasterCard } from "@/components/podcaster-card";
import { PodcastCard, PodcastCardLoading } from "@/components/podcast-card";
import Loader from "@/components/ui/loader";
import useGetFavoritePodcasters from "@/hooks/queries/use-get-favorite-podcasters";
import { useIntersectionObserver } from "@/hooks/useIntersectionObserver";
import { Podcaster } from "@/types/podcaster";

// TypeScript Interface for Props
interface InfiniteScrollFavoritesPodcastersProps {
  initialData: Podcaster[] | undefined;
  tab: string;
  favoriteCategoryId?: string;
  type: string;
}

/**
 * InfiniteScrollFavoritesPodcasters Component
 * Displays a list of favorite podcasters with infinite scrolling functionality.
 *
 * @param {Object} props - Component properties.
 * @param {Podcaster[] | undefined} props.initialData - Initial podcaster data to load.
 * @param {string} props.tab - The current tab indicating the type of favorites.
 * @param {string} [props.favoriteCategoryId] - Optional ID of the favorite category.
 * @param {string} props.type - Type of content (e.g., "podcasters").
 *
 * @returns {JSX.Element} The rendered component with a list of favorite podcasters.
 */
const InfiniteScrollFavoritesPodcasters: React.FC<
  InfiniteScrollFavoritesPodcastersProps
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

  // Fetch favorite podcasters data using an infinite query
  const {
    isError: isFavoritePodcastersError,
    error: favoritePodcastersError,
    data: favoritePodcasters,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useGetFavoritePodcasters({
    tab,
    favoriteCategoryId,
    initialData: initialData as Podcaster[],
    type,
  });

  // Fetch more data when the user scrolls to the bottom of the list
  useEffect(() => {
    if (!isFetchingNextPage && hasNextPage && isIntersecting) {
      fetchNextPage();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isFetchingNextPage, hasNextPage, isIntersecting]);

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
        {isFetchingNextPage &&
          Array(20)
            .fill(0)
            .map((_, index) => <PodcastCardLoading key={index} />)}

        {/* Render the list of favorite podcasters */}
        {favoritePodcasters?.pages.map((page) =>
          page.podcasters.map((podcaster) => (
            <li key={podcaster.id} className="w-full lg:max-w-56">
              <PodcasterCard
                podcaster={podcaster}
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
        {isFetchingNextPage && <Loader className="size-9" />}
        <span className="sr-only">Loading...</span>
      </div>
    </>
  );
};

export default InfiniteScrollFavoritesPodcasters;
