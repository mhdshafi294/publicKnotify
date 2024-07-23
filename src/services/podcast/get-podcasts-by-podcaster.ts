import { PODCASTER, PODCASTS } from "@/lib/apiEndPoints";
import axiosInstance from "@/lib/axios.config";
import { PodcastsResponse } from "@/types/podcast";

const getPodcastsByPodcaster = async ({
  page,
  count,
  podcasterId,
  type,
}: {
  page: string;
  count: string;
  podcasterId: string;
  type: string;
}) => {
  const { data } = await axiosInstance.get<PodcastsResponse>(
    `/${type}${PODCASTS}${PODCASTER}/${podcasterId}`,
    {
      params: {
        page,
        count,
      },
    }
  );
  return data;
};

export default getPodcastsByPodcaster;
