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
  initialRequests: Request[] | undefined;
  search?: string;
  status?: string[];
  type: string;
}> = ({ initialRequests, search, status, type }) => {
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
