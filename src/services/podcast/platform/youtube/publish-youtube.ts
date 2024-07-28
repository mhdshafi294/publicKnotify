import { AUTH, PUBLISH } from "@/lib/apiEndPoints";
import axiosInstance from "@/lib/axios.config";
import { ApiResponse } from "@/types";
import { PodcastDetails } from "@/types/podcast";

const publishYoutube = async (type: string, podcastId: number) => {
  const { data } = await axiosInstance.get<ApiResponse>(
    `/${type}/youtube${PUBLISH}/${podcastId}`
  );
  return data;
};

export default publishYoutube;
