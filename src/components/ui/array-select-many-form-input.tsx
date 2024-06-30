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

function ArraySelectManyFormInput<T extends FieldValues>({
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
                    <svg
                      aria-hidden="true"
                      className="size-6 animate-spin fill-greeny text-gray-200 dark:text-gray-600"
                      viewBox="0 0 100 101"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                        fill="currentColor"
                      />
                      <path
                        d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                        fill="currentFill"
                      />
                    </svg>
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

export default ArraySelectManyFormInput;
