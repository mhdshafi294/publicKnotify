"use client";

import { Control, FieldValues, useFormContext } from "react-hook-form";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./form";
import { Input } from "./input";
import {
  ComponentPropsWithoutRef,
  ElementRef,
  LegacyRef,
  useEffect,
  useRef,
  useState,
} from "react";
import { cn, getDirection } from "@/lib/utils";
import { ScrollArea, ScrollBar } from "./scroll-area";
import { Plus, Trash, X } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { Button } from "./button";
import { undefined } from "zod";

interface PropsType<T extends FieldValues>
  extends Omit<ComponentPropsWithoutRef<"input">, "name"> {
  name: keyof T;
  className?: string;
  label: string;
  labelClassName?: string | undefined;
  control: Control<T>;
  description?: string;
  defaultValues: Partial<T>;
}

function ArrayFormInput<T extends FieldValues>({
  control,
  name,
  className: className,
  label,
  labelClassName,
  defaultValues,
  description = "",
  ...props
}: PropsType<T>) {
  const { setValue, getValues } = useFormContext();
  const [items, setItems] = useState<string[]>(
    (defaultValues[name] as string[]) || []
  );
  // const [inputCurrentValue, setInputCurrentValue] = useState("");

  const inputRef = useRef<HTMLInputElement | null>(null);

  const t = useTranslations("Index");

  useEffect(() => {
    setItems((defaultValues[name] as string[]) || []);
  }, [defaultValues, name]);

  useEffect(() => {
    setValue(name.toString(), items);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [items]);

  const createNewCategory = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === " " && event.currentTarget.value.trim() !== "") {
      const createdCategory = event.currentTarget.value.trim();
      setItems((prev) => {
        if (!prev.includes(createdCategory.trim())) {
          return [...prev, createdCategory.trim()];
        } else {
          return prev;
        }
      });
      event.currentTarget.value = "";
    } else return;
  };

  const locale = useLocale();
  const dir = getDirection(locale);

  return (
    <FormField
      control={control as Control<FieldValues>}
      name={name.toString()}
      render={({ field }) => (
        <FormItem className="w-full" dir={dir}>
          <FormLabel className={cn("capitalize text-lg", labelClassName)}>
            {label}
          </FormLabel>
          <FormControl>
            <div className="flex justify-start flex-col gap-3 items-start">
              <div className="w-full flex items-stretch gap-2">
                <Input
                  onKeyDown={createNewCategory}
                  placeholder={t("placeholder", { name: name.toString() })}
                  className={cn("w-full", className)}
                  ref={inputRef}
                  // onChange={(e) => {
                  //   setInputCurrentValue(e.target.value);
                  // }}
                />
                <Button
                  variant="default"
                  size={"default"}
                  className="px-8"
                  type="button"
                  onClick={() => {
                    if (
                      inputRef &&
                      typeof inputRef?.current?.value === "string" &&
                      inputRef?.current?.value.trim() !== ""
                    ) {
                      setItems((prev) => {
                        const createdCategory = inputRef.current?.value.trim();
                        if (!prev.includes(createdCategory!.trim())) {
                          return [...prev, createdCategory!.trim()];
                        } else {
                          return prev;
                        }
                      });
                      inputRef.current.value = "";
                    }
                  }}
                >
                  Add
                </Button>
              </div>
              {description ? (
                <FormDescription>{description}</FormDescription>
              ) : null}
              {items.length > 0 ? (
                <ScrollArea className="w-full whitespace-nowrap mt-3">
                  <div className="flex gap-2 pb-2">
                    {items.map((item, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-center gap-1 relative group bg-greeny text-black rounded-sm text-xs ps-2 h-6 font-semibold overflow-hidden"
                      >
                        {/* <span
                        className="absolute w-full h-full bg-red-500 top-0 left-0 hidden group-hover:flex text-white justify-center items-center"
                        aria-hidden
                      >
                        <Trash size={18} />
                      </span> */}
                        {item}
                        <span
                          className="py-1 px-1.5 cursor-pointer h-full flex items-center justify-center"
                          onClick={() => {
                            setItems((prev) => prev.filter((i) => i !== item));
                          }}
                        >
                          <X size={12} />
                        </span>
                      </div>
                    ))}
                    <ScrollBar orientation="horizontal" className="h-1.5" />
                  </div>
                </ScrollArea>
              ) : null}
            </div>
          </FormControl>

          <FormMessage className="capitalize font-normal" />
        </FormItem>
      )}
    />
  );
}

export default ArrayFormInput;
