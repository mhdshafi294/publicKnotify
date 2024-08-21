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
  preText?: string;
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
function FormInputWithPreText<T extends FieldValues>({
  control,
  name,
  className,
  label,
  preText,
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
            <div className="w-full flex">
              <div className="px-4 bg-input  rounded-s-sm flex justify-center items-center text-foreground/70">
                {preText}
              </div>
              <Input
                className={cn("w-full rounded-s-none", className)}
                {...props}
                {...field}
              />
            </div>
          </FormControl>
          <FormMessage className="capitalize font-normal" />
        </FormItem>
      )}
    />
  );
}

export default FormInputWithPreText;
