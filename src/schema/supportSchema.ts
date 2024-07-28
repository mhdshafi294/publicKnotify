import { z } from "zod";

export const SupportSchema = z.object({
  message: z.string().min(1, "error-message.message"),
  email: z
    .string()
    .min(1, "error-message.email")
    .email("error-message.email-invalid"),
});

export type SupportSchema = z.infer<typeof SupportSchema>;
