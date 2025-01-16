"use client";

import { useInfiniteQuery } from "@tanstack/react-query";
import { SquareArrowOutUpRightIcon, X } from "lucide-react";
import { useSession } from "next-auth/react";
import { useLocale, useTranslations } from "next-intl";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";

import { getSelfPodcastsAction } from "@/app/actions/podcastActions";
import ThumbnailsCover from "@/components/thumbnails-cover";
import { Button } from "@/components/ui/button";
import Loader from "@/components/ui/loader";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { useIntersectionObserver } from "@/hooks/useIntersectionObserver";
import { cn, getDirection } from "@/lib/utils";
import { useRouter } from "@/navigation";
import { SelfPodcastsDetailsResponse } from "@/types/podcast";

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
 * \`\`\`tsx
 * <InfiniteScrollDrafts isShow={true} setIsShow={setIsShow} search="podcast" />
 * \`\`\`
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
    refetch,
    isError,
    error,
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isPending,
    isInitialLoading,
  } = useInfiniteQuery({
    queryKey: ["addPodcastsDrafts", { showId, isMounted }],
    queryFn: async ({ pageParam = 1 }) => {
      console.log("Fetching page:", pageParam);
      try {
        const response: SelfPodcastsDetailsResponse =
          await getSelfPodcastsAction({
            type: session?.user?.type!,
            search,
            is_published,
            page: pageParam.toString(),
            playlist_id: showId,
          });
        console.log("API response:", response);
        return {
          podcasts: response.podcasts,
          pagination: {
            ...response.pagination,
            next_page_url: response.pagination.next_page_url,
            prev_page_url: response.pagination.prev_page_url,
          },
        };
      } catch (error) {
        console.error("Error fetching podcasts:", error);
        throw error;
      }
    },

    getNextPageParam: (lastPage) => {
      return lastPage.pagination.next_page_url
        ? lastPage.pagination.current_page + 1
        : undefined;
    },
    initialPageParam: 1,
    enabled: true,
    retry: 3, // Number of retry attempts
    retryDelay: (attempt) => Math.min(1000 * 2 ** attempt, 30000), // Exponential backoff
    // staleTime: 0,
    // cacheTime: 0,
  });

  useEffect(() => {
    if (session?.user?.type) {
      // console.log(session?.user?.type);
      console.log("Refetching due to dependency change");

      refetch();
    }
  }, [session?.user?.type, refetch, search, is_published, showId]);

  useEffect(() => {
    if (isMounted && session?.user?.type) {
      console.log("Force refetch on mount");
      refetch();
    }
  }, [isMounted, session?.user?.type, refetch]);

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

  console.log("Component state:", {
    isLoading,
    isPending,
    isInitialLoading,
    isError,
    error,
    data,
    session: session?.user?.type,
  });

  if (!isMounted) return null;
  if (isError) {
    console.error("Query error:", error);
    return <div>Error loading podcasts. Please try again.</div>;
  }

  return (
    <div
      className={cn(
        "flex flex-col gap-1 overflow-hidden w-[20dvw] absolute bottom-0 start-0 h-full dark:bg-card-secondary bg-background border border-card-foreground/10 pt-10 -translate-x-full lg:translate-x-0 duration-300 z-40",
        { "-translate-x-full": dir === "ltr" },
        { " translate-x-full": dir === "rtl" },
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
