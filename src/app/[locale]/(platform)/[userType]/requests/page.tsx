import { getServerSession } from "next-auth";

import { Link, redirect } from "@/navigation";
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import { getTranslations } from "next-intl/server";
import { getRequestsAction } from "@/app/actions/requestsActions";
import MaxWidthContainer from "@/components/ui/MaxWidthContainer";
import InfiniteScrollRequests from "./_components/infinite-scroll-requests";
import Search from "@/components/search";
import StatusFilter from "./_components/status-filter";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";

export default async function Requests({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const search =
    typeof searchParams.search === "string" ? searchParams.search : undefined;
  const status =
    typeof searchParams.status === "string" ? searchParams.status : undefined;

  const statusArray =
    typeof status === "string" && status?.length > 0 ? status?.split("") : [];

  const session = await getServerSession(authOptions);
  if (session?.user?.type === "user") {
    redirect(`/user`);
  }
  const t = await getTranslations("Index");

  const requestsResponse = await getRequestsAction({
    type: session?.user?.type!,
    search,
    status: statusArray,
  });

  const requestsData = requestsResponse.requests;

  return (
    <>
      <main className="py-10">
        <MaxWidthContainer className="flex flex-col gap-7">
          <div className="flex justify-between items-center">
            <StatusFilter status={status} />
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
          <InfiniteScrollRequests
            initialRequests={requestsData}
            search={search}
            status={statusArray}
            type={session?.user?.type!}
          />
        </MaxWidthContainer>
      </main>
    </>
  );
}
