"use client";

import { useLocale } from "next-intl";
import { ComponentPropsWithoutRef, useEffect, useRef } from "react";
import {
  Control,
  FieldValues,
  useFormContext,
  useFormState,
} from "react-hook-form";

import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { cn, getDirection } from "@/lib/utils";

/**
 * PropsType interface for the ColorPicker component.
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
 * ColorPicker component for selecting a hex color.
 *
 * @template T - The field values type.
 * @param {PropsType<T>} props - The props for the ColorPicker component.
 * @returns {JSX.Element} The rendered ColorPicker component.
 *
 * @example
 * ```tsx
 * <ColorPicker
 *   control={control}
 *   name="favorite_color"
 *   label="Favorite Color"
 *   description="Pick your favorite color."
 * />
 * ```
 */
function ColorPicker<T extends FieldValues>({
  control,
  name,
  label,
  description,
  className: className,
  labelClassName,
  ...props
}: PropsType<T>) {
  const locale = useLocale();
  const dir = getDirection(locale);

  const { setFocus } = useFormContext();

  const fieldRef = useRef<HTMLDivElement | null>(null); // Ref for the field
  const { errors } = useFormState(); // Get the validation errors

  useEffect(() => {
    if (errors[name as keyof FieldValues]) {
      fieldRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
      setFocus(name.toString());
    }
  }, [errors, name, setFocus]);

  return (
    <FormField
      control={control as Control<FieldValues>}
      name={name.toString()}
      render={({ field }) => (
        <FormItem
          className={cn("flex flex-col", className)}
          dir={dir}
          ref={fieldRef}
        >
          <FormLabel className={cn("capitalize text-lg", labelClassName)}>
            {label}
          </FormLabel>
          <div className="PopoverContent border border-input/50 justify-between px-5 p-2 flex items-center gap-1 relative bg-background rounded-md">
            <span className="text-sm">{field.value || "Pick a color"}</span>
            <div
              className="size-5 border border-input/50 bg-background"
              style={{ backgroundColor: field.value }}
            />
            <FormControl>
              <Input
                type="color"
                className={cn(
                  "absolute cursor-pointer inset-0 rounded-full opacity-0 p-0"
                )}
                {...props}
                {...field}
              />
            </FormControl>
          </div>
          {description ? (
            <FormDescription>{description}</FormDescription>
          ) : null}
          <FormMessage />
        </FormItem>
      )}
    />
  );
}

export default ColorPicker;
