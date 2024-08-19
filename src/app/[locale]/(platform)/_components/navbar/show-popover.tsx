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
import { ChevronDown, LayoutDashboard, PlusSquare, Settings } from "lucide-react";
import { useLocale } from "next-intl";
import Image from "next/image";
import { useState } from "react";

const ShowPopover = () => {
  const [openPopover, setOpenPopover] = useState(false);
  const locale = useLocale();
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
                width={40}
                height={40}
                className="object-cover size-auto"
                src="/draftC.png"
                alt="show image preview"
              />
              <p className="text-base">show name</p>
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
                width={35}
                height={35}
                className="object-cover size-auto"
                src="/draftC.png"
                alt="show image preview"
              />
              <div>
                <p className="leading-4 text-sm text-foreground/90 group-hover:text-primary duration-200">
                  show name
                </p>
                <p className="leading-4 text-sm text-foreground/60">
                  example@gmail.com
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
            <Link passHref href="/podcaster/profile/shows" className="w-full group">
              <span className="flex justify-start items-center gap-3">
                <Image
                  width={35}
                  height={35}
                  className="object-cover size-auto"
                  src="/draftC.png"
                  alt="show image preview"
                />
                <div>
                  <p className="leading-4 text-sm text-foreground/90 group-hover:text-primary duration-200">
                    show name
                  </p>
                  <p className="leading-4 text-sm text-foreground/60">
                    example@gmail.com
                  </p>
                </div>
              </span>
            </Link>
            <Link passHref href="/podcaster/profile/shows" className="w-full group">
              <span className="flex justify-start items-center gap-3">
                <Image
                  width={35}
                  height={35}
                  className="object-cover size-auto"
                  src="/draftC.png"
                  alt="show image preview"
                />
                <div>
                  <p className="leading-4 text-sm text-foreground/90 group-hover:text-primary duration-200">
                    show name
                  </p>
                  <p className="leading-4 text-sm text-foreground/60">
                    example@gmail.com
                  </p>
                </div>
              </span>
            </Link>
            <Link passHref href="/podcaster/profile/shows" className="w-full group">
              <span className="flex justify-start items-center gap-3">
                <Image
                  width={35}
                  height={35}
                  className="object-cover size-auto"
                  src="/draftC.png"
                  alt="show image preview"
                />
                <div>
                  <p className="leading-4 text-sm text-foreground/90 group-hover:text-primary duration-200">
                    show name
                  </p>
                  <p className="leading-4 text-sm text-foreground/60">
                    example@gmail.com
                  </p>
                </div>
              </span>
            </Link>
            <Link passHref href="/podcaster/profile/shows" className="w-full group">
              <span className="flex justify-start items-center gap-3">
                <Image
                  width={35}
                  height={35}
                  className="object-cover size-auto"
                  src="/draftC.png"
                  alt="show image preview"
                />
                <div>
                  <p className="leading-4 text-sm text-foreground/90 group-hover:text-primary duration-200">
                    show name
                  </p>
                  <p className="leading-4 text-sm text-foreground/60">
                    example@gmail.com
                  </p>
                </div>
              </span>
            </Link>
            <Link passHref href="/podcaster/profile/shows" className="w-full group">
              <span className="flex justify-start items-center gap-4">
                <LayoutDashboard
                  strokeWidth={1}
                  className="object-cover size-12"
                />
                <p className="leading-4 text-base text-foreground/60 capitalize">
                  view all shows
                </p>
              </span>
            </Link>
          </div>
          <Separator className="bg-foreground/20" />
          <div className="w-full flex justify-start items-center gap-3 flex-col px-4 py-3">
            <Link passHref href="/podcaster/profile/shows" className="w-full">
              <span className="flex justify-start items-center gap-4">
                <PlusSquare
                  strokeWidth={1}
                  className="size-8 fill-foreground/60 stroke-popover"
                />
                <p className="leading-4 text-base text-foreground/60 capitalize">
                  create new show
                </p>
              </span>
            </Link>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default ShowPopover;
