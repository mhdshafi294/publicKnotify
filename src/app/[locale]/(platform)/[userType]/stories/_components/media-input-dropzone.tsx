"use client";

import { cn, convertFileToURL } from "@/lib/utils";
import { BadgeInfoIcon, SaveIcon, TrashIcon, Upload, X } from "lucide-react"; // Import the X icon
import { useTranslations } from "next-intl";
import { Dispatch, FC, useCallback, useEffect, useRef, useState } from "react";
import { useDropzone } from "react-dropzone";
import Image from "next/image";
import ReactCrop, { Crop, PixelCrop } from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button"; // Import the Button component
import { useDebounceEffect } from "@/hooks/useDebounceEffect";
import { canvasPreview } from "@/lib/reactImageCrop/canvasPreview";

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

  const previewCanvasRef = useRef<HTMLCanvasElement>(null);
  const [completedCrop, setCompletedCrop] = useState<PixelCrop>();

  const onDrop = useCallback((acceptedFiles: File[]) => {
    setFileSrc(acceptedFiles[0]);
    // setFile(acceptedFiles[0]);
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
    setCrop(undefined);
    setCompletedCrop(undefined);
    setError(null);
  };

  const onImageLoaded = useCallback((img: HTMLImageElement) => {
    imgRef.current = img;
  }, []);

  const onSaveEditedImage = useCallback(async () => {
    const generateCroppedImage = async () => {
      const image = imgRef.current;
      const previewCanvas = previewCanvasRef.current;
      if (!image || !previewCanvas || !completedCrop) {
        throw new Error("Crop canvas does not exist");
      }

      // This will size relative to the uploaded image
      const scaleX = image.naturalWidth / image.width;
      const scaleY = image.naturalHeight / image.height;

      const offscreen = new OffscreenCanvas(
        completedCrop.width * scaleX,
        completedCrop.height * scaleY
      );
      const ctx = offscreen.getContext("2d");
      if (!ctx) {
        throw new Error("No 2d context");
      }

      ctx.drawImage(
        previewCanvas,
        0,
        0,
        previewCanvas.width,
        previewCanvas.height,
        0,
        0,
        offscreen.width,
        offscreen.height
      );

      return new Promise<File | null>((resolve) => {
        previewCanvas.toBlob((blob) => {
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
  }, [setFile, scale, rotate]);

  useDebounceEffect(
    async () => {
      if (
        completedCrop?.width &&
        completedCrop?.height &&
        imgRef.current &&
        previewCanvasRef.current
      ) {
        canvasPreview(
          imgRef.current,
          previewCanvasRef.current,
          completedCrop,
          scale,
          rotate,
          setFile
        );
      }
    },
    100,
    [completedCrop, scale, rotate]
  );

  return (
    <div className="flex flex-col gap-4 min-h-80 items-centerrelative">
      {/* File Dropzone and Image/Video Preview */}
      {!(fileSrc instanceof File && fileSrc.type.startsWith("image/")) ? (
        <div
          {...getRootProps({ refKey: "innerref" })}
          className="h-80 relative flex-1 border border-dashed flex justify-center items-center shrink-0 rounded-xl"
        >
          <input {...getInputProps({ ref: inputRef, refKey: "innerref" })} />
          {(fileSrc instanceof File && fileSrc.name) ||
          (typeof fileSrc === "string" && fileSrc.length > 0) ? (
            <div
              className={cn(
                " flex flex-col size-full gap-3 justify-center items-center",
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
        <div className="relative h-80 flex-1 flex flex-col gap-5">
          <div className="flex justify-between items-end">
            <div className="flex flex-col gap-1">
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
            <div className="flex flex-col gap-1">
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
            <Button
              variant="secondary"
              type="button"
              size="sm"
              className="gap-2 "
              disabled={!convertFileToURL(fileSrc) || !crop}
              onClick={onSaveEditedImage}
            >
              Save <SaveIcon className="h-4 w-4" />
            </Button>
          </div>
          <ReactCrop
            crop={crop}
            onChange={(_, percentCrop) => setCrop(percentCrop)}
            onComplete={(c) => setCompletedCrop(c)}
            aspect={undefined} // free cropping
            minHeight={100}
            minWidth={100}
            className="h-80 w-full relative"
          >
            <div className="h-80 w-full relative flex justify-center items-center">
              {/* eslint-disable-next-line @next/next/no-img-element*/}
              <img
                ref={imgRef}
                className="h-full w-full object-contain"
                alt="Crop me"
                src={convertFileToURL(fileSrc)}
                style={{ transform: `scale(${scale}) rotate(${rotate}deg)` }}
              />
            </div>
          </ReactCrop>

          {/* Remove file button */}
          <Button
            variant="ghost"
            size="icon"
            onClick={handleRemoveFile}
            className="absolute top-12 right-2"
            aria-label="Remove file"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      ) : null}
      <p className="text-sm text-muted-foreground flex items-center gap-2">
        <BadgeInfoIcon size={16} />
        {t("crop-and-save-your-image-before-sharing-it")}
      </p>

      {error && <p className="text-red-500">{error}</p>}

      <div className="flex-1 hidden justify-center items-center">
        <canvas
          ref={previewCanvasRef}
          style={{
            border: "1px solid black",
            objectFit: "contain",
            width: completedCrop?.width,
            height: completedCrop?.height,
          }}
        />
      </div>
    </div>
  );
};

export default MediaInputDropzone;
