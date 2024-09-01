import getConversation from "@/services/conversations/get-conversation";
import getConversations from "@/services/conversations/get-conversations";
import storeMessage from "@/services/conversations/store-message";

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
  count = "12",
  search,
  type,
}: {
  page?: string;
  count?: string;
  search?: string;
  type: string;
}) => {
  const getRequestsResponse = await getConversations({
    page,
    count,
    search,
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
  const getRequestResponse = await getConversation({
    id,
    type,
  });
  return getRequestResponse;
};

export const createRequestAction = async ({
  formData,
  type,
}: {
  formData: FormData;
  type: string;
}) => {
  const createRequestResponse = await storeMessage({ formData, type });
  return createRequestResponse;
};
