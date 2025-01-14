"use client";

import { SearchIcon } from "lucide-react";
import { useSession } from "next-auth/react";
import { useTranslations } from "next-intl";
import { useParams, usePathname, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

import NotificationsPopover from "@/components/notifications-popover";
import { buttonVariants } from "@/components/ui/button";
import { mainNavLinks } from "@/config/links";
import { cn } from "@/lib/utils";
import { Link } from "@/navigation";
import { Playlist } from "@/types/podcast";
import UserOptions from "./user-0ptions";

/**
 * The DesktopNavbar component renders the navigation bar for larger screens.
 *
 * It includes user options, notifications, language switching, and links based on the user's role.
 *
 * @param {Object} props - Component props.
 * @param {Playlist[]} [props.playlists] - The optional list of playlists to display in the navigation links.
 *
 * @returns {JSX.Element | null} The rendered DesktopNavbar component.
 */
const DesktopNavbar = ({
  playlists,
}: {
  playlists?: Playlist[];
}): JSX.Element | null => {
  const pathname = usePathname();
  const { data: session } = useSession();
  const [searchText, setSearchText] = useState<string | null>(null);

  const searchParams = useSearchParams();
  const params = useParams();
  const t = useTranslations("Index");

  useEffect(() => {
    const updatedSearchText = searchParams.get("podcasterId");
    setSearchText(updatedSearchText);
  }, [searchParams]);

  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    if (!isMounted) setIsMounted(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!isMounted) return null; // Avoid rendering during SSR phase

  return (
    <div className="hidden md:flex flex-row-reverse justify-end items-center h-full gap-6">
      <UserOptions />
      <NotificationsPopover className="hidden lg:block" />
      <div className="flex justify-end items-center gap-5 ">
        <Link
          href={{ pathname: "/search", query: { searchText } }}
          className="px-0 text-secondary-foreground opacity-85 hover:opacity-100 duration-200"
        >
          <SearchIcon className="" size={20} />
          <span className="sr-only">{t("search")}</span>
        </Link>
        {mainNavLinks.map((link) => {
          if (link.label === "Add Episode") {
            return (
              <Link
                key={link?.id}
                href={
                  params.showId
                    ? `/${session?.user?.type}/shows/${params.showId}${link.href}`
                    : playlists !== undefined &&
                      playlists?.length > 0 &&
                      playlists[0]?.id !== undefined
                    ? `/${session?.user?.type}/shows/${playlists[0]?.id}${link.href}`
                    : `/`
                }
                className={cn(
                  buttonVariants({
                    variant:
                      (pathname.includes(link.href) && link.href !== "/") ||
                      (link.href === "/" && pathname.lastIndexOf("/") === 0)
                        ? "default"
                        : "outline",
                  }),
                  " text-secondary-foreground hover:text-secondary-foreground border-white/50 hover:bg-white/10 h-9 px-5 rounded-xl",
                  { hidden: session?.user?.type !== "podcaster" }
                )}
              >
                {t(link.label)}
              </Link>
            );
          } else
            return (
              <Link
                key={link.href}
                href={
                  link.label === "Dashboard"
                    ? params.showId !== undefined
                      ? `/${session?.user?.type}${link.href}/${params.showId}`
                      : `/${session?.user?.type}/`
                    : link.label === "Statistics" &&
                      session?.user?.type === "podcaster" &&
                      params.showId
                    ? `/${session?.user?.type}/shows/${params.showId}/analytics`
                    : link.label === "Statistics" &&
                      session?.user?.type === "podcaster" &&
                      playlists !== undefined &&
                      playlists?.length > 0 &&
                      playlists[0]?.id !== undefined
                    ? `/${session?.user?.type}/shows/${playlists[0]?.id}/analytics`
                    : `/${session?.user?.type}${link.href}`
                }
                className={cn(
                  buttonVariants({ variant: "link" }),
                  "text-secondary-foreground p-0 no-underline hover:no-underline before:absolute before:h-0.5 hover:before:w-7 before:bg-greeny before:translate-y-4 before:rounded-full before:opacity-0 hover:before:opacity-100 before:duration-300",
                  {
                    "before:absolute before:size-[6px] before:bg-primary hover:before:bg-primary hover:before:h-0.5 before:translate-y-4 before:rounded-full before:opacity-100 before:duration-0":
                      (pathname.includes(link.href) &&
                        link.href !== "/" &&
                        link.href !== "/shows") ||
                      (link.href === "/" && pathname.lastIndexOf("/") === 0) ||
                      (link.href === "/shows" &&
                        pathname.split("/").length <= 5) ||
                      (pathname.split("/")[5] === "analytics" &&
                        link.href === "/statistics"),
                  },
                  {
                    hidden:
                      session?.user?.type === "user" &&
                      (link.label === "Requests" ||
                        link.label === "Statistics"),
                  },
                  {
                    hidden:
                      (session?.user?.type === "user" ||
                        session?.user?.type === "company") &&
                      link.label === "Dashboard",
                  },
                  {
                    hidden:
                      session?.user?.type === "podcaster" &&
                      link.label === "Home",
                  },
                  {
                    hidden:
                      session?.user?.type === "company" &&
                      link.label === "Statistics",
                  },
                  {
                    hidden:
                      session?.user?.type !== "user" &&
                      link.label === "Favorite",
                  }
                )}
              >
                {t(link.label)}
              </Link>
            );
        })}
      </div>
    </div>
  );
};

export default DesktopNavbar;
