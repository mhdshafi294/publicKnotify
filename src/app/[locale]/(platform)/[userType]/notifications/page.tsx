import { getServerSession } from "next-auth"; // External dependency for session management
import { getTranslations } from "next-intl/server"; // External dependency for internationalization

import { redirect } from "@/navigation"; // Internal utility for navigation
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions"; // Internal configuration for authentication
import MaxWidthContainer from "@/components/ui/MaxWidthContainer"; // Internal component for max-width container
import { getNotificationsAction } from "@/app/actions/notificationActions"; // Internal function for fetching notifications
import InfiniteScrollNotifications from "./_components/infinite-scroll-notifications"; // Internal component for infinite scroll
import { ScrollArea } from "@/components/ui/scroll-area"; // Internal component for scrollable area

/**
 * NotificationsPage Component
 *
 * This component displays a page with a list of notifications. It fetches notifications data based on the
 * current user's session and provides infinite scrolling functionality to load more notifications as the user scrolls.
 *
 * @param {Object} props - Component properties.
 * @param {Object} props.searchParams - The query parameters from the URL.
 * @returns {JSX.Element} The rendered notifications page.
 */
export default async function NotificationsPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  // Fetch the current session
  const session = await getServerSession(authOptions);

  // Redirect to user page if the user type is "user" (currently commented out)
  // if (session?.user?.type === "user") {
  //   redirect(`/user`);
  // }

  // Get translations for the notifications page
  const t = await getTranslations("notifications");

  // Fetch notifications data
  const notificationsResponse = await getNotificationsAction({
    type: session?.user?.type!,
  });

  // Initial notifications data
  const initialNotificationsData = notificationsResponse.notifications;

  return (
    <main className="py-10 flex-1">
      <MaxWidthContainer className="flex flex-col gap-7">
        <div className="flex items-center">
          <h2 className="lg:text-3xl font-bold capitalize">
            {t("notifications")}
          </h2>
        </div>
        <div className="w-full bg-card rounded-2xl">
          <ScrollArea className="w-full h-[calc(80dvh-72px)]">
            <InfiniteScrollNotifications
              initialNotifications={initialNotificationsData}
              type={session?.user?.type!}
            />
          </ScrollArea>
        </div>
      </MaxWidthContainer>
    </main>
  );
}
