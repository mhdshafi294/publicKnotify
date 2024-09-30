"use client";
import { cn, getDirection } from "@/lib/utils";
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
import { useIntersectionObserver } from "@/hooks/useIntersectionObserver";
import { ScrollArea } from "./ui/scroll-area";
import Loader from "./ui/loader";
import { useLocale, useTranslations } from "next-intl";
import { getRequestsAction } from "@/app/actions/requestsActions";

type PropsType = {
  value: string;
  setValue: Dispatch<SetStateAction<string>>;
  disabled?: boolean;
};

const SelectRequest: FC<PropsType> = ({ value, setValue, disabled }) => {
  const [open, setOpen] = useState(false);
  const [preDebouncedValue, setDebouncedValue] = useState("");
  const [debouncedValue] = useDebounce(preDebouncedValue, 750);
  const { isIntersecting, ref } = useIntersectionObserver({
    threshold: 0,
  });

  const t = useTranslations("Index");

  const {
    isPending,
    isError,
    error,
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ["selectRequest", debouncedValue],
    queryFn: ({ pageParam }) =>
      getRequestsAction({
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

  const locale = useLocale();
  const dir = getDirection(locale);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between rounded bg-background"
          disabled={disabled}
        >
          {value
            ? data?.pages
                .map((page) => page.requests)
                .flat()
                .find((client) => client.id.toString() === value)?.name
            : t("selectrequest")}
          <ChevronsUpDown className="size-4 shrink-0 opacity-70 dark:opacity-50 justify-self-end ms-auto" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80" dir={dir}>
        <Command dir={dir}>
          <div className="flex items-center border-b px-3 overflow-hidden">
            <Search className="me-2 h-4 w-4 shrink-0 opacity-70 dark:opacity-50" />
            <Input
              defaultValue={debouncedValue}
              onChange={(event) => setDebouncedValue(event.target.value)}
              placeholder={t("searchUser")}
              className="flex h-11 w-full rounded-md bg-transparent py-3 text-sm outline-none  dark:border-transparent border-transparent placeholder:text-muted-foreground disabled:cursor-not-allowed focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-transparent focus-visible:ring-offset-0 focus-visible:border-transparent disabled:opacity-50"
            />
          </div>
          <CommandList>
            <CommandGroup>
              <ScrollArea className="h-[292px]" dir={dir}>
                {isPending ? (
                  <CommandEmpty>{t("loading")}</CommandEmpty>
                ) : isError ? (
                  <CommandEmpty>
                    {error.name}
                    {error.message}
                  </CommandEmpty>
                ) : data.pages[0].requests.length === 0 ? (
                  <CommandEmpty>{t("noUserFound")}</CommandEmpty>
                ) : (
                  data?.pages.map((page) =>
                    page?.requests.map((request) => (
                      <CommandItem
                        key={request.id}
                        value={request.id.toString()}
                        onSelect={(currentValue) => {
                          setValue(
                            page?.requests
                              .find(
                                (request) =>
                                  request.id.toString() === currentValue
                              )
                              ?.id.toString() === value
                              ? ""
                              : page?.requests
                                  .find(
                                    (request) =>
                                      request.id.toString() === currentValue
                                  )!
                                  .id.toString()
                          );
                          setOpen(false);
                        }}
                      >
                        <div className="flex justify-start items-center gap-2">
                          <Avatar className="size-6">
                            <AvatarImage
                              src={request.name}
                              alt={request.name}
                              className="object-cover"
                            />
                            <AvatarFallback className="bg-greeny_lighter text-[10px] text-black font-bold">
                              {request.name.slice(0, 2).toUpperCase()}
                            </AvatarFallback>
                          </Avatar>
                          <p>{request.name}</p>
                          <p className="text-sm text-muted-foreground">
                            {request.id}
                          </p>
                        </div>
                        <CheckIcon
                          className={cn(
                            "ms-auto h-4 w-4",
                            value === request.id.toString()
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

export default SelectRequest;
