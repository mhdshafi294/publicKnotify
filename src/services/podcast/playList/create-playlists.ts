import axiosInstance from "@/lib/axios.config";
import { CREATE, PLAY_LIST } from "@/lib/apiEndPoints";
import { PlaylistsResponse } from "@/types/podcast";
import { ApiResponse } from "@/types";

const createPlaylists = async ({
  formData,
  type,
}: {
  formData: FormData;
  type: string;
}) => {
  const { data } = await axiosInstance.post<ApiResponse>(
    `/${type}${PLAY_LIST}${CREATE}`,
    formData
  );
  return data;
};

export default createPlaylists;
