"use client";

import { getMyFavoritePodcastsAction } from "@/app/actions/podcastActions";
import { PodcastCard, PodcastCardLoading } from "@/components/podcast-card";
import { PodcasterCard } from "@/components/podcaster-card";
import Loader from "@/components/ui/loader";
import useGetFavoritePodcasters from "@/hooks/queries/use-get-favorite-podcasters";
import useGetFavoritePodcasts from "@/hooks/queries/use-get-favorite-podcasts";
import { useIntersectionObserver } from "@/hooks/use-intersection-observer";
import { Podcast, PodcastsResponse } from "@/types/podcast";
import { Podcaster } from "@/types/podcaster";
import { useInfiniteQuery } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";

interface InfiniteScrollFavoritesPodcastersProps {
  initialData: Podcaster[] | undefined;
  tab: string;
  favoriteCategoryId?: string;
  type: string;
}

const InfiniteScrollFavoritesPodcasters: React.FC<
  InfiniteScrollFavoritesPodcastersProps
> = ({ initialData, tab, favoriteCategoryId, type }) => {
  const { isIntersecting, ref } = useIntersectionObserver({
    threshold: 0,
  });

  const [isHydrated, setIsHydrated] = useState(false);
  useEffect(() => {
    setIsHydrated(true);
  }, []);

  const {
    isError: isFavoritePodcastersError,
    error: favoritePodcastersError,
    data: favoritePodcasters,
    fetchNextPage: fetchNextFavoritePodcasters,
    hasNextPage: hasNextFavoritePodcasters,
    isFetchingNextPage: isFetchingNextFavoritePodcasters,
  } = useGetFavoritePodcasters({
    tab,
    favoriteCategoryId,
    initialData: initialData as Podcaster[],
    type,
  });

  useEffect(() => {
    if (
      !isFetchingNextFavoritePodcasters &&
      hasNextFavoritePodcasters &&
      isIntersecting
    ) {
      fetchNextFavoritePodcasters();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    isFetchingNextFavoritePodcasters,
    hasNextFavoritePodcasters,
    isIntersecting,
  ]);

  if (!isHydrated) {
    return (
      <div className="w-full my-3 lg:my-1 flex items-center justify-center ">
        <Loader className="size-9" />
        <span className="sr-only">Loading...</span>
      </div>
    );
  }

  return (
    <>
      <ul className="w-full flex flex-col lg:flex-row flex-wrap gap-5">
        {isFetchingNextFavoritePodcasters &&
          Array(20)
            .fill(0)
            .map((_, index) => <PodcastCardLoading key={index} />)}
        {favoritePodcasters?.pages.map((page) =>
          page?.podcasters.map((podcaster) => (
            <li key={podcaster?.id} className="w-full lg:max-w-56">
              <PodcasterCard
                podcaster={podcaster}
                className="hover:bg-secondary/75 bg-secondary/50"
              />
            </li>
          ))
        )}
      </ul>
      {/* loading spinner */}
      <div
        ref={ref}
        className="w-full my-3 lg:my-1 flex items-center justify-center"
      >
        {isFetchingNextFavoritePodcasters && <Loader className="size-9" />}
        <span className="sr-only">Loading...</span>
      </div>
    </>
  );
};

export default InfiniteScrollFavoritesPodcasters;
