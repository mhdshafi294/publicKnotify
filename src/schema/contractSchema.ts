import { z } from "zod";

const periodRegex = /^([0-5]?\d):([0-5]\d)$/;

// Regular expression for validating time in HH:mm format (24-hour)
const timeRegex = /^([01]\d|2[0-3]):([0-5]\d)$/;

const costRegex = /^\d+(\.\d{1,2})?$/;

export const ContractSchema = z.object({
  company_request_id: z.string().optional(),
  media_type: z.enum(["video", "audio"], {
    required_error: "createMetadataSchema.errorMessage.typeRequired",
  }),
  // episode_type: z.enum(["Full", "Bonus", "Trailer"], {
  //   required_error: "createMetadataSchema.errorMessage.typeRequired",
  // }),
  advertising_type: z.string({
    required_error: "createMetadataSchema.errorMessage.addPlaceError",
  }),
  advertising_section_id: z.string({
    required_error: "createMetadataSchema.errorMessage.addPlaceError",
  }),
  ad_period: z.string().refine((val) => periodRegex.test(val), {
    message: "createMetadataSchema.errorMessage.addPeriodError",
  }),
  ad_cost: z.string().refine((val) => costRegex.test(val), {
    message: "createMetadataSchema.errorMessage.addCostError",
  }),
  publishing_date: z.date({
    required_error: "createMetadataSchema.errorMessage.dateRequired",
  }),

  // Publishing time validation: Must be a valid time in HH:mm format
  publishing_time: z.string().refine((val) => timeRegex.test(val), {
    message: "createMetadataSchema.errorMessage.invalidTimeFormat",
  }),

  description: z
    .string()
    .min(1, "createMetadataSchema.errorMessage.summary")
    .min(25, "createMetadataSchema.errorMessage.summaryShort"),
});

export type ContractSchema = z.infer<typeof ContractSchema>;
