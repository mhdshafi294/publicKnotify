import axiosInstance from "@/lib/axios.config";
import { LOGIN_URL } from "@/lib/apiEndPoints";
import { loginSchema } from "@/schema/authSchema";

const signIn = async (body: loginSchema, type: string) => {
  const postBody = { ...body, phone: `${body.phone.code}${body.phone.phone}` };
  const { data } = await axiosInstance.post(`${type}${LOGIN_URL}`, postBody);
  return data.data;
};

export default signIn;
