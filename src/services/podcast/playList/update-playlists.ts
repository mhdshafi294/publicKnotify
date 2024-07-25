import axiosInstance from "@/lib/axios.config";
import { CREATE, PLAYLISTS, UPDATE } from "@/lib/apiEndPoints";
import { PlaylistsResponse } from "@/types/podcast";
import { ApiResponse } from "@/types";

const updatePlaylists = async ({
  formData,
  type,
  id,
}: {
  formData: FormData;
  type: string;
  id: string;
}) => {
  const { data } = await axiosInstance.post<ApiResponse>(
    `/${type}${PLAYLISTS}/${id}`,
    formData
  );
  return data;
};

export default updatePlaylists;
