import { z } from "zod";

export const createPlaylistSchema = z.object({
  name: z.string().min(1, "error-message.email"),
  description: z
    .string()
    .min(1, "error-message.summary")
    .min(25, "error-message.summary-short")
    .optional(),
  type: z.enum(["full", "bouns", "trialer"], {
    required_error: "You need to select a playlist type.",
  }),
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
        return data?.size < 4 * 1024 * 1024;
      },
      {
        message: "error-message.image-size",
      }
    ),
});

export type createPlaylistSchema = z.infer<typeof createPlaylistSchema>;
