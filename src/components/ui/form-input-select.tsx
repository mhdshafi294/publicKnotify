import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { ComponentPropsWithoutRef } from "react";
import { Control, FieldValues } from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./form";

interface PropsType<T extends FieldValues>
  extends Omit<ComponentPropsWithoutRef<"input">, "name"> {
  name: keyof T;
  className?: string;
  label: string;
  labelClassName?: string | undefined;
  options: string[];
  control: Control<T>;
}

function FormInputSelect<T extends FieldValues>({
  control,
  name,
  className: className,
  label,
  labelClassName,
  options,
  ...props
}: PropsType<T>) {
  return (
    <FormField
      control={control as Control<FieldValues>}
      name={name.toString()}
      render={({ field }) => (
        <FormItem className="w-full">
          <FormLabel className={cn("capitalize text-lg", labelClassName)}>
            {label}
          </FormLabel>
          <Select onValueChange={field.onChange} defaultValue={field.value}>
            <FormControl>
              <SelectTrigger className={cn("w-full capitalize", className)}>
                <SelectValue {...props} {...field} />
              </SelectTrigger>
            </FormControl>
            <SelectContent
              className={cn("w-full border-foreground/10", className)}
            >
              {options.map((option) => (
                <SelectItem key={option} value={option} className="capitalize">
                  {option}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <FormMessage className=" font-normal" />
        </FormItem>
      )}
    />
  );
}

export default FormInputSelect;
