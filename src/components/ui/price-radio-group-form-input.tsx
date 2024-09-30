import { Control, FieldValues, useFormContext } from "react-hook-form";
import React, { ComponentPropsWithoutRef, useEffect, useState } from "react";
import { cn, getDirection } from "@/lib/utils";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Price } from "@/types/podcaster";
import { useLocale, useTranslations } from "next-intl";

interface PropsType<T extends FieldValues>
  extends Omit<ComponentPropsWithoutRef<"input">, "name"> {
  name: keyof T;
  className?: string;
  label: string;
  labelClassName?: string;
  groupClassName?: string;
  groupclassName?: string;
  radioGroupclassName?: string;
  control: Control<T>;
  options: string[];
  price?: Price;
}

function PriceRadioGroupFormInput<T extends FieldValues>({
  control,
  name,
  className: className,
  label,
  labelClassName,
  groupClassName,
  groupclassName,
  radioGroupclassName,
  options,
  price,
  ...props
}: PropsType<T>) {
  const { setValue } = useFormContext();
  const [type, setType] = useState("audio");

  useEffect(() => {
    setValue("type", type);
  }, [type, setValue]);

  const locale = useLocale();
  const dir = getDirection(locale);
  const t = useTranslations("Index");

  return (
    <FormField
      control={control as Control<FieldValues>}
      name={name.toLocaleString()}
      render={({ field }) => (
        <FormItem
          className={cn("flex flex-col justify-between", className)}
          dir={dir}
        >
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
                    groupclassName
                  )}
                  dir={dir}
                  onClick={() =>
                    setType(option === t("video") ? "video" : "audio")
                  }
                >
                  <FormControl>
                    <RadioGroupItem
                      value={option}
                      className={cn("min-w-fit", radioGroupclassName)}
                      dir={dir}
                    />
                  </FormControl>
                  <FormLabel className="capitalize w-full h-full py-5 flex justify-between cursor-pointer">
                    <div className="flex items-center gap-1">
                      <span className=" ms-1">
                        {option === t("video") ? "" : t("audio")}
                      </span>
                      {option}
                    </div>
                    {price ? (
                      <>
                        <span className=" text-gray-500">
                          $
                          {option === t("first")
                            ? price.first
                            : option === t("middle")
                            ? price.middle
                            : option === t("end")
                            ? price.end
                            : option === t("video")
                            ? price.video
                            : ""}
                        </span>
                      </>
                    ) : null}
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
