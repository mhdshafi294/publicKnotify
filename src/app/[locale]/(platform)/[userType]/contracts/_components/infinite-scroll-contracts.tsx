"use client";

// Global imports
import { useInfiniteQuery } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import React, { useEffect } from "react";

// Local imports
import { getContractsAction } from "@/app/actions/contractActions";
import Loader from "@/components/ui/loader";
import { useIntersectionObserver } from "@/hooks/useIntersectionObserver";
import { ContractsResponse } from "@/types/contract";
import { Session } from "next-auth";
import ContractCard from "./contract-card";

/**
 * Functional component for rendering a list of contracts with infinite scroll functionality.
 * @param {Object} props - The props object containing the following properties:
 *   - {Contract[] | undefined} initialContracts: The initial list of contracts to display.
 *   - {string} [search]: The search query string.
 *   - {Session} session: The session object.
 *   - {string} [company_request_id]: The company request ID.
 *   - {string} [company_id]: The company ID.
 *   - {string} [status]: The status of the contracts.
 *   - {string} type: The type of contracts to display.
 * @returns JSX element for rendering the list of contracts with infinite
 */
const InfiniteScrollContracts: React.FC<{
  initialData: ContractsResponse;
  search?: string;
  session: Session;
  company_request_id?: string;
  company_id?: string;
  status?: string;
  type: string;
}> = ({
  initialData: initialData,
  search,
  session,
  company_request_id,
  company_id,
  status,
  type,
}) => {
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
    queryKey: [
      "contracts",
      { type, search, company_request_id, company_id, status },
    ],
    queryFn: async ({ pageParam = 1 }) => {
      const response: ContractsResponse = await getContractsAction({
        type,
        search,
        company_request_id,
        company_id,
        status,
        page: pageParam.toString(),
      });
      return {
        contracts: response.contracts,
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
      <ul className="w-full grid grid-cols-1 gap-5">
        {data?.pages.map((page) =>
          page?.contracts.map((contract) => (
            <li key={contract?.id}>
              <ContractCard contract={contract!} session={session} />
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

export default InfiniteScrollContracts;
