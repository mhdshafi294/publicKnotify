"use client";

import React, { useEffect } from "react"; // Core React import
import { useInfiniteQuery } from "@tanstack/react-query"; // External dependency for infinite query
import { formatDistanceToNow } from "date-fns"; // External utility for date formatting
import { useTranslations } from "next-intl"; // External dependency for internationalization

import { Notification, NotificationsResponse } from "@/types/notification"; // Internal type definitions
import { useIntersectionObserver } from "@/hooks/useIntersectionObserver"; // Internal custom hook for intersection observer
import { getNotificationsAction } from "@/app/actions/notificationActions"; // Internal function for fetching notifications
import Loader from "@/components/ui/loader"; // Internal component for loading indicator
import { Separator } from "@/components/ui/separator"; // Internal component for separator

/**
 * InfiniteScrollNotificationsDialog Component
 *
 * This component displays a list of notifications with infinite scrolling functionality. It fetches additional
 * notifications as the user scrolls and appends them to the existing list. The notifications are displayed in a dialog.
 *
 * @param {Object} props - Component properties.
 * @param {Notification[] | undefined} props.initialNotifications - Initial set of notifications to display.
 * @param {string} props.type - Type of notifications to fetch.
 * @returns {JSX.Element} The rendered list of notifications with infinite scroll.
 */
const InfiniteScrollNotificationsDialog = ({
  initialNotifications,
  type,
}: {
  initialNotifications: Notification[] | undefined;
  type: string;
}) => {
  const t = useTranslations("Index"); // Hook for translations
  const { isIntersecting, ref } = useIntersectionObserver({ threshold: 0 }); // Hook for intersection observer

  // Infinite query setup
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteQuery({
      queryKey: ["notifications", { type }],
      queryFn: async ({ pageParam = 1 }) => {
        const response: NotificationsResponse = await getNotificationsAction({
          type,
          page: pageParam.toString(),
        });
        return {
          notifications: response.notifications,
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
        if (initialNotifications) {
          return {
            pages: [
              {
                notifications: initialNotifications || [],
                pagination: {
                  current_page: 1,
                  first_page_url: "",
                  last_page_url: "",
                  next_page_url:
                    initialNotifications && initialNotifications.length > 0
                      ? ""
                      : null,
                  per_page: 10,
                  prev_page_url: null,
                  total: initialNotifications ? initialNotifications.length : 0,
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
      <ul className="w-full flex flex-col gap-5 py-2">
        {data?.pages.map((page) =>
          page?.notifications.map((notification, index) => (
            <React.Fragment key={notification?.id}>
              <li className="w-full px-4">
                <div className="w-full flex items-center justify-between">
                  <h3 className="">{notification?.title}</h3>
                  <p className="text-[10px] text-greeny_lighter/70">
                    {formatDistanceToNow(new Date(notification?.created_at), {
                      addSuffix: true,
                    })}
                  </p>
                </div>
                <p className="text-xs opacity-70 mt-2">{notification?.body}</p>
              </li>
              {index !== page?.notifications.length - 1 && (
                <Separator className="opacity-20" />
              )}
            </React.Fragment>
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

export default InfiniteScrollNotificationsDialog;
