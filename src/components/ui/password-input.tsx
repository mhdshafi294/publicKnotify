import React, { ComponentPropsWithoutRef, useState } from "react";
import { Control, FieldValues } from "react-hook-form";
import { Eye, EyeOff } from "lucide-react";

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./form";
import { Input } from "./input";
import { cn } from "@/lib/utils";

interface PropsType<T extends FieldValues>
  extends Omit<ComponentPropsWithoutRef<"input">, "name"> {
  name: keyof T;
  label: string;
  labelClassName?: string | undefined;
  control: Control<T>;
}

/**
 * PasswordInput component that renders an input field for passwords with a toggle to show/hide the password.
 *
 * @template T - The type of the field values used in the form.
 * @param {PropsType<T>} props - The properties passed to the component.
 * @returns {JSX.Element} The password input component.
 *
 * @example
 * ```tsx
 * <PasswordInput
 *   name="password"
 *   label="Password"
 *   control={control}
 * />
 * ```
 */
function PasswordInput<T extends FieldValues>({
  control,
  name,
  label,
  labelClassName,
  className: className,
  ...props
}: PropsType<T>) {
  const [toggle, setToggle] = useState(false);

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
            <div className="relative">
              <Input
                className={cn("pr-12 text-lg w-full", className)}
                type={toggle ? "text" : "password"}
                dir="ltr"
                {...props}
                {...field}
              />
              <button
                tabIndex={-1}
                onClick={() => setToggle((prev) => !prev)}
                type="button"
                className="absolute end-4 top-1/2 -translate-y-1/2 p-0.5 border-transparent border focus-visible:rounded focus-visible:border-primary focus-visible:outline-0"
              >
                {!toggle ? (
                  <Eye className="size-4" />
                ) : (
                  <EyeOff className="size-4" />
                )}
              </button>
            </div>
          </FormControl>
          <FormMessage className="capitalize font-normal" />
        </FormItem>
      )}
    />
  );
}

export default PasswordInput;
