import axiosInstance from "@/lib/axios.config";
import { EDIT_PASSWORD, TRENDING } from "@/lib/apiEndPoints";
import { newPasswordSchema } from "@/schema/authSchema";
import { PodcastsResponse } from "@/types/podcast";

const getTrending = async ({
  count,
  search,
  category_id,
  page: page,
  type,
}: {
  count: string;
  search?: string;
  category_id?: string;
  page: string;
  type: string;
}) => {
  const { data } = await axiosInstance.get<PodcastsResponse>(
    `/${type}${TRENDING}`,
    {
      params: {
        count,
        search,
        category_id,
        page,
      },
    }
  );
  return data;
};

export default getTrending;
