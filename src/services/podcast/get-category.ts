import axiosInstance from "@/lib/axios.config";
import { CategoryResponse } from "@/types/podcast";

const getCategory = async () => {
  const { data } = await axiosInstance.get<CategoryResponse>(`/api/categories`);
  return data.categories;
};

export default getCategory;
