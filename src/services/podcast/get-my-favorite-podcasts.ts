import {
  FAVORITES_LIST,
  INDEX,
  PODCAST,
  REQUEST,
  TRENDING,
} from "@/lib/apiEndPoints";
import axiosInstance from "@/lib/axios.config";
import { PodcastsResponse } from "@/types/podcast";

const getMyFavoritePodcasts = async ({
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
  const { data } = await axiosInstance.get<PodcastsResponse>(
    `/${type}${PODCAST}${FAVORITES_LIST}`,
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

export default getMyFavoritePodcasts;
