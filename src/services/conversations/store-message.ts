import { CONVERSATIONS, MESSAGE } from "@/lib/apiEndPoints";
import axiosInstance from "@/lib/axios.config";
import { ApiResponse } from "@/types";

const storeMessage = async ({
  formData,
  type,
}: {
  formData: FormData;
  type: string;
}) => {
  const { data } = await axiosInstance.post<ApiResponse>(
    `/${type}${CONVERSATIONS}${MESSAGE}`,
    formData
  );
  return data;
};

export default storeMessage;
