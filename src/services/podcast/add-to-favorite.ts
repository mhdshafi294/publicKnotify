import axiosInstance from "@/lib/axios.config";
import { ADD_FAVORITES } from "@/lib/apiEndPoints";
import { ApiResponse } from "@/types";

const AddToFavorite = async ({
  categories,
  podcastId,
  type,
}: {
  categories: string[];
  podcastId: string;
  type: string;
}) => {
  const { data } = await axiosInstance.post<ApiResponse>(
    `/${type}${ADD_FAVORITES}/${podcastId}`,
    {
      category_names: categories,
    }
  );
  return data;
};

export default AddToFavorite;
