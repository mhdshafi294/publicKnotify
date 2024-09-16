"use client";

import React, { useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { useParams } from "next/navigation";
import Image from "next/image";
import {
  ChevronDown,
  LayoutDashboard,
  PlusSquare,
  Settings,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { Link, usePathname } from "@/navigation";
import { Playlist } from "@/types/podcast";
import { useMediaQuery } from "@/hooks/useMediaQuery";

/**
 * The ShowPopover component displays a dropdown-style popover menu
 * allowing the user to switch between different playlists, view settings, or create a new show.
 *
 * The component uses a combination of popovers and buttons to manage user interactions
 * and display relevant playlists in the UI.
 *
 * @param {Object} props - Component props.
 * @param {Playlist[]} props.playlists - The list of available playlists to display.
 *
 * @returns {JSX.Element} The rendered ShowPopover component.
 */
const ShowPopover = ({ playlists }: { playlists: Playlist[] }): JSX.Element => {
  const [openPopover, setOpenPopover] = useState(false);
  const params = useParams();
  const pathname = usePathname();
  const locale = useLocale();
  const isDeskTop = useMediaQuery("(min-width: 640px)");
  const t = useTranslations("Index");

  return (
    <div className="max-w-[300px]">
      <Popover open={openPopover} onOpenChange={setOpenPopover}>
        <PopoverTrigger asChild>
          <Button
            variant="ghost"
            className={cn(
              "size-auto justify-center hover:bg-border/30 border border-transparent hover:text-foreground items-center",
              openPopover
                ? "bg-border/30 shadow shadow-foreground border-foreground"
                : ""
            )}
          >
            <span className="inline-flex justify-between items-center gap-2">
              <Image
                width={56}
                height={40}
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="object-cover h-5 w-7 md:h-10 md:w-14"
                src={
                  playlists.find((show) => show.id.toString() === params.showId)
                    ?.image || "/draftC.png"
                }
                alt="show image preview"
              />
              <p className="text-sm font-bold capitalize">
                {playlists.find((show) => show.id.toString() === params.showId)
                  ?.name || t("select_show_here")}
              </p>
              <ChevronDown className="size-4" />
            </span>
          </Button>
        </PopoverTrigger>
        <PopoverContent
          align={!isDeskTop ? "center" : locale === "ar" ? "end" : "start"}
          alignOffset={0}
          className="border p-0 border-foreground/20"
        >
          {/* Current Playlist Details */}
          <div className="w-full px-4 py-3 flex justify-between items-center">
            <div className="flex justify-start items-center gap-3">
              <Image
                width={48}
                height={36}
                className="object-cover h-9 w-12"
                src={
                  playlists.find((show) => show.id.toString() === params.showId)
                    ?.image || "/draftC.png"
                }
                alt="show image preview"
              />
              <div>
                <p className="leading-4 text-sm text-foreground/90 group-hover:text-primary duration-200">
                  {
                    playlists.find(
                      (show) => show.id.toString() === params.showId
                    )?.name
                  }
                </p>
                <p className="leading-4 text-sm text-foreground/60">
                  {
                    playlists.find(
                      (show) => show.id.toString() === params.showId
                    )?.owner_email
                  }
                </p>
              </div>
            </div>
            <Link
              href={`/podcaster/shows/${params.showId}/edit`}
              className="w-fit hover:bg-transparent text-foreground/60 hover:text-foreground duration-200"
            >
              <Settings className="size-5" />
            </Link>
          </div>

          <Separator className="bg-foreground/20" />

          {/* Playlist Links */}
          <div className="w-full flex justify-start items-center gap-3 flex-col px-4 py-3">
            {playlists.slice(0, 5).map((playlist) => (
              <Link
                key={playlist.id}
                passHref
                href={
                  !params.showId
                    ? `/podcaster/shows/${playlist.id}`
                    : pathname.replace(/shows\/[^/]+/, `shows/${playlist.id}`)
                }
                className="w-full group"
              >
                <div className="flex justify-start items-center gap-3">
                  <Image
                    width={48}
                    height={36}
                    className="object-cover h-9 w-12"
                    src={playlist.image}
                    alt="show image preview"
                  />
                  <div>
                    <p className="leading-4 text-sm text-foreground/90 group-hover:text-primary duration-200 capitalize">
                      {playlist.name}
                    </p>
                    <p className="leading-4 text-sm text-foreground/60">
                      {playlist.owner_email}
                    </p>
                    {/* <p className="leading-4 text-xs text-foreground/40">
                      {!params.showId
                        ? `/podcaster/shows/${playlist.id}`
                        : pathname.replace(
                            /shows\/[^/]+/,
                            `shows/${playlist.id}`
                          )}
                    </p> */}
                  </div>
                </div>
              </Link>
            ))}
            <Link passHref href="/podcaster/shows" className="w-full group">
              <span className="flex justify-start items-center gap-4">
                <LayoutDashboard
                  strokeWidth={1}
                  className="object-cover size-12"
                />
                <p className="leading-4 text-xs text-foreground/60 group-hover:text-foreground duration-300 capitalize">
                  {t("view_all_shows")}
                </p>
              </span>
            </Link>
          </div>

          <Separator className="bg-foreground/20" />

          {/* Create New Show Link */}
          <div className="w-full flex justify-start items-center gap-3 flex-col px-4 py-3">
            <Link
              passHref
              href="/podcaster/shows/create"
              className="w-full group"
            >
              <span className="flex justify-start items-center gap-4">
                <PlusSquare
                  strokeWidth={1}
                  className="size-8 fill-foreground/60 stroke-popover"
                />
                <span className="leading-4 text-sm text-foreground/60 group-hover:text-foreground duration-300 capitalize">
                  {t("create_show")}
                </span>
              </span>
            </Link>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default ShowPopover;
