"use client";

import { LanguageSwitcher } from "@/components/language-switcher";
import NotificationsDropdown from "@/components/notifications-dropdown";
import { buttonVariants } from "@/components/ui/button";
import { mainNavLinks } from "@/config/links";
import { cn } from "@/lib/utils";
import { Link, usePathname, useRouter } from "@/navigation";
import { useSession } from "next-auth/react";
import UserOptions from "./user-0ptions";
import { SearchIcon } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const DesktopNavbar = ({ search }: { search?: string }) => {
  const pathname = usePathname();
  const { data: session, status } = useSession();
  const [searchText, setSearchText] = useState<string | null>(null);

  const searchParams = useSearchParams();

  useEffect(() => {
    const updatedSearchText = searchParams.get("podcasterId");
    setSearchText(updatedSearchText);
  }, [searchParams]);

  // console.log(pathname);

  return (
    <div className="hidden md:flex flex-row-reverse justify-end items-center h-full gap-6">
      <LanguageSwitcher />
      <UserOptions />
      <NotificationsDropdown />
      <div className="flex justify-end items-center gap-5">
        <Link
          href={{ pathname: "/search", query: { searchText } }}
          className="px-0 opacity-75 hover:opacity-100 duration-200"
        >
          <SearchIcon className="" size={20} />
          <span className="sr-only">Search</span>
        </Link>
        {mainNavLinks.map((link) => {
          if (link.label === "New Publish") {
            return (
              <Link
                key={link.id}
                href={`/${session?.user?.type}${link.href}`}
                className={cn(
                  buttonVariants({
                    variant:
                      (pathname.includes(link.href) && link.href !== "/") ||
                      (link.href === "/" && pathname.lastIndexOf("/") === 0)
                        ? "default"
                        : "outline",
                  }),
                  " text-white hover:text-white border-white hover:bg-white/10 h-9 px-5",
                  { hidden: session?.user?.type !== "podcaster" }
                )}
              >
                {link.label}
              </Link>
            );
          } else
            return (
              <Link
                key={link.href}
                href={`/${session?.user?.type}${link.href}`}
                className={cn(
                  buttonVariants({ variant: "link" }),

                  "text-white p-0 no-underline hover:no-underline before:absolute before:h-0.5 hover:before:w-7 before:bg-greeny before:translate-y-4 before:rounded-full before:opacity-0 hover:before:opacity-100 before:duration-700",
                  {
                    "before:absolute before:size-[6px] before:bg-primary hover:before:bg-primary hover:before:h-0.5 before:translate-y-4 before:rounded-full before:opacity-100 before:duration-200":
                      (pathname.includes(link.href) && link.href !== "/") ||
                      (link.href === "/" && pathname.lastIndexOf("/") === 0),
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
        })}
      </div>
    </div>
  );
};

export default DesktopNavbar;
