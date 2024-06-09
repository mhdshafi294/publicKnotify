import { FAVORITES_CATEGORIES, PODCASTER } from "@/lib/apiEndPoints";
import axiosInstance from "@/lib/axios.config";
import { CategoryResponse } from "@/types/podcast";

const getMyPodcastFavoriteCategoriesList = async ({
  type,
}: {
  type: string;
}) => {
  const { data } = await axiosInstance.get<CategoryResponse>(
    `/${type}${PODCASTER}${FAVORITES_CATEGORIES}`
  );
  return data.categories;
};

export default getMyPodcastFavoriteCategoriesList;
