import axiosInstance from "@/lib/axios.config";
import { PLAYLISTS } from "@/lib/apiEndPoints";
import { ApiResponse } from "@/types";

const deletePlaylist = async ({ id, type }: { id: string; type: string }) => {
  const { data } = await axiosInstance.delete<ApiResponse>(
    `/${type}${PLAYLISTS}/${id}`
  );
  return data;
};

export default deletePlaylist;
