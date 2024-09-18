"use client";

import React, { useEffect, useRef, useState } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import { useLocale, useTranslations } from "next-intl";
import { SquareArrowOutUpRightIcon, X } from "lucide-react";

import { getSelfPodcastsAction } from "@/app/actions/podcastActions";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import Loader from "@/components/ui/loader";
import { useIntersectionObserver } from "@/hooks/useIntersectionObserver";
import { cn, getDirection } from "@/lib/utils";
import { SelfPodcastsDetailsResponse } from "@/types/podcast";
import { Link, useRouter } from "@/navigation";
import Image from "next/image";

interface InfiniteScrollDraftsProps {
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
  search,
  is_published = 0,
  showId,
}) => {
  const [isMounted, setIsMounted] = useState(false);
  const router = useRouter();
  const { data: session } = useSession();
  const searchParams = useSearchParams();

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
  // console.log(data);

  useEffect(() => {
    if (!isFetchingNextPage && hasNextPage && isIntersecting) {
      fetchNextPage();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isFetchingNextPage, hasNextPage, isIntersecting]);
  const locale = useLocale();
  const dir = getDirection(locale);
  const t = useTranslations("Index");

  return (
    <div
      className={cn("flex flex-col gap-1 overflow-hidden duration-300 z-40")}
    >
      <ul className="w-full p-3 pe-0" dir={dir}>
        <ScrollArea className="w-full pe-3 flex flex-col gap-3 " dir={dir}>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3  gap-4 w-full">
            {data?.pages.map((page) =>
              page?.podcasts.map((podcast) => (
                <li key={podcast?.id}>
                  <Link
                    className={cn(
                      "w-full rounded-lg bg-card-secondary border border-l-0 border-t-0 border-border-secondary h-[120px] cursor-pointer flex items-center gap-2 overflow-hidden"
                    )}
                    href={`episodes/${podcast?.id}`}
                  >
                    <div className="w-7/12 h-[120px] relative">
                      <Image
                        src={podcast?.thumbnail}
                        alt={`${podcast?.thumbnail}`}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        className="object-cover w-full h-full"
                      />
                    </div>
                    <div className="w-full h-full px-3 py-4 flex flex-col justify-between cursor-pointer">
                      <div className="flex items-center justify-between gap-3">
                        <p className="font-bold text-base">{podcast?.name}</p>
                        <SquareArrowOutUpRightIcon
                          size={16}
                          className="text-card-foreground/70"
                        />
                      </div>
                      <div className="flex items-center justify-between gap-3">
                        <p className="text-sm opacity-70 dark:opacity-50">
                          {podcast?.publishing_date}
                        </p>
                        <p className="font-bold text-sx opacity-70">
                          {podcast?.is_published ? t("published") : t("draft")}
                        </p>
                      </div>
                    </div>
                  </Link>
                </li>
              ))
            )}
          </div>
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
