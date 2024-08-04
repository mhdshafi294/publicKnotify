import { Control, FieldValues } from "react-hook-form";
import { PhotoProvider, PhotoView } from "react-photo-view";

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./form";
import { Input } from "./input";
import { ComponentPropsWithoutRef, useState } from "react";
import { cn, convertFileToURL, getDirection } from "@/lib/utils";
import { Image, ReplaceIcon, Upload, X } from "lucide-react";
import { Button } from "./button";
import { useLocale } from "next-intl";

interface PropsType<T extends FieldValues>
  extends Omit<ComponentPropsWithoutRef<"input">, "name"> {
  name: keyof T;
  label: string;
  labelClassName?: string | undefined;
  control: Control<T>;
  initValue?: string;
  disabled?: boolean;
}

function FormFileInput<T extends FieldValues>({
  control,
  name,
  label,
  labelClassName,
  className,
  initValue,
  disabled,
  ...props
}: PropsType<T>) {
  const [fileUrl, setFileUrl] = useState<string | null>(initValue || null);

  const handleDelete = (field: any) => {
    field.onChange(null);
    setFileUrl(null);
  };

  const locale = useLocale();
  const dir = getDirection(locale);
  return (
    <FormField
      control={control as Control<FieldValues>}
      name={name.toString()}
      render={({ field }) => (
        <FormItem className="w-full" dir={dir}>
          <FormLabel className={cn("capitalize text-lg", labelClassName)}>
            {label}
          </FormLabel>
          <FormControl>
            <div className="relative cursor-pointer w-full h-10">
              <Input
                disabled={disabled}
                className={cn(
                  "w-full absolute bg-greeny top-0 left-0 opacity-0 cursor-pointer z-20",
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
              <div className="absolute top-0 left-0 w-full h-full bg-greeny rounded flex justify-center items-center z-10">
                {/* <Upload color="black" /> */}
                {field.value?.name ? (
                  <div className="flex justify-center items-center gap-2">
                    <ReplaceIcon color="black" size={16} />
                    <p className="text-black font-semibold text-xs md:text-sm px-5">
                      {field.value?.name.length > 20
                        ? field.value?.name.slice(0, 7) +
                          "..." +
                          field.value?.name.slice(-3)
                        : field.value?.name}
                    </p>
                  </div>
                ) : initValue ? (
                  <div className="flex justify-center items-center gap-2">
                    <ReplaceIcon color="black" size={16} />
                    <p className="text-black font-semibold text-xs md:text-sm">
                      {initValue.length > 20
                        ? initValue.slice(0, 7) + "..." + initValue.slice(-3)
                        : initValue}
                    </p>
                  </div>
                ) : (
                  <Upload color="black" />
                )}
              </div>
              {field.value?.name ? (
                <>
                  <PhotoProvider maskOpacity={0.5}>
                    <PhotoView src={convertFileToURL(field.value)}>
                      <Button
                        className="rounded-sm border-s-0 rounded-s-none peer-has-[input:focus-visible]:border-primary peer-has-[input:focus-visible]:ring-1 peer-has-[input:focus-visible]:ring-ring text-background hover:text-background border-none outline-none bg-transparent absolute start-2 z-30 hover:bg-transparent"
                        variant="outline"
                        size="icon"
                        type="button"
                        tabIndex={-1}
                      >
                        <Image />
                      </Button>
                    </PhotoView>
                  </PhotoProvider>
                  <Button
                    className="rounded-sm text-background border-none outline-none bg-transparent absolute end-2 z-30 hover:bg-transparent"
                    variant="outline"
                    size="icon"
                    type="button"
                    onClick={() => handleDelete(field)}
                    tabIndex={-1}
                  >
                    <X />
                  </Button>
                </>
              ) : initValue ? (
                <PhotoProvider maskOpacity={0.5}>
                  <PhotoView src={initValue}>
                    <Button
                      className="rounded-sm border-s-0 rounded-s-none peer-has-[input:focus-visible]:border-primary peer-has-[input:focus-visible]:ring-1 peer-has-[input:focus-visible]:ring-ring text-background hover:text-background border-none outline-none bg-transparent absolute start-2 z-30 hover:bg-transparent"
                      variant="outline"
                      size="icon"
                      type="button"
                      tabIndex={-1}
                    >
                      <Image />
                    </Button>
                  </PhotoView>
                </PhotoProvider>
              ) : null}
            </div>
          </FormControl>
          <FormMessage className="capitalize font-normal" />
        </FormItem>
      )}
    />
  );
}

export default FormFileInput;
