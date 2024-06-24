import { CHANGE_STATUS, REQUEST } from "@/lib/apiEndPoints";
import axiosInstance from "@/lib/axios.config";
import { ApiResponse } from "@/types";

const cancelRequest = async ({ id, type }: { id: string; type: string }) => {
  const { data } = await axiosInstance.get<ApiResponse>(
    `/${type}${REQUEST}${CHANGE_STATUS}/${id}`
  );
  return data;
};

export default cancelRequest;
