import { CHANGE_STATUS, PRICE } from "@/lib/apiEndPoints";
import axiosInstance from "@/lib/axios.config";
import { ApiResponse } from "@/types";

const togglePriceStatus = async ({ type }: { type: string }) => {
  const { data } = await axiosInstance.get<ApiResponse>(
    `/${type}${PRICE}${CHANGE_STATUS}`
  );
  return data;
};

export default togglePriceStatus;
