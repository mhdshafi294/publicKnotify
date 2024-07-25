import axiosInstance from "@/lib/axios.config";
import { PLAY_LISTS, PODCAST, PODCASTER } from "@/lib/apiEndPoints";
import { PlaylistsResponse } from "@/types/podcast";

const getPlaylistsByPodcaster = async ({
  podcasterId,
  count,
  search,
  page,
  type,
}: {
  podcasterId: string;
  count: string;
  search?: string;
  page: string;
  type: string;
}) => {
  const { data } = await axiosInstance.get<PlaylistsResponse>(
    `/${type}${PODCAST}${PODCASTER}${PLAY_LISTS}/${podcasterId}`,
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

export default getPlaylistsByPodcaster;
