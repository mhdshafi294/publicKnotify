import axiosInstance from "@/lib/axios.config";
import { SEND_CODE } from "@/lib/apiEndPoints";
import { forgotPasswordSchema } from "@/schema/authSchema";
import { ApiResponse } from "@/types";

const sendCode = async ({
  body,
  type,
}: {
  body: forgotPasswordSchema;
  type: string;
}) => {
  const postBody = { ...body, phone: body.phone.code + body.phone.phone };
  const { data } = await axiosInstance.post<ApiResponse>(
    `${type}${SEND_CODE}`,
    postBody
  );
  return data;
};

export default sendCode;
