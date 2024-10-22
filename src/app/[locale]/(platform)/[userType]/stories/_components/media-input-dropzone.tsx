"use client";

// External imports
import { createFFmpeg, fetchFile } from "@ffmpeg/ffmpeg";
import { BadgeInfoIcon, Scissors, Upload, X } from "lucide-react";
import Image from "next/image";
import { Dispatch, useCallback, useEffect, useRef, useState } from "react";
import { useDropzone } from "react-dropzone";
import ReactCrop, { Crop, PixelCrop } from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";

// Local imports
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Loader from "@/components/ui/loader";
import { Slider } from "@/components/ui/slider";
import { useDebounceEffect } from "@/hooks/useDebounceEffect";
import { canvasPreview } from "@/lib/reactImageCrop/canvasPreview";
import { cn, convertFileToURL } from "@/lib/utils";
import { useTranslations } from "next-intl";

const ffmpeg = createFFmpeg({ log: true });

type PropsType = {
  file: File | string | null;
  setFile: Dispatch<React.SetStateAction<File | null>>;
};

/**
 * MediaInputDropzone component for handling media file uploads,
 * image cropping, and video trimming. Supports both images and videos,
 * providing an interactive UI for users to edit files before saving.
 *
 * @param {Object} props - The properties passed to the component.
 * @param {File | string | null} props.file - The initial file to be processed.
 * @param {Dispatch<React.SetStateAction<File | null>>} props.setFile - Function to set the processed file.
 *
 * @returns {JSX.Element} The rendered MediaInputDropzone component.
 */
export default function MediaInputDropzone({ file, setFile }: PropsType) {
  const t = useTranslations("Index");
  const [error, setError] = useState<string | null>(null);
  const [fileSrc, setFileSrc] = useState<string | File | null>(file);
  const [crop, setCrop] = useState<Crop>();
  const [completedCrop, setCompletedCrop] = useState<PixelCrop>();
  const [isCropping, setIsCropping] = useState(false);
  const [scale, setScale] = useState(1);
  const [rotate, setRotate] = useState(0);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const imgRef = useRef<HTMLImageElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const previewCanvasRef = useRef<HTMLCanvasElement>(null);
  const [videoTrimStart, setVideoTrimStart] = useState(0);
  const [videoTrimEnd, setVideoTrimEnd] = useState(100);
  const [videoDuration, setVideoDuration] = useState(0);
  const [isFFmpegReady, setIsFFmpegReady] = useState(false);
  const [isTrimming, setIsTrimming] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    if (!isMounted) setIsMounted(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    /**
     * Loads the ffmpeg library if it hasn't been loaded yet.
     * If ffmpeg is already loaded, it does nothing.
     * Once ffmpeg is loaded, it sets isFFmpegReady to true.
     * @returns {Promise<void>}
     */
    const loadFFmpeg = async () => {
      if (ffmpeg.isLoaded()) {
        return;
      }
      await ffmpeg.load();
      setIsFFmpegReady(true);
    };
    loadFFmpeg();
  }, []);

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

  const handleRemoveFile = () => {
    setFileSrc(null);
    setFile(null);
    setCrop(undefined);
    setCompletedCrop(undefined);
    setError(null);
    setVideoTrimStart(0);
    setVideoTrimEnd(100);
    setVideoDuration(0);
  };

  const onImageLoaded = useCallback((img: HTMLImageElement) => {
    imgRef.current = img;
  }, []);

  const onSaveEditedImage = useCallback(async () => {
    setIsCropping(true);
    const generateCroppedImage = async () => {
      const image = imgRef.current;
      const previewCanvas = previewCanvasRef.current;
      if (!image || !previewCanvas || !completedCrop) {
        throw new Error("Crop canvas does not exist");
      }

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
        offscreen.convertToBlob({ type: "image/jpeg" }).then((blob) => {
          if (!blob) return resolve(null);
          const croppedFile = new File([blob], "cropped-image.jpeg", {
            type: "image/jpeg",
          });
          resolve(croppedFile);
        });
      });
    };

    const croppedImageFile = await generateCroppedImage();
    if (croppedImageFile) {
      setFile(croppedImageFile);
    }
    setIsCropping(false);
    setCrop(undefined);
  }, [setFile, completedCrop]);

  const onSaveTrimmedVideo = useCallback(async () => {
    if (!isFFmpegReady || !videoRef.current || !(fileSrc instanceof File))
      return;

    setIsTrimming(true);

    try {
      const inputFileName = "input.mp4";
      const outputFileName = "output.mp4";

      ffmpeg.FS("writeFile", inputFileName, await fetchFile(fileSrc));

      const startTime = (videoTrimStart / 100) * videoDuration;
      const endTime = (videoTrimEnd / 100) * videoDuration;
      const duration = endTime - startTime;

      await ffmpeg.run(
        "-ss",
        startTime.toString(),
        "-i",
        inputFileName,
        "-t",
        duration.toString(),
        "-c",
        "copy",
        outputFileName
      );

      const data = ffmpeg.FS("readFile", outputFileName);
      const uint8Array = new Uint8Array(data.buffer);
      const blob = new Blob([uint8Array], { type: "video/mp4" });
      const trimmedFile = new File([blob], "trimmed-video.mp4", {
        type: "video/mp4",
      });

      setFile(trimmedFile);
      setIsTrimming(false);
      setVideoTrimStart(0);
      setVideoTrimEnd(100);
    } catch (error) {
      console.error("Error during video trimming:", error);
      setError("An error occurred while trimming the video.");
      setIsTrimming(false);
    }
  }, [
    isFFmpegReady,
    fileSrc,
    setFile,
    videoTrimStart,
    videoTrimEnd,
    videoDuration,
  ]);

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

  useEffect(() => {
    if (
      videoRef.current &&
      file instanceof File &&
      file.type.startsWith("video/")
    ) {
      videoRef.current.onloadedmetadata = () => {
        if (videoRef.current) {
          setVideoDuration(videoRef.current.duration);
        }
      };
    }
  }, [file]);

  if (!isMounted) return null;

  return (
    <div className="flex flex-col gap-4 min-h-80 relative">
      {/* File Dropzone and Image/Video Preview */}
      {!(fileSrc instanceof File && fileSrc.type.startsWith("image/")) ? (
        <div
          {...getRootProps({
            refKey: "innerref",
            onTouchStart: () => {
              inputRef.current?.click();
            },
          })}
          className="h-80 relative flex-1 border border-dashed flex justify-center items-center shrink-0 rounded-xl"
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
                  ref={videoRef}
                  src={
                    file instanceof File
                      ? convertFileToURL(file)
                      : file
                      ? file
                      : fileSrc instanceof File
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
          <div className="flex justify-between items-end gap-2">
            <div className="flex flex-col gap-1">
              <Label htmlFor="scale-input">{t("scale")} </Label>
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
              <Label htmlFor="rotate-input">{t("rotate")} </Label>
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
              className="gap-2"
              disabled={!convertFileToURL(fileSrc) || !crop}
              onClick={onSaveEditedImage}
            >
              {isCropping ? "Croping..." : "Crop"}
              {isCropping ? (
                <Loader className="h-4 w-4" />
              ) : (
                <Scissors className="h-4 w-4" />
              )}
              {/* <SaveIcon className="h-4 w-4" /> */}
            </Button>
          </div>
          <ReactCrop
            crop={crop}
            onChange={(_, percentCrop) => setCrop(percentCrop)}
            onComplete={(c) => setCompletedCrop(c)}
            aspect={undefined}
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
                src={convertFileToURL(file instanceof File ? file : fileSrc)}
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

      {/* Video Trim Section */}
      {fileSrc instanceof File && fileSrc.type.startsWith("video/") ? (
        <div className="relative h-80 flex-1 flex flex-col gap-5">
          <div className="flex justify-between items-end">
            <div className="flex flex-col gap-1 w-full">
              <Label htmlFor="trim-slider">Trim Video: </Label>
              <Slider
                id="trim-slider"
                min={0}
                max={100}
                step={1}
                value={[videoTrimStart, videoTrimEnd]}
                onValueChange={([start, end]) => {
                  setVideoTrimStart(start);
                  setVideoTrimEnd(end);
                }}
                className="w-full"
              />
              <style jsx>{`
                .slider-thumb:first-of-type {
                  background-color: #3b82f6; /* blue-500 */
                }
                .slider-thumb:last-of-type {
                  background-color: #ef4444; /* red-500 */
                }
              `}</style>
            </div>
            <Button
              variant="secondary"
              type="button"
              size="sm"
              className="gap-2 ml-4"
              onClick={onSaveTrimmedVideo}
              disabled={!isFFmpegReady || isTrimming}
            >
              {isTrimming ? "Trimming..." : "Trim"}{" "}
              <Scissors className="h-4 w-4" />
            </Button>
          </div>
          <div className="text-sm">
            Trim: {((videoTrimStart / 100) * videoDuration).toFixed(2)}s -{" "}
            {((videoTrimEnd / 100) * videoDuration).toFixed(2)}s
          </div>

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
        {fileSrc instanceof File && fileSrc.type.startsWith("image/")
          ? t("crop-and-save-your-image-before-sharing-it")
          : t("trim-and-save-your-video-before-sharing-it")}
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
}
