"use server";

import createStory from "@/services/stories/create-story";
import deleteStory from "@/services/stories/delete-story";
import getSelfStories from "@/services/stories/get-self-stories";
import getStories from "@/services/stories/get-stories";
import markStoryRead from "@/services/stories/mark-read";

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

export const getSelfStoriesAction = async ({ type }: { type: string }) => {
  const getRequestsResponse = await getSelfStories({
    type,
  });
  return getRequestsResponse;
};

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
