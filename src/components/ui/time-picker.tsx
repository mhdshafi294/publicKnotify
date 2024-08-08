"use client";

import { Control, FieldValues } from "react-hook-form";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { ComponentPropsWithoutRef } from "react";
import { useLocale } from "next-intl";

import { cn, getDirection } from "@/lib/utils";

/**
 * PropsType interface for the TimePicker component.
 *
 * @template T - The field values type.
 * @extends {Omit<ComponentPropsWithoutRef<"input">, "name">}
 */
interface PropsType<T extends FieldValues>
  extends Omit<ComponentPropsWithoutRef<"input">, "name"> {
  name: keyof T;
  label: string;
  description?: string;
  className?: string;
  labelClassName?: string;
  control: Control<T>;
}

/**
 * TimePicker component for selecting a time.
 *
 * @template T - The field values type.
 * @param {PropsType<T>} props - The props for the TimePicker component.
 * @returns {JSX.Element} The rendered TimePicker component.
 *
 * @example
 * ```tsx
 * <TimePicker
 *   control={control}
 *   name="time"
 *   label="Select Time"
 *   description="Please select a time."
 * />
 * ```
 */
function TimePicker<T extends FieldValues>({
  control,
  name,
  label,
  description,
  className,
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
        <FormItem
          className={cn("flex flex-col space-y-2 min-w-32", className)}
          dir={dir}
        >
          <FormLabel className={cn("capitalize text-lg", labelClassName)}>
            {label}
          </FormLabel>
          <FormControl>
            <div className="relative group" dir="ltr">
              <div className="absolute inset-y-0 right-px top-0 flex items-center pr-3.5 pointer-events-none">
                <svg
                  className="size-4 text-gray-600 dark:text-gray-400"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    fillRule="evenodd"
                    d="M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10S2 17.523 2 12Zm11-4a1 1 0 1 0-2 0v4a1 1 0 0 0 .293.707l3 3a1 1 0 0 0 1.414-1.414L13 11.586V8Z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <Input
                type="time"
                className={cn(
                  "bg-background border border-zinc-600 text-white text-sm rounded-md group-hover:bg-white group-hover:text-background block w-full px-3 py-2",
                  { "": dir === "rtl" }
                )}
                min="00:00"
                max="23:59"
                required
                {...field}
                {...props}
              />
            </div>
          </FormControl>
          {description && <FormDescription>{description}</FormDescription>}
          <FormMessage />
        </FormItem>
      )}
    />
  );
}

export default TimePicker;
