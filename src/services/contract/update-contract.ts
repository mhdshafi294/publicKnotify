import { CONTRACTS } from "@/lib/apiEndPoints";
import axiosInstance from "@/lib/axios.config";
import { ApiResponse } from "@/types";

const updateContract = async ({
  formData,
  type,
  id,
}: {
  formData: FormData;
  type: string;
  id: string;
}) => {
  const { data } = await axiosInstance.post<ApiResponse>(
    `/${type}${CONTRACTS}/${id}`,
    formData
  );
  return data;
};

export default updateContract;
