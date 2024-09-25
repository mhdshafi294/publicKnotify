import { getContractsAction } from "@/app/actions/contractActions";
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import Search from "@/components/search";
import { buttonVariants } from "@/components/ui/button";
import MaxWidthContainer from "@/components/ui/MaxWidthContainer";
import { cn } from "@/lib/utils";
import { Link } from "@/navigation";
import { getServerSession } from "next-auth";
import { getTranslations } from "next-intl/server";
import React from "react";
import InfiniteScrollContracts from "./_components/infinite-scroll-contracts";
import ContractsFilter from "./_components/contracts-filters";
import SelectCompanyFilter from "./_components/select-company-filter";

const ContractsPage = async ({
  params,
  searchParams,
}: {
  params: { userType: string };
  searchParams: { [key: string]: string | string[] | undefined };
}) => {
  // Extracting search and status parameters from the URL search parameters
  const search =
    typeof searchParams.search === "string" ? searchParams.search : undefined;
  const company_request_id =
    typeof searchParams.company_request_id === "string"
      ? searchParams.company_request_id
      : undefined;
  const company_id =
    typeof searchParams.company_id === "string"
      ? searchParams.company_id
      : undefined;

  // Fetching the current session using NextAuth's getServerSession
  const session = await getServerSession(authOptions);

  // Fetch translations for the "Index" namespace
  const t = await getTranslations("Index");

  // Fetching the contracts based on session type, search query, and status filters
  const contractsResponse = await getContractsAction({
    type: session?.user?.type!,
    search,
    company_request_id,
    company_id,
  });

  // Extracting the contracts data from the response
  const contractsData = contractsResponse?.contracts;

  return (
    <main className="py-10 flex-1">
      <MaxWidthContainer className="flex flex-col gap-7">
        {/* Status filter and search bar section */}
        <div className="w-full flex justify-between items-center">
          {/* Status filter component */}
          {/* <ContractsFilter
            company_request_id={company_request_id}
            company_id={company_id}
          /> */}
          <SelectCompanyFilter />

          {/* Search bar and create request button for companies */}
          <div className="flex justify-end items-center gap-2 ms-auto justify-self-end">
            <Search searchText={search} searchFor="contracts" />
            {session?.user?.type === "podcaster" ? (
              <Link
                href="contracts/create"
                className={cn(buttonVariants({ variant: "outline" }))}
              >
                {t("create")}
              </Link>
            ) : null}
          </div>
        </div>

        {/* Infinite scroll component for loading requests */}
        <InfiniteScrollContracts
          initialContracts={contractsData}
          search={search}
          company_request_id={company_request_id}
          company_id={company_id}
          type={session?.user?.type!}
        />
      </MaxWidthContainer>
    </main>
  );
};

export default ContractsPage;
