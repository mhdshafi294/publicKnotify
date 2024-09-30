"use server";

// Importing request-related services
import cancelRequest from "@/services/requests/cancel-status";
import changeRequestStatus from "@/services/requests/change-status";
import createRequest from "@/services/requests/create-request";
import getCompanySelfPodcasts from "@/services/requests/get-company-self-podcasts";
import getRequest from "@/services/requests/get-request";
import getRequests from "@/services/requests/get-requests";

/**
 * Fetches a list of requests based on provided parameters.
 *
 * @param {Object} params - The parameters for the API request.
 * @param {string} params.page - The page number for pagination.
 * @param {string} params.count - The number of requests to fetch per page.
 * @param {string} params.search - The search query to filter requests.
 * @param {string[]} params.status - The statuses to filter requests.
 * @param {string} params.type - The type of request.
 * @returns {Promise} - The API response containing the list of requests.
 */
export const getRequestsAction = async ({
  page = "1",
  count = "26",
  search,
  status,
  type,
}: {
  page?: string;
  count?: string;
  search?: string;
  status?: string[];
  type: string;
}) => {
  const getRequestsResponse = await getRequests({
    page,
    count,
    search,
    status,
    type,
  });
  return getRequestsResponse;
};

/**
 * Fetches the details of a specific request.
 *
 * @param {Object} params - The parameters for the API request.
 * @param {string} params.id - The ID of the request.
 * @param {string} params.type - The type of request.
 * @returns {Promise} - The API response containing the request details.
 */
export const getRequestAction = async ({
  id,
  type,
}: {
  id: string;
  type: string;
}) => {
  console.log(id);
  const getRequestResponse = await getRequest({
    id,
    type,
  });
  return getRequestResponse;
};

/**
 * Changes the status of a specific request.
 *
 * @param {Object} params - The parameters for the API request.
 * @param {string} params.id - The ID of the request.
 * @param {string} params.status - The new status for the request.
 * @param {string} params.type - The type of request.
 * @returns {Promise} - The API response after changing the request status.
 */
export const changeRequestStatusAction = async ({
  id,
  status,
  type,
}: {
  id: string;
  status: string;
  type: string;
}) => {
  const changeStatusResponse = await changeRequestStatus({
    id,
    status,
    type,
  });
  return changeStatusResponse;
};

/**
 * Cancels a specific request.
 *
 * @param {Object} params - The parameters for the API request.
 * @param {string} params.id - The ID of the request.
 * @param {string} params.type - The type of request.
 * @returns {Promise} - The API response after canceling the request.
 */
export const cancelRequestAction = async ({
  id,
  type,
}: {
  id: string;
  type: string;
}) => {
  const cancelRequestResponse = await cancelRequest({
    id,
    type,
  });
  return cancelRequestResponse;
};

/**
 * Creates a new request with the provided form data.
 *
 * @param {Object} params - The parameters for the API request.
 * @param {FormData} params.formData - The form data for creating the request.
 * @param {string} params.type - The type of request.
 * @returns {Promise} - The API response after creating the request.
 */
export const createRequestAction = async ({
  formData,
  type,
}: {
  formData: FormData;
  type: string;
}) => {
  const createRequestResponse = await createRequest({ formData, type });
  return createRequestResponse;
};

/**
 * Fetches a list of self podcasts for a company.
 *
 * @param {Object} params - The parameters for the API request.
 * @param {string} params.page - The page number for pagination.
 * @param {string} params.count - The number of podcasts to fetch per page.
 * @param {string} params.type - The type of podcast.
 * @returns {Promise} - The API response containing the list of self podcasts.
 */
export const getCompanySelfPodcastsAction = async ({
  page = "1",
  count = "24",
  type,
}: {
  page?: string;
  count?: string;
  type: string;
}) => {
  const getCompanySelfPodcastsResponse = await getCompanySelfPodcasts({
    page,
    count,
    type,
  });
  return getCompanySelfPodcastsResponse;
};
