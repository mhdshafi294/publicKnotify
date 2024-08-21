"use client";

import { signOut, useSession } from "next-auth/react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  AlignJustifyIcon,
  BellRingIcon,
  LogOutIcon,
  SettingsIcon,
  User,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button, buttonVariants } from "@/components/ui/button";
import { LanguageSwitcher } from "@/components/language-switcher";
import { mainNavLinks } from "@/config/links";
import { Link, usePathname } from "@/navigation";
import { cn } from "@/lib/utils";
import { Separator } from "@/components/ui/separator";
import { useTranslations } from "next-intl";
import useNotificationStore from "@/store/use-notification-store";

const MobileNavbar = () => {
  const { data: session } = useSession();
  const pathname = usePathname();
  const t = useTranslations("Index");
  const isOpen = useNotificationStore((state) => state.isOpen);
  const setIsOpen = useNotificationStore((state) => state.setIsOpen);
  const unreadNotifications = useNotificationStore((state) => state.unread);

  return (
    <div className="flex md:hidden flex-row-reverse justify-end items-center h-full">
      <Sheet>
        <SheetTrigger
          className={buttonVariants({ size: "icon", variant: "ghost" })}
        >
          <AlignJustifyIcon />
        </SheetTrigger>
        <SheetContent className="border-l-muted/25 px-0">
          <SheetHeader>
            <SheetTitle className="flex gap-3 me-3 w-full h-full px-6">
              <Avatar className="cursor-pointer">
                <AvatarImage
                  src={session?.user?.image!}
                  alt={session?.user?.full_name}
                  className="object-cover "
                />
                <AvatarFallback className="uppercase text-black">
                  {session?.user?.full_name?.slice(0, 2) as string}
                </AvatarFallback>
              </Avatar>
              <div className="flex flex-col items-start justify-between">
                <p className="text-sm font-semibold ">
                  {session?.user?.full_name}
                </p>
                <p className="text-xs font-light opacity-75">
                  {session?.user?.phone}
                </p>
              </div>
            </SheetTitle>
            <SheetDescription></SheetDescription>
          </SheetHeader>
          <Separator className="my-2" />
          <div className="flex flex-col gap-2 px-6">
            <div className="flex flex-col justify-start items-start gap-0">
              {mainNavLinks.map((link) => {
                if (link.label !== "Add Podcast") {
                  return (
                    <Link
                      key={link.href}
                      href={`/${session?.user?.type}${link.href}`}
                      className={cn(
                        buttonVariants({ variant: "link" }),
                        "text-white p-0 no-underline hover:no-underline ",
                        {
                          "before:absolute before:size-[6px] before:bg-primary hover:before:bg-primary before:start-0 before:translate-x-1.5 before:rounded-full":
                            (pathname.includes(link.href) &&
                              link.href !== "/") ||
                            (link.href === "/" &&
                              pathname.lastIndexOf("/") === 0),
                        },
                        {
                          hidden:
                            session?.user?.type === "user" &&
                            (t(link.label) === t("requests") ||
                              t(link.label) === t("statistics")),
                        }
                      )}
                    >
                      {session?.user?.type === "podcaster" &&
                      link.label === "Home"
                        ? t("dashboard")
                        : t(link.label)}
                    </Link>
                  );
                } else {
                  <Link
                    key={link.href}
                    href={`/${session?.user?.type}${link.href}`}
                    className={cn(
                      buttonVariants({ variant: "link" }),
                      "text-white p-0 no-underline hover:no-underline ",
                      {
                        "before:absolute before:size-[6px] before:bg-primary hover:before:bg-primary before:start-0 before:translate-x-1.5 before:rounded-full":
                          (pathname.includes(link.href) && link.href !== "/") ||
                          (link.href === "/" &&
                            pathname.lastIndexOf("/") === 0),
                      },
                      { hidden: session?.user?.type !== "podcaster" }
                    )}
                  >
                    {t(link.label)}
                  </Link>;
                }
              })}
              <Link
                href={`/terms`}
                className={cn(
                  buttonVariants({ variant: "link" }),
                  "text-white p-0 no-underline hover:no-underline "
                )}
              >
                <span>{t("terms")}</span>
              </Link>
              <Link
                href={`/privacy`}
                className={cn(
                  buttonVariants({ variant: "link" }),
                  "text-white p-0 no-underline hover:no-underline "
                )}
              >
                <span>{t("privacy")}</span>
              </Link>
              <Link
                href={`/support`}
                className={cn(
                  buttonVariants({ variant: "link" }),
                  "text-white p-0 no-underline hover:no-underline "
                )}
              >
                <span>{t("support")}</span>
              </Link>
            </div>
          </div>
          <Separator className="my-5" />
          <div className="mx-6 flex flex-col gap-5">
            <div className="flex justify-between items-center">
              <p>{t("language")}</p>
              <LanguageSwitcher />
            </div>
            <Link
              className="flex gap-1 items-center"
              href={`/${session?.user?.type}/profile/${session?.user?.type}/${session?.user?.id}`}
            >
              <User className="me-2 h-4 w-4" />
              <span>{t("profile")}</span>
            </Link>
            <Link
              className="flex gap-1 items-center"
              href={`/${session?.user?.type}/settings`}
            >
              <SettingsIcon className="me-2 h-4 w-4" />
              <span>{t("settings")}</span>
            </Link>
            <div
              className="text-red-500 flex gap-1 items-center"
              onClick={() => signOut()}
            >
              <LogOutIcon className="me-2 h-4 w-4" />
              <span>{t("logOut")}</span>
            </div>
          </div>
        </SheetContent>
      </Sheet>
      {/* <NotificationsDropdown className="block lg:hidden" /> */}
      <Button
        variant="secondary"
        size={"icon"}
        className={cn("bg-transparent")}
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="sr-only">notifications</span>
        <BellRingIcon
          strokeWidth={1.5}
          className="stroke-white size-[18px] lg:size-auto"
        />
        {unreadNotifications && !isOpen ? (
          <span className="size-4 bg-red-600 text-white rounded-full text-xs flex justify-center items-center absolute top-0 -right-1 before:absolute before:inset-0 before:bg-red-600 before:rounded-full before:animate-ping before:-z-0">
            {unreadNotifications}
          </span>
        ) : null}
      </Button>
    </div>
  );
};

export default MobileNavbar;
