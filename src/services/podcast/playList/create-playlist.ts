import axiosInstance from "@/lib/axios.config";
import { CREATE, PLAYLISTS } from "@/lib/apiEndPoints";
import { PlaylistsResponse } from "@/types/podcast";
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
