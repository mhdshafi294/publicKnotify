import { z } from "zod";

// Schema for editing pricing details
export const EditPricingSchema = z.object({
  // First pricing tier
  first: z
    .string()
    .min(1, "This field is required")
    .refine((val) => !isNaN(Number(val)), {
      message: "This field must be a number",
    }),

  // Middle pricing tier
  middle: z
    .string()
    .min(1, "This field is required")
    .refine((val) => !isNaN(Number(val)), {
      message: "This field must be a number",
    }),

  // End pricing tier
  end: z
    .string()
    .min(1, "This field is required")
    .refine((val) => !isNaN(Number(val)), {
      message: "This field must be a number",
    }),

  // Video pricing tier
  video: z
    .string()
    .min(1, "This field is required")
    .refine((val) => !isNaN(Number(val)), {
      message: "This field must be a number",
    }),
});

// Type definition for the EditPricingSchema
export type EditPricingSchema = z.infer<typeof EditPricingSchema>;
