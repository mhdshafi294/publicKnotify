"use server";

import getPalns from "@/services/plans/get-plans";
import payPlan from "@/services/plans/pay-plan";

/**
 * Retrieves a list of plans based on the provided type.
 *
 * @param {Object} param0 - Parameters for fetching plans.
 * @param {string} param0.type - The type of plans to fetch.
 * @returns {Promise<Object>} - The API response containing the list of plans.
 */

export const getPlansAction = async ({ type }: { type: string }) => {
  return await getPalns({
    type,
  });
};

/**
 * Executes a payment action for a specified plan.
 *
 * @param {Object} param0 - The parameters for the payment action.
 * @param {string} [param0.annual] - Indicates if the payment is for an annual plan.
 * @param {string} param0.playlist_id - The ID of the playlist associated with the plan.
 * @param {string} param0.plan_id - The ID of the plan to be paid for.
 * @param {string} param0.type - The type of the plan.
 * @returns {Promise<Object>} - The API response after executing the payment action.
 */
export const payPlanAction = async ({
  annual,
  playlist_id,
  plan_id,
  type,
}: {
  annual?: string;
  playlist_id: string;
  plan_id: string;
  type: string;
}) => {
  return await payPlan({
    annual,
    playlist_id,
    plan_id,
    type,
  });
};
