import React, { ComponentPropsWithoutRef } from "react";
import { Control, FieldValues } from "react-hook-form";
import { useLocale } from "next-intl";

import { cn, getDirection } from "@/lib/utils";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./form";
import { Input } from "./input";

interface PropsType<T extends FieldValues>
  extends Omit<ComponentPropsWithoutRef<"input">, "name"> {
  name: keyof T;
  className?: string;
  label: string;
  labelClassName?: string | undefined;
  control: Control<T>;
}

/**
 * FormInput component that renders an input field with a label, validation message, and support for different locales.
 *
 * @template T - The type of the field values used in the form.
 * @param {PropsType<T>} props - The properties passed to the component.
 * @returns {JSX.Element} The form input component.
 *
 * @example
 * ```tsx
 * <FormInput
 *   name="username"
 *   label="Username"
 *   control={control}
 * />
 * ```
 */
function FormInput<T extends FieldValues>({
  control,
  name,
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
        <FormItem className="w-full" dir={dir}>
          <FormLabel className={cn("capitalize text-lg", labelClassName)}>
            {label}
          </FormLabel>
          <FormControl>
            <Input className={cn("w-full", className)} {...props} {...field} />
          </FormControl>
          <FormMessage className="capitalize font-normal" />
        </FormItem>
      )}
    />
  );
}

export default FormInput;
