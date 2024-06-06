import axiosInstance from "@/lib/axios.config";
import { ADD_FAVORITES } from "@/lib/apiEndPoints";
import { newPasswordSchema } from "@/schema/authSchema";
import { PodcastsResponse } from "@/types/podcast";

const AddToFavorite = async ({
  categories,
  PodcastId,
  type,
}: {
  categories: string[];
  PodcastId: string;
  type: string;
}) => {
  const { data } = await axiosInstance.get<PodcastsResponse>(
    `/${type}${ADD_FAVORITES}/${PodcastId}`,
    {
      params: {
        categories,
      },
    }
  );
  return data;
};

export default AddToFavorite;
