"use client";
import { cn, getDirection } from "@/lib/utils";
import { CheckIcon, ChevronsUpDown, Search } from "lucide-react";
import {
  Dispatch,
  FC,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from "react";

import { AvatarImage } from "@radix-ui/react-avatar";
import { useDebounce } from "use-debounce";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useIntersectionObserver } from "@/hooks/useIntersectionObserver";

import { useLocale, useTranslations } from "next-intl";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import Loader from "@/components/ui/loader";
import { Input } from "@/components/ui/input";
import { useRouter, useSearchParams } from "next/navigation";
import { useSession } from "next-auth/react";
import { getCompaniesAction } from "@/app/actions/companyActions";

// type PropsType = {
//   value: string;
//   setValue: Dispatch<SetStateAction<string>>;
// };

const SelectCompanyFilter = () => {
  const [open, setOpen] = useState(false);
  const initialRender = useRef(true);
  const router = useRouter();
  const searchParams = useSearchParams();
  const { data: session } = useSession();
  const t = useTranslations("Index");
  const [preDebouncedValue, setDebouncedValue] = useState(
    searchParams?.get("company_id") || ""
  );
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
    queryKey: ["selectcompanies"],
    queryFn: ({ pageParam }) =>
      getCompaniesAction({
        count: "30",
        page: pageParam.toString(),
        type: "company",
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

  /**
   * Effect that updates the URL parameters based on the selected filter.
   * It triggers whenever the `filter` state changes, except on the initial render.
   */
  useEffect(() => {
    if (initialRender.current) {
      initialRender.current = false;
      return;
    }

    const params = new URLSearchParams(searchParams.toString());
    if (debouncedValue) {
      params.set("company_id", debouncedValue);
    } else {
      params.delete("company_id");
    }
    router.push(`requests?${params.toString()}`);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedValue]);

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
          className="w-full md:w-fit justify-between rounded-lg bg-background"
        >
          {debouncedValue
            ? data?.pages
                .map((page) => page.companies)
                .flat()
                .find((client) => client.id.toString() === debouncedValue)
                ?.full_name
            : t("selectcompany")}
          <ChevronsUpDown className="ms-2 size-4 shrink-0 opacity-70 dark:opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80 p-0" dir={dir}>
        <Command dir={dir}>
          <div className="flex items-center border-b px-3 overflow-hidden">
            <Search className="me-2 h-4 w-4 shrink-0 opacity-70 dark:opacity-50" />
            <Input
              defaultValue={debouncedValue}
              onChange={(event) => setDebouncedValue(event.target.value)}
              placeholder={t("searchUser")}
              className="flex h-11 w-full rounded-md bg-transparent py-3 text-sm outline-none border-transparent placeholder:text-muted-foreground disabled:cursor-not-allowed focus-visible:ring-0 focus-visible:border-transparent disabled:opacity-50"
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
                ) : data.pages[0].companies.length === 0 ? (
                  <CommandEmpty>{t("noUserFound")}</CommandEmpty>
                ) : (
                  data?.pages.map((page) =>
                    page?.companies.map((company) => (
                      <CommandItem
                        key={company.id}
                        value={company.id.toString()}
                        onSelect={(currentValue) => {
                          setDebouncedValue(
                            page?.companies
                              .find(
                                (company) =>
                                  company.id.toString() === currentValue
                              )
                              ?.id.toString() === debouncedValue
                              ? ""
                              : page?.companies
                                  .find(
                                    (company) =>
                                      company.id.toString() === currentValue
                                  )!
                                  .id.toString()
                          );
                          setOpen(false);
                        }}
                      >
                        <div className="flex justify-start items-center gap-2">
                          <Avatar className="size-6">
                            <AvatarImage
                              src={company.image}
                              alt={company.full_name}
                              className="object-cover"
                            />
                            <AvatarFallback className="bg-greeny_lighter text-[10px] text-black font-bold">
                              {company.full_name.slice(0, 2).toUpperCase()}
                            </AvatarFallback>
                          </Avatar>
                          <p>{company.full_name}</p>
                        </div>
                        <CheckIcon
                          className={cn(
                            "ms-auto h-4 w-4",
                            debouncedValue === company.id.toString()
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

export default SelectCompanyFilter;
