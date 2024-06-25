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
  const [hours, setHours] = useState("");
  const [minutes, setMinutes] = useState("");

  useEffect(() => {
    const formattedValue = `${hours.padStart(2, "0")}:${minutes.padStart(
      2,
      "0"
    )}`;
    setValue(name as string, formattedValue);
    // console.log(formattedValue, getValues(name as string));
  }, [hours, minutes, setValue, name]);

  return (
    <FormField
      control={control as Control<FieldValues>}
      name={name.toString()}
      render={({ field }) => (
        <FormItem className="">
          <FormLabel className={cn("capitalize text-lg", labelClassName)}>
            {label}
          </FormLabel>
          <FormControl>
            <div className="flex space-x-2">
              <Input
                type="number"
                className={cn("w-20", className)}
                placeholder="Hours"
                min="0"
                max="23"
                {...props}
                onChange={(e) => setHours(e.target.value)}
                value={hours}
              />
              <span className="self-center">:</span>
              <Input
                type="number"
                className={cn("w-20", className)}
                placeholder="Mins"
                min="0"
                max="59"
                {...props}
                onChange={(e) => setMinutes(e.target.value)}
                value={minutes}
              />
            </div>
          </FormControl>
          <FormMessage className="capitalize font-normal" />
        </FormItem>
      )}
    />
  );
}

export default DurationPickerFormInput;
