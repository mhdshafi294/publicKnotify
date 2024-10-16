import axiosInstance from "@/lib/axios.config";
import { PLAYLISTS } from "@/lib/apiEndPoints";
import { PlaylistsResponse } from "@/types/podcast";

const getPlaylists = async ({
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
    `/${type}${PLAYLISTS}`,
    {
      params: {
        count,
        search,
        page,
      },
    }
  );
  console.log(data.message, "<<<<<<<<data.message from services");
  return data;
};

export default getPlaylists;
