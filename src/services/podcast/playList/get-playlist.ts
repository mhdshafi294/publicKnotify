import axiosInstance from "@/lib/axios.config";
import { PLAYLISTS } from "@/lib/apiEndPoints";
import { PlaylistResponse } from "@/types/podcast";

const getPlaylist = async ({ id, type }: { id: string; type: string }) => {
  const { data } = await axiosInstance.get<PlaylistResponse>(
    `/${type}${PLAYLISTS}/${id}`
  );
  return data;
};

export default getPlaylist;
