import { STORIES } from "@/lib/apiEndPoints";
import axiosInstance from "@/lib/axios.config";
import { StoriesResponse } from "@/types/stories";

const getStories = async ({
  page,
  count,
  type,
}: {
  page: string;
  count: string;
  type: string;
}) => {
  const params: any = {
    page,
    count,
  };

  const { data } = await axiosInstance.get<StoriesResponse>(
    `/${type}${STORIES}`,
    {
      params,
    }
  );
  return data;
};

export default getStories;
