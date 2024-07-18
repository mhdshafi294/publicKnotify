import axiosInstance from "@/lib/axios.config";
import { INDEX, PLAY_LIST } from "@/lib/apiEndPoints";
import { PlaylistsResponse } from "@/types/podcast";

const getPlayLists = async ({
  count,
  search,
  page,
  type,
}: {
  count: string;
  search?: string;
  page: string;
  type: string;
}) => {
  const { data } = await axiosInstance.get<PlaylistsResponse>(
    `/${type}${PLAY_LIST}${INDEX}`,
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

export default getPlayLists;
