import { z } from "zod";

const timeRegex = /^([01]\d|2[0-3]):([0-5]\d)$/;

export const createRequestSchema = z
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
      .refine(
        (data) => {
          return !!data?.name; // Ensure there is a file
        },
        {
          message: "error-message.background-required",
        }
      )
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
      .refine(
        (data) => {
          return !!data?.name; // Ensure there is a file
        },
        {
          message: "error-message.background-required",
        }
      )
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
          message: "error-message.background-size",
        }
      ),
    categories: z.string().array().nonempty({
      message: "Can't be empty!",
    }),
    hashtags: z.string().array().nonempty({
      message: "Can't be empty!",
    }),
    ad_period: z.string().refine((val) => timeRegex.test(val), {
      message: "Invalid time format. Expected HH:mm (24-hour format).",
    }),
    ad_place: z.enum(["middle", "end", "first", "video"], {
      required_error: "You need to select the position of your ad.",
    }),
    podcaster_id: z.string().min(1, "error-message.podcaster_id"),
    publish_youtube: z.string(),
    publish_spotify: z.string(),
    terms: z.boolean(),
  })
  .refine((data) => data.terms, {
    message: "error-message.terms",
    path: ["terms"],
  });

export type createRequestSchema = z.infer<typeof createRequestSchema>;
