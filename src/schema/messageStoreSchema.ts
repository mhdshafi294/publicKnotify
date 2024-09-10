import { z } from "zod";

export const MessageStoreSchema = z
  .object({
    conversation_id: z.string().min(1, "error-message.title"),
    content: z.string().min(1, "error-message.title").optional(),
    media: z
      .instanceof(File)
      .refine((img) => img.size < 4 * 1024 * 1024, {
        message: "createMetadataSchema.errorMessage.thumbnail-size",
      })
      .array(),
  })
  .refine((data) => data.content || data.media.length > 0, {
    message: "Either content or media must be provided.",
    path: ["content"], // This points to the 'content' field for the error.
  });

export type MessageStoreSchema = z.infer<typeof MessageStoreSchema>;
