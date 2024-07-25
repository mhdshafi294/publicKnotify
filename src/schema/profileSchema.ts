import { z } from "zod";

export const phoneRegex = new RegExp(
  /^[+]?[(]?[0-9]{1,3}(?:[-\s]?[0-9]{1,4})?[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/im
);

export const UserProfileSchema = z.object({
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
  full_name: z.string().min(1, "error-message.email"),
  phone: z
    .object({
      code: z.string(),
      phone: z.string(),
    })
    .refine((data) => data.phone.length !== 0, "error-message.phone")
    .refine(
      (data) => phoneRegex.test(`${data.code}${data.phone}`),
      "error-message.phone-invalid"
    ),
  iso_code: z.string(),

  email: z
    .string()
    .min(1, "error-message.email")
    .email("error-message.email-invalid"),
});
export const CompanyProfileSchema = z.object({
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
  full_name: z.string().min(1, "error-message.email"),
  phone: z
    .object({
      code: z.string(),
      phone: z.string(),
    })
    .refine((data) => data.phone.length !== 0, "error-message.phone")
    .refine(
      (data) => phoneRegex.test(`${data.code}${data.phone}`),
      "error-message.phone-invalid"
    ),
  iso_code: z.string(),
  documents: z
    .instanceof(File)
    .refine(
      (data) => {
        if (!data?.name) return true;
        return [
          "image/png",
          "image/jpg",
          "image/jpeg",
          "image/webp",
          "application/pdf",
        ].includes(data?.type);
      },
      {
        message: "error-message.docs",
      }
    )
    .refine(
      (data) => {
        if (!data?.name) return true;
        return data?.size < 5 * 1024 * 1024;
      },
      {
        message: "error-message.docs-size",
      }
    ),
  email: z
    .string()
    .min(1, "error-message.email")
    .email("error-message.email-invalid"),
});

export type UserProfileSchema = z.infer<typeof UserProfileSchema>;
export type CompanyProfileSchema = z.infer<typeof CompanyProfileSchema>;
