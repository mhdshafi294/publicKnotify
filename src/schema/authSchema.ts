import { z } from "zod";

export const loginSchema = z.object({
  email: z
    .string()
    .min(1, "error-message.email")
    .email("error-message.email-invalid"),
  password: z
    .string()
    .min(1, "error-message.password")
    .min(8, "error-message.password-short"),
});

export const signUpSchema = z
  .object({
    name: z.string().min(1, "error-message.email"),
    phone: z.string().min(1, "error-message.email"),
    password: z
      .string()
      .min(1, "error-message.password")
      .min(8, "error-message.password-short"),
    password_confirmation: z
      .string()
      .min(1, "error-message.password")
      .min(8, "error-message.password-short"),
    terms: z.boolean(),
  })
  .refine((data) => data.password === data.password_confirmation, {
    message: "Passwords must match",
    path: ["password_confirmation"],
  })
  .refine((data) => data.terms, {
    message: "error-message.terms",
    path: ["terms"],
  });

export const forgotPasswordSchema = z.object({
  email: z
    .string()
    .min(1, "error-message.email")
    .email("error-message.email-invalid"),
});

export const checkCodeSchema = z.object({
  code: z
    .string()
    .min(6, "error-message.otp-invalid")
    .max(6, "error-message.otp-invalid"),
});

export const resetPasswordSchema = z
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
export type resetPasswordSchema = z.infer<typeof resetPasswordSchema>;
