import axiosInstance from "@/lib/axios.config";
import { PODCASTER, REMOVE_FROM_FAVORITES } from "@/lib/apiEndPoints";
import { ApiResponse } from "@/types";

const removeFromFavorite = async ({
  podcasterId,
  type,
}: {
  podcasterId: string;
  type: string;
}) => {
  const { data } = await axiosInstance.get<ApiResponse>(
    `/${type}${PODCASTER}${REMOVE_FROM_FAVORITES}/${podcasterId}`
  );
  return data;
};

export default removeFromFavorite;
