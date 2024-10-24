"use client";

import { getPlayListsByPodcasterAction } from "@/app/actions/podcastActions";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Input } from "@/components/ui/input";
import Loader from "@/components/ui/loader";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useIntersectionObserver } from "@/hooks/useIntersectionObserver";
import { cn, getDirection } from "@/lib/utils";
import { useInfiniteQuery } from "@tanstack/react-query";
import { CheckIcon, ChevronsUpDown, Search } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useDebounce } from "use-debounce";

type ShowSelectorProps = {
  podcaster_id: string;
  show_id: string;
};

export default function ShowSelector({
  podcaster_id,
  show_id,
}: ShowSelectorProps) {
  const [open, setOpen] = useState(false);
  const [preDebouncedValue, setDebouncedValue] = useState("");
  const [debouncedValue] = useDebounce(preDebouncedValue, 750);
  const { isIntersecting, ref } = useIntersectionObserver({
    threshold: 0,
  });

  const router = useRouter();
  const searchParams = useSearchParams();
  const t = useTranslations("Index");
  const locale = useLocale();
  const dir = getDirection(locale);

  const {
    isPending,
    isError,
    error,
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ["selectAnalyticsShow", debouncedValue, podcaster_id],
    queryFn: ({ pageParam }) =>
      getPlayListsByPodcasterAction({
        count: "30",
        podcasterId: podcaster_id,
        page: pageParam.toString(),
        type: "company",
        search: debouncedValue,
      }),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      if (lastPage.pagination.next_page_url) {
        return lastPage.pagination.current_page + 1;
      }
      return undefined;
    },
  });

  useEffect(() => {
    if (!isFetchingNextPage && hasNextPage && isIntersecting) {
      fetchNextPage();
    }
  }, [isFetchingNextPage, hasNextPage, isIntersecting, fetchNextPage]);

  const handleShowSelect = (selectedShowId: string) => {
    const params = new URLSearchParams(searchParams);
    params.set("show_id", selectedShowId);
    router.push(`?${params.toString()}`, { scroll: false });
    setOpen(false);
  };

  const selectedShow = data?.pages
    .flatMap((page) => page.playlists)
    .find((show) => show.id.toString() === show_id);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between rounded bg-background border !border-border-secondary"
        >
          {selectedShow ? selectedShow.name : t("selectShow")}
          <ChevronsUpDown className="ms-2 size-4 shrink-0 opacity-70 dark:opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent
        align="start"
        className="PopoverContent min-w-64 rounded"
        dir={dir}
      >
        <Command dir={dir}>
          <div className="flex items-center border-b border-border-secondary px-3 overflow-hidden">
            <Search className="me-2 h-4 w-4 shrink-0 opacity-70 dark:opacity-50" />
            <Input
              value={preDebouncedValue}
              onChange={(event) => setDebouncedValue(event.target.value)}
              placeholder={t("searchShow")}
              className="flex h-11 w-full rounded-md bg-transparent py-3 text-sm outline-none border-transparent dark:border-transparent placeholder:text-muted-foreground disabled:cursor-not-allowed focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-transparent focus-visible:ring-offset-0 focus-visible:border-transparent disabled:opacity-50"
            />
          </div>
          <CommandList>
            <CommandGroup>
              <ScrollArea className="h-[292px]" dir={dir}>
                {isPending ? (
                  <CommandEmpty>{t("loading")}</CommandEmpty>
                ) : isError ? (
                  <CommandEmpty>
                    {error instanceof Error
                      ? error.message
                      : "An error occurred"}
                  </CommandEmpty>
                ) : data?.pages[0].playlists.length === 0 ? (
                  <CommandEmpty>{t("noShowFound")}</CommandEmpty>
                ) : (
                  data?.pages.map((page) =>
                    page.playlists.map((show) => (
                      <CommandItem
                        key={show.id}
                        value={show.id.toString()}
                        onSelect={handleShowSelect}
                      >
                        <div className="flex justify-start items-center gap-2">
                          <Avatar className="size-6">
                            <AvatarImage
                              src={show.image}
                              alt={show.name}
                              className="object-cover"
                            />
                            <AvatarFallback className="bg-greeny_lighter text-[10px] text-black font-bold">
                              {show.name.slice(0, 2).toUpperCase()}
                            </AvatarFallback>
                          </Avatar>
                          <p>{show.name}</p>
                        </div>
                        <CheckIcon
                          className={cn(
                            "ms-auto h-4 w-4",
                            show_id === show.id.toString()
                              ? "opacity-100"
                              : "opacity-0"
                          )}
                        />
                      </CommandItem>
                    ))
                  )
                )}
                <div
                  ref={ref}
                  className="col-span-1 mt-1 flex items-center justify-center sm:col-span-2 md:col-span-3 lg:col-span-4"
                >
                  {isFetchingNextPage && <Loader />}
                  <span className="sr-only">Loading...</span>
                </div>
              </ScrollArea>
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
