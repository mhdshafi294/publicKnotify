import axiosInstance from "@/lib/axios.config";
import { LOGIN_URL } from "@/lib/apiEndPoints";
import { loginSchema } from "@/schema/authSchema";

const signIn = async (body: loginSchema, type: string) => {
  const { data } = await axiosInstance.post(`${type}${LOGIN_URL}`, body);
  return data.data;
};

export default signIn;
