"use client";

import { cn, getDirection } from "@/lib/utils";
import { BadgeInfoIcon, X } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { ComponentPropsWithoutRef, useEffect, useRef, useState } from "react";
import {
  Control,
  FieldValues,
  useFormContext,
  useFormState,
} from "react-hook-form";
import { Button } from "./button";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./form";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "./hover-card";
import { Input } from "./input";
import { ScrollArea, ScrollBar } from "./scroll-area";

interface PropsType<T extends FieldValues>
  extends Omit<ComponentPropsWithoutRef<"input">, "name"> {
  name: keyof T;
  className?: string;
  label: string;
  labelClassName?: string | undefined;
  control: Control<T>;
  description?: string;
  defaultValues: Partial<T>;
  info?: string;
}

function ArrayFormInput<T extends FieldValues>({
  control,
  name,
  className: className,
  label,
  labelClassName,
  defaultValues,
  description = "",
  info,
  ...props
}: PropsType<T>) {
  const { setValue, setFocus } = useFormContext();
  const [items, setItems] = useState<string[]>(
    (defaultValues[name] as string[]) || []
  );
  const inputRef = useRef<HTMLInputElement | null>(null);
  const fieldRef = useRef<HTMLDivElement | null>(null); // Ref for the field
  const { errors } = useFormState(); // Get the validation errors

  const t = useTranslations("Index");

  useEffect(() => {
    setItems((defaultValues[name] as string[]) || []);
  }, [defaultValues, name]);

  useEffect(() => {
    setValue(name.toString(), items);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [items]);

  useEffect(() => {
    if (errors[name as keyof FieldValues]) {
      fieldRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
      setFocus(name.toString());
    }
  }, [errors, name, setFocus]);

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
        <FormItem className="w-full" dir={dir} ref={fieldRef}>
          <div className="flex items-baseline gap-2">
            <FormLabel className={cn("capitalize text-lg", labelClassName)}>
              {label}
            </FormLabel>
            {info ? (
              <HoverCard>
                <HoverCardTrigger>
                  <BadgeInfoIcon className="size-4 text-muted-foreground" />
                </HoverCardTrigger>
                <HoverCardContent className="border border-border-secondary/20 bg-card/80 text-sm">
                  {info}
                </HoverCardContent>
              </HoverCard>
            ) : null}
          </div>
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
                  {t("add")}
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

          <FormMessage className=" font-normal" />
        </FormItem>
      )}
    />
  );
}

export default ArrayFormInput;
