"use client";

import { Control, FieldValues, useFormContext } from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./form";
import { Input } from "./input";
import { ComponentPropsWithoutRef, useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { ScrollArea, ScrollBar } from "./scroll-area";
import { Category, CategoryDetails } from "@/types/podcast";
import { useQuery } from "@tanstack/react-query";
import { ToggleGroup, ToggleGroupItem } from "./toggle-group";

interface PropsType<T extends FieldValues>
  extends Omit<ComponentPropsWithoutRef<"input">, "name"> {
  name: keyof T;
  action: Promise<CategoryDetails[]>;
  className?: string;
  label: string;
  labelClassName?: string | undefined;
  control: Control<T>;
}

function ArraySelectFormInput<T extends FieldValues>({
  control,
  name,
  action,
  className,
  label,
  labelClassName,
  ...props
}: PropsType<T>) {
  const { setValue, getValues } = useFormContext();
  const [selectedItems, setSelectedItems] = useState<string[]>([]);

  useEffect(() => {
    setValue(name.toString(), selectedItems);
    // console.log(items, getValues(name as string));
  }, [selectedItems]);

  const {
    data: categories,
    isPending: isCategoriesPending,
    isError: isCategoriesError,
  } = useQuery({
    queryKey: ["categories"],
    queryFn: () => action,
  });

  const handleToggle = (item: string) => {
    setSelectedItems((prevSelectedItems) =>
      prevSelectedItems.includes(item)
        ? prevSelectedItems.filter((i) => i !== item)
        : [...prevSelectedItems, item]
    );
  };

  return (
    <FormField
      control={control as Control<FieldValues>}
      name={name.toString()}
      render={({ field }) => (
        <FormItem className="w-full">
          <FormLabel className={cn("capitalize text-lg", labelClassName)}>
            {label}
          </FormLabel>
          <FormControl>
            <div>
              <ScrollArea className="max-h-28">
                <ToggleGroup
                  type="multiple"
                  className="mt-2 flex-wrap justify-start"
                  size={"sm"}
                >
                  {isCategoriesPending ? (
                    <div>Loading...</div>
                  ) : isCategoriesError ? (
                    <div>Error</div>
                  ) : (
                    categories.map((category, index: number) => (
                      <ToggleGroupItem
                        key={index}
                        value={category.id.toString()}
                        onClick={() => handleToggle(category.id.toString())}
                        data-state={
                          selectedItems.includes(category.id.toString())
                            ? "on"
                            : "off"
                        }
                        className={cn(
                          ` h-7 bg-greeny/20 hover:bg-greeny/40 hover:text-white/80 data-[state=on]:bg-greeny data-[state=on]:hover:bg-greeny/75 data-[state=on]:text-background data-[state=on]:hover:text-background data-[state=on]:font-semibold`
                        )}
                      >
                        <span>{category.name}</span>
                      </ToggleGroupItem>
                    ))
                  )}
                </ToggleGroup>
              </ScrollArea>
            </div>
          </FormControl>
          <FormMessage className="capitalize font-normal" />
        </FormItem>
      )}
    />
  );
}

export default ArraySelectFormInput;
