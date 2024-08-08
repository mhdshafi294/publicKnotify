import axiosInstance from "@/lib/axios.config";
import { SupportSchema } from "@/schema/supportSchema";

const sendSupportMessage = async (body: SupportSchema) => {
  await axiosInstance.post("api/get-support", body);
};

export default sendSupportMessage;
