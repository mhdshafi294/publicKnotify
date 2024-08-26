"use client";

import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { Link } from "@/navigation";
import { Playlist } from "@/types/podcast";
import {
  ChevronDown,
  LayoutDashboard,
  PlusSquare,
  Settings,
} from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useState } from "react";

const ShowPopover = ({ playlists }: { playlists: Playlist[] }) => {
  const [openPopover, setOpenPopover] = useState(false);
  const paramas = useParams();
  const locale = useLocale();
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
                className="object-cover h-10 w-14"
                src={
                  playlists.find(
                    (show) => show.id.toString() === paramas.showId
                  )?.image || "/draftC.png"
                }
                alt="show image preview"
              />
              <p className="text-base">
                {
                  playlists.find(
                    (show) => show.id.toString() === paramas.showId
                  )?.name
                }
              </p>
              <ChevronDown className="size-4" />
            </span>
          </Button>
        </PopoverTrigger>
        <PopoverContent
          align={locale === "ar" ? "end" : "start"}
          alignOffset={0}
          className="border p-0 border-foreground/20"
        >
          <div className="w-full px-4 py-3 flex justify-between items-center">
            <div className="flex justify-start items-center gap-3">
              <Image
                width={48}
                height={36}
                className="object-cover h-9 w-12"
                src={
                  playlists.find(
                    (show) => show.id.toString() === paramas.showId
                  )?.image || "/draftC.png"
                }
                alt="show image preview"
              />
              <div>
                <p className="leading-4 text-sm text-foreground/90 group-hover:text-primary duration-200">
                  {
                    playlists.find(
                      (show) => show.id.toString() === paramas.showId
                    )?.name
                  }
                </p>
                <p className="leading-4 text-sm text-foreground/60">
                  {
                    playlists.find(
                      (show) => show.id.toString() === paramas.showId
                    )?.owner_email
                  }
                </p>
              </div>
            </div>
            <Button
              variant="ghost"
              className="w-fit hover:bg-transparent text-foreground/60 hover:text-foreground"
            >
              <Settings className="size-5" />
            </Button>
          </div>
          <Separator className="bg-foreground/20" />
          <div className="w-full flex justify-start items-center gap-3 flex-col px-4 py-3">
            {playlists.slice(0, 5).map((playlist) => (
              <Link
                key={playlist.id}
                passHref
                href={`/podcaster/shows/${playlist.id}`}
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
                    <p className="leading-4 text-sm text-foreground/90 group-hover:text-primary duration-200">
                      {playlist.name}
                    </p>
                    <p className="leading-4 text-sm text-foreground/60">
                      {playlist.owner_email}
                    </p>
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
          <div className="w-full flex justify-start items-center gap-3 flex-col px-4 py-3">
            <Link passHref href="/podcaster/shows/new" className="w-full group">
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
