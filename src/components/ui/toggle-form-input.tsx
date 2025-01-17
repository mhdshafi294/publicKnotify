import { cn } from "@/lib/utils";
import { ComponentPropsWithoutRef, ReactNode } from "react";
import { Control, FieldValues } from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./form";
import { Toggle } from "./toggle"; // Import the Shadcn Toggle component

interface CheckboxProps<T extends FieldValues>
  extends Omit<ComponentPropsWithoutRef<"button">, "name"> {
  name: keyof T;
  className?: string;
  label?: string;
  labelClassName?: string | undefined;
  control: Control<T>;
  icon: ReactNode; // Property for the customizable icon
  disabled?: boolean;
}

function ToggleFormInput<T extends FieldValues>({
  control,
  name,
  className: className,
  label,
  labelClassName,
  icon,
  disabled,
  ...props
}: CheckboxProps<T>) {
  return (
    <FormField
      control={control as Control<FieldValues>}
      name={name.toString()}
      render={({ field }) => (
        <FormItem className="">
          {label && (
            <FormLabel className={cn("capitalize text-lg", labelClassName)}>
              {label}
            </FormLabel>
          )}
          <FormControl>
            <Toggle
              disabled={disabled}
              className={cn(
                "bg-greeny/10 text-white hover:bg-greeny/25 hover:text-whit data-[state=on]:bg-greeny data-[state=on]:text-black [state=on]:hover:bg-greeny_lighter/75 data-[state=on]:hover:text-background",
                className
              )}
              onClick={() => field.onChange(field.value === "1" ? "0" : "1")}
              aria-pressed={field.value === "1"}
              {...props}
            >
              {icon}
            </Toggle>
          </FormControl>
          <FormMessage className=" font-normal" />
        </FormItem>
      )}
    />
  );
}

export default ToggleFormInput;
