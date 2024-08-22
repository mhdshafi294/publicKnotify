"use client";

import { Control, FieldValues } from "react-hook-form";
import { ComponentPropsWithoutRef, useState } from "react";
import { useLocale } from "next-intl";
import { PipetteIcon } from "lucide-react";

import { cn, getDirection } from "@/lib/utils";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

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
  className,
  labelClassName,
  ...props
}: PropsType<T>) {
  const locale = useLocale();
  const dir = getDirection(locale);
  const [color, setColor] = useState<string>("#0051ff");

  return (
    <FormField
      control={control as Control<FieldValues>}
      name={name.toString()}
      render={({ field }) => (
        <FormItem className={cn("flex flex-col", className)} dir={dir}>
          <FormLabel className={cn("capitalize text-lg", labelClassName)}>
            {label}
          </FormLabel>

          <div className="PopoverContent border border-input justify-between px-5 p-2 flex items-center gap-1 relative bg-background rounded-lg">
            <span className="text-sm">{field.value || "Pick a color"}</span>
            <div
              className="size-5 border border-input bg-background"
              style={{ backgroundColor: field.value || color }}
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
