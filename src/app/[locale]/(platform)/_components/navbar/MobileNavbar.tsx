"use client";

import { signOut, useSession } from "next-auth/react";
import UserOptions from "./user-0ptions";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { AlignJustifyIcon, LogOutIcon, SettingsIcon, User } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { buttonVariants } from "@/components/ui/button";
import { LanguageSwitcher } from "@/components/language-switcher";
import NotificationsDropdown from "@/components/notifications-dropdown";
import { mainNavLinks } from "@/config/links";
import { Link, usePathname } from "@/navigation";
import { cn } from "@/lib/utils";
import { Separator } from "@/components/ui/separator";

const MobileNavbar = () => {
  const { data: session, status } = useSession();
  const pathname = usePathname();

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
            <SheetTitle className="flex gap-3 mr-3 w-full h-full px-6">
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
                if (link.label !== "New Publish") {
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
                            (link.label === "Requests" ||
                              link.label === "Statistics"),
                        }
                      )}
                    >
                      {link.label}
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
                    {link.label}
                  </Link>;
                }
              })}
            </div>
          </div>
          <Separator className="my-5" />
          <div className="mx-6 flex flex-col gap-5">
            <div className="flex justify-between items-center">
              <p>Language</p>
              <LanguageSwitcher />
            </div>
            <Link
              className="flex gap-1 items-center"
              href={`/${session?.user?.type}/profile/${session?.user?.type}/${session?.user?.id}`}
            >
              <User className="mr-2 h-4 w-4" />
              <span>Profile</span>
            </Link>
            <Link
              className="flex gap-1 items-center"
              href={`/${session?.user?.type}/settings`}
            >
              <SettingsIcon className="mr-2 h-4 w-4" />
              <span>Settings</span>
            </Link>
            <div
              className="text-red-500 flex gap-1 items-center"
              onClick={() => signOut()}
            >
              <LogOutIcon className="mr-2 h-4 w-4" />
              <span>Log out</span>
            </div>
          </div>
        </SheetContent>
      </Sheet>
      <NotificationsDropdown />
    </div>
  );
};

export default MobileNavbar;
