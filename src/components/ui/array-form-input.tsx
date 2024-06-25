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

interface PropsType<T extends FieldValues>
  extends Omit<ComponentPropsWithoutRef<"input">, "name"> {
  name: keyof T;
  className?: string;
  label: string;
  labelClassName?: string | undefined;
  control: Control<T>;
}

function ArrayFormInput<T extends FieldValues>({
  control,
  name,
  className,
  label,
  labelClassName,
  ...props
}: PropsType<T>) {
  const { setValue } = useFormContext();
  const [items, setItems] = useState<string[]>([]);

  const createNewCategory = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === " ") {
      const createdCategory = event.currentTarget.value;
      setItems((prev) => {
        if (!prev.includes(createdCategory)) {
          return [...prev, createdCategory];
        } else {
          return prev;
        }
      });
      event.currentTarget.value = "";

      setValue(name.toString(), items);
    } else return;
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
              <Input
                onKeyDown={createNewCategory}
                placeholder={`# ${name.toString()}, press SPACE to add`}
                className={cn("w-20", className)}
              />
              <ScrollArea className="w-full whitespace-nowrap mt-3">
                <div className="flex gap-2 pb-2">
                  <ScrollBar orientation="horizontal" className="h-1.5" />
                  {items.map((item, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-center bg-greeny text-black rounded-lg text-sm py-1 px-3 h-7 font-semibold"
                    >
                      #{item}
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </div>
          </FormControl>
          <FormMessage className="capitalize font-normal" />
        </FormItem>
      )}
    />
  );
}

export default ArrayFormInput;
