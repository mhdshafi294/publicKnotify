import { z } from "zod";

export const CreateShowSchema = z.object({
  name: z.string().min(1, "error-message.title"),
  description: z.string().min(1, "error-message.description"),
  image: z.union([
    z
      .instanceof(File)
      .refine(
        (img) => img.type.startsWith("image/") && img.type !== "image/svg+xml",
        {
          message: "createMetadataSchema.errorMessage.thumbnail-type",
        }
      )
      .refine((img) => img.size < 4 * 1024 * 1024, {
        message: "createMetadataSchema.errorMessage.thumbnail-size",
      }),
    z.string(), // for existing images from the server (in edit mode)
  ]),
  // image: z
  //   .instanceof(File)
  //   .refine(
  //     (img) => img.type.startsWith("image/") && img.type !== "image/svg+xml",
  //     {
  //       message: "createMetadataSchema.errorMessage.thumbnail-type",
  //     }
  //   )
  //   .refine((img) => img.size < 4 * 1024 * 1024, {
  //     message: "createMetadataSchema.errorMessage.thumbnail-size",
  //   }),
  type: z.string().min(1, "error-message.type"),
  categories: z
    .array(z.string().optional())
    .refine((arr) => arr.filter(Boolean).length > 0, {
      message: "error-message.categories",
    }),
  categories1: z.array(z.string().optional()),
  authors: z.array(z.string()).refine((arr) => arr.length > 0, {
    message: "error-message.authors",
  }),
  tags: z.array(z.string()).refine((arr) => arr.length > 0, {
    message: "error-message.tags",
  }),
  show_owner: z.string().min(1, "error-message.show-owner"),
  owner_email: z
    .string()
    .min(1, "error-message.owner_email")
    .email("error-message.email-invalid"),
  copyright: z.string().min(1, "error-message.copyright"),
});

export type CreateShowSchema = z.infer<typeof CreateShowSchema>;
