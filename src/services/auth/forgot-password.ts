import axiosInstance from "@/lib/axios.config";
import { FORGOT_PASSWORD } from "@/lib/apiEndPoints";
import { forgotPasswordSchema } from "@/schema/authSchema";

const forgotPassword = async (body: forgotPasswordSchema, type: string) => {
  const { data } = await axiosInstance.post(`${type}${FORGOT_PASSWORD}`, body);
  return data.data;
};

export default forgotPassword;
