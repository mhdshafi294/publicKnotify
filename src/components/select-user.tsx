import useGetClientsWithoutSearchParams from "@/features/clients/hooks/use-get-client-without-search-params";
import { cn } from "@/lib/utils";
import { CheckIcon, ChevronsUpDown, Search } from "lucide-react";
import { Dispatch, FC, SetStateAction, useState } from "react";
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

type PropsType = {
  value: string;
  setValue: Dispatch<SetStateAction<string>>;
};

const SelectUser: FC<PropsType> = ({ value, setValue }) => {
  const [open, setOpen] = useState(false);
  const [preDebouncedValue, setDebouncedValue] = useState("");
  const [debouncedValue] = useDebounce(preDebouncedValue, 750);
  const { data, isPending, isError, isFetching } =
    useGetClientsWithoutSearchParams(debouncedValue);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between rounded-lg"
        >
          {value
            ? data?.users.find((client) => client.id.toString() === value)
                ?.name || `${t("global.select-client")}`
            : `${t("global.select-client")}`}
          <ChevronsUpDown className="ml-2 size-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent dir={dir} className="w-80 p-0">
        <Command>
          <div className="flex items-center border-b px-3">
            <Search className="mr-2 h-4 w-4 shrink-0 opacity-50" />
            <Input
              defaultValue={debouncedValue}
              onChange={(event) => setDebouncedValue(event.target.value)}
              placeholder={t("global.search-user")}
              className="flex h-11 w-full rounded-md bg-transparent py-3 text-sm outline-none border-transparent placeholder:text-muted-foreground disabled:cursor-not-allowed focus-visible:ring-0 focus-visible:border-transparent disabled:opacity-50"
            />
          </div>
          <CommandList>
            <CommandGroup>
              {isPending ? (
                <CommandEmpty>{t("global.loading")}</CommandEmpty>
              ) : isFetching ? (
                <CommandEmpty>{t("global.loading")}</CommandEmpty>
              ) : isError ? (
                <CommandEmpty>{t("global.error")}</CommandEmpty>
              ) : data.users.length === 0 ? (
                <CommandEmpty>{t("global.no-user-found")}</CommandEmpty>
              ) : (
                data.users.map((client) => (
                  <CommandItem
                    key={client.id}
                    value={client.id.toString()}
                    onSelect={(currentValue) => {
                      setValue(
                        data.users
                          .find((user) => user.id.toString() === currentValue)
                          ?.id.toString() === value
                          ? ""
                          : data.users
                              .find(
                                (user) => user.id.toString() === currentValue
                              )!
                              .id.toString()
                      );
                      setOpen(false);
                    }}
                  >
                    <div className="flex justify-start items-center gap-2">
                      <Avatar className="size-8">
                        <AvatarImage src={client.image} alt={client.name} />
                        <AvatarFallback>
                          {client.name.slice(0, 2).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <p>{client.name}</p>
                    </div>
                    <CheckIcon
                      className={cn(
                        "ml-auto h-4 w-4",
                        value === client.id.toString()
                          ? "opacity-100"
                          : "opacity-0"
                      )}
                    />
                  </CommandItem>
                ))
              )}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

export default SelectUser;
