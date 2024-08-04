import { Control, FieldValues } from "react-hook-form";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./form";
import { ComponentPropsWithoutRef } from "react";
import { Textarea } from "./textarea";
import { cn, getDirection } from "@/lib/utils";
import { useLocale } from "next-intl";

interface PropsType<T extends FieldValues>
  extends Omit<ComponentPropsWithoutRef<"input">, "name"> {
  name: keyof T;
  label: string;
  className?: string;
  labelClassName?: string;
  placeholder?: string;
  control: Control<T>;
}

function FormInputTextarea<T extends FieldValues>({
  control,
  name,
  className,
  label,
  labelClassName,
  placeholder,
  ...props
}: PropsType<T>) {
  const locale = useLocale();
  const dir = getDirection(locale);
  return (
    <FormField
      control={control as Control<FieldValues>}
      name={name.toString()}
      render={({ field }) => (
        <FormItem dir={dir}>
          <FormLabel className={cn("capitalize text-lg", labelClassName)}>
            {label}
          </FormLabel>
          <FormControl>
            <Textarea
              placeholder={placeholder}
              className={cn("resize-none", className)}
              {...field}
            />
          </FormControl>
          <FormMessage className="capitalize font-normal" />
        </FormItem>
      )}
    />
  );
}

export default FormInputTextarea;
