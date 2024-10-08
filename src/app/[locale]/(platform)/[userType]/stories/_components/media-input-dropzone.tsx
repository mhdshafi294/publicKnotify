"use client";

import { cn, convertFileToURL } from "@/lib/utils";
import { TrashIcon, Upload, X } from "lucide-react"; // Import the X icon
import { useTranslations } from "next-intl";
import { Dispatch, FC, useCallback, useEffect, useRef, useState } from "react";
import { useDropzone } from "react-dropzone";
import Image from "next/image";
import ReactCrop, { Crop } from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button"; // Import the Button component

type PropsType = {
  file: File | string | null;
  setFile: Dispatch<React.SetStateAction<File | null>>;
};

const MediaInputDropzone: FC<PropsType> = ({ file, setFile }) => {
  const t = useTranslations("Index");
  const [error, setError] = useState<string | null>(null);
  const [fileSrc, setFileSrc] = useState<string | File | null>(file);
  const [crop, setCrop] = useState<Crop>();
  const [scale, setScale] = useState(1);
  const [rotate, setRotate] = useState(0);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const imgRef = useRef<HTMLImageElement | null>(null);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    setFileSrc(acceptedFiles[0]);
    setFile(acceptedFiles[0]);
    setError(null);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
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

      "video/mp4": [".mp4"],
      "video/quicktime": [".mov"],
      "video/x-msvideo": [".avi"],
      "video/3gpp": [".3gp"],
      "video/3gpp2": [".3g2"],
      "video/mp2t": [".ts"],
      "video/webm": [".webm"],
      "video/ogg": [".ogv"],
    },
  });

  // Function to handle file removal
  const handleRemoveFile = () => {
    setFileSrc(null);
    setFile(null);
    setError(null);
  };

  const onImageLoaded = useCallback((img: HTMLImageElement) => {
    imgRef.current = img;
  }, []);

  const onCropComplete = useCallback(
    async (crop: Crop) => {
      const generateCroppedImage = async () => {
        if (!imgRef.current || !crop) return;

        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");

        if (!ctx) return;

        const scaleX = imgRef.current.naturalWidth / imgRef.current.width;
        const scaleY = imgRef.current.naturalHeight / imgRef.current.height;

        // Calculate crop dimensions
        const cropWidth = crop.width * scaleX;
        const cropHeight = crop.height * scaleY;

        // Calculate the rotated dimensions
        const angleInRadians = (rotate * Math.PI) / 180;
        const sin = Math.abs(Math.sin(angleInRadians));
        const cos = Math.abs(Math.cos(angleInRadians));

        // Adjust canvas size to fit the rotated image
        canvas.width = (cropWidth * cos + cropHeight * sin) * scale;
        canvas.height = (cropWidth * sin + cropHeight * cos) * scale;

        // Clear the canvas to avoid any background issues
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Move to center of the canvas for rotation
        ctx.translate(canvas.width / 2, canvas.height / 2);
        ctx.rotate(angleInRadians);
        ctx.scale(scale, scale);

        // Draw the image based on the crop and transformations
        ctx.drawImage(
          imgRef.current,
          crop.x * scaleX,
          crop.y * scaleY,
          crop.width * scaleX,
          crop.height * scaleY,
          -cropWidth / 2, // Center the crop in the canvas
          -cropHeight / 2,
          cropWidth,
          cropHeight
        );

        return new Promise<File | null>((resolve) => {
          canvas.toBlob((blob) => {
            if (!blob) return resolve(null);
            const croppedFile = new File([blob], "cropped-image.jpeg", {
              type: "image/jpeg",
            });
            resolve(croppedFile);
          }, "image/jpeg");
        });
      };

      const croppedImageFile = await generateCroppedImage();
      if (croppedImageFile) {
        setFile(croppedImageFile);
      }
    },
    [setFile, scale, rotate]
  );

  // useEffect to handle scale and rotate updates
  // useEffect(() => {
  //   if (crop) {
  //     onCropComplete(crop); // Trigger cropping when rotate or scale changes
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [rotate, scale]);

  return (
    <div className="flex gap-4 relative">
      {/* File Dropzone and Image/Video Preview */}
      {!(fileSrc instanceof File && fileSrc.type.startsWith("image/")) ? (
        <div
          {...getRootProps({ refKey: "innerref" })}
          className="h-80 flex-1 border border-dashed flex justify-center items-center shrink-0 rounded-xl"
        >
          <input {...getInputProps({ ref: inputRef, refKey: "innerref" })} />
          {(fileSrc instanceof File && fileSrc.name) ||
          (typeof fileSrc === "string" && fileSrc.length > 0) ? (
            <div
              className={cn(
                "flex flex-col size-full gap-3 justify-center items-center",
                isDragActive ? "shadow-inner shadow-foreground" : ""
              )}
            >
              {fileSrc instanceof File && fileSrc.type.startsWith("image/") ? (
                <Image
                  src={convertFileToURL(fileSrc)}
                  alt="image"
                  width={300}
                  height={300}
                  className="object-contain size-[80%]"
                />
              ) : (
                <video
                  src={
                    fileSrc instanceof File
                      ? convertFileToURL(fileSrc)
                      : fileSrc
                  }
                  controls
                  width={300}
                  height={300}
                  className="object-contain size-[80%]"
                />
              )}
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
      ) : null}

      {/* Image Crop, Resize, and Filter Section */}
      {fileSrc instanceof File && fileSrc.type.startsWith("image/") ? (
        <div className="relative h-70 flex-1 flex flex-col gap-5">
          {/* <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <Label htmlFor="scale-input">Scale: </Label>
              <Input
                id="scale-input"
                type="number"
                step="0.1"
                className="bg-background h-7"
                value={scale}
                disabled={!convertFileToURL(fileSrc) || !crop}
                onChange={(e) => setScale(Number(e.target.value))}
              />
            </div>
            <div className="flex items-center gap-2">
              <Label htmlFor="rotate-input">Rotate: </Label>
              <Input
                id="rotate-input"
                type="number"
                className="bg-background h-7"
                value={rotate}
                disabled={!convertFileToURL(fileSrc) || !crop}
                onChange={(e) =>
                  setRotate(
                    Math.min(180, Math.max(-180, Number(e.target.value)))
                  )
                }
              />
            </div>
          </div> */}
          <ReactCrop
            crop={crop}
            onChange={(_, percentCrop) => setCrop(percentCrop)}
            onComplete={onCropComplete}
            aspect={undefined} // free cropping
            minHeight={100}
          >
            {/* eslint-disable-next-line @next/next/no-img-element*/}
            <img
              ref={imgRef}
              className="h-80 w-full object-contain"
              alt="Crop me"
              src={convertFileToURL(fileSrc)}
              style={{ transform: `scale(${scale}) rotate(${rotate}deg)` }}
            />
          </ReactCrop>

          {/* Remove file button */}
          <Button
            variant="destructive"
            size="icon"
            onClick={handleRemoveFile}
            className="absolute top-2 right-2"
            aria-label="Remove file"
          >
            <TrashIcon className="h-4 w-4" />
          </Button>
        </div>
      ) : null}

      {error && <p className="text-red-500">{error}</p>}
    </div>
  );
};

export default MediaInputDropzone;
