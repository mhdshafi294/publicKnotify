"use server";

import createStory from "@/services/stories/create-story";
import deleteStory from "@/services/stories/delete-story";
import getSelfStories from "@/services/stories/get-self-stories";
import getStories from "@/services/stories/get-stories";
import markStoryRead from "@/services/stories/mark-read";

/**
 * Retrieves stories based on the provided parameters.
 * @param {Object} param0 - An object containing the parameters for fetching stories.
 * @param {string} param0.page - The page number of the stories to retrieve.
 * @param {string} param0.count - The number of stories to retrieve.
 * @param {string} param0.type - The type of stories to fetch.
 * @returns {Promise} A promise that resolves with the response from the API call.
 */
export const getStoriesAction = async ({
  page = "1",
  count = "26",
  type,
}: {
  page: string;
  count: string;
  type: string;
}) => {
  const getRequestsResponse = await getStories({
    page,
    count,
    type,
  });

  return getRequestsResponse;
};

/**
 * Creates a story action asynchronously using the provided form data and type.
 * @param {Object} param0 - An object containing formData and type properties.
 * @param {FormData} param0.formData - The form data for creating the story.
 * @param {string} param0.type - The type of the story.
 * @returns {Promise} A promise that resolves to the response from creating the story.
 */
export const createStoryAction = async ({
  formData,
  type,
}: {
  formData: FormData;
  type: string;
}) => {
  const getRequestsResponse = await createStory({
    formData,
    type,
  });
  return getRequestsResponse;
};

/**
 * Asynchronously fetches self stories based on the provided type.
 * @param {Object} param0 - An object containing the type of stories to fetch.
 * @param {string} param0.type - The type of stories to fetch.
 * @returns {Promise} A promise that resolves to the response of the self stories request.
 */
export const getSelfStoriesAction = async ({ type }: { type: string }) => {
  const getRequestsResponse = await getSelfStories({
    type,
  });
  return getRequestsResponse;
};

/**
 * Marks a story as read by sending a request to the server.
 * @param {object} param0 - An object containing the id and type of the story to mark as read.
 * @param {string} param0.id - The id of the story to mark as read.
 * @param {string} param0.type - The type of the story to mark as read.
 * @returns {Promise} A promise that resolves with the response from the server.
 */
export const markStoryReadAction = async ({
  id,
  type,
}: {
  id: string;
  type: string;
}) => {
  const getRequestsResponse = await markStoryRead({
    id,
    type,
  });
  return getRequestsResponse;
};

/**
 * Deletes a story based on the provided id and type.
 * @param {object} param0 - An object containing the id and type of the story to delete.
 * @param {string} param0.id - The id of the story to delete.
 * @param {string} param0.type - The type of the story to delete.
 * @returns {Promise} A promise that resolves with the response from the deleteStory API call.
 */
export const deleteStoryAction = async ({
  id,
  type,
}: {
  id: string;
  type: string;
}) => {
  const getRequestsResponse = await deleteStory({
    id,
    type,
  });
  return getRequestsResponse;
};
