"use client";
import CompanyCard from "@/app/[locale]/(platform)/_components/company-card";
import { getCompaniesAction } from "@/app/actions/companyActions";
import Loader from "@/components/ui/loader";
import { useIntersectionObserver } from "@/hooks/use-intersection-observer";
import { CompaniesResponse, Company } from "@/types/company";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { useTranslations } from "next-intl";

const InfiniteScrollCompanies = ({
  initialData,
  search,
}: {
  initialData: Company[] | undefined;
  search?: string;
}) => {
  const { isIntersecting, ref } = useIntersectionObserver({
    threshold: 0,
  });
  const t = useTranslations("Index");

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteQuery({
      queryKey: ["companies", "podcaster", search],
      queryFn: async ({ pageParam = 1 }) => {
        const response: CompaniesResponse = await getCompaniesAction({
          page: pageParam.toString(),
          type: "podcaster",
          count: "10",
          search,
        });
        return {
          requests: response.companies,
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
        if (initialData) {
          return {
            pages: [
              {
                requests: initialData || [],
                pagination: {
                  current_page: 1,
                  first_page_url: "",
                  last_page_url: "",
                  next_page_url:
                    initialData && initialData.length > 0 ? "" : null,
                  per_page: 10,
                  prev_page_url: null,
                  total: initialData ? initialData.length : 0,
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
      <ul className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-5">
        {data?.pages.map((page) =>
          page?.requests.map((request) => (
            <li key={request?.id}>
              <CompanyCard company={request!} />
            </li>
          ))
        )}
      </ul>
      {/* loading spinner */}
      <div
        ref={ref}
        className="col-span-1 mt-1 flex items-center justify-center sm:col-span-2 md:col-span-3 lg:col-span-4 xl:col-span-5"
      >
        {isFetchingNextPage && <Loader className="size-9" />}
        <span className="sr-only">{t("loading")}</span>
      </div>
    </>
  );
};

export default InfiniteScrollCompanies;
