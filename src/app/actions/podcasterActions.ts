"use server";

// Import statements organized by categories

// Podcaster services
import addPodcastToFavorite from "@/services/podcaster/add-to-favorite";
import getCompanySelfPodcasters from "@/services/podcaster/get-company-self-podcasters";
import getMyFavoritePodcasters from "@/services/podcaster/get-my-favorite-podcasters";
import getPodcaster from "@/services/podcaster/get-podcaster";
import getPodcasters from "@/services/podcaster/get-podcasters";
import getPodcastersByCompany from "@/services/podcaster/get-podcasters-by-company";
import removeFromFavorite from "@/services/podcaster/remove-from-favorite";

/**
 * Fetches a list of podcasters with optional search and pagination.
 *
 * @param {Object} params - The parameters for the API request.
 * @param {string} params.count - The number of podcasters to fetch.
 * @param {string} params.search - The search query for filtering podcasters.
 * @param {string} params.page - The page number for pagination.
 * @param {string} params.type - The type of podcaster.
 * @returns {Promise} - The API response containing podcasters.
 */
export const getPodcastersAction = async ({
  count = "24",
  search,
  page = "1",
  type,
}: {
  count?: string;
  search?: string;
  page?: string;
  type: string;
}) => {
  return await getPodcasters({ count, search, page, type });
};

/**
 * Fetches details of a specific podcaster.
 *
 * @param {Object} params - The parameters for the API request.
 * @param {string} params?.id - The ID of the podcaster.
 * @param {string} params.type - The type of podcaster.
 * @returns {Promise} - The API response containing podcaster details.
 */
export const getPodcasterAction = async ({
  id,
  type,
}: {
  id: string;
  type: string;
}) => {
  return await getPodcaster({ id, type });
};

/**
 * Adds a podcaster to the favorites list.
 *
 * @param {Object} params - The parameters for the API request.
 * @param {string[]} params.categories - The categories to add to the favorite list.
 * @param {string} params?.id - The ID of the podcaster.
 * @param {string} params.type - The type of podcaster.
 * @returns {Promise} - The API response.
 */
export const addToFavoriteAction = async ({
  categories,
  id,
  type,
}: {
  categories: string[];
  id: string;
  type: string;
}) => {
  return await addPodcastToFavorite({ categories, podcasterId: id, type });
};

/**
 * Removes a podcaster from the favorites list.
 *
 * @param {Object} params - The parameters for the API request.
 * @param {string} params?.id - The ID of the podcaster.
 * @param {string} params.type - The type of podcaster.
 * @returns {Promise} - The API response.
 */
export const removeFromFavoriteAction = async ({
  id,
  type,
}: {
  id: string;
  type: string;
}) => {
  return await removeFromFavorite({ podcasterId: id, type });
};

/**
 * Fetches a list of favorite podcasters with optional search and pagination.
 *
 * @param {Object} params - The parameters for the API request.
 * @param {string} params.page - The page number for pagination.
 * @param {string} params.count - The number of podcasters to fetch.
 * @param {string} params.category_id - The category ID for filtering.
 * @param {string} params.type - The type of podcaster.
 * @returns {Promise} - The API response containing favorite podcasters.
 */
export const getMyFavoritePodcastersAction = async ({
  page = "1",
  count = "12",
  category_id,
  type,
}: {
  page?: string;
  count?: string;
  category_id?: string;
  type: string;
}) => {
  return await getMyFavoritePodcasters({ page, count, category_id, type });
};

/**
 * Fetches a list of podcasters for a company with optional search and pagination.
 *
 * @param {Object} params - The parameters for the API request.
 * @param {string} params.count - The number of podcasters to fetch.
 * @param {string} params.search - The search query for filtering podcasters.
 * @param {string} params.page - The page number for pagination.
 * @param {string} params.type - The type of podcaster.
 * @returns {Promise} - The API response containing podcasters.
 */
export const getCompanySelfPodcastersAction = async ({
  count = "24",
  search,
  page = "1",
  type,
}: {
  count?: string;
  search?: string;
  page?: string;
  type: string;
}) => {
  return await getCompanySelfPodcasters({ count, search, page, type });
};

/**
 * Fetches a list of podcasters by company with optional search and pagination.
 *
 * @param {Object} params - The parameters for the API request.
 * @param {string} params.companyId - The ID of the company.
 * @param {string} params.count - The number of podcasters to fetch.
 * @param {string} params.search - The search query for filtering podcasters.
 * @param {string} params.page - The page number for pagination.
 * @param {string} params.type - The type of podcaster.
 * @returns {Promise} - The API response containing podcasters.
 */
export const getPodcastersByCompanyAction = async ({
  companyId,
  count = "24",
  search,
  page = "1",
  type,
}: {
  companyId: string;
  count?: string;
  search?: string;
  page?: string;
  type: string;
}) => {
  return await getPodcastersByCompany({ companyId, count, search, page, type });
};
