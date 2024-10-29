"use server";

// Story service imports
import createStory from "@/services/stories/create-story";
import deleteStory from "@/services/stories/delete-story";
import getSelfStories from "@/services/stories/get-self-stories";
import getStories from "@/services/stories/get-stories";
import markStoryRead from "@/services/stories/mark-read";

/**
 * Fetches a paginated list of stories based on the specified parameters.
 *
 * @param {Object} params - Parameters for fetching stories.
 * @param {string} params.page - The page number of the stories to retrieve.
 * @param {string} params.count - The number of stories to retrieve.
 * @param {string} params.type - The type of stories to fetch.
 * @returns {Promise<Object>} A promise that resolves with the response from the API call.
 *
 * @example
 * const stories = await getStoriesAction({ page: "1", count: "20", type: "public" });
 */
export const getStoriesAction = async ({
  page = "1",
  count = "26",
  type,
}: {
  page?: string;
  count?: string;
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
 * Creates a new story using form data and specified type.
 *
 * @param {Object} params - Parameters for creating a story.
 * @param {FormData} params.formData - The form data for creating the story.
 * @param {string} params.type - The type of the story.
 * @returns {Promise<Object>} A promise that resolves to the response from the create story API call.
 *
 * @example
 * const response = await createStoryAction({ formData: form, type: "private" });
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
 * Retrieves the current user's stories based on the provided type.
 *
 * @param {Object} params - Parameters for fetching self stories.
 * @param {string} params.type - The type of stories to fetch.
 * @returns {Promise<Object>} A promise that resolves to the user's stories.
 *
 * @example
 * const selfStories = await getSelfStoriesAction({ type: "draft" });
 */
export const getSelfStoriesAction = async ({ type }: { type: string }) => {
  const getRequestsResponse = await getSelfStories({
    type,
  });
  return getRequestsResponse;
};

/**
 * Marks a specific story as read.
 *
 * @param {Object} params - Parameters for marking a story as read.
 * @param {string} params.id - The ID of the story to mark as read.
 * @param {string} params.type - The type of the story.
 * @returns {Promise<Object>} A promise that resolves with the response from the mark-read API call.
 *
 * @example
 * const response = await markStoryReadAction({ id: "story123", type: "public" });
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
 * Deletes a specific story based on its ID and type.
 *
 * @param {Object} params - Parameters for deleting a story.
 * @param {string} params.id - The ID of the story to delete.
 * @param {string} params.type - The type of the story.
 * @returns {Promise<Object>} A promise that resolves with the response from the delete story API call.
 *
 * @example
 * const response = await deleteStoryAction({ id: "story123", type: "draft" });
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
