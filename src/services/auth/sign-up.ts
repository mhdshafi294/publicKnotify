import axiosInstance from "@/lib/axios.config";
import { REGISTER_URL } from "@/lib/apiEndPoints";
import { signUpSchema } from "@/schema/authSchema";
import { ApiResponse } from "@/types";

const signUp = async ({
  formData,
  type,
}: {
  formData: FormData;
  type: string;
}) => {
  const { data } = await axiosInstance.post<ApiResponse>(
    `${type}${REGISTER_URL}`,
    formData
  );
  return data;
};

export default signUp;
