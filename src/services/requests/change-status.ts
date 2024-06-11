import { CHANGE_STATUS, REQUESTS } from "@/lib/apiEndPoints";
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
    `/${type}${REQUESTS}${CHANGE_STATUS}/${id}`,
    {
      params: {
        status,
      },
    }
  );
  return data;
};

export default changeRequestStatus;
