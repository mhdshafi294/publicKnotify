import { PUBLISH } from "@/lib/apiEndPoints";
import axiosInstance from "@/lib/axios.config";
import { ApiResponse } from "@/types";

const publishYoutube = async ({ type, id }: { type: string; id: string }) => {
  const { data } = await axiosInstance.post<ApiResponse>(
    `/${type}/youtube${PUBLISH}/${id}`
  );
  return data;
};

export default publishYoutube;
