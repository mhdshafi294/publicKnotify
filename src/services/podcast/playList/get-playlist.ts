import axiosInstance from "@/lib/axios.config";
import { PLAY_LIST, SHOW } from "@/lib/apiEndPoints";
import { PlaylistResponse } from "@/types/podcast";

const getPlaylist = async ({ id, type }: { id: string; type: string }) => {
  const { data } = await axiosInstance.get<PlaylistResponse>(
    `/${type}${PLAY_LIST}${SHOW}/${id}`
  );
  return data;
};

export default getPlaylist;
