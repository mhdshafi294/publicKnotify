"use client";

import {
  Control,
  FieldValues,
  useFormContext,
  useFormState,
} from "react-hook-form";
import { PhotoProvider, PhotoView } from "react-photo-view";

import { ImageIcon, ReplaceIcon, Upload, X } from "lucide-react";
import { Button } from "./button";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./form";
import { Input } from "./input";

import { cn, convertFileToURL, getDirection } from "@/lib/utils";
import { useLocale } from "next-intl";
import { ComponentPropsWithoutRef, useEffect, useRef, useState } from "react";

/**
 * PropsType interface for the FormFileInput component.
 */
interface PropsType<T extends FieldValues>
  extends Omit<ComponentPropsWithoutRef<"input">, "name"> {
  name: keyof T;
  label: string;
  labelClassName?: string | undefined;
  control: Control<T>;
  initValue?: string;
  disabled?: boolean;
}

/**
 * FormFileInput component for file input with preview and delete functionality.
 *
 * @param {PropsType<T>} props - The properties passed to the component.
 * @returns {JSX.Element} The rendered FormFileInput component.
 *
 * @example
 * ```tsx
 * <FormFileInput
 *   name="file"
 *   label="Upload File"
 *   control={control}
 *   initValue="https://example.com/file.jpg"
 * />
 * ```
 */
function FormFileInput<T extends FieldValues>({
  control,
  name,
  label,
  labelClassName,
  className: className,
  initValue,
  disabled,
  ...props
}: PropsType<T>) {
  const [fileUrl, setFileUrl] = useState<string | null>(initValue || null);

  const handleDelete = (field: any) => {
    field.onChange(null);
    setFileUrl(null);
  };
  const { setFocus } = useFormContext();

  const fieldRef = useRef<HTMLDivElement | null>(null); // Ref for the field
  const { errors } = useFormState(); // Get the validation errors

  useEffect(() => {
    if (errors[name as keyof FieldValues]) {
      fieldRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
      setFocus(name.toString());
    }
  }, [errors, name, setFocus]);

  const locale = useLocale();
  const dir = getDirection(locale);

  return (
    <FormField
      control={control as Control<FieldValues>}
      name={name.toString()}
      render={({ field }) => (
        <FormItem className="w-full" dir={dir} ref={fieldRef}>
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
                        <ImageIcon />
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
                      <ImageIcon />
                    </Button>
                  </PhotoView>
                </PhotoProvider>
              ) : null}
            </div>
          </FormControl>
          <FormMessage className="font-normal" />
        </FormItem>
      )}
    />
  );
}

export default FormFileInput;
