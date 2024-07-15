import { FAVORITES_LIST, PODCASTER } from "@/lib/apiEndPoints";
import axiosInstance from "@/lib/axios.config";
import { RequestsResponse } from "@/types/request";

const getMyFavoritePodcasters = async ({
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
    `/${type}${PODCASTER}${FAVORITES_LIST}`,
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

export default getMyFavoritePodcasters;
