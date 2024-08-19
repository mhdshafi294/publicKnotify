import { z } from "zod";

export const CreateShowSchema = z.object({
  title: z.string().min(1, "error-message.title"),
  description: z.string(),
  type: z.string(),
});

export type CreateShowSchema = z.infer<typeof CreateShowSchema>;
