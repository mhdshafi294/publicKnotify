import { getServerSession } from "next-auth";
import { getTranslations } from "next-intl/server";

import { Link, redirect } from "@/navigation";
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import { getRequestsAction } from "@/app/actions/requestsActions";
import MaxWidthContainer from "@/components/ui/MaxWidthContainer";
import Search from "@/components/search";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import InfiniteScrollRequests from "./_components/infinite-scroll-requests";
import StatusFilter from "./_components/status-filter";

/**
 * Requests Component
 * Handles fetching and displaying requests with support for search and status filtering.
 * It redirects unauthorized users (of type "user") to their respective page.
 *
 * @param {Object} props - The props object.
 * @param {Object} props.searchParams - The search parameters from the URL.
 *
 * @returns {JSX.Element} The requests page content.
 */
export default async function Requests({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  // Extracting search and status parameters from the URL search parameters
  const search =
    typeof searchParams.search === "string" ? searchParams.search : undefined;
  const status =
    typeof searchParams.status === "string" ? searchParams.status : undefined;

  // If the status parameter exists and is a string, split it into an array of statuses
  const statusArray =
    typeof status === "string" && status?.length > 0 ? status?.split("") : [];

  // Fetching the current session using NextAuth's getServerSession
  const session = await getServerSession(authOptions);

  // Redirect users of type "user" to their specific page
  if (session?.user?.type === "user") {
    redirect(`/user`);
  }

  // Fetch translations for the "Index" namespace
  const t = await getTranslations("Index");

  // Fetching the requests based on session type, search query, and status filters
  const requestsResponse = await getRequestsAction({
    type: session?.user?.type!,
    search,
    status: statusArray,
  });

  // Extracting the requests data from the response
  const requestsData = requestsResponse.requests;

  return (
    <main className="py-10">
      <MaxWidthContainer className="flex flex-col gap-7">
        {/* Status filter and search bar section */}
        <div className="flex justify-between items-center">
          {/* Status filter component */}
          <StatusFilter status={status} />

          {/* Search bar and create request button for companies */}
          <div className="flex justify-end items-center gap-2">
            <Search searchText={search} searchFor="requests" />
            {session?.user?.type === "company" && (
              <Link
                href="requests/create"
                className={cn(buttonVariants({ variant: "outline" }))}
              >
                {t("create")}
              </Link>
            )}
          </div>
        </div>

        {/* Infinite scroll component for loading requests */}
        <InfiniteScrollRequests
          initialRequests={requestsData}
          search={search}
          status={statusArray}
          type={session?.user?.type!}
        />
      </MaxWidthContainer>
    </main>
  );
}
