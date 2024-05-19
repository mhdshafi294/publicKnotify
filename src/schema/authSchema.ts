import { z } from "zod";

export const loginSchema = z.object({
  phone: z
    .string()
    .min(1, "error-message.email")
    .refine(
      (value) => {
        return !isNaN(Number(value));
      },
      {
        message: "error-message.phone-invalid",
      }
    ),
  password: z
    .string()
    .min(1, "error-message.password")
    .min(8, "error-message.password-short"),
});

export const signUpSchema = z
  .object({
    full_name: z.string().min(1, "error-message.email"),
    phone: z
      .string()
      .min(1, "error-message.email")
      .refine(
        (value) => {
          return !isNaN(Number(value));
        },
        {
          message: "error-message.phone-invalid",
        }
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
      if (data.type === "compnay" && !data.documents) {
        return false;
      }
      return true;
    },
    {
      message: "error-message.documents",
      path: ["documents"],
    }
  );

export const forgotPasswordSchema = z.object({
  phone: z
    .string()
    .min(1, "error-message.email")
    .refine(
      (value) => {
        return !isNaN(Number(value));
      },
      {
        message: "error-message.phone-invalid",
      }
    ),
});

export const checkCodeSchema = z.object({
  code: z
    .string()
    .min(4, "error-message.otp-invalid")
    .max(4, "error-message.otp-invalid"),
});

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

export type loginSchema = z.infer<typeof loginSchema>;
export type signUpSchema = z.infer<typeof signUpSchema>;
export type forgotPasswordSchema = z.infer<typeof forgotPasswordSchema>;
export type checkCodeSchema = z.infer<typeof checkCodeSchema>;
export type newPasswordSchema = z.infer<typeof newPasswordSchema>;
