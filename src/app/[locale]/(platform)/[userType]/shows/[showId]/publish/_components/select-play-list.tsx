"use client";

import React, {
  Dispatch,
  FC,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import { useDebounce } from "use-debounce";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useLocale, useTranslations } from "next-intl";
import { useIntersectionObserver } from "@/hooks/useIntersectionObserver";

import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import Loader from "@/components/ui/loader";
import DrawerDialogAddNewPlaylist from "./add-playlist-drawer-dialog";

import { getPlayListsAction } from "@/app/actions/podcastActions";
import { cn, getDirection } from "@/lib/utils";

import { CheckIcon, ChevronsUpDown, Search } from "lucide-react";
import { AvatarImage } from "@radix-ui/react-avatar";
import { ScrollAreaScrollbar } from "@radix-ui/react-scroll-area";

type PropsType = {
  value?: string;
  setValue: Dispatch<SetStateAction<string>>;
};

/**
 * Component for selecting a playlist with a searchable dropdown and infinite scrolling.
 *
 * @param {PropsType} props - The properties passed to the component.
 * @returns {JSX.Element} The rendered component.
 *
 * @example
 * ```tsx
 * <SelectPlaylist value={playlistId} setValue={setPlaylistId} />
 * ```
 */
const SelectPlaylist: FC<PropsType> = ({ value, setValue }) => {
  const [open, setOpen] = useState(false);
  const [preDebouncedValue, setDebouncedValue] = useState("");
  const [debouncedValue] = useDebounce(preDebouncedValue, 750);
  const { isIntersecting, ref } = useIntersectionObserver({
    threshold: 0,
  });

  const {
    isPending,
    isError,
    error,
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ["selectplaylists"],
    queryFn: ({ pageParam }) =>
      getPlayListsAction({
        count: "30",
        page: pageParam.toString(),
        type: "podcaster",
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isFetchingNextPage, hasNextPage, isIntersecting]);

  const locale = useLocale();
  const dir = getDirection(locale);
  const t = useTranslations("Index");

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between rounded-lg bg-background"
          dir={dir}
        >
          {value
            ? data?.pages
                .flatMap((page) => page.playlists)
                .find((client) => client.id.toString() === value)?.name
            : `${t("selectPlaylist")}`}
          <ChevronsUpDown className="ms-2 size-4 shrink-0 opacity-70 dark:opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[400px] lg:w-[700px] 2xl:w-[995px] p-0 bg-card">
        <Command dir={dir}>
          <div className="flex items-center border-b px-3 overflow-hidden bg-card">
            <Search className="me-2 h-4 w-4 shrink-0 opacity-70 dark:opacity-50" />
            <Input
              defaultValue={debouncedValue}
              onChange={(event) => setDebouncedValue(event.target.value)}
              placeholder={t("searchUser")}
              className="flex h-11 w-full rounded-md bg-transparent py-3 text-sm outline-none border-transparent placeholder:text-muted-foreground disabled:cursor-not-allowed  focus-visible:border-transparent disabled:opacity-50 focus:ring-0 ring-0 focus-visible:outline-none focus:outline-none focus-visible:ring-0 focus-visible:ring-transparent focus-visible:ring-offset-0"
            />
          </div>
          <CommandList className="bg-card">
            <CommandGroup dir={dir}>
              <ScrollArea
                className="h-[172px] "
                thumbClassName="bg-background/50"
                dir={dir}
              >
                {isPending ? (
                  <CommandEmpty>
                    <Loader />
                  </CommandEmpty>
                ) : isError ? (
                  <CommandEmpty>
                    {error.name}
                    {error.message}
                  </CommandEmpty>
                ) : data.pages[0].playlists.length === 0 ? (
                  <CommandEmpty>{t("noPlaylistFound")}</CommandEmpty>
                ) : (
                  data?.pages.map((page) =>
                    page?.playlists.map((playList) => (
                      <CommandItem
                        key={playList.id}
                        value={playList.id.toString()}
                        onSelect={(currentValue) => {
                          setValue(
                            page?.playlists
                              .find(
                                (playlist) =>
                                  playlist.id.toString() === currentValue
                              )
                              ?.id.toString() === value
                              ? ""
                              : page?.playlists
                                  .find(
                                    (playlist) =>
                                      playlist.id.toString() === currentValue
                                  )!
                                  .id.toString()
                          );
                          setOpen(false);
                        }}
                      >
                        <div className="flex justify-start items-center gap-2">
                          <Avatar className="size-6">
                            <AvatarImage
                              src={playList.image}
                              alt={playList.name}
                              className="object-cover"
                            />
                            <AvatarFallback className="bg-greeny_lighter text-[10px] text-black font-bold">
                              {playList.name.slice(0, 2).toUpperCase()}
                            </AvatarFallback>
                          </Avatar>
                          <p>{playList.name}</p>
                        </div>
                        <CheckIcon
                          className={cn(
                            "ms-auto h-4 w-4",
                            value === playList.id.toString()
                              ? "opacity-100"
                              : "opacity-0"
                          )}
                        />
                      </CommandItem>
                    ))
                  )
                )}
                {/* loading spinner */}
                <div
                  ref={ref}
                  className="col-span-1 mt-1 flex items-center justify-center sm:col-span-2 md:col-span-3 lg:col-span-4"
                >
                  {isFetchingNextPage && <Loader />}
                  <span className="sr-only">Loading...</span>
                </div>
                <ScrollAreaScrollbar />
              </ScrollArea>
            </CommandGroup>
          </CommandList>
        </Command>
        <DrawerDialogAddNewPlaylist />
      </PopoverContent>
    </Popover>
  );
};

export default SelectPlaylist;
