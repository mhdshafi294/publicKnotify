"use client";

import React, { useEffect } from "react"; // Core React import
import { useInfiniteQuery } from "@tanstack/react-query"; // External dependency for infinite query
import { formatDistanceToNow } from "date-fns"; // External utility for date formatting
import { useTranslations } from "next-intl"; // External dependency for internationalization

import { Notification, NotificationsResponse } from "@/types/notification"; // Internal type definitions
import { useIntersectionObserver } from "@/hooks/use-intersection-observer"; // Internal custom hook for intersection observer
import { getNotificationsAction } from "@/app/actions/notificationActions"; // Internal function for fetching notifications
import Loader from "@/components/ui/loader"; // Internal component for loading indicator
import { Separator } from "@/components/ui/separator"; // Internal component for separator

/**
 * InfiniteScrollNotifications Component
 *
 * This component displays a list of notifications with infinite scrolling functionality. It fetches additional
 * notifications as the user scrolls and appends them to the existing list.
 *
 * @param {Object} props - Component properties.
 * @param {Notification[] | undefined} props.initialNotifications - Initial set of notifications to display.
 * @param {string} props.type - Type of notifications to fetch.
 * @returns {JSX.Element} The rendered list of notifications with infinite scroll.
 */
const InfiniteScrollNotifications = ({
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
      <ul className="w-full flex flex-col gap-5 px-6 py-8">
        {data?.pages.map((page) =>
          page?.notifications.map((notification) => (
            <li key={notification?.id} className="w-full">
              <h3 className="text-xl">{notification?.title}</h3>
              <p className="text-sm opacity-70">{notification?.body}</p>
              <p className="text-xs mt-3 italic opacity-90">
                {formatDistanceToNow(new Date(notification?.created_at), {
                  addSuffix: true,
                })}
              </p>
              {/* <p>{notification?.created_at}</p> */}
              <Separator className="my-2 opacity-70" />
            </li>
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

export default InfiniteScrollNotifications;
