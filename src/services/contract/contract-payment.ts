import { CONTRACTS, PAY } from "@/lib/apiEndPoints";
import axiosInstance from "@/lib/axios.config";
import { ApiResponse } from "@/types";

const contractPayment = async ({ type, id }: { type: string; id: string }) => {
  const { data } = await axiosInstance.get<
    ApiResponse & {
      url: string;
    }
  >(`/${type}${CONTRACTS}${PAY}/${id}`);
  return data.url;
};

export default contractPayment;
