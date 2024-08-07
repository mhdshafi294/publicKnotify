"use client";

import { Notification, NotificationsResponse } from "@/types/notification";
import React, { useEffect } from "react";
import { useIntersectionObserver } from "@/hooks/use-intersection-observer";
import { useInfiniteQuery } from "@tanstack/react-query";
import Loader from "@/components/ui/loader";
import { useTranslations } from "next-intl";
import { getNotificationsAction } from "@/app/actions/notificationActions";
import { Separator } from "@/components/ui/separator";
import { formatDistanceToNow } from "date-fns";

const InfiniteScrollNotificationsDialog = ({
  initialNotifications,
  type,
}: {
  initialNotifications: Notification[] | undefined;
  type: string;
}) => {
  const t = useTranslations("Index");
  const { isIntersecting, ref } = useIntersectionObserver({
    threshold: 0,
  });

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
      <ul className="w-full flex flex-col gap-5  py-2">
        {data?.pages.map((page) =>
          page?.notifications.map((notification, index) => (
            <>
              <li key={notification?.id} className="w-full px-4">
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
              {index !== page?.notifications.length - 1 ? (
                <Separator className="opacity-80" />
              ) : null}
            </>
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
