"use server";

import getNotifications from "@/services/notification/get-notifications"; // Service to get a list of notifications
import enableNotifications from "@/services/notification/enable-notifications";
import toggleEnableNotifications from "@/services/notification/toggle-enable-notifications copy";

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

/**
 * Toggles notifications for a given device and user agent.
 *
 * @param {Object} params - The parameters for toggling notifications.
 * @param {string} params.device_token - The device token to identify the user's device.
 * @param {string} params.agent - The user agent string indicating the type of client.
 * @param {string} params.type - The type of notification to toggle.
 *
 * @returns {Promise<any>} The result of the `toggleEnableNotifications` function call.
 */
export const toggleNotificationsAction = async ({
  device_token,
  type,
}: {
  device_token: string;
  type: string;
}) => {
  // Call the toggleNotifications function with the provided parameters
  return await toggleEnableNotifications({
    device_token,
    type,
  });
};

/**
 * Enable notifications for a given device and user agent.
 *
 * @param {Object} params - The parameters for toggling notifications.
 * @param {string} params.device_token - The device token to identify the user's device.
 * @param {string} params.agent - The user agent string indicating the type of client.
 * @param {string} params.type - The type of notification to toggle.
 *
 * @returns {Promise<any>} The result of the `enableNotifications` function call.
 */
export const enableNotificationsAction = async ({
  device_token,
  agent,
  type,
}: {
  device_token: string;
  agent?: string;
  type: string;
}) => {
  // Call the enableNotifications function with the provided parameters
  return await enableNotifications({
    device_token,
    agent,
    type,
  });
};
