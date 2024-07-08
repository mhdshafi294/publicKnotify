import { CHANGE_STATUS, REQUEST } from "@/lib/apiEndPoints";
import axiosInstance from "@/lib/axios.config";
import { ApiResponse } from "@/types";

const changeRequestStatus = async ({
  id,
  status,
  type,
}: {
  id: string;
  status: string;
  type: string;
}) => {
  const { data } = await axiosInstance.get<ApiResponse>(
    `/${type}${REQUEST}${CHANGE_STATUS}/${id}`,
    {
      params: {
        status,
      },
    }
  );
  return data;
};

export default changeRequestStatus;
