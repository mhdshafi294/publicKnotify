"use client";

// Global imports
import React, { useEffect } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useTranslations } from "next-intl";

// Local imports
import { Request, RequestsResponse } from "@/types/request";
import RequestCard from "./request-card";
import { useIntersectionObserver } from "@/hooks/useIntersectionObserver";
import { getRequestsAction } from "@/app/actions/requestsActions";
import Loader from "@/components/ui/loader";

/**
 * InfiniteScrollRequests Component
 * Handles infinite scrolling for a list of requests with support for search, status filtering, and type-based pagination.
 *
 * @param {Object} props - The props object.
 * @param {Request[] | undefined} props.initialRequests - Initial list of requests for the first page.
 * @param {string} [props.search] - Optional search query to filter requests.
 * @param {string[]} [props.status] - Optional array of status filters for requests.
 * @param {string} props.type - The type of requests to fetch (e.g., "company", "user").
 *
 * @returns {JSX.Element} The list of request cards and a loader for infinite scrolling.
 */
const InfiniteScrollRequests: React.FC<{
  initialData: RequestsResponse;
  search?: string;
  status?: string[];
  type: string;
}> = ({ initialData, search, status, type }) => {
  // Translation function for internationalization
  const t = useTranslations("Index");

  // Intersection observer for detecting when to fetch the next page
  const { isIntersecting, ref } = useIntersectionObserver({ threshold: 0 });

  // Infinite query setup
  const {
    isError,
    error,
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ["requests", { type, search, status }],
    queryFn: async ({ pageParam = 1 }) => {
      const response: RequestsResponse = await getRequestsAction({
        type,
        search,
        status,
        page: pageParam.toString(),
      });
      return {
        requests: response.requests,
        pagination: {
          ...response.pagination,
          next_page_url: response.pagination.next_page_url,
          prev_page_url: response.pagination.prev_page_url,
        },
      };
    },
    getNextPageParam: (lastPage) => {
      if (lastPage.pagination.next_page_url) {
        return lastPage.pagination.current_page + 1;
      } else {
        return undefined;
      }
    },
    initialPageParam: 1,
    initialData: {
      pages: [initialData],
      pageParams: [1],
    },
  });

  // Effect to fetch next page when intersection observer detects scrolling
  useEffect(() => {
    if (!isFetchingNextPage && hasNextPage && isIntersecting) {
      fetchNextPage();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isFetchingNextPage, hasNextPage, isIntersecting]);

  return (
    <>
      <ul className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {data?.pages.map((page) =>
          page?.requests.map((request) => (
            <li key={request?.id}>
              <RequestCard request={request!} />
            </li>
          ))
        )}
      </ul>
      <div
        ref={ref}
        className="col-span-1 mt-1 flex items-center justify-center sm:col-span-2 md:col-span-3 lg:col-span-4"
      >
        {isFetchingNextPage && <Loader className="size-9" />}
        <span className="sr-only">{t("loading")}</span>
      </div>
    </>
  );
};

export default InfiniteScrollRequests;
