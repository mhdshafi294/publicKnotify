import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { ComponentPropsWithoutRef, useEffect, useRef } from "react";
import {
  Control,
  FieldValues,
  useFormContext,
  useFormState,
} from "react-hook-form";

import { cn, getDirection } from "@/lib/utils";
import { Button } from "./button";
import { Calendar } from "./calendar";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./form";
import { Popover, PopoverContent, PopoverTrigger } from "./popover";

/**
 * PropsType interface for the DatePicker component.
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
 * DatePicker component for selecting a date.
 *
 * @template T - The field values type.
 * @param {PropsType<T>} props - The props for the DatePicker component.
 * @returns {JSX.Element} The rendered DatePicker component.
 *
 * @example
 * ```tsx
 * <DatePicker
 *   control={control}
 *   name="publishing_date"
 *   label="Publishing Date"
 *   description="Select the date you want to publish."
 * />
 * ```
 */
function DatePicker<T extends FieldValues>({
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
  const t = useTranslations("Index");

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
          <Popover>
            <PopoverTrigger asChild>
              <FormControl>
                <Button
                  variant={"outline"}
                  className={cn(
                    "ps-3 font-normal bg-background flex items-center",
                    !field.value && "text-muted-foreground",
                    { "pt-3": dir === "rtl" }
                  )}
                  dir="ltr"
                >
                  {field.value ? (
                    format(field.value, "PPP")
                  ) : (
                    <span>{t("pick-a-date")}</span>
                  )}
                  <CalendarIcon className="ms-3 size-4 opacity-70 dark:opacity-50 -translate-y-0.5" />
                </Button>
              </FormControl>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={field.value}
                onSelect={field.onChange}
                disabled={(date) =>
                  date < new Date() || date < new Date("1900-01-01")
                }
                initialFocus
              />
            </PopoverContent>
          </Popover>
          {description ? (
            <FormDescription>{description}</FormDescription>
          ) : null}
          <FormMessage />
        </FormItem>
      )}
    />
  );
}

export default DatePicker;
