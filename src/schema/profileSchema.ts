import { z } from "zod";

// Regular expression for validating phone numbers
export const phoneRegex = new RegExp(
  /^[+]?[(]?[0-9]{1,3}(?:[-\s]?[0-9]{1,4})?[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/im
);

// Schema for User Profile
export const UserProfileSchema = z.object({
  // Profile image validation
  image: z
    .instanceof(File)
    .optional()
    .refine(
      (data) =>
        !data?.name ||
        (data.type.startsWith("image/") && data.type !== "image/svg+xml"),
      {
        message: "Invalid image type. Only images are allowed.",
      }
    )
    .refine((data) => !data?.name || data.size < 4 * 1024 * 1024, {
      message: "createMetadataSchema.errorMessage.imageSize",
    }),
  // Full name validation
  full_name: z.string().min(1, "createMetadataSchema.errorMessage.name"),
  // Phone number validation
  phone: z
    .object({
      code: z.string(),
      phone: z.string(),
    })
    // .refine((data) => data.phone.length !== 0, "Phone number is required.")
    .refine(
      (data) => phoneRegex.test(`${data.code}${data.phone}`),
      "invalidPhone"
    ),
  // ISO code validation
  iso_code: z.string(),
  // Email validation
  email: z
    .string()
    .min(1, "createMetadataSchema.errorMessage.email")
    .email("Invalid email address."),
});

// Schema for Company Profile
export const CompanyProfileSchema = z.object({
  // Profile image validation
  image: z
    .instanceof(File)
    .optional()
    .refine(
      (data) =>
        !data?.name ||
        (data.type.startsWith("image/") && data.type !== "image/svg+xml"),
      {
        message: "Invalid image type. Only images are allowed.",
      }
    )
    .refine((data) => !data?.name || data.size < 4 * 1024 * 1024, {
      message: "createMetadataSchema.errorMessage.imageSize",
    }),
  // Full name validation
  full_name: z.string().min(1, "createMetadataSchema.errorMessage.name"),
  // Phone number validation
  phone: z
    .object({
      code: z.string(),
      phone: z.string(),
    })
    // .refine((data) => data.phone.length !== 0, "Phone number is required.")
    .refine(
      (data) => phoneRegex.test(`${data.code}${data.phone}`),
      "invalidPhone"
    ),
  // ISO code validation
  iso_code: z.string(),
  // Documents validation
  documents: z
    .instanceof(File)
    .refine(
      (data) =>
        !data?.name ||
        [
          "image/png",
          "image/jpg",
          "image/jpeg",
          "image/webp",
          "application/pdf",
        ].includes(data.type),
      {
        message:
          "Invalid document type. Allowed types: png, jpg, jpeg, webp, pdf.",
      }
    )
    .refine((data) => !data?.name || data.size < 5 * 1024 * 1024, {
      message: "Document size should be less than 5MB.",
    }),
  // Email validation
  email: z
    .string()
    .min(1, "createMetadataSchema.errorMessage.email")
    .email("Invalid email address."),
});

// Schema for Podcaster Profile
export const PodcasterProfileSchema = z
  .object({
    // Profile image validation
    image: z
      .instanceof(File)
      .optional()
      .refine(
        (data) =>
          !data?.name ||
          (data.type.startsWith("image/") && data.type !== "image/svg+xml"),
        {
          message: "Invalid image type. Only images are allowed.",
        }
      )
      .refine((data) => !data?.name || data.size < 4 * 1024 * 1024, {
        message: "createMetadataSchema.errorMessage.imageSize",
      }),
    // Full name validation
    full_name: z.string().min(1, "createMetadataSchema.errorMessage.name"),
    // Phone number validation
    phone: z
      .object({
        code: z.string(),
        phone: z.string(),
      })
      // .refine((data) => data.phone.length !== 0, "Phone number is required.")
      .refine(
        (data) => phoneRegex.test(`${data.code}${data.phone}`),
        "invalidPhone"
      )
      .optional(),
    // ISO code validation
    iso_code: z.string(),
    // Email validation
    email: z
      .string()
      .min(1, "createMetadataSchema.errorMessage.email")
      .email("Invalid email address."),
    // YouTube URL validation
    youtube: z
      .string()
      .optional()
      .refine(
        (url) =>
          !url ||
          /^https:\/\/(www\.)?youtube\.com\/channel\/[A-Za-z0-9_-]+$/.test(url),
        "createMetadataSchema.errorMessage.youtubeURL"
      ),
    // Spotify URL validation
    spotify: z
      .string()
      .optional()
      .refine(
        (url) =>
          !url ||
          /^https:\/\/open\.spotify\.com\/artist\/[A-Za-z0-9]+$/.test(url),
        "createMetadataSchema.errorMessage.spotifyURL"
      ),
    // Categories validation
    categories: z.array(z.string()),
  })
  .superRefine((data, ctx) => {
    if (!data.youtube && !data.spotify) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Either YouTube or Spotify URL is required.",
        path: ["youtube"],
      });
    }
  });

// Type definitions for the schemas
export type UserProfileSchema = z.infer<typeof UserProfileSchema>;
export type CompanyProfileSchema = z.infer<typeof CompanyProfileSchema>;
export type PodcasterProfileSchema = z.infer<typeof PodcasterProfileSchema>;
