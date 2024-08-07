import { z } from "zod";

// Regular expression for validating phone numbers
export const phoneRegex = new RegExp(
  /^[+]?[(]?[0-9]{1,3}(?:[-\s]?[0-9]{1,4})?[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/im
);

// Schema for login form validation
export const loginSchema = z.object({
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
  password: z
    .string()
    .min(1, "error-message.password")
    .min(8, "error-message.password-short"),
});

// Schema for sign-up form validation
export const signUpSchema = z
  .object({
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
    password: z
      .string()
      .min(1, "error-message.password")
      .min(8, "error-message.password-short"),
    password_confirmation: z
      .string()
      .min(1, "error-message.password")
      .min(8, "error-message.password-short"),
    documents: z
      .instanceof(File)
      .optional()
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
    type: z.string(),
    terms: z.boolean(),
  })
  .refine((data) => data.password === data.password_confirmation, {
    message: "Passwords must match",
    path: ["password_confirmation"],
  })
  .refine((data) => data.terms, {
    message: "error-message.terms",
    path: ["terms"],
  })
  .refine(
    (data) => {
      if (data.type === "company" && !data.documents) {
        return false;
      }
      return true;
    },
    {
      message: "error-message.documents",
      path: ["documents"],
    }
  );

// Schema for forgot password form validation
export const forgotPasswordSchema = z.object({
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
});

// Schema for code verification form validation
export const checkCodeSchema = z.object({
  code: z
    .string()
    .min(4, "error-message.otp-invalid")
    .max(4, "error-message.otp-invalid"),
});

// Schema for setting new password form validation
export const newPasswordSchema = z
  .object({
    new_password: z
      .string()
      .min(1, "error-message.password")
      .min(8, "error-message.password-short"),
    new_password_confirmation: z
      .string()
      .min(1, "error-message.confirm-password"),
  })
  .refine((data) => data.new_password === data.new_password_confirmation, {
    path: ["new_password_confirmation"],
    message: "error-message.confirm-password-match",
  });

// Type definitions for the schemas
export type loginSchema = z.infer<typeof loginSchema>;
export type signUpSchema = z.infer<typeof signUpSchema>;
export type forgotPasswordSchema = z.infer<typeof forgotPasswordSchema>;
export type checkCodeSchema = z.infer<typeof checkCodeSchema>;
export type newPasswordSchema = z.infer<typeof newPasswordSchema>;
