import axiosInstance from "@/lib/axios.config";
import { REGISTER_URL } from "@/lib/apiEndPoints";
import { signUpSchema } from "@/schema/authSchema";

const signUp = async (body: signUpSchema, type: string) => {
  const formData = new FormData();
  formData.append("full_name", body.full_name);
  formData.append("phone", body.phone);
  formData.append("password", body.password);
  formData.append("password_confirmation", body.password_confirmation);
  if (type === "company" && body.documents)
    formData.append("document", body.documents);

  const { data } = await axiosInstance.post(`${type}${REGISTER_URL}`, formData);
  return data.data;
};

export default signUp;
