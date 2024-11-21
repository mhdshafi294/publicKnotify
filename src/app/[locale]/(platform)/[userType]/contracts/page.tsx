import { FilePlus2Icon } from "lucide-react";
import { getServerSession } from "next-auth";
import { getTranslations } from "next-intl/server";

import { getContractsAction } from "@/app/actions/contractActions";
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import { buttonVariants } from "@/components/ui/button";
import MaxWidthContainer from "@/components/ui/MaxWidthContainer";
import { cn } from "@/lib/utils";
import { Link, redirect } from "@/navigation";
import ContractStatusFilter from "./_components/contract-status-filter";
import InfiniteScrollContracts from "./_components/infinite-scroll-contracts";
import SelectCompanyFilter from "./_components/select-company-filter";
import SelectPodcasterFilter from "./_components/select-podcaster-filter";
import SelectRequestFilter from "./_components/select-request-filter";

/**
 * Renders the ContractsPage component with the specified parameters.
 * @param {Object} params - An object containing the user type parameter.
 * @param {Object} searchParams - An object containing search parameters.
 * @returns None
 */
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
  const podcaster_id =
    typeof searchParams.podcaster_id === "string"
      ? searchParams.podcaster_id
      : undefined;
  const status =
    typeof searchParams.status === "string" ? searchParams.status : undefined;

  // If the status parameter exists and is a string, split it into an array of statuses
  const statusArray =
    typeof status === "string" && status?.length > 0 ? status?.split("") : [];

  // Fetching the current session using NextAuth's getServerSession
  const session = await getServerSession(authOptions);

  if (session === null) {
    redirect(`/sign-in`);
  }

  if (session?.user?.type === "user") {
    // Redirect users of type "user" to their specific page
    redirect(`/`);
  }

  // Fetch translations for the "Index" namespace
  const t = await getTranslations("Index");

  // Fetching the contracts based on session type, search query, and status filters
  const contractsResponse = await getContractsAction({
    type: session?.user?.type!,
    search,
    company_request_id,
    company_id,
    podcaster_id,
  });

  // Extracting the contracts data from the response
  const contractsData = contractsResponse?.contracts;

  return (
    <main className="py-10 flex-1">
      <MaxWidthContainer className="flex flex-col gap-7">
        <div className="w-full flex justify-center items-center">
          {/* Status filter component */}
          <ContractStatusFilter status={status} />
          {/* <div className="flex justify-end items-center gap-2 ms-auto justify-self-end">
            <div className="flex gap-2">
              {session?.user?.type === "podcaster" ? (
                <SelectCompanyFilter filterFor="contracts" />
              ) : (
                <SelectPodcasterFilter filterFor="contracts" />
              )}
              <SelectRequestFilter filterFor="contracts" />
            </div>
            {session?.user?.type === "podcaster" ? (
              <Link
                href="contracts/create"
                className={cn(
                  buttonVariants({
                    variant: "secondary",
                    className:
                      "flex justify-center items-center gap-1 rounded-lg",
                  })
                )}
              >
                <span>{t("create")}</span>
                <FilePlus2Icon className="size-3" />
              </Link>
            ) : null}
          </div> */}
        </div>
        {/* Infinite scroll component for loading requests */}
        <InfiniteScrollContracts
          initialData={contractsResponse}
          search={search}
          company_request_id={company_request_id}
          company_id={company_id}
          status={status}
          type={session?.user?.type!}
          session={session!}
        />
      </MaxWidthContainer>
    </main>
  );
};

export default ContractsPage;
