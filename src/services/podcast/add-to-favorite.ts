import axiosInstance from "@/lib/axios.config";
import { ADD_FAVORITES, PODCAST } from "@/lib/apiEndPoints";
import { ApiResponse } from "@/types";

const AddPodcastToFavorite = async ({
  categories,
  podcastId,
  type,
}: {
  categories: string[];
  podcastId: string;
  type: string;
}) => {
  const { data } = await axiosInstance.post<ApiResponse>(
    `/${type}${PODCAST}${ADD_FAVORITES}/${podcastId}`,
    {
      category_names: categories,
    }
  );
  return data;
};

export default AddPodcastToFavorite;
