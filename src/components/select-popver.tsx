"use client";
import { cn } from "@/lib/utils";
import { Check } from "lucide-react";
import { FieldPath, FieldValues, UseFormReturn } from "react-hook-form";
import { Button } from "./ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "./ui/command";
import { FormField, FormItem, FormLabel, FormMessage } from "./ui/form";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { useState } from "react";
import { useTranslations } from "next-intl";

interface SelectPopoverProps<
  TItem extends { [key: string]: string | number },
  TFormValues extends FieldValues = FieldValues,
  TFieldName extends FieldPath<TFormValues> = FieldPath<TFormValues>
> {
  items: TItem[];
  itemIdKey: keyof TItem;
  itemNameKey: keyof TItem;
  isPending?: boolean;
  isError?: boolean;
  placeholder?: string;
  form: UseFormReturn<TFormValues>;
  formFieldName: TFieldName;
  label: string;
  disabled?: boolean;
  onSelect?: () => void;
}

function SelectPopover<
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
  placeholder,
  formFieldName,
  disabled,
  label,
  onSelect = () => {},
}: SelectPopoverProps<TItem, TFormValues, TFieldName>) {
  const [isOpen, setIsOpen] = useState(false);
  const t = useTranslations("Index");

  if (isPending)
    return (
      <div className="w-full space-y-2">
        <h2 className="text-sm font-medium leading-none">{label}</h2>
        <Button
          type="button"
          variant="outline"
          disabled
          className="w-full hover:bg-background capitalize justify-start mb-2 rounded-md min-h-10 flex-wrap h-fit gap-1"
        >
          {`Select ${label}`}
        </Button>
      </div>
    );

  if (isError)
    return (
      <div className="w-full space-y-2">
        <h2 className="text-sm">{label}</h2>
        <Button
          type="button"
          variant="outline"
          disabled
          className="w-full hover:bg-background capitalize justify-start mb-2 rounded-md min-h-10 flex-wrap h-fit gap-1"
        >
          {t("something-went-wrong")}
        </Button>
      </div>
    );

  return (
    <FormField
      control={form.control}
      name={formFieldName}
      render={({ field }) => (
        <FormItem className="w-full">
          <FormLabel>{label}</FormLabel>
          <Popover open={isOpen} onOpenChange={setIsOpen}>
            <PopoverTrigger asChild>
              <Button
                type="button"
                variant="outline"
                disabled={isPending || isError || disabled}
                className="w-full hover:bg-transparent hover:text-current capitalize justify-start mb-2 rounded-md min-h-10 flex-wrap h-fit gap-1"
              >
                {!placeholder
                  ? form.getValues(formFieldName)
                    ? items.find(
                        (item) =>
                          (item[itemIdKey] as number).toString() ===
                          form.getValues(formFieldName)
                      )?.[itemNameKey]
                    : `Select ${label}`
                  : placeholder}
              </Button>
            </PopoverTrigger>
            <PopoverContent
              side="bottom"
              sideOffset={0}
              className="p-1 PopoverContent"
            >
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
                <CommandInput placeholder="Search..." />
                <CommandEmpty>No items found.</CommandEmpty>
                <CommandGroup className="p-0">
                  <CommandList className="max-h-[300px] overflow-y-auto">
                    {items.map((item) => (
                      <CommandItem
                        value={item[itemIdKey].toString()}
                        key={item[itemIdKey]}
                        onSelect={(currentValue) => {
                          if (form.getValues(formFieldName)) {
                            if (form.getValues(formFieldName) === currentValue)
                              field.onChange("");
                            else field.onChange(currentValue);
                          } else field.onChange(currentValue);
                          onSelect();
                          setIsOpen(false);
                        }}
                      >
                        <Check
                          className={cn(
                            "mr-2 size-4 rounded border",
                            form.getValues(formFieldName) == item[itemIdKey]
                              ? "bg-primary border-primary text-background"
                              : "text-transparent"
                          )}
                        />
                        <span className="flex flex-1 capitalize justify-between items-center gap-1">
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

export default SelectPopover;
