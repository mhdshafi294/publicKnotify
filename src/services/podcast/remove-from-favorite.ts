import axiosInstance from "@/lib/axios.config";
import { REMOVE_FROM_FAVORITES } from "@/lib/apiEndPoints";
import { PodcastsResponse } from "@/types/podcast";
import { ApiResponse } from "@/types";

const RemoveFromFavorite = async ({
  podcastId,
  type,
}: {
  podcastId: string;
  type: string;
}) => {
  const { data } = await axiosInstance.get<ApiResponse>(
    `/${type}${REMOVE_FROM_FAVORITES}/${podcastId}`
  );
  return data;
};

export default RemoveFromFavorite;
