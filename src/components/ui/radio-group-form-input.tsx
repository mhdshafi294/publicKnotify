import { Control, FieldValues } from "react-hook-form";

import { ComponentPropsWithoutRef } from "react";
import { cn } from "@/lib/utils";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

interface PropsType<T extends FieldValues>
  extends Omit<ComponentPropsWithoutRef<"input">, "name"> {
  name: keyof T;
  className?: string;
  label: string;
  labelClassName?: string;
  groupClassName?: string;
  groupItemClassName?: string;
  radioGroupItemClassName?: string;
  control: Control<T>;
  options: string[];
}

function RadioGroupFormInput<T extends FieldValues>({
  control,
  name,
  className,
  label,
  labelClassName,
  groupClassName,
  groupItemClassName,
  radioGroupItemClassName,
  options,
  ...props
}: PropsType<T>) {
  return (
    <FormField
      control={control as Control<FieldValues>}
      name={name.toLocaleString()}
      render={({ field }) => (
        <FormItem className={cn("flex flex-col justify-between", className)}>
          <FormLabel className={cn("capitalize text-lg", labelClassName)}>
            {label}
          </FormLabel>
          <FormControl>
            <RadioGroup
              onValueChange={field.onChange}
              defaultValue={field.value}
              className={cn("flex gap-4 items-center", groupClassName)}
            >
              {options.map((option) => (
                <FormItem
                  key={option}
                  className={cn(
                    "flex items-center gap-2 space-y-0",
                    groupItemClassName
                  )}
                >
                  <FormControl>
                    <RadioGroupItem
                      value={option}
                      className={cn("min-w-fit", radioGroupItemClassName)}
                    />
                  </FormControl>
                  <FormLabel className="capitalize w-full h-full py-5">
                    {option}
                  </FormLabel>
                </FormItem>
              ))}
            </RadioGroup>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}

export default RadioGroupFormInput;
