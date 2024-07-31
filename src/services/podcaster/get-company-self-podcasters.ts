import axiosInstance from "@/lib/axios.config";
import { DEALT, PODCASTER } from "@/lib/apiEndPoints";
import { PodcastersResponse } from "@/types/podcaster";

const getCompanySelfPodcasters = async ({
  count,
  search,
  page,
  type,
}: {
  count: string;
  search?: string;
  page: string;
  type: string;
}) => {
  const { data } = await axiosInstance.get<PodcastersResponse>(
    `/${type}${PODCASTER}${DEALT}`,
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

export default getCompanySelfPodcasters;
