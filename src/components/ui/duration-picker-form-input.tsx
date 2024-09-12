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

interface PropsType<T extends FieldValues>
  extends Omit<ComponentPropsWithoutRef<"input">, "name"> {
  name: keyof T;
  className?: string;
  label: string;
  labelClassName?: string | undefined;
  control: Control<T>;
}

function DurationPickerFormInput<T extends FieldValues>({
  control,
  name,
  className,
  label,
  labelClassName,
  ...props
}: PropsType<T>) {
  const { setValue } = useFormContext();
  const [minutes, setMinutes] = useState("");
  const [seconds, setSeconds] = useState("");

  useEffect(() => {
    const formattedValue = `00:${minutes.padStart(2, "0")}:${seconds.padStart(
      2,
      "0"
    )}`;
    setValue(name as string, formattedValue);
  }, [minutes, seconds, setValue, name]);

  const locale = useLocale();
  const dir = getDirection(locale);
  const t = useTranslations("Index");

  return (
    <FormField
      control={control as Control<FieldValues>}
      name={name.toString()}
      render={({ field }) => (
        <FormItem className="" dir={dir}>
          <FormLabel className={cn("capitalize text-lg", labelClassName)}>
            {label}
          </FormLabel>
          <FormControl>
            <div className="flex gap-2" dir={dir}>
              <div className="flex flex-col  gap-0.5">
                <Input
                  type="number"
                  className={cn("w-20", className)}
                  placeholder={t("mins")}
                  min="0"
                  max="59"
                  {...props}
                  onChange={(e) => setMinutes(e.target.value)}
                  value={minutes}
                />
                <p className="text-xs opacity-70 font-bold">{t("mins")}</p>
              </div>
              <span className="self-start translate-y-1">:</span>
              <div className="flex flex-col  gap-0.5">
                <Input
                  type="number"
                  className={cn("w-20", className)}
                  placeholder={t("secs")}
                  min="0"
                  max="59"
                  {...props}
                  onChange={(e) => setSeconds(e.target.value)}
                  value={seconds}
                />
                <p className="text-xs opacity-70 font-bold">{t("secs")}</p>
              </div>
            </div>
          </FormControl>
          <FormMessage className="capitalize font-normal" />
        </FormItem>
      )}
    />
  );
}

export default DurationPickerFormInput;
