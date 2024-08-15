"use client";

import React, { useEffect } from "react";
import { useIntersectionObserver } from "@/hooks/use-intersection-observer";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useLocale, useTranslations } from "next-intl";

import Loader from "@/components/ui/loader";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { getDirection } from "@/lib/utils";
import { useSession } from "next-auth/react";
import { getPlayListsByPodcasterAction } from "@/app/actions/podcastActions";
import { Playlist, PlaylistsResponse } from "@/types/podcast";
import PlaylistCard from "@/components/playlist-card";

/**
 * Component to display playlists by a specific podcaster in a carousel with infinite scrolling.
 *
 * @param {object} props - Component props.
 * @param {Playlist[] | undefined} props.initialData - Initial playlist data.
 * @param {string} props.podcasterId - The ID of the podcaster.
 * @param {string} [props.search] - Optional search query for filtering playlists.
 * @param {string} props.type - Type of user or context for the playlist.
 * @returns {JSX.Element} The rendered carousel of playlists.
 */
const InfiniteScrollPlaylistsByPodcaster = ({
  initialData,
  podcasterId,
  search,
  type,
}: {
  initialData: Playlist[] | undefined;
  podcasterId: string;
  search?: string;
  type: string;
}) => {
  const locale = useLocale();
  const direction = getDirection(locale);
  const { isIntersecting, ref } = useIntersectionObserver({ threshold: 0 });
  const { data: session } = useSession();
  const t = useTranslations("Index");

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteQuery({
      queryKey: ["profile_self_playlists", { type, search, podcasterId }],
      queryFn: async ({ pageParam = 1 }) => {
        const response: PlaylistsResponse = await getPlayListsByPodcasterAction(
          {
            podcasterId,
            type,
            search,
            page: pageParam.toString(),
          }
        );
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
    if (!isFetchingNextPage && hasNextPage && isIntersecting) {
      fetchNextPage();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isFetchingNextPage, hasNextPage, isIntersecting]);

  return (
    <Carousel opts={{ slidesToScroll: "auto", direction }} className="w-full">
      <div className="flex justify-between items-center">
        <h2 className="font-bold text-2xl">{t("playlists")}</h2>
        <div className="flex relative justify-end items-center end-[50px]">
          <CarouselPrevious />
          <CarouselNext />
        </div>
      </div>
      <CarouselContent className="w-full mt-5 ms-0 min-h-56 gap-3">
        {data?.pages[0].playlists.length === 0 ? (
          <p className="text-lg my-auto opacity-50 italic">
            {t("noPlaylistsYet")}
          </p>
        ) : (
          data?.pages.map((page) =>
            page.playlists.map((playlist) => (
              <CarouselItem
                key={playlist.id}
                className="basis-1/2 md:basis-1/3 lg:basis-1/4 xl:basis-1/5 ps-0 group"
              >
                <PlaylistCard playlist={playlist} userType={type} />
              </CarouselItem>
            ))
          )
        )}
        <CarouselItem
          ref={ref}
          className="basis-1/2 md:basis-1/3 lg:basis-1/12 ps-0 flex justify-center items-center"
        >
          {isFetchingNextPage && (
            <Loader className="size-9" variant={"infinity"} />
          )}
          <span className="sr-only">{t("loading")}</span>
        </CarouselItem>
      </CarouselContent>
    </Carousel>
  );
};

export default InfiniteScrollPlaylistsByPodcaster;
