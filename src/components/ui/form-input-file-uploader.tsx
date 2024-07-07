import { Control, FieldValues } from "react-hook-form";
import { PhotoProvider, PhotoView } from "react-photo-view";

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./form";
import { ComponentPropsWithoutRef, useState } from "react";
import { cn, convertFileToURL } from "@/lib/utils";
import { Image, Upload, X } from "lucide-react";
import { Button } from "./button";
import FileUploader from "./file-uploader";
import { PODCASTS, UPLOAD_MEDIA_FILE } from "@/lib/apiEndPoints";

interface PropsType<T extends FieldValues>
  extends Omit<ComponentPropsWithoutRef<"input">, "name"> {
  name?: keyof T;
  label: string;
  labelClassName?: string | undefined;
  control?: Control<T>;
  initValue?: string;
}

function FormFileInputUploader<T extends FieldValues>({
  control,
  name,
  label,
  labelClassName,
  className,
  initValue,
  ...props
}: PropsType<T>) {
  const [fileUrl, setFileUrl] = useState<string | null>(initValue || null);

  const handleDelete = (field: any) => {
    field.onChange(null);
    setFileUrl(null);
  };

  return (
    <FormField
      control={control as Control<FieldValues>}
      name={name ? name.toString() : ""}
      render={({ field }) => (
        <FormItem className="w-full">
          <FormLabel className={cn("capitalize text-lg", labelClassName)}>
            {label}
          </FormLabel>
          <FormControl>
            <div className="relative cursor-pointer w-full h-10">
              <FileUploader
                endpoint={`/$podcaster${PODCASTS}${UPLOAD_MEDIA_FILE}`}
                onUploadSuccess={() => console.log("Upload success")}
                onUploadError={(error) => console.log("Upload error", error)}
              />
              <div className="absolute top-0 left-0 w-full h-full bg-greeny rounded flex justify-center items-center z-10">
                {field.value?.name ? (
                  <p className="text-black font-semibold text-xs md:text-sm px-5">
                    {field.value?.name.length > 20
                      ? field.value?.name.slice(0, 7) +
                        "..." +
                        field.value?.name.slice(-3)
                      : field.value?.name}
                  </p>
                ) : initValue ? (
                  <p className="text-black font-semibold text-xs md:text-sm">
                    {initValue.length > 20
                      ? initValue.slice(0, 7) + "..." + initValue.slice(-3)
                      : initValue}
                  </p>
                ) : (
                  <Upload color="black" />
                )}
              </div>
              {field.value?.name ? (
                <>
                  <PhotoProvider maskOpacity={0.5}>
                    <PhotoView src={convertFileToURL(field.value)}>
                      <Button
                        className="rounded-sm border-s-0 rounded-s-none peer-has-[input:focus-visible]:border-primary peer-has-[input:focus-visible]:ring-1 peer-has-[input:focus-visible]:ring-ring text-background hover:text-background border-none outline-none bg-transparent absolute start-2 z-40 hover:bg-transparent"
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
                    className="rounded-sm text-background border-none outline-none bg-transparent absolute end-2 z-40 hover:bg-transparent"
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
                      className="rounded-sm border-s-0 rounded-s-none peer-has-[input:focus-visible]:border-primary peer-has-[input:focus-visible]:ring-1 peer-has-[input:focus-visible]:ring-ring text-background hover:text-background border-none outline-none bg-transparent absolute start-2 z-40 hover:bg-transparent"
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

export default FormFileInputUploader;
