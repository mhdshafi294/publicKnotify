"use client";
import { useTranslations } from "next-intl";
import { BellRing } from "lucide-react";

import { buttonVariants } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";
// import NotificationContent from "./notification-content";

import useNotificationStore from "@/store/use-notification-store";
import { ScrollArea } from "./ui/scroll-area";
import { useSession } from "next-auth/react";
import { useQuery } from "@tanstack/react-query";
import { getNotificationsAction } from "@/app/actions/notificationActions";
import Loader from "./ui/loader";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import InfiniteScrollNotificationsDialog from "@/app/[locale]/(platform)/[userType]/notifications/_components/infinite-scroll-notifications-dialog";
import { Link } from "@/navigation";

const NotificationsDropdown = ({ className }: { className?: string }) => {
  const t = useTranslations();
  const isOpen = useNotificationStore((state) => state.isOpen);
  const setIsOpen = useNotificationStore((state) => state.setIsOpen);
  const unreadNotifications = useNotificationStore((state) => state.unread);
  const unread = useNotificationStore((state) => state.unread);
  const { data: session } = useSession();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const {
    isError,
    isLoading,
    data: initialnotificationsData,
  } = useQuery({
    queryKey: ["notifications", session?.user?.email],
    queryFn: () => getNotificationsAction({ type: session?.user?.type! }),
  });

  if (isError) {
    return (
      <div className="mt-2">
        <p>{t("Index.error")}</p>
      </div>
    );
  }

  if (isLoading) {
    return (
      <BellRing
        strokeWidth={1.5}
        className="stroke-white size-[18px] lg:size-auto opacity-50"
      />
    );
  }

  return (
    <div className={cn("relative", className)}>
      <Popover open={isOpen} onOpenChange={setIsOpen}>
        <PopoverTrigger
          className={cn(
            buttonVariants({
              variant: "secondary",
              size: "icon",
              className: "bg-transparent",
            })
          )}
        >
          <span className="sr-only">notifications</span>
          <BellRing
            strokeWidth={1.5}
            className="stroke-white size-[18px] lg:size-auto"
          />
          {unreadNotifications && !isOpen ? (
            <span className="size-4 bg-red-600 text-white rounded-full text-xs flex justify-center items-center absolute top-0 -right-1 before:absolute before:inset-0 before:bg-red-600 before:rounded-full before:animate-ping before:-z-0">
              {unreadNotifications}
            </span>
          ) : null}
        </PopoverTrigger>
        <PopoverContent
          align="end"
          className="flex flex-col h-[300px] py-2 px-0 w-[100vw] max-lg:rounded-none lg:w-96"
        >
          <div className="w-full px-4 pe-5 py-2 flex justify-between items-center">
            <p className="  text-xl font-bold capitalize">
              {t("notifications.notifications")}
            </p>
            <div className="text-black bg-greeny rounded-full py-1 px-2 text-center flex justify-center items-center gap-1 text-sm font-bold">
              <span>{unread}</span>{" "}
              <span className="-translate-y-[1px]">{t("Index.new")}</span>
            </div>
          </div>
          <Separator />
          {/* <NotificationContent /> */}

          <ScrollArea className="w-full h-[300px]">
            {isError ? (
              <p>{t("Index.error")}</p>
            ) : isLoading ? (
              <div className="w-full h-full flex justify-center items-center">
                <Loader />
              </div>
            ) : initialnotificationsData ? (
              <InfiniteScrollNotificationsDialog
                initialNotifications={initialnotificationsData.notifications}
                type={session?.user?.type!}
              />
            ) : null}
          </ScrollArea>
          <Separator />
          <div className="w-full px-4 flex justify-center items-center mt-2">
            <Link
              href={`/${session?.user?.type}/notifications`}
              className={cn(
                buttonVariants({ variant: "default" }),
                "font-bold w-full"
              )}
            >
              {t("Index.seeAll")}
            </Link>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default NotificationsDropdown;
