import { z } from "zod";

const timeRegex = /^([01]\d|2[0-3]):([0-5]\d)$/;

export const createMetadataSchema = z
  .object({
    name: z.string().min(1, "error-message.email"),
    summary: z
      .string()
      .min(1, "error-message.summary")
      .min(25, "error-message.summary-short"),
    type: z.enum(["video", "audio"], {
      required_error: "You need to select a notification type.",
    }),
    publishing_date: z.date({
      required_error: "A date of publishing required.",
    }),
    publishing_time: z.string().refine((val) => timeRegex.test(val), {
      message: "Invalid time format. Expected HH:mm (24-hour format).",
    }),
    company_tag: z.string().min(1, "error-message.company_tag"),
    thumbnail: z
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
          message: "error-message.background",
        }
      )
      .refine(
        (data) => {
          if (!data?.name) return true;
          return data?.size < 4 * 1024 * 1024;
        },
        {
          message: "error-message.thumbnail-size",
        }
      ),
    background: z
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
          message: "error-message.background",
        }
      )
      .refine(
        (data) => {
          if (!data?.name) return true; // Allow if file is not provided
          return data?.size < 4 * 1024 * 1024;
        },
        {
          message: "error-message.background-size",
        }
      ),
    play_list_id: z.string().optional(),
    categories: z.string().array().nonempty({
      message: "Can't be empty!",
    }),
    hashtags: z.string().array().nonempty({
      message: "Can't be empty!",
    }),
    company_request_id: z.string().optional(),
    podcast_id: z.string().optional(),
    terms: z.boolean(),
  })
  .refine((data) => data.terms, {
    message: "error-message.terms",
    path: ["terms"],
  });
// .superRefine((data, ctx) => {
//   if (data.type === "audio") {
//     if (!data.thumbnail) {
//       ctx.addIssue({
//         code: z.ZodIssueCode.custom,
//         message: "Thumbnail is required when type is audio.",
//         path: ["thumbnail"],
//       });
//     }
//     if (!data.background) {
//       ctx.addIssue({
//         code: z.ZodIssueCode.custom,
//         message: "Background is required when type is audio.",
//         path: ["background"],
//       });
//     }
//   } else if (data.type === "video") {
//     if (!data.thumbnail) {
//       ctx.addIssue({
//         code: z.ZodIssueCode.custom,
//         message: "Thumbnail is required when type is video.",
//         path: ["thumbnail"],
//       });
//     }
//   }
// });

export type createMetadataSchema = z.infer<typeof createMetadataSchema>;
