import { FAVORITES_CATEGORIES, PODCAST } from "@/lib/apiEndPoints";
import axiosInstance from "@/lib/axios.config";
import { CategoryResponse } from "@/types/podcast";

const getMyPodcastFavoriteCategoriesList = async ({
  type,
}: {
  type: string;
}) => {
  const { data } = await axiosInstance.get<CategoryResponse>(
    `/${type}${PODCAST}${FAVORITES_CATEGORIES}`
  );
  return data.categories;
};

export default getMyPodcastFavoriteCategoriesList;
