"use client";

import { LanguageSwitcher } from "@/components/language-switcher";
import NotificationsDropdown from "@/components/notifications-dropdown";
import { buttonVariants } from "@/components/ui/button";
import { mainNavLinks } from "@/config/links";
import { cn } from "@/lib/utils";
import { Link, usePathname } from "@/navigation";
import { useSession } from "next-auth/react";
import UserOptions from "./user-0ptions";

const DesktopNavbar = () => {
  const pathname = usePathname();
  const { data: session, status } = useSession();

  return (
    <div className="hidden md:flex flex-row-reverse justify-end items-center h-full gap-6">
      <LanguageSwitcher />
      <UserOptions />
      <NotificationsDropdown />
      <div className="flex justify-end gap-5">
        {mainNavLinks.map((link) => {
          if (link.label === "New Publish") {
            return (
              <Link
                key={link.href}
                href={`${session?.user?.type}/${link.href}`}
                className={cn(
                  buttonVariants({ variant: "outline" }),
                  " text-white hover:text-white border-white bg-secondary hover:bg-white/5"
                )}
              >
                {link.label}
              </Link>
            );
          } else
            return (
              <Link
                key={link.href}
                href={`${session?.user?.type}/${link.href}`}
                className={cn(
                  buttonVariants({ variant: "link" }),

                  "text-white p-0 hover:no-underline hover:before:absolute hover:before:h-0.5 hover:before:w-7 hover:before:bg-greeny hover:before:translate-y-3 hover:before:rounded-full",
                  {
                    "before:absolute before:size-[6px] before:bg-primary hover:before:bg-primary before:translate-y-4 before:rounded-full":
                      pathname === link.href,
                  }
                )}
              >
                {link.label}
              </Link>
            );
        })}
      </div>
    </div>
  );
};

export default DesktopNavbar;
