"use client";
import React, { useEffect, useRef, useState } from "react";

import { getSelfPodcastsAction } from "@/app/actions/podcastActions";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { useIntersectionObserver } from "@/hooks/use-intersection-observer";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { SelfPodcastsDetailsResponse } from "@/types/podcast";
import { useInfiniteQuery } from "@tanstack/react-query";
import { SquareArrowOutUpRightIcon } from "lucide-react";
import { useSession } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import LoadingSpinner from "@/components/icons/spinner";
import Image from "next/image";

const InfiniteScrollDrafts = ({
  search,
  is_published = false,
}: {
  search?: string;
  is_published?: boolean;
}) => {
  const [isMounted, setIsMounted] = useState(false);
  const router = useRouter();
  const { data: session } = useSession();
  const searchParams = useSearchParams();
  const current_podcast_id = searchParams.get("podcast_id");
  const initialRender = useRef(true);
  const [currentPodcastId, setCurrentPodcastId] = useState(current_podcast_id);

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
    queryKey: ["podcastsDrafts", { search, is_published }],
    queryFn: async ({ pageParam = 1 }) => {
      const response: SelfPodcastsDetailsResponse = await getSelfPodcastsAction(
        {
          type: "podcaster",
          search,
          is_published,
          page: pageParam.toString(),
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

  // console.log(isError, error, data);

  useEffect(() => {
    if (initialRender.current) {
      initialRender.current = false;
      return;
    }

    const params = new URLSearchParams(searchParams.toString());
    if (currentPodcastId) {
      params.set("podcast_id", currentPodcastId);
    } else {
      params.delete("podcast_id");
    }

    router.push(`?${params.toString()}`);
  }, [currentPodcastId]);

  return (
    <div className="w-full h-full flex flex-col gap-1 overflow-hidden">
      <div className="w-full h-fit flex flex-col items-center gap-2">
        <div className="w-full h-fit flex items-center justify-center">
          <Image
            src="/draftL.png"
            alt="draft"
            width={126}
            height={124}
            className="w-[126px] h-[124px] z-10 rounded-lg object-cover translate-x-14 -rotate-12"
          />
          <Image
            src="/draftC.png"
            alt="draft"
            width={150}
            height={148}
            className="w-[150px] h-[148px] z-20 rounded-lg object-cover"
          />
          <Image
            src="/draftR.png"
            alt="draft"
            width={126}
            height={124}
            className="w-[126px] h-[124px] z-10 rounded-lg object-cover -translate-x-14 rotate-12"
          />
        </div>
        <p className="font-semibold z-[999]">Drafts</p>
      </div>
      <ul className="w-full h- p-3 pe-0">
        <ScrollArea className="w-full h-[calc(100vh-300px)] flex flex-wrap gap-5 pe-3">
          {data?.pages.map((page) =>
            page?.podcasts.map((podcast) => (
              <li key={podcast?.id} className="w-full mt-3">
                <div
                  className={cn(
                    "w-full rounded-lg p-3 bg-secondary space-y-3 cursor-pointer",
                    {
                      "bg-background":
                        currentPodcastId === podcast?.id.toString(),
                    }
                  )}
                  onClick={() => {
                    setCurrentPodcastId(podcast?.id.toString());
                  }}
                >
                  <div className="flex items-center justify-between gap-3">
                    <p className="font-bold text-sm">{podcast?.name}</p>
                    <SquareArrowOutUpRightIcon
                      size={12}
                      className="text-card-foreground/30"
                    />
                  </div>
                  <div className="flex items-center justify-between gap-3">
                    <p className="text-xs opacity-50">
                      {podcast?.publishing_date}
                    </p>
                    <p className="font-bold text-xs opacity-70">
                      {podcast?.is_published ? "Published" : "Draft"}
                    </p>
                  </div>
                </div>
              </li>
            ))
          )}
          {/* loading spinner */}
          <div ref={ref} className="mt-4 flex items-center justify-center">
            {isFetchingNextPage && <LoadingSpinner />}
            <span className="sr-only">Loading...</span>
          </div>
          <ScrollBar />
        </ScrollArea>
      </ul>
    </div>
  );
};

export default InfiniteScrollDrafts;
