// lib/cropUtils.ts

/**
 * Returns a blob of the cropped image
 *
 * @param {string} imageSrc URL of the image
 * @param {object} crop Object with crop properties (x, y, width, height)
 *
 * @returns {Promise<string>} Promise that resolves to a blob URL of the cropped image
 */

export const getCroppedImg = async (imageSrc: string, crop: any) => {
  const image = new Image();
  image.src = imageSrc;
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");

  const scaleX = image.naturalWidth / image.width;
  const scaleY = image.naturalHeight / image.height;
  canvas.width = crop.width;
  canvas.height = crop.height;

  ctx?.drawImage(
    image,
    crop.x * scaleX,
    crop.y * scaleY,
    crop.width * scaleX,
    crop.height * scaleY,
    0,
    0,
    crop.width,
    crop.height
  );

  return new Promise<string>((resolve, reject) => {
    canvas.toBlob((blob) => {
      if (blob) {
        const fileUrl = URL.createObjectURL(blob);
        resolve(fileUrl);
      } else {
        reject(new Error("Canvas is empty"));
      }
    }, "image/jpeg");
  });
};
