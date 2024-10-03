import { STORIES } from "@/lib/apiEndPoints";
import axiosInstance from "@/lib/axios.config";
import { SelfStoriesResponse } from "@/types/stories";

const getSelfStories = async ({ type }: { type: string }) => {
  const { data } = await axiosInstance.get<SelfStoriesResponse>(
    `/${type}${STORIES}`
  );
  return data;
};

export default getSelfStories;
