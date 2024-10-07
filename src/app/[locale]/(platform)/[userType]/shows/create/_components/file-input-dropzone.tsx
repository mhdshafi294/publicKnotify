"use client";
import { Button } from "@/components/ui/button";
import { cn, convertFileToURL } from "@/lib/utils";
import { Upload } from "lucide-react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { Dispatch, FC, useCallback, useRef } from "react";
import { useDropzone } from "react-dropzone";

type PropsType = {
  file: File | string | null;
  setFile: Dispatch<React.SetStateAction<File | null>>;
};

const FileInputDropzone: FC<PropsType> = ({ file, setFile }) => {
  const t = useTranslations("Index");

  const inputRef = useRef<HTMLInputElement | null>(null);

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      setFile(acceptedFiles[0]);
      // Do something with the files
    },
    [setFile]
  );

  const { getRootProps, getInputProps, isDragActive, acceptedFiles } =
    useDropzone({
      onDrop,
      maxFiles: 1,
      accept: {
        "image/jpeg": [".jpeg", ".jpg"],
        "image/png": [".png"],
        "image/gif": [".gif"],
        "image/svg+xml": [".svg"],
        "image/webp": [".webp"],
        "image/bmp": [".bmp"],
        "image/tiff": [".tiff", ".tif"],
        "image/heic": [".heic"],
        "image/heif": [".heif"],
        "image/avif": [".avif"],
        "image/jpeg2000": [".jp2"],
        "image/jfif": [".jfif"],
      },
    });

  const openFileDialog = () => {
    inputRef.current?.click();
  };

  return (
    <div className="flex justify-start items-start gap-4">
      <div
        {...getRootProps({ refKey: "innerref" })}
        className="size-40 border border-dashed flex justify-center items-center shrink-0"
      >
        <input {...getInputProps({ ref: inputRef, refKey: "innerref" })} />
        {(file instanceof File && file.name) ||
        (typeof file === "string" && file.length > 0) ? (
          <div
            className={cn(
              "flex flex-col size-full gap-3 justify-center items-center",
              isDragActive ? "shadow-inner shadow-foreground" : ""
            )}
          >
            <Image
              src={file instanceof File ? convertFileToURL(file) : file}
              alt="image"
              width={300}
              height={300}
              className="object-contain size-[80%]"
            />
          </div>
        ) : (
          <div
            className={cn(
              "flex flex-col size-[80%] gap-3 justify-center items-center",
              isDragActive ? "shadow-inner shadow-foreground" : ""
            )}
          >
            <Upload />
            <span className="text-sm">{t("drag-file-to-upload")}</span>
          </div>
        )}
      </div>
      <div className="w-full space-y-2">
        <h3 className="text-xl font-semibold">{t("upload-image")}</h3>
        <p className="text-sm text-foreground/80">
          {t(
            "we-recommend-using-an-image-that-is-3000px-wide-and-we-will-automatically-crop-it-to-a-square-you-can-skip-this-for-now-if-you-want-but-it-will-be-required-to-publish"
          )}
        </p>
        <Button type="button" onClick={openFileDialog}>
          {t("choose-file")}
        </Button>
      </div>
    </div>
  );
};

export default FileInputDropzone;
