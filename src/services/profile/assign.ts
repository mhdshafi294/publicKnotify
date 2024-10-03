import { ASSIGN } from "@/lib/apiEndPoints";
import axiosInstance from "@/lib/axios.config";
import { ApiResponse } from "@/types";

const assignPayment = async ({ type }: { type: string }) => {
  const { data } = await axiosInstance.get<
    ApiResponse & {
      url: string;
    }
  >(`/${type}${ASSIGN}`);
  return data.url;
};

export default assignPayment;
