import { MARK_READ, STORIES } from "@/lib/apiEndPoints";
import axiosInstance from "@/lib/axios.config";
import { ApiResponse } from "@/types";

const markStoryRead = async ({ type, id }: { type: string; id: string }) => {
  const { data } = await axiosInstance.get<ApiResponse>(
    `/${type}${STORIES}${MARK_READ}/${id}`
  );
  return data;
};

export default markStoryRead;
