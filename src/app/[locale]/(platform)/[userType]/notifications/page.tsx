import { getServerSession } from "next-auth";

import { redirect } from "@/navigation";
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import { getTranslations } from "next-intl/server";
import MaxWidthContainer from "@/components/ui/MaxWidthContainer";
import { getNotificationsAction } from "@/app/actions/notificationActions";
import InfiniteScrollNotifications from "./_components/infinite-scroll-notifications";
import { ScrollArea } from "@/components/ui/scroll-area";

export default async function NotificationsPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const session = await getServerSession(authOptions);
  if (session?.user?.type === "user") {
    redirect(`/user`);
  }
  const t = await getTranslations("notifications");

  const notificationsResponse = await getNotificationsAction({
    type: session?.user?.type!,
  });

  const initialnotificationsData = notificationsResponse.notifications;

  return (
    <>
      <main className="py-10">
        <MaxWidthContainer className="flex flex-col gap-7">
          <div className="flex items-center">
            <h2 className="lg:text-3xl font-bold capitalize">
              {t("notifications")}
            </h2>
          </div>
          <div className="w-full bg-card  rounded-2xl">
            <ScrollArea className="w-full h-[calc(80dvh-72px)]">
              <InfiniteScrollNotifications
                initialNotifications={initialnotificationsData}
                type={session?.user?.type!}
              />
            </ScrollArea>
          </div>
        </MaxWidthContainer>
      </main>
    </>
  );
}
