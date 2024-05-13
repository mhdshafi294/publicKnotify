import axiosInstance from "@/lib/axios.config";
import { SEND_CODE } from "@/lib/apiEndPoints";
import { forgotPasswordSchema } from "@/schema/authSchema";

const sendCode = async (body: forgotPasswordSchema, type: string) => {
  const { data } = await axiosInstance.post(`${type}${SEND_CODE}`, body);
  return data.data;
};

export default sendCode;
