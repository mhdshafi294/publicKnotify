"use client";

import React, { ComponentPropsWithoutRef } from "react";
import { Control, FieldValues } from "react-hook-form";
import { useLocale } from "next-intl";

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./select";
import { cn, getDirection } from "@/lib/utils";

interface PropsType<T extends FieldValues>
  extends Omit<ComponentPropsWithoutRef<"input">, "name"> {
  name: keyof T;
  options: string[];
  className?: string;
  label: string;
  labelClassName?: string;
  control: Control<T>;
}

/**
 * SelectFormInput component that renders a select input field within a form.
 *
 * @param {PropsType<T>} props - The properties passed to the component.
 * @returns {JSX.Element} The select form input component.
 *
 * @example
 * ```tsx
 * <SelectFormInput
 *   name="category"
 *   label="Category"
 *   options={["Option 1", "Option 2"]}
 *   control={control}
 * />
 * ```
 */
function SelectFormInput<T extends FieldValues>({
  control,
  name,
  options,
  className,
  label,
  labelClassName,
  ...props
}: PropsType<T>) {
  const locale = useLocale();
  const dir = getDirection(locale);

  return (
    <FormField
      control={control as Control<FieldValues>}
      name={name.toString()}
      render={({ field }) => (
        <FormItem className={cn("w-full", className)} dir={dir}>
          <FormLabel className={cn("capitalize text-lg", labelClassName)}>
            {label}
          </FormLabel>
          <Select
            onValueChange={field.onChange}
            defaultValue={field.value}
            value={field.value}
            dir={dir}
          >
            <FormControl>
              <SelectTrigger className="capitalize">
                <SelectValue placeholder={props.placeholder} />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              {options.map((option) => (
                <SelectItem key={option} value={option} className="capitalize">
                  {option}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}

export default SelectFormInput;
