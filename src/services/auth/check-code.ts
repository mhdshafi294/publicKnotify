import axiosInstance from "@/lib/axios.config";
import { CHECK_CODE } from "@/lib/apiEndPoints";
import { checkCodeSchema } from "@/schema/authSchema";

const ConfirmCheckCode = async (code: string, phone: string, type: string) => {
  const body = { phone, code };
  const { data } = await axiosInstance.post(`${type}${CHECK_CODE}`, body);
  return data.data;
};

export default ConfirmCheckCode;
