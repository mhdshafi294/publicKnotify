import axiosInstance from "@/lib/axios.config";
import { CHECK_CODE } from "@/lib/apiEndPoints";
import { ApiResponse } from "@/types";

const ConfirmCheckCode = async ({
  code,
  phone,
  type,
}: {
  code: string;
  phone: string;
  type: string;
}) => {
  const body = { phone, code };
  const { data } = await axiosInstance.post<ApiResponse>(
    `${type}${CHECK_CODE}`,
    body
  );
  return data;
};

export default ConfirmCheckCode;
