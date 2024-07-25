import {
  INDEX,
  PUBLISHED_PODCASTS,
  REQUEST,
  TRENDING,
} from "@/lib/apiEndPoints";
import axiosInstance from "@/lib/axios.config";
import { PodcastsResponse } from "@/types/podcast";

const getCompanySelfPodcasts = async ({
  page,
  count,
  type,
}: {
  page: string;
  count: string;
  type: string;
}) => {
  const { data } = await axiosInstance.get<PodcastsResponse>(
    `/${type}${REQUEST}${PUBLISHED_PODCASTS}`,
    {
      params: {
        page,
        count,
      },
    }
  );
  return data;
};

export default getCompanySelfPodcasts;
