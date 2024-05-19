import axiosInstance from "@/lib/axios.config";
import { EDIT_PASSWORD } from "@/lib/apiEndPoints";
import { newPasswordSchema } from "@/schema/authSchema";

const newPassword = async (
  newPasswordData: newPasswordSchema,
  phone: string,
  code: string,
  type: string
) => {
  const body = { phone, code, ...newPasswordData };
  const { data } = await axiosInstance.post(`${type}${EDIT_PASSWORD}`, body);
  return data.data;
};

export default newPassword;
