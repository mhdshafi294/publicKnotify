import { PODCASTS, PUBLISH, REQUEST, SHOW } from "@/lib/apiEndPoints";
import axiosInstance from "@/lib/axios.config";
import { ApiResponse } from "@/types";

const deleteSelfPodcast = async ({
  id,
  type,
}: {
  id: string;
  type: string;
}) => {
  const { data } = await axiosInstance.delete<ApiResponse>(
    `/${type}${PODCASTS}/${id}`
  );
  return data;
};

export default deleteSelfPodcast;
