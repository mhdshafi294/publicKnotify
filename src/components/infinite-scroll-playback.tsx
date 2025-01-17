"use client";

import ProfilePodcastCard from "@/app/[locale]/(platform)/[userType]/profile/_components/profile-podcast-card";
import { getSelfPlaybackAction } from "@/app/actions/podcastActions";
import Loader from "@/components/ui/loader";
import { useIntersectionObserver } from "@/hooks/useIntersectionObserver";
import { getDirection } from "@/lib/utils";
import { Podcast, PodcastsResponse } from "@/types/podcast";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { useLocale, useTranslations } from "next-intl";
import { useEffect } from "react";

const InfiniteScrollPlayback = ({
  initialData,
  type,
}: {
  initialData: Podcast[] | undefined;
  type: string;
  podcasterId: string;
}) => {
  const locale = useLocale();
  const direction = getDirection(locale);
  const t = useTranslations("Index");
  const { isIntersecting, ref } = useIntersectionObserver({
    threshold: 0,
  });
  const { data: session } = useSession();

  const {
    isError,
    error,
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ["profile_self_podcasts", { type }],
    queryFn: async ({ pageParam = 1 }) => {
      const response: PodcastsResponse = await getSelfPlaybackAction({
        type,
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

  useEffect(() => {
    if (!isFetchingNextPage && hasNextPage && isIntersecting) {
      fetchNextPage();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isFetchingNextPage, hasNextPage, isIntersecting]);

  return (
    <>
      <h2 className="text-2xl font-bold">{t("history")}</h2>
      <ul className="w-full grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5">
        {data?.pages[0].podcasts.length === 0 ? (
          <p className="text-lg my-auto opacity-70 dark:opacity-50 italic ">
            {t("historyEmpty")}
          </p>
        ) : (
          data?.pages.map((page) =>
            page?.podcasts.map((podcast) => (
              <li key={podcast?.id}>
                <ProfilePodcastCard podcast={podcast} userType={type} />
              </li>
            ))
          )
        )}
      </ul>
      {/* loading spinner */}
      <div
        ref={ref}
        className="col-span-1 mt-1 flex items-center justify-center sm:col-span-2 md:col-span-3 lg:col-span-5"
      >
        {isFetchingNextPage && <Loader className="size-9" />}
        <span className="sr-only">{t("loading")}</span>
      </div>
    </>
  );
};

export default InfiniteScrollPlayback;
