"use server";

// Importing the schema for validation and the service to handle support messages
import { SupportSchema } from "@/schema/supportSchema";
import sendSupportMessage from "@/services/support/send-support-message";

/**
 * Sends a support message using the provided body data.
 *
 * @param {SupportSchema} body - The validated data for the support message.
 * @returns {Promise} - The API response after attempting to send the support message.
 */
export const supportAction = async (body: SupportSchema) => {
  // Calling the service to send the support message with the provided body data
  return await sendSupportMessage(body);
};
