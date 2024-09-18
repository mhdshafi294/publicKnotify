"use client";

import React, { useEffect, useRef, useState } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import { useLocale, useTranslations } from "next-intl";
import { SquareArrowOutUpRightIcon, X } from "lucide-react";

import { getSelfPodcastsAction } from "@/app/actions/podcastActions";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import ThumbnailsCover from "@/components/thumbnails-cover";
import Loader from "@/components/ui/loader";
import { useIntersectionObserver } from "@/hooks/useIntersectionObserver";
import { cn, getDirection } from "@/lib/utils";
import { SelfPodcastsDetailsResponse } from "@/types/podcast";
import { useRouter } from "@/navigation";

interface InfiniteScrollDraftsProps {
  isShow: boolean;
  setIsShow: React.Dispatch<React.SetStateAction<boolean>>;
  search?: string;
  is_published?: number;
  showId?: string;
}

/**
 * InfiniteScrollDrafts component that renders a list of podcast drafts with infinite scrolling.
 *
 * @param {InfiniteScrollDraftsProps} props - The properties passed to the component.
 * @returns {JSX.Element} The infinite scroll drafts component.
 *
 * @example
 * ```tsx
 * <InfiniteScrollDrafts isShow={true} setIsShow={setIsShow} search="podcast" />
 * ```
 */
const InfiniteScrollDrafts: React.FC<InfiniteScrollDraftsProps> = ({
  isShow,
  setIsShow,
  search,
  is_published = 0,
  showId,
}) => {
  const [isMounted, setIsMounted] = useState(false);
  const [currentPodcastId, setCurrentPodcastId] = useState<string | null>(null);
  const router = useRouter();
  const { data: session } = useSession();
  const searchParams = useSearchParams();
  const initialRender = useRef(true);
  const current_podcast_id = searchParams.get("podcast_id");

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (
      isMounted &&
      (session?.user?.type === "user" || session?.user?.type === "company")
    ) {
      router.push(`/${session?.user?.type}`);
    }
  }, [isMounted, session, router]);

  const { isIntersecting, ref } = useIntersectionObserver({
    threshold: 0,
  });

  const {
    isError,
    error,
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ["podcastsDrafts", { search, is_published, showId }],
    queryFn: async ({ pageParam = 1 }) => {
      const response: SelfPodcastsDetailsResponse = await getSelfPodcastsAction(
        {
          type: "podcaster",
          search,
          is_published,
          page: pageParam.toString(),
          playlist_id: showId,
        }
      );
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
  });

  useEffect(() => {
    if (!isFetchingNextPage && hasNextPage && isIntersecting) {
      fetchNextPage();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isFetchingNextPage, hasNextPage, isIntersecting]);

  useEffect(() => {
    if (initialRender.current) {
      initialRender.current = false;
      return;
    }

    const params = new URLSearchParams(searchParams.toString());
    if (currentPodcastId) {
      params.set("podcast_id", currentPodcastId);
    } else {
      setCurrentPodcastId(null);
    }

    router.push(`?${params.toString()}`);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPodcastId]);

  useEffect(() => {
    if (current_podcast_id) {
      setCurrentPodcastId(current_podcast_id);
    } else {
      setCurrentPodcastId(null);
    }
  }, [current_podcast_id]);

  const locale = useLocale();
  const dir = getDirection(locale);
  const t = useTranslations("Index");

  return (
    <div
      className={cn(
        "flex flex-col gap-1 overflow-hidden w-[20dvw] absolute bottom-0 start-0 h-full bg-card-secondary border border-card-foreground/10 pt-10 -translate-x-full lg:translate-x-0 duration-300 z-40",
        { "rounded-tr-lg -translate-x-full": dir === "ltr" },
        { "rounded-tl-lg translate-x-full": dir === "rtl" },
        { "translate-x-0 w-[100dvw] rounded-tr-none rounded-tl-none": isShow }
      )}
    >
      <Button
        onClick={() => setIsShow(false)}
        className="absolute lg:hidden top-4 right-4 border-none bg-transparent hover:border-none hover:bg-transparent"
        variant="outline"
        size="icon"
      >
        <X />
      </Button>
      <ThumbnailsCover title={t("drafts")} />
      <ul className="w-full p-3 pe-0" dir={dir}>
        <ScrollArea
          className="w-full h-[calc(100vh-350px)] flex flex-col flex-wrap gap-5 pe-3"
          dir={dir}
        >
          {data?.pages[0]?.podcasts !== undefined &&
          data?.pages[0]?.podcasts?.length > 0 ? (
            data?.pages.map((page) =>
              page?.podcasts.map((podcast) => (
                <li key={podcast?.id} className="w-full mt-3">
                  <div
                    className={cn(
                      "w-full rounded-lg p-3 bg-white/15 space-y-3 cursor-pointer",
                      {
                        "bg-background border border-card-foreground/10":
                          currentPodcastId === podcast?.id.toString(),
                      }
                    )}
                    onClick={() => {
                      setCurrentPodcastId(podcast?.id.toString());
                      setIsShow(false);
                    }}
                  >
                    <div className="flex items-center justify-between gap-3">
                      <p className="font-bold text-sm">{podcast?.name}</p>
                      <SquareArrowOutUpRightIcon
                        size={12}
                        className="text-card-foreground/70"
                      />
                    </div>
                    <div className="flex items-center justify-between gap-3">
                      <p className="text-xs opacity-70 dark:opacity-50">
                        {podcast?.publishing_date}
                      </p>
                      <p className="font-bold text-xs opacity-70">
                        {podcast?.is_published ? t("published") : t("draft")}
                      </p>
                    </div>
                  </div>
                </li>
              ))
            )
          ) : (
            <li className="italic font-semibold text-center opacity-75 h-full flex flex-1 justify-center items-center w-full mt-5">
              {t("there-are-no-drafts-fot-this-show")}
            </li>
          )}
          <div ref={ref} className="mt-4 flex items-center justify-center">
            {isFetchingNextPage && <Loader />}
            <span className="sr-only">{t("loading")}</span>
          </div>
          <ScrollBar />
        </ScrollArea>
      </ul>
    </div>
  );
};

export default InfiniteScrollDrafts;
