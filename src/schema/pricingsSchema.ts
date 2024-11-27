import { z } from "zod";

// Schema for editing pricing details
export const EditPricingSchema = z.object({
  // First pricing tier
  regular_preroll: z.string().refine((val) => !isNaN(Number(val)), {
    message: "This field must be a number",
  }),
  regular_midroll: z.string().refine((val) => !isNaN(Number(val)), {
    message: "This field must be a number",
  }),
  regular_endroll: z.string().refine((val) => !isNaN(Number(val)), {
    message: "This field must be a number",
  }),
  sponsership_sectionOfEpo: z.string().refine((val) => !isNaN(Number(val)), {
    message: "This field must be a number",
  }),
  sponsership_visual: z.string().refine((val) => !isNaN(Number(val)), {
    message: "This field must be a number",
  }),
  hosting_fullEpo: z.string().refine((val) => !isNaN(Number(val)), {
    message: "This field must be a number",
  }),
});

// Type definition for the EditPricingSchema
export type EditPricingSchema = z.infer<typeof EditPricingSchema>;
