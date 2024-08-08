"use server";

// Importing schemas and services
import { EditPricingSchema } from "@/schema/pricingsSchema";
import authenticateYoutube from "@/services/profile/authenticate-youtube";
import CompanyEditProfile from "@/services/profile/company-edit-profile";
import getProfile from "@/services/profile/get-profile";
import podcasterEditProfile from "@/services/profile/podcaster-edit-profile";
import createOrUpdatePrice from "@/services/profile/price/create-or-update-price";
import getPricings from "@/services/profile/price/get-pricings";
import togglePriceStatus from "@/services/profile/price/toggle-price-status";
import updateProfile from "@/services/profile/update-profile";
import userEditProfile from "@/services/profile/user-edit-profile";

/**
 * Fetches profile details based on user type.
 *
 * @param {Object} params - The parameters for the API request.
 * @param {string} params.type - The type of profile.
 * @returns {Promise} - The API response containing profile details.
 */
export const getProfileAction = async ({ type }: { type: string }) => {
  return await getProfile({ type });
};

/**
 * Updates profile details based on user type.
 *
 * @param {Object} params - The parameters for the API request.
 * @param {FormData} params.formData - The form data containing profile details.
 * @param {string} params.type - The type of profile.
 * @returns {Promise} - The API response.
 */
export const updateProfileAction = async ({
  formData,
  type,
}: {
  formData: FormData;
  type: string;
}) => {
  return await updateProfile({ formData, type });
};

/**
 * Toggles the status of a price.
 *
 * @param {Object} params - The parameters for the API request.
 * @param {string} params.type - The type of price.
 * @returns {Promise} - The API response.
 */
export const togglePriceStatusAction = async ({ type }: { type: string }) => {
  return await togglePriceStatus({ type });
};

/**
 * Creates or updates a price.
 *
 * @param {Object} params - The parameters for the API request.
 * @param {EditPricingSchema} params.body - The body containing pricing details.
 * @returns {Promise} - The API response.
 */
export const createOrCreatePriceAction = async ({
  body,
}: {
  body: EditPricingSchema;
}) => {
  return await createOrUpdatePrice({ body });
};

/**
 * Fetches pricing details based on user type.
 *
 * @param {Object} params - The parameters for the API request.
 * @param {string} params.type - The type of pricing.
 * @returns {Promise} - The API response containing pricing details.
 */
export const getPricingsAction = async ({ type }: { type: string }) => {
  return await getPricings({ type });
};

/**
 * Authenticates YouTube account.
 *
 * @returns {Promise} - The API response.
 */
export const authenticateYoutubeAction = async () => {
  return await authenticateYoutube();
};

/**
 * Edits user profile details.
 *
 * @param {FormData} body - The form data containing user profile details.
 * @returns {Promise} - The API response.
 */
export const userEditProfileAction = async (body: FormData) => {
  return await userEditProfile(body);
};

/**
 * Edits company profile details.
 *
 * @param {FormData} body - The form data containing company profile details.
 * @returns {Promise} - The API response.
 */
export const companyEditProfileAction = async (body: FormData) => {
  return await CompanyEditProfile(body);
};

/**
 * Edits podcaster profile details.
 *
 * @param {FormData} body - The form data containing podcaster profile details.
 * @returns {Promise} - The API response.
 */
export const podcasterEditProfileAction = async (body: FormData) => {
  return await podcasterEditProfile(body);
};
