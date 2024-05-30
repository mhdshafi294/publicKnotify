import axiosInstance from "@/lib/axios.config";
import { VERIFICATION_CODE } from "@/lib/apiEndPoints";
import { checkCodeSchema } from "@/schema/authSchema";

const confirmVerificationCode = async ({
  code,
  phone,
  type,
}: {
  code: string;
  phone: string;
  type: string;
}) => {
  const body = { phone, code };
  const { data } = await axiosInstance.post(
    `${type}${VERIFICATION_CODE}`,
    body
  );
  return data.data;
};

export default confirmVerificationCode;
