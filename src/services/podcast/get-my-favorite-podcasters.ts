import { FAVORITES_LIST, PODCASTER } from "@/lib/apiEndPoints";
import axiosInstance from "@/lib/axios.config";
import { PodcastersResponse } from "@/types/podcaster";

const getMyFavoritePodcasters = async ({
  page,
  count,
  type,
  category_id,
}: // search,
{
  page: string;
  count: string;
  type: string;
  category_id?: string;
  // search?: string;
}) => {
  const { data } = await axiosInstance.get<PodcastersResponse>(
    `/${type}${PODCASTER}${FAVORITES_LIST}`,
    {
      params: {
        page,
        count,
        category_id,
        // search,
      },
    }
  );
  return data;
};

export default getMyFavoritePodcasters;
