import axiosInstance from "@/lib/axios.config";
import { ADD_FAVORITES, PODCASTER } from "@/lib/apiEndPoints";
import { ApiResponse } from "@/types";

const AddPodcastToFavorite = async ({
  categories,
  podcasterId,
  type,
}: {
  categories: string[];
  podcasterId: string;
  type: string;
}) => {
  const { data } = await axiosInstance.post<ApiResponse>(
    `/${type}${PODCASTER}${ADD_FAVORITES}/${podcasterId}`,
    {
      category_names: categories,
    }
  );
  return data;
};

export default AddPodcastToFavorite;
