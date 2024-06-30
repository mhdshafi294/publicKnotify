"use client";

import { Request, RequestsResponse } from "@/types/request";
import React, { useCallback, useEffect, useState } from "react";
import RequestCard from "./request-card";
import { useIntersectionObserver } from "@/hooks/use-intersection-observer";
import { getRequestsAction } from "@/app/actions/requestsActions";
import { useInfiniteQuery } from "@tanstack/react-query";

const InfiniteScrollRequests = ({
  initialRequests,
  search,
  status,
  type,
}: {
  initialRequests: Request[] | undefined;
  search?: string;
  status?: string;
  type: string;
}) => {
  const { isIntersecting, ref } = useIntersectionObserver({
    threshold: 0,
  });

  // const [requests, setRequests] = useState(initialRequests);
  // const [isLoading, setIsLoading] = useState(false);
  // const [page, setPage] = useState(1);

  // async function loadMoreRequests() {
  //   const next = page + 1;
  //   const requestsResponse = await getRequestsAction({
  //     type,
  //     search,
  //     page: next.toString(),
  //   });
  //   if (requestsResponse.requests.length) {
  //     setPage(next);
  //     setRequests((prev: Request[] | undefined) => [
  //       ...(prev?.length ? prev : []),
  //       ...requestsResponse.requests,
  //     ]);
  //   }
  // }

  // const loadMoreRequests = useCallback(async () => {
  //   setIsLoading(true);
  //   const next = page + 1;
  //   const requestsResponse = await getRequestsAction({
  //     type,
  //     search,
  //     page: next.toString(),
  //   });
  //   if (requestsResponse.requests.length) {
  //     setPage(next);
  //     setRequests((prev: Request[] | undefined) => [
  //       ...(prev?.length ? prev : []),
  //       ...requestsResponse.requests,
  //     ]);
  //   }
  //   setIsLoading(false);
  // }, []);

  // useEffect(() => {
  //   if (isIntersecting) {
  //     loadMoreRequests();
  //   }
  // }, [isIntersecting]);

  // const {
  //   isError,
  //   error,
  //   data,
  //   fetchNextPage,
  //   hasNextPage,
  //   isFetchingNextPage,
  // } = useInfiniteQuery({
  //   queryKey: ["requests", { type, search }],
  //   queryFn: ({ pageParam = 1 }) =>
  //     getRequestsAction({
  //       type,
  //       search,
  //       page: pageParam.toString(),
  //     }),
  //   getNextPageParam: (lastPage) => {
  //     if (lastPage.pagination.next_page_url) {
  //       return lastPage.pagination.current_page + 1;
  //     } else {
  //       return undefined;
  //     }
  //   },
  //   initialData: {
  //     pages: [
  //       {
  //         data: initialRequests,
  //         pagination: {
  //           current_page: 1,
  //           next_page_url:
  //             initialRequests && initialRequests.length > 0 ? "some-url" : null,
  //         },
  //       },
  //     ],
  //     pageParams: [1],
  //   },
  // });

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
      return lastPage.pagination.next_page_url
        ? lastPage.pagination.current_page + 1
        : undefined;
    },
    initialPageParam: 1,
    initialData: () => {
      if (initialRequests) {
        return {
          pages: [
            {
              requests: initialRequests || [],
              pagination: {
                current_page: 1,
                first_page_url: "",
                last_page_url: "",
                next_page_url:
                  initialRequests && initialRequests.length > 0 ? "" : null,
                per_page: 10,
                prev_page_url: null,
                total: initialRequests ? initialRequests.length : 0,
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
      <ul className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {/* {requests?.map((request) => (
          <li key={request?.id}>
            <RequestCard request={request!} />
          </li>
        ))} */}
        {data?.pages.map((page) =>
          page?.requests.map((request) => (
            <li key={request?.id}>
              <RequestCard request={request!} />
            </li>
          ))
        )}
      </ul>
      {/* loading spinner */}
      <div
        ref={ref}
        className="col-span-1 mt-1 flex items-center justify-center sm:col-span-2 md:col-span-3 lg:col-span-4"
      >
        {isFetchingNextPage && (
          <svg
            aria-hidden="true"
            className="h-10 w-10 animate-spin fill-greeny text-gray-200 dark:text-gray-600"
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
    </>
  );
};

export default InfiniteScrollRequests;
