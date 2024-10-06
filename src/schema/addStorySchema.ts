import { z } from "zod";

// Define a custom validation for video duration
const maxVideoDuration = 90; // seconds

export const AddStorySchema = z.object({
  scope: z.enum(["all", "company"], {
    required_error: "createMetadataSchema.errorMessage.typeRequired",
  }),
  color: z.string().optional(),
  description: z.string().min(1, "createMetadataSchema.errorMessage.summary"),

  // Media field (optional), accepts either an image or a video
  media: z
    .instanceof(File)
    .optional()
    .refine(
      (file) => {
        if (!file?.name) return true; // Allow if no file is provided
        if (file.type.startsWith("image/")) {
          return file.type !== "image/svg+xml"; // Validates as image but excludes SVG
        }
        if (file.type.startsWith("video/")) {
          return file.size <= maxVideoDuration * 1024 * 1024; // Validates video, max 90 seconds (size-based)
        }
        return false; // Invalid file type if not an image or video
      },
      {
        message:
          "Media must be either a valid image (non-SVG) or a video not longer than 90 seconds",
      }
    ),

  thumbnail: z
    .instanceof(File)
    .optional()
    .refine(
      (data) => {
        if (!data?.name) return true; // Allow if no file is provided
        return (
          data?.type.startsWith("image/") && data?.type !== "image/svg+xml"
        );
      },
      {
        message: "createMetadataSchema.errorMessage.invalidThumbnail",
      }
    ),
});

export type AddStorySchema = z.infer<typeof AddStorySchema>;
