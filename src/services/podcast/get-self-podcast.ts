import { PODCASTS, REQUEST, SHOW } from "@/lib/apiEndPoints";
import axiosInstance from "@/lib/axios.config";
import { PodcastResponse, SelfPodcastDetailsResponse } from "@/types/podcast";

const getSelfPodcast = async ({ id, type }: { id: string; type: string }) => {
  const { data } = await axiosInstance.get<SelfPodcastDetailsResponse>(
    `/${type}${PODCASTS}/${id}`
  );
  return data;
};

export default getSelfPodcast;
