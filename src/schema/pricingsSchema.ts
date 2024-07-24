import { z } from "zod";

export const EditPricingSchema = z.object({
  first: z
    .string()
    .min(1, "this field is required")
    .refine((val) => !isNaN(Number(val)), {
      message: "this field must be a number",
    }),
  middle: z
    .string()
    .min(1, "this field is required")
    .refine((val) => !isNaN(Number(val)), {
      message: "this field must be a number",
    }),
  end: z
    .string()
    .min(1, "this field is required")
    .refine((val) => !isNaN(Number(val)), {
      message: "this field must be a number",
    }),
  video: z
    .string()
    .min(1, "this field is required")
    .refine((val) => !isNaN(Number(val)), {
      message: "this field must be a number",
    }),
});

export type EditPricingSchema = z.infer<typeof EditPricingSchema>;
