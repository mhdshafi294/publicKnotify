import { MY_PLAYBACK, PODCAST } from "@/lib/apiEndPoints";
import axiosInstance from "@/lib/axios.config";
import { PodcastsResponse } from "@/types/podcast";

const getSelfPlayback = async ({
  page,
  count,
  type,
}: {
  page: string;
  count: string;
  type: string;
}) => {
  const { data } = await axiosInstance.get<PodcastsResponse>(
    `/${type}${PODCAST}${MY_PLAYBACK}`,
    {
      params: {
        page,
        count,
      },
    }
  );
  return data;
};

export default getSelfPlayback;
