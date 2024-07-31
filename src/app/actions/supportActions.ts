"use server";

import { SupportSchema } from "@/schema/supportSchema";
import sendSupportMessage from "@/services/support/send-support-message";

export const supportAction = async (body: SupportSchema) => {
  return await sendSupportMessage(body);
};
