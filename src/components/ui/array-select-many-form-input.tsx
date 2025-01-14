"use client";

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { cn, getDirection } from "@/lib/utils";
import { CategoryDetails } from "@/types/podcast";
import { useQuery } from "@tanstack/react-query";
import { useLocale } from "next-intl";
import { useSearchParams } from "next/navigation";
import { ComponentPropsWithoutRef, useEffect, useRef, useState } from "react";
import {
  Control,
  FieldValues,
  useFormContext,
  useFormState,
} from "react-hook-form";
import Loader from "./loader";

interface PropsType<T extends FieldValues>
  extends Omit<ComponentPropsWithoutRef<"input">, "name"> {
  name: keyof T;
  action: () => Promise<CategoryDetails[]>;
  className?: string;
  label: string;
  labelClassName?: string | undefined;
  control: Control<T>;
  defaultValues: Partial<T>;
}

function ArraySelectManyFormInput<T extends FieldValues>({
  control,
  name,
  action,
  className: className,
  label,
  labelClassName,
  defaultValues,
  ...props
}: PropsType<T>) {
  const { setValue, setFocus } = useFormContext();
  const [selectedItems, setSelectedItems] = useState<string[]>(
    (defaultValues[name] as string[]) || []
  );
  const searchParams = useSearchParams();
  const podcast_id = searchParams.get("podcast_id");

  const fieldRef = useRef<HTMLDivElement | null>(null); // Ref for the field
  const { errors } = useFormState(); // Get the validation errors

  useEffect(() => {
    setSelectedItems((defaultValues[name] as string[]) || []);
  }, [defaultValues, name]);

  useEffect(() => {
    setValue(name.toString(), selectedItems);
  }, [selectedItems, name, setValue]);

  useEffect(() => {
    if (errors[name as keyof FieldValues]) {
      fieldRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
      setFocus(name.toString());
    }
  }, [errors, name, setFocus]);

  const {
    data: categories,
    isPending: isCategoriesPending,
    isError: isCategoriesError,
    error: categoriesError,
  } = useQuery({
    queryKey: ["categories", podcast_id],
    queryFn: () => action(),
  });

  const handleToggle = (item: string) => {
    setSelectedItems((prevSelectedItems) =>
      prevSelectedItems.includes(item)
        ? prevSelectedItems.filter((i) => i !== item)
        : [...prevSelectedItems, item]
    );
  };

  const locale = useLocale();
  const dir = getDirection(locale);

  return (
    <FormField
      control={control as Control<FieldValues>}
      name={name.toString()}
      render={({ field }) => (
        <FormItem className="w-full" dir={dir} ref={fieldRef}>
          <FormLabel className={cn("capitalize text-lg", labelClassName)}>
            {label}
          </FormLabel>
          <FormControl>
            <div>
              <ScrollArea className="max-h-28" dir={dir}>
                <ToggleGroup
                  dir={dir}
                  type="multiple"
                  className="mt-2 flex-wrap justify-start"
                  size={"sm"}
                >
                  {isCategoriesPending ? (
                    <Loader variant={"dots"} className="text-greeny" />
                  ) : isCategoriesError ? (
                    <div>{categoriesError.message}</div>
                  ) : (
                    categories?.map((category) => (
                      <ToggleGroupItem
                        key={category?.id}
                        value={category?.id.toString()}
                        onClick={() => handleToggle(category?.id.toString())}
                        data-state={
                          selectedItems.includes(category?.id.toString())
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
                <ScrollBar orientation="horizontal" />
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
