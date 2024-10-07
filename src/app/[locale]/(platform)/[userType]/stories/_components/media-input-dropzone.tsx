"use client";
import { Button } from "@/components/ui/button";
import { cn, convertFileToURL } from "@/lib/utils";
import { Upload } from "lucide-react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { Dispatch, FC, useCallback, useRef, useState } from "react";
import { useDropzone } from "react-dropzone";
import Cropper from "react-easy-crop";
import { getCroppedImg } from "@/lib/cropUtils"; // Utility to crop image using canvas

type PropsType = {
  file: File | string | null;
  setFile: Dispatch<React.SetStateAction<File | null>>;
};

type CropAreaType = {
  width: number;
  height: number;
  x: number;
  y: number;
};

const MediaInputDropzone: FC<PropsType> = ({ file, setFile }) => {
  const t = useTranslations("Index");
  const [error, setError] = useState<string | null>(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] =
    useState<CropAreaType | null>(null);
  const [editedImage, setEditedImage] = useState<string | null>(null);
  const [filter, setFilter] = useState(""); // CSS filter

  const inputRef = useRef<HTMLInputElement | null>(null);

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      setFile(acceptedFiles[0]);
      setError(null);
    },
    [setFile]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    maxFiles: 1,
    accept: {
      "image/jpeg": [".jpeg", ".jpg"],
      "image/png": [".png"],
      "image/gif": [".gif"],
    },
  });

  const onCropComplete = useCallback(
    (_: unknown, croppedAreaPixels: CropAreaType) => {
      setCroppedAreaPixels(croppedAreaPixels);
    },
    []
  );

  const showCroppedImage = useCallback(async () => {
    if (file instanceof File) {
      const croppedImage = await getCroppedImg(
        URL.createObjectURL(file),
        croppedAreaPixels
      );
      setEditedImage(croppedImage); // Set cropped image as edited image
    }
  }, [file, croppedAreaPixels]);

  return (
    <div className="flex flex-col gap-4">
      {/* Hide file uploader if cropping has started */}

      <div
        {...getRootProps({ refKey: "innerref" })}
        className="h-96 w-full border border-dashed flex justify-center items-center shrink-0 rounded-xl"
      >
        <input {...getInputProps({ ref: inputRef, refKey: "innerref" })} />
        {(file instanceof File && file.name) ||
        (typeof file === "string" && file.length > 0) ? (
          <div className="relative w-full h-96">
            {file instanceof File && file.type.startsWith("image/") ? (
              <>
                {/* Cropping Section */}
                <Cropper
                  image={URL.createObjectURL(file)}
                  crop={crop}
                  zoom={zoom}
                  aspect={9 / 16}
                  onCropChange={setCrop}
                  onZoomChange={setZoom}
                  onCropComplete={onCropComplete}
                />
                <div className="flex flex-col gap-4">
                  <Button onClick={showCroppedImage}>{t("crop-image")}</Button>
                </div>
              </>
            ) : (
              <video
                src={file instanceof File ? convertFileToURL(file) : file}
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

      {/* Image Resize and Filter Section */}
      {file instanceof File &&
        file.type.startsWith("image/") &&
        editedImage && (
          <>
            <div className="flex gap-4">
              <label>
                {t("zoom")}: {zoom.toFixed(1)}x
                <input
                  type="range"
                  min={1}
                  max={3}
                  step={0.1}
                  value={zoom}
                  onChange={(e) => setZoom(Number(e.target.value))}
                />
              </label>

              {/* Filters */}
              <label>
                {t("filter")}:
                <select
                  onChange={(e) => setFilter(e.target.value)}
                  value={filter}
                >
                  <option value="">None</option>
                  <option value="grayscale(100%)">Grayscale</option>
                  <option value="sepia(100%)">Sepia</option>
                  <option value="brightness(150%)">Brighten</option>
                  <option value="contrast(150%)">Increase Contrast</option>
                </select>
              </label>
            </div>

            {editedImage && (
              <div className="mt-4">
                <h3>{t("edited-image")}</h3>
                <img
                  src={editedImage}
                  alt="Cropped"
                  style={{ filter }} // Apply filter to edited image
                  className="object-contain max-w-full h-auto"
                />
              </div>
            )}
          </>
        )}

      {error && <p className="text-red-500">{error}</p>}
    </div>
  );
};

export default MediaInputDropzone;
