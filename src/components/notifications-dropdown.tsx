"use client";
import { useTranslations } from "next-intl";
import { BellRing } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";
// import NotificationContent from "./notification-content";

import useNotificationStore from "@/store/use-notification-store";

const NotificationsDropdown = () => {
  const t = useTranslations();
  const isOpen = useNotificationStore((state) => state.isOpen);
  const setIsOpen = useNotificationStore((state) => state.setIsOpen);
  const unreadNotifications = useNotificationStore((state) => state.unread);
  const unread = useNotificationStore((state) => state.unread);
  // const setUnreadNotifications = useNotificationStore(
  //   (state) => state.setUnread
  // );

  return (
    <div className="relative">
      <Popover open={isOpen} onOpenChange={setIsOpen}>
        <PopoverTrigger asChild>
          <Button variant="secondary" size="icon" className="bg-transparent">
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
          </Button>
        </PopoverTrigger>
        <PopoverContent
          align="end"
          className="flex flex-col h-[250px] py-2 px-0 w-96"
        >
          <div className="w-full px-4 pe-5 py-2 flex justify-between items-center">
            <p className="  text-lg">{t("notifications.notifications")}</p>
            <div className="text-primary bg-greeny rounded-full py-1 px-2 text-center flex justify-center items-center gap-1 text-sm">
              <span>{unread}</span>{" "}
              <span className="-translate-y-[1px]">{t("Index.new")}</span>
            </div>
          </div>
          <Separator />
          {/* <NotificationContent /> */}
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default NotificationsDropdown;
