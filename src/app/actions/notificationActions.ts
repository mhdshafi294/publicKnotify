"use server";

import getNotifications from "@/services/notification/get-notifications"; // Service to get a list of notifications

/**
 * Action to get a list of notifications.
 *
 * @param {Object} params - The parameters for getting the list of notifications.
 * @param {string} [params.count="24"] - The number of notifications to fetch.
 * @param {string} [params.search] - The search query to filter notifications.
 * @param {string} [params.page="1"] - The page number for pagination.
 * @param {string} params.type - The type of the request.
 * @returns {Promise<any>} - The response from the getNotifications service.
 */
export const getNotificationsAction = async ({
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
  return await getNotifications({
    count,
    search,
    page,
    type,
  });
};
