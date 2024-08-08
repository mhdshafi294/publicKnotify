import { cn } from "@/lib/utils";
import { Check } from "lucide-react";
import { Key, useState } from "react";
import { FieldPath, FieldValues, UseFormReturn } from "react-hook-form";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "./ui/command";
import { ChevronDown } from "lucide-react";
import { FormField, FormItem, FormLabel, FormMessage } from "./ui/form";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Skeleton } from "./ui/skeleton";

interface MultiSelectPopoverProps<
  TItem extends { [key: string]: string | number },
  TFormValues extends FieldValues = FieldValues,
  TFieldName extends FieldPath<TFormValues> = FieldPath<TFormValues>
> {
  items: TItem[];
  itemIdKey: keyof TItem;
  itemNameKey: keyof TItem;
  isPending: boolean;
  isError: boolean;
  form: UseFormReturn<TFormValues>;
  formFieldName: TFieldName;
  label: string;
  disabled?: boolean;
}

function MultiSelectPopover<
  TItem extends { [key: string]: string | number },
  TFormValues extends FieldValues = FieldValues,
  TFieldName extends FieldPath<TFormValues> = FieldPath<TFormValues>
>({
  items,
  itemIdKey,
  itemNameKey,
  isPending,
  isError,
  form,
  formFieldName,
  label,
  disabled = false,
}: MultiSelectPopoverProps<TItem, TFormValues, TFieldName>) {
  const [selectAll, setSelectAll] = useState(false);
  if (isPending)
    return (
      <div className="mt-2">
        <h2 className="text-sm pb-3 text-primary">categories</h2>
        <Skeleton className="w-full h-9 bg-secondary" />
      </div>
    );
  if (isError)
    return (
      <div className="mt-2">
        <h2 className="text-sm pb-3 text-primary">categories</h2>
        <Button
          variant="outline"
          disabled
          className={cn("w-full min-h-9 justify-between rounded-lg h-9")}
        >
          something went wrong
        </Button>
      </div>
    );
  return (
    <FormField
      control={form.control}
      name={formFieldName}
      render={({ field }) => (
        <FormItem className="w-full">
          <FormLabel className="capitalize w-full text-lg">{label}</FormLabel>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                type="button"
                variant="secondary"
                disabled={isPending || isError || disabled}
                className="w-full flex border border-input hover:bg-input bg-input justify-between mb-2 rounded-md flex-wrap min-h-10 h-fit gap-1"
              >
                <div className="flex gap-2">
                  {form.getValues(formFieldName).length > 0 ? (
                    form.getValues(formFieldName).length <= 2 ? (
                      form
                        .getValues(formFieldName)
                        .map((item: Key | null | undefined) => (
                          <Badge
                            variant={"outline"}
                            key={item}
                            className="font-normal m-0 py-px"
                          >
                            {items.find(
                              (d) =>
                                d[itemIdKey].toString() === item?.toString()
                            )?.[itemNameKey] || ""}
                          </Badge>
                        ))
                    ) : (
                      <Badge
                        variant={"outline"}
                        className="font-normal py-px m-0"
                      >
                        {`${form.getValues(formFieldName).length} selected`}
                      </Badge>
                    )
                  ) : (
                    ``
                  )}
                </div>
                <ChevronDown className="h-4 w-4" />
              </Button>
            </PopoverTrigger>
            <PopoverContent side="bottom" className="p-0 w-full">
              <Command
                filter={(value, search) => {
                  const object = items.find(
                    (d) => d[itemIdKey].toString() === value
                  );
                  if (object)
                    return (object[itemNameKey] as string)
                      .toLowerCase()
                      .includes(search.toLowerCase())
                      ? 1
                      : 0;
                  return 0;
                }}
              >
                <CommandInput className="px-0" placeholder="Search..." />
                <CommandEmpty>No items found.</CommandEmpty>
                <CommandGroup className="p-0">
                  <CommandList className="max-h-[300px] p-0 overflow-y-auto">
                    {items.map((item) => (
                      <CommandItem
                        value={item[itemIdKey].toString()}
                        key={item[itemIdKey]}
                        onSelect={(currentValue: string) => {
                          const selectedValues = form.getValues(formFieldName);
                          const isSelected =
                            selectedValues.includes(currentValue);

                          field.onChange(
                            isSelected
                              ? selectedValues.filter(
                                  (v: string) => v !== currentValue
                                )
                              : [...selectedValues, currentValue]
                          );
                        }}
                      >
                        <Check
                          className={cn(
                            "me-2 size-4 p-0.5 rounded-full border",
                            form
                              .getValues(formFieldName)
                              .includes(item[itemIdKey].toString())
                              ? "text-background text-white"
                              : "text-transparent"
                          )}
                        />
                        <span className="flex flex-1 justify-between items-center gap-1">
                          {item[itemNameKey]}
                        </span>
                      </CommandItem>
                    ))}
                  </CommandList>
                </CommandGroup>
              </Command>
            </PopoverContent>
          </Popover>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}

export default MultiSelectPopover;
