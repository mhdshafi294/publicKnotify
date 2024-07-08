import axiosInstance from "@/lib/axios.config";
import { DETAILS, PODCASTER } from "@/lib/apiEndPoints";
import { PodcasterResponse } from "@/types/podcaster";

const getPodcaster = async ({ id, type }: { id: string; type: string }) => {
  const { data } = await axiosInstance.get<PodcasterResponse>(
    `/${type}${PODCASTER}${DETAILS}/${id}`
  );
  return data;
};

export default getPodcaster;
