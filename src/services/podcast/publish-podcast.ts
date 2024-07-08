import { PODCASTS, PUBLISH, REQUEST, SHOW } from "@/lib/apiEndPoints";
import axiosInstance from "@/lib/axios.config";
import { ApiResponse } from "@/types";

const publishPodcast = async ({ id, type }: { id: string; type: string }) => {
  const { data } = await axiosInstance.get<ApiResponse>(
    `/${type}${PODCASTS}${PUBLISH}/${id}`
  );
  return data;
};

export default publishPodcast;
