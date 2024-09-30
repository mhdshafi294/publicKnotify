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
import { cn, getDirection } from "@/lib/utils";
import { useLocale, useTranslations } from "next-intl";

interface PricePropsType<T extends FieldValues>
  extends Omit<ComponentPropsWithoutRef<"input">, "name"> {
  name: keyof T;
  className?: string;
  FormItemClassName?: string;
  label: string;
  labelClassName?: string | undefined;
  control: Control<T>;
}

function PricePickerFormInput<T extends FieldValues>({
  control,
  name,
  className,
  FormItemClassName,
  label,
  labelClassName,
  ...props
}: PricePropsType<T>) {
  const { setValue, getValues } = useFormContext();

  // Safely handle splitting dollars and cents
  const initialValue = getValues(name as string);
  const [dollars, setDollars] = useState(initialValue?.split(".")[0] || "0");
  const [cents, setCents] = useState(initialValue?.split(".")[1] || "00");

  useEffect(() => {
    // Ensure that cents are always formatted to two decimal places
    const formattedValue = `${dollars}.${(cents || "00").padStart(2, "0")}`;
    setValue(name as string, formattedValue);
  }, [dollars, cents, setValue, name]);

  const locale = useLocale();
  const dir = getDirection(locale);
  const t = useTranslations("Index");

  return (
    <FormField
      control={control as Control<FieldValues>}
      name={name.toString()}
      render={({ field }) => (
        <FormItem className={cn("", FormItemClassName)} dir={dir}>
          <FormLabel className={cn("capitalize text-lg", labelClassName)}>
            {label}
          </FormLabel>
          <FormControl>
            <div className="flex gap-2" dir={dir}>
              <div className="flex flex-col gap-0.5 flex-1">
                <Input
                  type="number"
                  className={cn("w-full", className)}
                  placeholder={t("dollars")}
                  min="0"
                  {...props}
                  onChange={(e) => setDollars(e.target.value)}
                  value={dollars}
                />
                <p className="text-xs opacity-70 font-bold">{t("dollars")}</p>
              </div>
              <span className="self-baseline ">.</span>
              <div className="flex flex-col gap-0.5 flex-1">
                <Input
                  type="number"
                  className={cn("w-full", className)}
                  placeholder={t("cents")}
                  min="0"
                  max="99"
                  {...props}
                  onChange={(e) => setCents(e.target.value)}
                  value={cents}
                />
                <p className="text-xs opacity-70 font-bold">{t("cents")}</p>
              </div>
            </div>
          </FormControl>
          <FormMessage className="capitalize font-normal" />
        </FormItem>
      )}
    />
  );
}

export default PricePickerFormInput;
