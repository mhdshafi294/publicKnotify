import axiosInstance from "@/lib/axios.config";
import { AUTH, YOUTUBE } from "@/lib/apiEndPoints";
import { ApiResponse } from "@/types";

const authenticateYoutube = async () => {
  const { data } = await axiosInstance.get<ApiResponse>(`${YOUTUBE}${AUTH}`);
  return data;
};

export default authenticateYoutube;
