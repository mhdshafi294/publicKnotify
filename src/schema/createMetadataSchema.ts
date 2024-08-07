import { z } from "zod";

const timeRegex = /^([01]\d|2[0-3]):([0-5]\d)$/;
const urlRegex = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/;

const fileOrUrlSchema = z.union([
  z
    .instanceof(File)
    .refine(
      (data) => {
        if (!data?.name) return true; // Allow if file is not provided
        return (
          data?.type.startsWith("image/") && data?.type !== "image/svg+xml"
        );
      },
      {
        message:
          "createMetadataSchema.errorMessage.invalidThumbnailOrBackground",
      }
    )
    .refine(
      (data) => {
        if (!data?.name) return true;
        return data?.size < 4 * 1024 * 1024;
      },
      {
        message: "createMetadataSchema.errorMessage.thumbnailOrBackgroundSize",
      }
    ),
  z.string().refine((val) => urlRegex.test(val), {
    message: "createMetadataSchema.errorMessage.invalidUrl",
  }),
]);

export const createMetadataSchema = z
  .object({
    name: z
      .string()
      .min(1, { message: "createMetadataSchema.errorMessage.name" }),
    summary: z
      .string()
      .min(1, { message: "createMetadataSchema.errorMessage.summary" })
      .min(25, { message: "createMetadataSchema.errorMessage.summaryShort" }),
    type: z.enum(["video", "audio"], {
      required_error: "createMetadataSchema.errorMessage.typeRequired",
    }),
    publishing_date: z.date({
      required_error: "createMetadataSchema.errorMessage.dateRequired",
    }),
    publishing_time: z.string().refine((val) => timeRegex.test(val), {
      message: "createMetadataSchema.errorMessage.invalidTimeFormat",
    }),
    company_tag: z
      .string()
      .min(1, { message: "createMetadataSchema.errorMessage.companyTag" }),
    thumbnail: fileOrUrlSchema.optional(),
    background: fileOrUrlSchema.optional(),
    play_list_id: z.string().optional(),
    categories: z.string().array().nonempty({
      message: "createMetadataSchema.errorMessage.categoriesEmpty",
    }),
    hashtags: z.string().array().nonempty({
      message: "createMetadataSchema.errorMessage.hashtagsEmpty",
    }),
    company_request_id: z.string().optional(),
    podcast_id: z.string().optional(),
    terms: z.boolean(),
  })
  .refine((data) => data.terms, {
    message: "createMetadataSchema.errorMessage.terms",
    path: ["terms"],
  })
  .superRefine((data, ctx) => {
    if (data.type === "audio") {
      if (!data.thumbnail) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message:
            "createMetadataSchema.errorMessage.ThumbnailIsRequiredWhenTypeIsAudio",
          path: ["thumbnail"],
        });
      }
      if (!data.background) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message:
            "createMetadataSchema.errorMessage.BackgroundIsRequiredWhenTypeIsAudio",
          path: ["background"],
        });
      }
    } else if (data.type === "video") {
      if (!data.thumbnail) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message:
            "createMetadataSchema.errorMessage.ThumbnailIsRequiredWhenTypeIsVideo",
          path: ["thumbnail"],
        });
      }
    }
  });

export type createMetadataSchema = z.infer<typeof createMetadataSchema>;
