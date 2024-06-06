import axiosInstance from "@/lib/axios.config";
import { ApiResponse } from "@/types";
import { PodcastDetails } from "@/types/podcast";

const getPodcastDetails = async (type: string, id: number) => {
  const { data } = await axiosInstance.get<
    ApiResponse & {
      podcast: PodcastDetails;
    }
  >(`/${type}/podcast/details/${id}`);
  return data.podcast;
};

export default getPodcastDetails;
