import axiosInstance from "@/lib/axios.config";
import { DELETE, PLAY_LIST, SHOW } from "@/lib/apiEndPoints";
import { ApiResponse } from "@/types";

const deletePlaylist = async ({ id, type }: { id: string; type: string }) => {
  const { data } = await axiosInstance.delete<ApiResponse>(
    `/${type}${PLAY_LIST}${DELETE}/${id}`
  );
  return data;
};

export default deletePlaylist;
