import { INDEX, PODCASTS, REQUEST, TRENDING } from "@/lib/apiEndPoints";
import axiosInstance from "@/lib/axios.config";
import { SelfPodcastsDetailsResponse } from "@/types/podcast";

const getSelfPodcasts = async ({
  page,
  count,
  search,
  is_published,
  type,
}: {
  page: string;
  count: string;
  search?: string;
  is_published?: boolean;
  type: string;
}) => {
  const { data } = await axiosInstance.get<SelfPodcastsDetailsResponse>(
    `/${type}${PODCASTS}`,
    {
      params: {
        page,
        count,
        search,
        is_published,
      },
    }
  );
  return data;
};

export default getSelfPodcasts;
