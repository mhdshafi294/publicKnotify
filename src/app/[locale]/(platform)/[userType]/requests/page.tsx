import { getServerSession } from "next-auth";
import { useTranslations } from "next-intl";

import { redirect } from "@/navigation";
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import { getTranslations } from "next-intl/server";
import { getRequestsAction } from "@/app/actions/requestsActions";

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

  console.log(requestsData);

  return (
    <>
      <main className="flex min-h-screen flex-col items-center justify-between p-24">
        <p>requests</p>
        {requestsData.map((request) => (
          <p key={request.id}>{request.name}</p>
        ))}
      </main>
    </>
  );
}
