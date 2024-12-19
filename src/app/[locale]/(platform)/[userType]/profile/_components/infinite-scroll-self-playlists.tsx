"use client";

import { useIntersectionObserver } from "@/hooks/useIntersectionObserver";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { useLocale, useTranslations } from "next-intl";
import { useEffect } from "react";

import { getPlayListsAction } from "@/app/actions/podcastActions";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Loader from "@/components/ui/loader";
import { getDirection } from "@/lib/utils";
import { Playlist, PlaylistsResponse } from "@/types/podcast";
import SelfplaylistCard from "./self-playlist-card";

/**
 * Component to display self playlists with infinite scrolling in a carousel.
 *
 * @param {object} props - Component props.
 * @param {Playlist[] | undefined} props.initialData - Initial data for the playlists.
 * @param {string} [props.search] - Optional search term for filtering playlists.
 * @param {string} props.type - Type of the profile (e.g., "user" or "podcaster").
 * @returns {JSX.Element} The rendered carousel of self playlists.
 */
const InfiniteScrollSelfPlaylists = ({
  initialData,
  search,
  type,
}: {
  initialData: Playlist[] | undefined;
  search?: string;
  type: string;
}) => {
  const locale = useLocale();
  const t = useTranslations("Index");
  const direction = getDirection(locale);
  const { isIntersecting, ref } = useIntersectionObserver({ threshold: 0 });
  const { data: session } = useSession();

  // Infinite query for fetching playlists
  const {
    isError,
    error,
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ["profile_self_playlists", { type, search }],
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
    if (!isFetchingNextPage && hasNextPage && isIntersecting) {
      fetchNextPage();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isFetchingNextPage, hasNextPage, isIntersecting]);

  return (
    <Carousel opts={{ slidesToScroll: "auto", direction }} className="w-full">
      <div className="flex justify-between items-center">
        <h2 className="font-bold text-2xl">{t("shows")}</h2>
        <div className="flex relative justify-end items-center end-[50px]">
          <CarouselPrevious />
          <CarouselNext />
        </div>
      </div>
      <CarouselContent className="w-full mt-5 ms-0 min-h-56 gap-3">
        {data?.pages[0].playlists.length === 0 ? (
          <p className="text-lg my-auto opacity-70 dark:opacity-50 italic">
            {t("noPlaylistsYet")}
          </p>
        ) : (
          data?.pages.map((page, pageIndex) =>
            pageIndex === 0
              ? // For the first page, slice off the first playlist
                page.playlists.slice(1).map((playlist) => (
                  <CarouselItem
                    key={playlist?.id}
                    className="basis-1/2 md:basis-1/3 lg:basis-1/4 xl:basis-1/5 ps-0 group"
                  >
                    <SelfplaylistCard playlist={playlist} userType={type} />
                  </CarouselItem>
                ))
              : // For other pages, display normally
                page.playlists.map((playlist) => (
                  <CarouselItem
                    key={playlist?.id}
                    className="basis-1/2 md:basis-1/3 lg:basis-1/4 xl:basis-1/5 ps-0 group"
                  >
                    <SelfplaylistCard playlist={playlist} userType={type} />
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

export default InfiniteScrollSelfPlaylists;
