import { Control, FieldValues } from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./form";
import { Input } from "./input";
import { ComponentPropsWithoutRef } from "react";
import { cn } from "@/lib/utils";
import { Checkbox } from "@/components/ui/checkbox";

interface PropsType<T extends FieldValues>
  extends Omit<ComponentPropsWithoutRef<"input">, "name"> {
  name: keyof T;
  className?: string;
  label?: string;
  labelClassName?: string | undefined;
  checkboxClassName?: string;
  control: Control<T>;
}

function FormCheckbox<T extends FieldValues>({
  control,
  className,
  name,
  label,
  labelClassName,
  checkboxClassName,
  ...props
}: PropsType<T>) {
  return (
    <FormField
      control={control as Control<FieldValues>}
      name={name.toString()}
      render={({ field }) => (
        <FormItem
          className={cn(
            "w-full flex items-center justify-start gap-2 mt-12",
            className
          )}
        >
          <FormControl className="flex justify-center items-center">
            <Checkbox
              checked={field.value}
              onCheckedChange={field.onChange}
              className={cn("peer", checkboxClassName)}
            />
          </FormControl>
          <FormLabel
            className={cn(
              "text-base font-light !m-0 peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
              labelClassName
            )}
          >
            {label}
          </FormLabel>
          <FormMessage className="capitalize font-normal" />
        </FormItem>
      )}
    />
  );
}

export default FormCheckbox;
