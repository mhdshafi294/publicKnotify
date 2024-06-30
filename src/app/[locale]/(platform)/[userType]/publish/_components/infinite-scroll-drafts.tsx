"use client";

import { getSelfPodcastsAction } from "@/app/actions/podcastActions";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { useIntersectionObserver } from "@/hooks/use-intersection-observer";
import { cn } from "@/lib/utils";
import { useRouter } from "@/navigation";
import { SelfPodcastsDetailsResponse } from "@/types/podcast";
import { useInfiniteQuery } from "@tanstack/react-query";
import { SquareArrowOutUpRightIcon } from "lucide-react";
import { useSession } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";

const InfiniteScrollDrafts = ({
  search,
  is_published = false,
}: {
  search?: string;
  is_published?: boolean;
}) => {
  const searchParams = useSearchParams();
  const podcast_id = searchParams.get("podcast_id");
  const [isMounted, setIsMounted] = useState(false);
  const router = useRouter();
  const { data: session } = useSession();
  const params = new URLSearchParams(searchParams.toString());

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

  return (
    <div className="w-[20dvw] rounded-tr-3xl absolute bottom-0 start-0 h-full bg-card/50 pt-10">
      <div></div>
      <ul className="w-full h-full p-3 pe-0">
        <ScrollArea className="w-full h-full flex flex-wrap gap-5 pe-3">
          {data?.pages.map((page) =>
            page?.podcasts.map((podcast) => (
              <li key={podcast?.id} className="w-full mt-3">
                <div
                  className={cn(
                    "w-full rounded-lg p-3 bg-secondary space-y-3 cursor-pointer",
                    {
                      "bg-card": podcast_id,
                    }
                  )}
                  onClick={() => {
                    params.set("podcast_id", podcast?.id.toString());
                    router.push(`?${params.toString()}`);
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
            {isFetchingNextPage && (
              <svg
                aria-hidden="true"
                className="size-7 animate-spin fill-greeny text-gray-200 dark:text-gray-600"
                viewBox="0 0 100 101"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                  fill="currentColor"
                />
                <path
                  d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                  fill="currentFill"
                />
              </svg>
            )}
            <span className="sr-only">Loading...</span>
          </div>
          <ScrollBar />
        </ScrollArea>
      </ul>
    </div>
  );
};

export default InfiniteScrollDrafts;
