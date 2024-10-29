import { PixelCrop } from "react-image-crop";
import { canvasPreview } from "./canvasPreview";

let previewUrl = "";

/**
 * Converts a canvas element to a Blob.
 *
 * @param {HTMLCanvasElement} canvas - The canvas element to convert.
 * @returns {Promise<Blob | null>} A promise that resolves to a Blob representing the image data, or null if the conversion fails.
 */
function toBlob(canvas: HTMLCanvasElement): Promise<Blob | null> {
  return new Promise((resolve) => {
    canvas.toBlob(resolve);
  });
}

// Returns an image source you should set to state and pass
// `{previewSrc && <img alt="Crop preview" src={previewSrc} />}`
export async function imgPreview(
  image: HTMLImageElement,
  crop: PixelCrop,
  scale = 1,
  rotate = 0
) {
  const canvas = document.createElement("canvas");
  canvasPreview(image, canvas, crop, scale, rotate);

  const blob = await toBlob(canvas);

  if (!blob) {
    console.error("Failed to create blob");
    return "";
  }

  if (previewUrl) {
    URL.revokeObjectURL(previewUrl);
  }

  previewUrl = URL.createObjectURL(blob);
  return previewUrl;
}
