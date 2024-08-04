import { PODCAST, SAVE_PLAYBACK } from "@/lib/apiEndPoints";
import axiosInstance from "@/lib/axios.config";
import { ApiResponse } from "@/types";
import { MetadataResponse } from "@/types/podcast";

const savePlayback = async ({
  formData,
  id,
  type,
  current_position,
  total_time,
}: {
  formData: FormData;
  id: string;
  type: string;
  current_position: number;
  total_time: number;
}) => {
  console.log(
    `/${type}${PODCAST}${SAVE_PLAYBACK}/${id}`,
    "<<<<<<<<<<<<<<<<<<<<"
  );
  const { data } = await axiosInstance.post<ApiResponse>(
    `/${type}${PODCAST}${SAVE_PLAYBACK}/${id}`,
    { current_position, total_time }
  );
  return data;
};

export default savePlayback;
