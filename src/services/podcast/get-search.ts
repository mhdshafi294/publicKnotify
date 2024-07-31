import { SEARCH, TRENDING } from "@/lib/apiEndPoints";
import axiosInstance from "@/lib/axios.config";
import { PodcastsResponse, SearchResponse } from "@/types/podcast";

const getSearch = async ({
  count,
  search,
  page: page,
  type,
}: {
  count: string;
  search?: string;
  page: string;
  type: string;
}) => {
  const { data } = await axiosInstance.get<SearchResponse>(
    `/${type}${SEARCH}`,
    {
      params: {
        count,
        search,
        page,
      },
    }
  );
  return data;
};

export default getSearch;
