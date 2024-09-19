import { CONTRACTS } from "@/lib/apiEndPoints";
import axiosInstance from "@/lib/axios.config";
import { ApiResponse } from "@/types";

const createContract = async ({
  formData,
  type,
}: {
  formData: FormData;
  type: string;
}) => {
  const { data } = await axiosInstance.post<ApiResponse>(
    `/${type}${CONTRACTS}`,
    formData
  );
  return data;
};

export default createContract;
