"use client";

import { getMyFavoritePodcastsAction } from "@/app/actions/podcastActions";
import { PodcastCard, PodcastCardLoading } from "@/components/podcast-card";
import Loader from "@/components/ui/loader";
import useGetFavoritePodcasters from "@/hooks/queries/use-get-favorite-podcasters";
import useGetFavoritePodcasts from "@/hooks/queries/use-get-favorite-podcasts";
import { useIntersectionObserver } from "@/hooks/use-intersection-observer";
import { Podcast, PodcastsResponse } from "@/types/podcast";
import { Podcaster } from "@/types/podcaster";
import { useInfiniteQuery } from "@tanstack/react-query";
import React, { useEffect } from "react";

interface InfiniteScrollFavoritesPodcastsProps {
  initialData: Podcast[] | undefined;
  tab: string;
  favoriteCategoryId?: string;
  type: string;
}

const InfiniteScrollFavoritesPodcasts: React.FC<
  InfiniteScrollFavoritesPodcastsProps
> = ({ initialData, tab, favoriteCategoryId, type }) => {
  const { isIntersecting, ref } = useIntersectionObserver({
    threshold: 0,
  });

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

  return (
    <>
      <ul className="w-full flex flex-col lg:flex-row flex-wrap gap-5">
        {isFetchingNextFavoritePodcasts &&
          Array(20)
            .fill(0)
            .map((_, index) => <PodcastCardLoading key={index} />)}
        {favoritePodcasts?.pages.map((page) =>
          page?.podcasts.map((podcast) => (
            <li key={podcast?.id} className="w-full lg:max-w-80">
              <PodcastCard
                podcast={podcast}
                className="hover:bg-secondary/75 bg-secondary/50"
              />
            </li>
          ))
        )}
      </ul>
      {/* loading spinner */}
      <div
        ref={ref}
        className="w-full my-3 lg:my-1 flex items-center justify-center "
      >
        {isFetchingNextFavoritePodcasts && <Loader className="size-9" />}
        <span className="sr-only">Loading...</span>
      </div>
    </>
  );
};

export default InfiniteScrollFavoritesPodcasts;
