import { z } from "zod";

// Schema for creating a playlist
export const createPlaylistSchema = z.object({
  // Playlist name
  name: z.string().min(1, "error-message.email"),

  // Optional description with a minimum length of 25 characters
  description: z
    .string()
    .min(1, "error-message.summary")
    .min(25, "error-message.summary-short")
    .optional(),

  // Playlist type: can be either "full", "bonus", or "trailer"
  type: z.enum(["full", "bonus", "trailer"], {
    required_error: "You need to select a playlist type.",
  }),

  // Optional image validation
  image: z
    .instanceof(File)
    .optional()
    .refine(
      (data) => {
        if (!data?.name) return true; // Allow if file is not provided
        return (
          data?.type.startsWith("image/") && data?.type !== "image/svg+xml"
        );
      },
      {
        message: "error-message.image",
      }
    )
    .refine(
      (data) => {
        if (!data?.name) return true; // Allow if file is not provided
        return data?.size < 4 * 1024 * 1024; // Ensure file size is less than 4MB
      },
      {
        message: "error-message.image-size",
      }
    ),
});

// Type definition for the createPlaylistSchema
export type createPlaylistSchema = z.infer<typeof createPlaylistSchema>;
