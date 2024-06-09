import { FAVORITES_CATEGORIES } from "@/lib/apiEndPoints";
import axiosInstance from "@/lib/axios.config";
import { CategoryResponse } from "@/types/podcast";

const getMyFavoriteCategoriesList = async ({ type }: { type: string }) => {
  const { data } = await axiosInstance.get<CategoryResponse>(
    `/${type}${FAVORITES_CATEGORIES}`
  );
  return data.categories;
};

export default getMyFavoriteCategoriesList;
