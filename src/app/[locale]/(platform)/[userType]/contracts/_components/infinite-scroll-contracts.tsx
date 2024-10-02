"use client";

// Global imports
import React, { useEffect } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useTranslations } from "next-intl";

// Local imports

import { useIntersectionObserver } from "@/hooks/useIntersectionObserver";

import Loader from "@/components/ui/loader";
import ContractCard from "./contract-card";
import { Contract, ContractsResponse } from "@/types/contract";
import { getContractsAction } from "@/app/actions/contractActions";
import { useSession } from "next-auth/react";
import { Session } from "next-auth";

/**
 * InfiniteScrollcontracts Component
 * Handles infinite scrolling for a list of contracts with support for search, status filtering, and type-based pagination.
 *
 * @param {Object} props - The props object.
 * @param {contract[] | undefined} props.initialContracts - Initial list of contracts for the first page.
 * @param {string} [props.search] - Optional search query to filter contracts.
 * @param {string[]} [props.status] - Optional array of status filters for contracts.
 * @param {string} props.type - The type of contracts to fetch (e.g., "company", "user").
 *
 * @returns {JSX.Element} The list of contract cards and a loader for infinite scrolling.
 */
const InfiniteScrollContracts: React.FC<{
  initialContracts: Contract[] | undefined;
  search?: string;
  session: Session;
  company_request_id?: string;
  company_id?: string;
  status?: string;
  type: string;
}> = ({
  initialContracts,
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
    initialData: () => {
      if (initialContracts) {
        return {
          pages: [
            {
              contracts: initialContracts || [],
              pagination: {
                current_page: 1,
                first_page_url: "",
                last_page_url: "",
                next_page_url:
                  initialContracts && initialContracts.length > 0 ? "" : null,
                per_page: 10,
                prev_page_url: null,
                total: initialContracts ? initialContracts.length : 0,
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
      <ul className="w-full grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
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
