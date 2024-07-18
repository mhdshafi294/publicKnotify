"use client";
import { cn } from "@/lib/utils";
import { CheckIcon, ChevronsUpDown, Search } from "lucide-react";
import { Dispatch, FC, SetStateAction, useEffect, useState } from "react";
import { Button } from "./ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandList,
} from "./ui/command";
import { Input } from "./ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Avatar, AvatarFallback } from "./ui/avatar";
import { AvatarImage } from "@radix-ui/react-avatar";
import { useDebounce } from "use-debounce";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useIntersectionObserver } from "@/hooks/use-intersection-observer";
import { ScrollArea } from "./ui/scroll-area";
import Loader from "./ui/loader";
import { getPlayListsAction } from "@/app/actions/podcastActions";

type PropsType = {
  value?: string;
  setValue: Dispatch<SetStateAction<string>>;
};

const SelectPlayList: FC<PropsType> = ({ value, setValue }) => {
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
      } else {
        undefined;
      }
    },
  });

  useEffect(() => {
    if (!isFetchingNextPage && hasNextPage && isIntersecting) {
      fetchNextPage();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isFetchingNextPage, hasNextPage, isIntersecting]);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between rounded-lg bg-background"
        >
          {value
            ? data?.pages
                .map((page) => page.playlists)
                .flat()
                .find((client) => client.id.toString() === value)?.name
            : `${"Select playlist"}`}
          <ChevronsUpDown className="ml-2 size-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80 p-0">
        <Command>
          <div className="flex items-center border-b px-3 overflow-hidden">
            <Search className="mr-2 h-4 w-4 shrink-0 opacity-50" />
            <Input
              defaultValue={debouncedValue}
              onChange={(event) => setDebouncedValue(event.target.value)}
              placeholder="search user"
              className="flex h-11 w-full rounded-md bg-transparent py-3 text-sm outline-none border-transparent placeholder:text-muted-foreground disabled:cursor-not-allowed focus-visible:ring-0 focus-visible:border-transparent disabled:opacity-50"
            />
          </div>
          <CommandList>
            <CommandGroup>
              <ScrollArea className="h-[292px]">
                {isPending ? (
                  <CommandEmpty>{"global.loading"}</CommandEmpty>
                ) : isError ? (
                  <CommandEmpty>
                    {error.name}
                    {error.message}
                  </CommandEmpty>
                ) : data.pages[0].playlists.length === 0 ? (
                  <CommandEmpty>{"global.no-user-found"}</CommandEmpty>
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
                            "ml-auto h-4 w-4",
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
              </ScrollArea>
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

export default SelectPlayList;
