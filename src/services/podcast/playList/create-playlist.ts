import axiosInstance from "@/lib/axios.config";
import { PLAYLISTS } from "@/lib/apiEndPoints";
import { ApiResponse } from "@/types";

const createPlaylist = async ({
  formData,
  type,
}: {
  formData: FormData;
  type: string;
}) => {
  const { data } = await axiosInstance.post<ApiResponse>(
    `/${type}${PLAYLISTS}`,
    formData
  );
  return data;
};

export default createPlaylist;
