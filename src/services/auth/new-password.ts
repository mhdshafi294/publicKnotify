import axiosInstance from "@/lib/axios.config";
import { EDIT_PASSWORD } from "@/lib/apiEndPoints";
import { newPasswordSchema } from "@/schema/authSchema";
import { ApiResponse } from "@/types";

const newPassword = async ({
  newPasswordData,
  phone,
  code,
  type,
}: {
  newPasswordData: newPasswordSchema;
  phone: string;
  code: string;
  type: string;
}) => {
  const body = {
    phone: phone,
    code,
    ...newPasswordData,
  };
  const { data } = await axiosInstance.post<ApiResponse>(
    `${type}${EDIT_PASSWORD}`,
    body
  );
  return data;
};

export default newPassword;
