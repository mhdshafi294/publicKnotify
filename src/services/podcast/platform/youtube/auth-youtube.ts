import { AUTH } from "@/lib/apiEndPoints";
import axiosInstance from "@/lib/axios.config";
import { ApiResponse } from "@/types";
import { PodcastDetails } from "@/types/podcast";

const authYoutube = async () => {
  const { data } = await axiosInstance.get<{ url: string }>(`/youtube${AUTH}`);
  return data;
};

export default authYoutube;
