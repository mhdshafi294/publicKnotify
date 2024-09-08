import { z } from "zod";

export const MessageStoreSchema = z.object({
  conversation_id: z.string().min(1, "error-message.title"),
  content: z.string().min(1, "error-message.title"),
  media: z
    .instanceof(File)
    .refine((img) => img.size < 4 * 1024 * 1024, {
      message: "createMetadataSchema.errorMessage.thumbnail-size",
    })
    .array(),
});

export type MessageStoreSchema = z.infer<typeof MessageStoreSchema>;
