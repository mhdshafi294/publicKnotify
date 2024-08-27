import { INDEX, PODCASTS, REQUEST, TRENDING } from "@/lib/apiEndPoints";
import axiosInstance from "@/lib/axios.config";
import { SelfPodcastsDetailsResponse } from "@/types/podcast";

const getSelfPodcasts = async ({
  page,
  count,
  search,
  is_published,
  playlist_id,
  type,
}: {
  page: string;
  count: string;
  search?: string;
  is_published?: number;
  playlist_id?: string;
  type: string;
}) => {
  // console.log(is_published);
  const { data } = await axiosInstance.get<SelfPodcastsDetailsResponse>(
    `/${type}${PODCASTS}`,
    {
      params: {
        page,
        count,
        search,
        is_published,
        playlist_id,
      },
    }
  );
  return data;
};

export default getSelfPodcasts;
