import { STORIES } from "@/lib/apiEndPoints";
import axiosInstance from "@/lib/axios.config";
import { ApiResponse } from "@/types";

const deleteStory = async ({ id, type }: { id: string; type: string }) => {
  const { data } = await axiosInstance.delete<ApiResponse>(
    `/${type}${STORIES}/${id}`
  );
  return data;
};

export default deleteStory;
