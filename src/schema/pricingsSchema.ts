import { z } from "zod";

// Schema for editing pricing details
export const EditPricingSchema = z.object({
  // First pricing tier
  "Pre roll": z.string().refine((val) => !isNaN(Number(val)), {
    message: "This field must be a number",
  }),
  "Mid roll": z.string().refine((val) => !isNaN(Number(val)), {
    message: "This field must be a number",
  }),
  "Post roll": z.string().refine((val) => !isNaN(Number(val)), {
    message: "This field must be a number",
  }),
  "Section Of Episode": z.string().refine((val) => !isNaN(Number(val)), {
    message: "This field must be a number",
  }),
  "Visual Brand Representation": z
    .string()
    .refine((val) => !isNaN(Number(val)), {
      message: "This field must be a number",
    }),
  "Full Episode": z.string().refine((val) => !isNaN(Number(val)), {
    message: "This field must be a number",
  }),
});

// Type definition for the EditPricingSchema
export type EditPricingSchema = z.infer<typeof EditPricingSchema>;
