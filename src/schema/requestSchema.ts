import { z } from "zod";

// Regular expression for validating time in HH:mm format (24-hour)
const timeRegex = /^([01]\d|2[0-3]):([0-5]\d)$/;

// Schema for creating a request with detailed validation rules
export const createRequestSchema = z
  .object({
    // Name validation: Must be a non-empty string
    name: z.string().min(1, "error-message.name"),

    // Summary validation: Must be a non-empty string with a minimum length of 25 characters
    summary: z
      .string()
      .min(1, "error-message.summary")
      .min(25, "error-message.summary-short"),

    // Type validation: Must be either 'video' or 'audio'
    type: z.enum(["video", "audio"], {
      required_error: "You need to select a notification type.",
    }),

    // Publishing date validation: Must be a valid date
    publishing_date: z.date({
      required_error: "A date of publishing is required.",
    }),

    // Publishing time validation: Must be a valid time in HH:mm format
    publishing_time: z.string().refine((val) => timeRegex.test(val), {
      message: "Invalid time format. Expected HH:mm (24-hour format).",
    }),

    // Company tag validation: Must be a non-empty string
    company_tag: z.string().min(1, "error-message.company_tag"),

    // Thumbnail validation: Must be a file of a valid image type and size
    thumbnail: z
      .instanceof(File)
      .refine(
        (data) => {
          return !!data?.name; // Ensure there is a file
        },
        {
          message: "error-message.thumbnail-required",
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
          message: "error-message.thumbnail-invalid-type",
        }
      )
      .refine(
        (data) => {
          if (!data?.name) return true;
          return data?.size < 4 * 1024 * 1024; // 4MB size limit
        },
        {
          message: "error-message.thumbnail-size",
        }
      ),

    // Background validation: Must be a file of a valid image type and size
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
          message: "error-message.background-invalid-type",
        }
      )
      .refine(
        (data) => {
          if (!data?.name) return true;
          return data?.size < 4 * 1024 * 1024; // 4MB size limit
        },
        {
          message: "error-message.background-size",
        }
      ),

    // Categories validation: Must be a non-empty array of strings
    categories: z.string().array().nonempty({
      message: "Can't be empty!",
    }),

    // Hashtags validation: Must be a non-empty array of strings
    hashtags: z.string().array().nonempty({
      message: "Can't be empty!",
    }),

    // Ad period validation: Must be a valid time in HH:mm format
    ad_period: z.string().refine((val) => timeRegex.test(val), {
      message: "Invalid time format. Expected HH:mm (24-hour format).",
    }),

    // Ad place validation: Must be one of the specified values
    ad_place: z.enum(["middle", "end", "first", "video"], {
      required_error: "You need to select the position of your ad.",
    }),

    // Podcaster ID validation: Must be a non-empty string
    podcaster_id: z.string().min(1, "error-message.podcaster_id"),

    // Publish to YouTube validation: Must be a non-empty string
    publish_youtube: z.string(),

    // Publish to Spotify validation: Must be a non-empty string
    publish_spotify: z.string(),

    // Terms validation: Must be a boolean
    terms: z.boolean(),
  })
  .refine((data) => data.terms, {
    message: "error-message.terms",
    path: ["terms"],
  });

// Type definition for the create request schema
export type createRequestSchema = z.infer<typeof createRequestSchema>;
