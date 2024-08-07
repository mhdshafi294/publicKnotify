import { z } from "zod";

/**
 * Schema for validating support messages.
 */
export const SupportSchema = z.object({
  /**
   * Message validation: Must be a non-empty string.
   */
  message: z.string().min(1, "error-message.message"),

  /**
   * Email validation: Must be a non-empty string and a valid email format.
   */
  email: z
    .string()
    .min(1, "error-message.email")
    .email("error-message.email-invalid"),
});

/**
 * Type definition for the support schema.
 */
export type SupportSchema = z.infer<typeof SupportSchema>;
