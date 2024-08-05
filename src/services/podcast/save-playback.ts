import { PODCAST, SAVE_PLAYBACK } from "@/lib/apiEndPoints";
import axiosInstance from "@/lib/axios.config";
import { ApiResponse } from "@/types";
import { MetadataResponse } from "@/types/podcast";

const savePlayback = async ({
  id,
  type,
  current_position,
  total_time,
}: {
  id: string;
  type: string;
  current_position: number;
  total_time: number;
}) => {
  const { data } = await axiosInstance.post<ApiResponse>(
    `/${type}${PODCAST}${SAVE_PLAYBACK}/${id}`,
    { current_position, total_time }
  );
  return data;
};

export default savePlayback;
