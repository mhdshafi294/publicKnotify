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
import { Upload } from "lucide-react";

interface PropsType<T extends FieldValues>
  extends Omit<ComponentPropsWithoutRef<"input">, "name"> {
  name: keyof T;
  label: string;
  labelClassName?: string | undefined;
  control: Control<T>;
}

function FormFileInput<T extends FieldValues>({
  control,
  name,
  label,
  labelClassName,
  className,
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
          <FormControl>
            <div className="relative cursor-pointer w-full">
              <Input
                className={cn(
                  "!w-full bg-greeny opacity-0 cursor-pointer",
                  className
                )}
                type="file"
                onChange={(e) =>
                  field.onChange(
                    e.target.files ? e.target.files?.[0] : undefined
                  )
                }
                {...props}
              />
              <div className="absolute inset-0 w-full h-full bg-greeny rounded flex justify-center items-center -z-10">
                <Upload color="black" />
              </div>
            </div>
          </FormControl>
          <FormMessage className="capitalize font-normal" />
        </FormItem>
      )}
    />
  );
}

export default FormFileInput;
