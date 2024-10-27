import { ENABLE_DISABLE, STATISTICS } from "@/lib/apiEndPoints";
import axiosInstance from "@/lib/axios.config";
import { ApiResponse } from "@/types";

const postEnableStatistics = async ({
  type,
  body,
}: {
  type: string;
  body: {
    playlist_statistics: number;
    top_episodes: number;
    youtube_channel: number;
    most_popular: number;
    time: number;
    platform: number;
    country: number;
  };
}) => {
  const { data } = await axiosInstance.post<ApiResponse>(
    `/${type}${STATISTICS}${ENABLE_DISABLE}`,
    body
  );
  return data;
};

export default postEnableStatistics;
