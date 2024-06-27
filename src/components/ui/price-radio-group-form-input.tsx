import { Control, FieldValues, useFormContext } from "react-hook-form";

import { ComponentPropsWithoutRef, useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Price } from "@/types/podcaster";

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
  price?: Price;
}

function PriceRadioGroupFormInput<T extends FieldValues>({
  control,
  name,
  className,
  label,
  labelClassName,
  groupClassName,
  groupItemClassName,
  radioGroupItemClassName,
  options,
  price,
  ...props
}: PropsType<T>) {
  const { setValue } = useFormContext();
  const [type, setType] = useState("audio");

  useEffect(() => {
    setValue("type", type);
  }, [type, setValue]);

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
                  onClick={() =>
                    setType(option === "video" ? "video" : "audio")
                  }
                >
                  <FormControl>
                    <RadioGroupItem
                      value={option}
                      className={cn("min-w-fit", radioGroupItemClassName)}
                    />
                  </FormControl>
                  <FormLabel className="capitalize w-full h-full py-5 flex justify-between cursor-pointer">
                    {option}
                    {price && (
                      <span className=" text-gray-500">
                        $
                        {option === "first"
                          ? price.first
                          : option === "middle"
                          ? price.middle
                          : option === "end"
                          ? price.end
                          : option === "video"
                          ? price.video
                          : ""}
                      </span>
                    )}
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

export default PriceRadioGroupFormInput;
