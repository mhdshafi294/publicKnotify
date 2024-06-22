import { getServerSession } from "next-auth";

import { redirect } from "@/navigation";
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import { getTranslations } from "next-intl/server";
import { getRequestsAction } from "@/app/actions/requestsActions";
import RequestCard from "./components/request-card";
import MaxWidthContainer from "@/components/ui/MaxWidthContainer";
import InfiniteScrollRequests from "./components/infinite-scroll-requests";

export default async function Requests({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const session = await getServerSession(authOptions);
  if (session?.user?.type === "user") {
    redirect(`/user`);
  }
  const t = await getTranslations("Index");

  const requestsResponse = await getRequestsAction({
    type: session?.user?.type!,
  });
  const requestsData = requestsResponse.requests;

  return (
    <>
      <main className="py-10">
        <MaxWidthContainer className="flex flex-col gap-7">
          <p>requests</p>
          <InfiniteScrollRequests
            initialRequests={requestsData}
            type="podcaster"
          />
        </MaxWidthContainer>
      </main>
    </>
  );
}
