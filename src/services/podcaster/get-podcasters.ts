import axiosInstance from "@/lib/axios.config";
import { PODCASTER } from "@/lib/apiEndPoints";
import { PodcastersResponse } from "@/types/podcaster";

const getPodcasters = async ({
  count,
  search,
  page: page,
  type,
}: {
  count: string;
  search?: string;
  page: string;
  type: string;
}) => {
  const { data } = await axiosInstance.get<PodcastersResponse>(
    `/${type}${PODCASTER}`,
    {
      params: {
        count,
        search,
        page,
      },
    }
  );
  return data;
};

export default getPodcasters;
