import {
  FAVORITES_LIST,
  INDEX,
  PODCAST,
  REQUEST,
  TRENDING,
} from "@/lib/apiEndPoints";
import axiosInstance from "@/lib/axios.config";
import { RequestsResponse } from "@/types/request";

const getMyFavoritePodcasts = async ({
  page,
  count,
  search,
  type,
}: {
  page: string;
  count: string;
  search?: string;
  type: string;
}) => {
  const { data } = await axiosInstance.get<RequestsResponse>(
    `/${type}${PODCAST}${FAVORITES_LIST}`,
    {
      params: {
        page,
        count,
        search,
      },
    }
  );
  return data;
};

export default getMyFavoritePodcasts;
